// Document Converter JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');
    const previewContainer = document.getElementById('previewContainer');
    const fileList = document.getElementById('fileList');
    const formatOptions = document.querySelectorAll('.format-option');

    let files = [];
    let selectedFormat = '';

    // Format option click handler
    formatOptions.forEach(option => {
        option.addEventListener('click', () => {
            formatOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedFormat = option.dataset.format;
            updateButtons();
        });
    });

    // File input change handler
    fileInput.addEventListener('change', handleFiles);

    // Browse button click handler
    browseBtn.addEventListener('click', () => fileInput.click());

    // Convert button click handler
    convertBtn.addEventListener('click', convertDocuments);

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
            return ['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension);
        });

        if (supportedFiles.length === 0) {
            alert('Please select supported file types only (PDF, DOC, DOCX, TXT, RTF).');
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
                case 'rtf':
                    iconClass = 'fa-file-word';
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
        convertBtn.disabled = files.length === 0 || !selectedFormat;
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

    // Convert documents
    async function convertDocuments() {
        const pageSize = document.getElementById('pageSize').value;
        const quality = document.getElementById('quality').value;
        const font = document.getElementById('font').value;
        const fontSize = document.getElementById('fontSize').value;

        try {
            convertBtn.disabled = true;
            convertBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Converting...';

            for (const file of files) {
                const extension = file.name.toLowerCase().split('.').pop();
                const baseName = file.name.substring(0, file.name.lastIndexOf('.'));

                if (extension === selectedFormat) {
                    // Skip files that are already in the target format
                    continue;
                }

                try {
                    if (selectedFormat === 'pdf') {
                        await convertToPDF(file, baseName);
                    } else if (selectedFormat === 'docx') {
                        await convertToDOCX(file, baseName);
                    } else if (selectedFormat === 'txt') {
                        await convertToTXT(file, baseName);
                    } else if (selectedFormat === 'rtf') {
                        await convertToRTF(file, baseName);
                    }
                } catch (error) {
                    console.error(`Error converting file ${file.name}:`, error);
                    alert(`Error converting file ${file.name}. Please try again.`);
                }
            }

            convertBtn.disabled = false;
            convertBtn.innerHTML = '<i class="fas fa-sync-alt me-2"></i>Convert Documents';
        } catch (error) {
            console.error('Error converting documents:', error);
            alert('Error converting documents. Please try again.');
            convertBtn.disabled = false;
            convertBtn.innerHTML = '<i class="fas fa-sync-alt me-2"></i>Convert Documents';
        }
    }

    // Convert to PDF
    async function convertToPDF(file, baseName) {
        const { PDFDocument, rgb } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        // Read file content
        const content = await readFileAsText(file);

        // Add content to PDF
        page.drawText(content, {
            x: 50,
            y: height - 50,
            size: parseInt(document.getElementById('fontSize').value),
            color: rgb(0, 0, 0)
        });

        const pdfBytes = await pdfDoc.save();
        downloadFile(pdfBytes, `${baseName}.pdf`, 'application/pdf');
    }

    // Convert to DOCX
    async function convertToDOCX(file, baseName) {
        // Note: This is a simplified version that creates a basic DOCX
        const content = await readFileAsText(file);
        const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        downloadFile(blob, `${baseName}.docx`, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    }

    // Convert to TXT
    async function convertToTXT(file, baseName) {
        const content = await readFileAsText(file);
        const blob = new Blob([content], { type: 'text/plain' });
        downloadFile(blob, `${baseName}.txt`, 'text/plain');
    }

    // Convert to RTF
    async function convertToRTF(file, baseName) {
        // Note: This is a simplified version that creates a basic RTF
        const content = await readFileAsText(file);
        const rtfHeader = '{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Times New Roman;}}\\f0\\fs24 ';
        const rtfContent = content.replace(/\n/g, '\\par ');
        const rtfFooter = '}';
        const rtf = rtfHeader + rtfContent + rtfFooter;
        const blob = new Blob([rtf], { type: 'application/rtf' });
        downloadFile(blob, `${baseName}.rtf`, 'application/rtf');
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