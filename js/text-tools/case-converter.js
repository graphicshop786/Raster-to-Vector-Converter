document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('caseConverterForm');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const copyButton = document.getElementById('copyButton');
    const clearButton = document.getElementById('clearButton');
    const caseButtons = document.querySelectorAll('[data-case]');

    // Case conversion functions
    const caseConverters = {
        upper: text => text.toUpperCase(),
        lower: text => text.toLowerCase(),
        title: text => text.toLowerCase().split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        sentence: text => text.toLowerCase().replace(
            /(^\w|\.\s+\w)/g, 
            letter => letter.toUpperCase()
        ),
        camel: text => text.toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase()),
        pascal: text => text.toLowerCase()
            .replace(/(^|[^a-zA-Z0-9]+)(.)/g, (match, sep, chr) => chr.toUpperCase())
    };

    // Convert text based on selected case
    function convertText(caseType) {
        const text = inputText.value;
        if (!text) return;

        const converter = caseConverters[caseType];
        if (converter) {
            outputText.value = converter(text);
            showToast('Text converted successfully!');
        }
    }

    // Add click handlers for case conversion buttons
    caseButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            caseButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Convert text
            convertText(button.dataset.case);
        });
    });

    // Copy to clipboard functionality
    copyButton.addEventListener('click', () => {
        if (!outputText.value) {
            showToast('No text to copy!', 'warning');
            return;
        }

        outputText.select();
        try {
            document.execCommand('copy');
            showToast('Text copied to clipboard!');
        } catch (err) {
            showToast('Failed to copy text!', 'error');
        }
    });

    // Clear functionality
    clearButton.addEventListener('click', () => {
        inputText.value = '';
        outputText.value = '';
        // Remove active class from all buttons
        caseButtons.forEach(btn => btn.classList.remove('active'));
        showToast('Text cleared!');
    });

    // Show toast message
    function showToast(message, type = 'success') {
        // Create toast container if it doesn't exist
        let toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toastContainer';
            toastContainer.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
            `;
            document.body.appendChild(toastContainer);
        }

        // Create toast
        const toast = document.createElement('div');
        toast.className = `alert alert-${type}`;
        toast.style.marginTop = '10px';
        toast.textContent = message;

        // Add toast to container
        toastContainer.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Real-time conversion if output already exists
    inputText.addEventListener('input', () => {
        const activeButton = document.querySelector('[data-case].active');
        if (activeButton && outputText.value) {
            convertText(activeButton.dataset.case);
        }
    });
}); 