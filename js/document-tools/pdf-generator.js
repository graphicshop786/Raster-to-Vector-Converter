// PDF Generator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const generateBtn = document.getElementById('generateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const previewContainer = document.getElementById('previewContainer');
    const fileList = document.getElementById('fileList');

    let files = [];

    // File input change handler
    fileInput.addEventListener('change', handleFiles);

    // Browse button click handler
    browseBtn.addEventListener('click', () => fileInput.click());

    // Generate PDF button click handler
    generateBtn.addEventListener('click', generatePDF);

    // Clear button click handler
    clearBtn.addEventListener('click', clearFiles);

    // Drag and drop handlers
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles({ target: { files: droppedFiles } });
    });

    // Handle selected files
    function handleFiles(e) {
        const newFiles = Array.from(e.target.files);
        
        // Filter unsupported files
        const supportedFiles = newFiles.filter(file => {
            const type = file.type.toLowerCase();
            return type.includes('image') || 
                   type.includes('text') || 
                   type.includes('document') || 
                   type.includes('sheet');
        });

        if (supportedFiles.length === 0) {
            alert('Please select supported file types only.');
            return;
        }

        files = [...files, ...supportedFiles];
        updateFileList();
        updateButtons();
    }

    // Update file list preview
    function updateFileList() {
        if (files.length === 0) {
            previewContainer.style.display = 'none';
            return;
        }

        previewContainer.style.display = 'block';
        fileList.innerHTML = '';

        files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';

            // Determine file icon
            let iconClass = 'fa-file';
            if (file.type.includes('image')) {
                iconClass = 'fa-file-image';
            } else if (file.type.includes('text')) {
                iconClass = 'fa-file-alt';
            } else if (file.type.includes('sheet')) {
                iconClass = 'fa-file-excel';
            } else if (file.type.includes('document')) {
                iconClass = 'fa-file-word';
            }

            fileItem.innerHTML = `
                <i class="fas ${iconClass} text-primary"></i>
                <div class="file-info">
                    <div class="fw-bold">${file.name}</div>
                    <small class="text-muted">${formatFileSize(file.size)}</small>
                </div>
                <div class="file-actions">
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFile(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

            fileList.appendChild(fileItem);
        });
    }

    // Update button states
    function updateButtons() {
        generateBtn.disabled = files.length === 0;
        clearBtn.disabled = files.length === 0;
    }

    // Remove file from list
    window.removeFile = function(index) {
        files.splice(index, 1);
        updateFileList();
        updateButtons();
    };

    // Clear all files
    function clearFiles() {
        files = [];
        updateFileList();
        updateButtons();
        fileInput.value = '';
    }

    // Generate PDF
    async function generatePDF() {
        const pageSize = document.getElementById('pageSize').value;
        const orientation = document.getElementById('orientation').value;
        const margin = parseFloat(document.getElementById('margin').value);
        const quality = parseFloat(document.getElementById('quality').value);

        // Create a container for all content
        const container = document.createElement('div');
        container.style.padding = '20px';

        // Process each file
        for (const file of files) {
            try {
                const content = await processFile(file);
                container.appendChild(content);
            } catch (error) {
                console.error('Error processing file:', error);
                alert(`Error processing file ${file.name}`);
                return;
            }
        }

        // Configure PDF options
        const opt = {
            margin: margin,
            filename: 'generated-document.pdf',
            image: { type: 'jpeg', quality: quality },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: pageSize, orientation: orientation }
        };

        // Generate PDF
        try {
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Generating PDF...';
            
            await html2pdf().from(container).set(opt).save();
            
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-file-pdf me-2"></i>Generate PDF';
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-file-pdf me-2"></i>Generate PDF';
        }
    }

    // Process individual file
    async function processFile(file) {
        const div = document.createElement('div');
        div.style.marginBottom = '20px';
        div.style.pageBreakAfter = 'always';

        if (file.type.includes('image')) {
            // Handle image files
            const img = await createImagePreview(file);
            div.appendChild(img);
        } else {
            // Handle text and document files
            const text = await readFileContent(file);
            div.innerHTML = `<pre style="white-space: pre-wrap;">${text}</pre>`;
        }

        return div;
    }

    // Create image preview
    function createImagePreview(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
            img.style.maxWidth = '100%';
        });
    }

    // Read file content
    function readFileContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}); 