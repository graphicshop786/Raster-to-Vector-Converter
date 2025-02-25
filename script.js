// UI Controls Module
const uiControls = {
    canvasZoom: 1,
    outputZoom: 1,
    reset: () => {
        input.value = '';
        canvas.width = canvas.width;
        vectorOutput.innerHTML = '';
        downloadBtn.style.display = 'none';
        undoBtn.style.display = 'none';
        fileSize.textContent = '';
        uiControls.canvasZoom = 1;
        uiControls.outputZoom = 1;
        canvas.style.transform = 'scale(1)';
        vectorOutput.style.transform = 'scale(1)';
    },
    zoomCanvas: (factor) => {
        uiControls.canvasZoom *= factor;
        canvas.style.transform = `scale(${uiControls.canvasZoom})`;
    },
    zoomOutput: (factor) => {
        uiControls.outputZoom *= factor;
        vectorOutput.style.transform = `scale(${uiControls.outputZoom})`;
    }
};

// DOM Elements
const input = document.getElementById('imageInput');
const dropzone = document.getElementById('dropzone');
const canvas = document.getElementById('rasterCanvas');
const ctx = canvas.getContext('2d');
const vectorOutput = document.getElementById('vectorOutput');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const undoBtn = document.getElementById('undoBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const fileSize = document.getElementById('fileSize');
const loadingSpinner = document.getElementById('loadingSpinner');

let currentFile, lastSvg = '';

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Event Listeners
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
});
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    processImage(e.dataTransfer.files[0]);
});
dropzone.addEventListener('click', () => input.click());
input.addEventListener('change', (e) => processImage(e.target.files[0]));
document.getElementById('darkMode').addEventListener('change', (e) => {
    document.body.classList.toggle('dark-mode', e.target.checked);
});
resetBtn.addEventListener('click', uiControls.reset);
undoBtn.addEventListener('click', () => vectorOutput.innerHTML = DOMPurify.sanitize(lastSvg));

const debouncedVectorize = debounce(vectorizeImage, 500); // Increased to 500ms
document.getElementById('detailLevel').addEventListener('input', debouncedVectorize);
document.getElementById('scale').addEventListener('input', debouncedVectorize);
document.getElementById('colorMode').addEventListener('change', debouncedVectorize);

// Process Image
function processImage(file) {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size exceeds 5MB. Please upload a smaller image.");
        return;
    }

    if (!file.type.match(/image\/(png|jpeg|webp|gif)/)) {
        alert("Please upload a valid PNG, JPEG, WebP, or GIF image.");
        return;
    }

    currentFile = file;
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
        const maxWidth = 600;
        const maxHeight = 600;
        let width = img.width;
        let height = img.height;
        const aspectRatio = width / height;

        if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
        }
        if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        fileSize.textContent = `Uploaded File Size: ${(file.size / 1024).toFixed(2)} KB`;
        loadImageTracer();
    };

    img.src = url;
}

// Lazy Load ImageTracer
function loadImageTracer() {
    if (!window.ImageTracer) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/imagetracerjs@1.2.6/imagetracer_v1.2.6.min.js';
        script.async = true; // Non-blocking load
        script.onload = vectorizeImage;
        document.body.appendChild(script);
    } else {
        vectorizeImage();
    }
}

// Vectorize Image
function vectorizeImage() {
    const detail = parseFloat(document.getElementById('detailLevel').value);
    const colorMode = document.getElementById('colorMode').value;
    const scale = parseFloat(document.getElementById('scale').value);

    progressBar.classList.add('active');
    progressText.style.display = 'block';
    loadingSpinner.style.display = 'block';

    let progress = 0;
    function updateProgress() {
        progress += 10;
        progressFill.style.width = `${Math.min(progress, 100)}%`;
        if (progress < 100) {
            requestAnimationFrame(updateProgress);
        }
    }
    requestAnimationFrame(updateProgress);

    const options = {
        ltres: detail,
        qtres: detail,
        scale: scale,
        pathomit: 8,
        pal: colorMode === 'black' ? [{ r: 0, g: 0, b: 0, a: 255 }]
            : colorMode === 'cyberpunk' ? [{ r: 255, g: 0, b: 255, a: 255 }, { r: 0, g: 255, b: 255, a: 255 }]
            : ImageTracer.defaultpalette
    };

    ImageTracer.imageToSVG(
        canvas.toDataURL(),
        (svgstr) => {
            lastSvg = vectorOutput.innerHTML;
            vectorOutput.innerHTML = DOMPurify.sanitize(svgstr);
            progressFill.style.width = '100%';
            setTimeout(() => {
                progressBar.classList.remove('active');
                progressText.style.display = 'none';
                loadingSpinner.style.display = 'none';
                downloadBtn.style.display = 'inline-block';
                undoBtn.style.display = 'inline-block';
                fileSize.textContent += ` | SVG Size: ${(svgstr.length / 1024).toFixed(2)} KB`;
            }, 500);

            downloadBtn.onclick = () => {
                const blob = new Blob([svgstr], { type: 'image/svg+xml' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'vector_output.svg';
                link.click();
            };
        },
        options
    );
}