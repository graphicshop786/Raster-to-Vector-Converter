// Document Merger JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const mergeBtn = document.getElementById('mergeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const previewContainer = document.getElementById('previewContainer');
    const fileList = document.getElementById('fileList');

    let files = [];

    // Initialize Sortable for drag and drop reordering
    new Sortable(fileList, {
        animation: 150,
        ghostClass: 'dragging',
        onEnd: function() {
            // Update files array based on new order
            const fileItems = fileList.querySelectorAll('.file-item');
            const newFiles = [];
            fileItems.forEach(item => {
                const index = parseInt(item.dataset.index);
                newFiles.push(files[index]);
            });
            files = newFiles;
        }
    });

    // File input change handler
    fileInput.addEventListener('change', handleFiles);

    // Browse button click handler
    browseBtn.addEventListener('click', () => fileInput.click());

    // Merge button click handler
    mergeBtn.addEventListener('click', mergeDocuments);

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
            const extension = file.name.toLowerCase().split('.').pop();
            return ['pdf', 'doc', 'docx', 'txt'].includes(extension);
        });

        if (supportedFiles.length === 0) {
            alert('Please select supported file types only (PDF, DOC, DOCX, TXT).');
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
            fileItem.dataset.index = index;

            // Determine file icon
            let iconClass = 'fa-file';
            const extension = file.name.toLowerCase().split('.').pop();
            switch (extension) {
                case 'pdf':
                    iconClass = 'fa-file-pdf';
                    break;
                case 'doc':
                case 'docx':
                    iconClass = 'fa-file-word';
                    break;
                case 'txt':
                    iconClass = 'fa-file-alt';
                    break;
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
        mergeBtn.disabled = files.length < 2;
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
        if (confirm('Are you sure you want to clear all files?')) {
            files = [];
            updateFileList();
            updateButtons();
            fileInput.value = '';
        }
    }

    // Merge documents
    async function mergeDocuments() {
        const outputFormat = document.getElementById('outputFormat').value;
        const pageSize = document.getElementById('pageSize').value;
        const orientation = document.getElementById('orientation').value;
        const quality = parseFloat(document.getElementById('quality').value);

        try {
            mergeBtn.disabled = true;
            mergeBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Merging...';

            if (outputFormat === 'pdf') {
                await mergePDF();
            } else if (outputFormat === 'docx') {
                await mergeDOCX();
            } else {
                await mergeTXT();
            }

            mergeBtn.disabled = false;
            mergeBtn.innerHTML = '<i class="fas fa-object-group me-2"></i>Merge Documents';
        } catch (error) {
            console.error('Error merging documents:', error);
            alert('Error merging documents. Please try again.');
            mergeBtn.disabled = false;
            mergeBtn.innerHTML = '<i class="fas fa-object-group me-2"></i>Merge Documents';
        }
    }

    // Merge PDF files
    async function mergePDF() {
        const { PDFDocument } = PDFLib;
        const mergedPdf = await PDFDocument.create();

        for (const file of files) {
            const extension = file.name.toLowerCase().split('.').pop();
            
            if (extension === 'pdf') {
                // Handle PDF files
                const fileArrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(fileArrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach(page => mergedPdf.addPage(page));
            } else {
                // Handle non-PDF files by converting them to PDF
                const text = await readFileAsText(file);
                const page = mergedPdf.addPage();
                const { width, height } = page.getSize();
                page.drawText(text, {
                    x: 50,
                    y: height - 50,
                    size: 12,
                    maxWidth: width - 100
                });
            }
        }

        const mergedPdfBytes = await mergedPdf.save();
        downloadFile(mergedPdfBytes, 'merged-document.pdf', 'application/pdf');
    }

    // Merge DOCX files
    async function mergeDOCX() {
        // Note: This is a simplified version that combines text content
        let mergedContent = '';

        for (const file of files) {
            const text = await readFileAsText(file);
            mergedContent += text + '\n\n';
        }

        const blob = new Blob([mergedContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        downloadFile(blob, 'merged-document.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    }

    // Merge TXT files
    async function mergeTXT() {
        let mergedContent = '';

        for (const file of files) {
            const text = await readFileAsText(file);
            mergedContent += text + '\n\n';
        }

        const blob = new Blob([mergedContent], { type: 'text/plain' });
        downloadFile(blob, 'merged-document.txt', 'text/plain');
    }

    // Read file as text
    function readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    // Download file
    function downloadFile(content, fileName, mimeType) {
        const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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