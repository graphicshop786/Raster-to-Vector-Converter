document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('imageConverterForm');
    const imageInput = document.getElementById('imageInput');
    const formatSelect = document.getElementById('formatSelect');
    const qualityRange = document.getElementById('qualityRange');
    const qualityValue = document.getElementById('qualityValue');
    const result = document.getElementById('result');
    const convertedImage = document.getElementById('convertedImage');
    const downloadLink = document.getElementById('downloadLink');

    // Update quality value display
    qualityRange.addEventListener('input', function() {
        qualityValue.textContent = this.value;
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const file = imageInput.files[0];
        if (!file) {
            alert('Please select an image file');
            return;
        }

        try {
            // Show loading state
            form.querySelector('button[type="submit"]').disabled = true;
            form.querySelector('button[type="submit"]').innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Converting...';

            // Create canvas and load image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = function() {
                // Set canvas dimensions to image dimensions
                canvas.width = img.width;
                canvas.height = img.height;
                
                // Draw image on canvas
                ctx.drawImage(img, 0, 0);
                
                // Convert to desired format
                const quality = qualityRange.value / 100;
                const format = formatSelect.value;
                let mimeType;
                
                switch(format) {
                    case 'png':
                        mimeType = 'image/png';
                        break;
                    case 'jpeg':
                        mimeType = 'image/jpeg';
                        break;
                    case 'webp':
                        mimeType = 'image/webp';
                        break;
                    case 'gif':
                        mimeType = 'image/gif';
                        break;
                    default:
                        mimeType = 'image/png';
                }
                
                // Get converted image data
                const convertedImageData = canvas.toDataURL(mimeType, quality);
                
                // Display converted image
                convertedImage.src = convertedImageData;
                downloadLink.href = convertedImageData;
                downloadLink.download = `converted_image.${format}`;
                
                // Show result
                result.style.display = 'block';
                
                // Reset form state
                form.querySelector('button[type="submit"]').disabled = false;
                form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-sync-alt me-2"></i>Convert Image';
            };
            
            // Handle image load error
            img.onerror = function() {
                alert('Error loading image. Please try another file.');
                form.querySelector('button[type="submit"]').disabled = false;
                form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-sync-alt me-2"></i>Convert Image';
            };
            
            // Load image from file
            img.src = URL.createObjectURL(file);
            
        } catch (error) {
            console.error('Error converting image:', error);
            alert('Error converting image. Please try again.');
            form.querySelector('button[type="submit"]').disabled = false;
            form.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-sync-alt me-2"></i>Convert Image';
        }
    });
}); 