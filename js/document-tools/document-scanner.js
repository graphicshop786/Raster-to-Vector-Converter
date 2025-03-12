// Document Scanner JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const captureBtn = document.getElementById('captureBtn');
    const switchCameraBtn = document.getElementById('switchCamera');
    const torchBtn = document.getElementById('torchBtn');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const scanList = document.getElementById('scanList');

    let stream;
    let currentCamera = 'environment';
    let scannedImages = [];

    // Initialize camera
    async function initCamera() {
        try {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }

            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: currentCamera,
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            });

            video.srcObject = stream;

            // Enable torch button only if torch is available
            const track = stream.getVideoTracks()[0];
            torchBtn.style.display = track.getCapabilities().torch ? 'block' : 'none';

        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Error accessing camera. Please make sure you have granted camera permissions.');
        }
    }

    // Switch camera
    switchCameraBtn.addEventListener('click', () => {
        currentCamera = currentCamera === 'environment' ? 'user' : 'environment';
        initCamera();
    });

    // Toggle torch
    torchBtn.addEventListener('click', async () => {
        try {
            const track = stream.getVideoTracks()[0];
            const capabilities = track.getCapabilities();
            
            if (capabilities.torch) {
                const torchState = !track.getSettings().torch;
                await track.applyConstraints({ advanced: [{ torch: torchState }] });
                torchBtn.classList.toggle('btn-warning', torchState);
            }
        } catch (error) {
            console.error('Error toggling torch:', error);
        }
    });

    // Capture image
    captureBtn.addEventListener('click', () => {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get image data
        const imageData = canvas.toDataURL('image/png');

        // Process image based on settings
        processImage(imageData);
    });

    // Process captured image
    async function processImage(imageData) {
        const enhancement = document.getElementById('enhancement').value;
        const colorMode = document.getElementById('colorMode').value;

        try {
            // Create image element
            const img = new Image();
            img.src = imageData;

            await new Promise((resolve) => {
                img.onload = resolve;
            });

            // Process image with OpenCV when it's ready
            if (typeof cv !== 'undefined') {
                const mat = cv.imread(img);

                // Apply enhancements
                if (enhancement === 'auto' || enhancement === 'high') {
                    // Convert to grayscale for better processing
                    const gray = new cv.Mat();
                    cv.cvtColor(mat, gray, cv.COLOR_RGBA2GRAY);

                    // Apply adaptive threshold for high contrast
                    if (enhancement === 'high') {
                        cv.adaptiveThreshold(gray, gray, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2);
                    }

                    // Apply histogram equalization
                    cv.equalizeHist(gray, gray);

                    // Convert back to color if needed
                    if (colorMode === 'color') {
                        cv.cvtColor(gray, mat, cv.COLOR_GRAY2RGBA);
                    } else {
                        gray.copyTo(mat);
                    }

                    gray.delete();
                }

                // Apply color mode
                if (colorMode === 'grayscale') {
                    cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);
                    cv.cvtColor(mat, mat, cv.COLOR_GRAY2RGBA);
                } else if (colorMode === 'bw') {
                    cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);
                    cv.threshold(mat, mat, 128, 255, cv.THRESH_BINARY);
                    cv.cvtColor(mat, mat, cv.COLOR_GRAY2RGBA);
                }

                // Convert processed image back to canvas
                cv.imshow(canvas, mat);
                mat.delete();
            }

            // Add processed image to scanned images array
            const processedImageData = canvas.toDataURL('image/png');
            addScannedImage(processedImageData);

        } catch (error) {
            console.error('Error processing image:', error);
            // If processing fails, add original image
            addScannedImage(imageData);
        }
    }

    // Add scanned image to preview
    function addScannedImage(imageData) {
        scannedImages.push(imageData);
        updatePreview();
        updateButtons();
    }

    // Update preview container
    function updatePreview() {
        if (scannedImages.length === 0) {
            previewContainer.style.display = 'none';
            return;
        }

        previewContainer.style.display = 'block';
        scanList.innerHTML = '';

        scannedImages.forEach((imageData, index) => {
            const scanItem = document.createElement('div');
            scanItem.className = 'scan-item';
            scanItem.innerHTML = `
                <img src="${imageData}" alt="Scanned document ${index + 1}">
                <div class="scan-item-actions">
                    <button class="btn btn-sm btn-light" onclick="rotateScan(${index})">
                        <i class="fas fa-redo"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="removeScan(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            scanList.appendChild(scanItem);
        });
    }

    // Update button states
    function updateButtons() {
        saveBtn.disabled = scannedImages.length === 0;
        clearBtn.disabled = scannedImages.length === 0;
    }

    // Rotate scanned image
    window.rotateScan = function(index) {
        const img = new Image();
        img.src = scannedImages[index];

        img.onload = () => {
            canvas.width = img.height;
            canvas.height = img.width;
            
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(Math.PI/2);
            ctx.drawImage(img, -img.width/2, -img.height/2);
            
            scannedImages[index] = canvas.toDataURL('image/png');
            updatePreview();
        };
    };

    // Remove scanned image
    window.removeScan = function(index) {
        scannedImages.splice(index, 1);
        updatePreview();
        updateButtons();
    };

    // Clear all scans
    clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all scanned documents?')) {
            scannedImages = [];
            updatePreview();
            updateButtons();
        }
    });

    // Save document
    saveBtn.addEventListener('click', async () => {
        const format = document.getElementById('format').value;

        if (format === 'pdf') {
            // Create PDF
            const container = document.createElement('div');
            scannedImages.forEach(imageData => {
                const img = document.createElement('img');
                img.src = imageData;
                img.style.width = '100%';
                img.style.pageBreakAfter = 'always';
                container.appendChild(img);
            });

            const opt = {
                margin: 0,
                filename: 'scanned-document.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            try {
                saveBtn.disabled = true;
                saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Saving...';
                
                await html2pdf().from(container).set(opt).save();
                
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i class="fas fa-save me-2"></i>Save Document';
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Error saving document. Please try again.');
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i class="fas fa-save me-2"></i>Save Document';
            }
        } else {
            // Save as images
            scannedImages.forEach((imageData, index) => {
                const link = document.createElement('a');
                link.href = imageData;
                link.download = `scanned-document-${index + 1}.${format}`;
                link.click();
            });
        }
    });

    // Handle file upload
    uploadBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    processImage(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });

        fileInput.value = '';
    });

    // Initialize
    initCamera();
}); 