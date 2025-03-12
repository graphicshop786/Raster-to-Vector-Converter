const fs = require('fs');
const path = require('path');

const toolCategories = {
    'image-tools': [
        'image-to-png.html',
        'image-to-jpg.html',
        'image-resizer.html',
        'image-compressor.html',
        'image-cropper.html',
        'image-to-base64.html',
        'webp-to-png.html',
        'gif-maker.html',
        'qr-code-generator.html',
        'screenshot-to-pdf.html',
        'image-format-converter.html'
    ],
    'seo-tools': [
        'meta-tag-generator.html',
        'keyword-density-checker.html',
        'sitemap-generator.html',
        'robots-txt-generator.html',
        'google-index-checker.html',
        'domain-authority-checker.html',
        'backlink-checker.html',
        'page-speed-checker.html',
        'xml-sitemap-validator.html',
        'mobile-friendly-test.html'
    ],
    'text-tools': [
        'word-counter.html',
        'character-counter.html',
        'case-converter.html',
        'plagiarism-checker.html',
        'grammar-checker.html',
        'text-to-speech.html',
        'speech-to-text.html',
        'url-encoder-decoder.html',
        'fancy-text-generator.html',
        'random-text-generator.html'
    ],
    'developer-tools': [
        'json-formatter.html',
        'html-to-markdown.html',
        'css-minifier.html',
        'js-minifier.html',
        'sql-formatter.html',
        'htaccess-generator.html',
        'markdown-to-html.html',
        'base64-converter.html',
        'javascript-minifier.html'
    ],
    'security-tools': [
        'password-generator.html',
        'ip-lookup.html'
    ],
    'miscellaneous-tools': [
        'color-picker.html',
        'url-encoder.html'
    ]
};

const toolsDir = './tools';

// Create category directories if they don't exist
Object.keys(toolCategories).forEach(category => {
    const categoryPath = path.join(toolsDir, category);
    if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath, { recursive: true });
    }
});

// Move files to their respective categories
Object.entries(toolCategories).forEach(([category, files]) => {
    files.forEach(file => {
        const sourcePath = path.join(toolsDir, file);
        const destPath = path.join(toolsDir, category, file);
        
        if (fs.existsSync(sourcePath)) {
            try {
                fs.renameSync(sourcePath, destPath);
                console.log(`Moved ${file} to ${category}`);
            } catch (err) {
                console.error(`Error moving ${file}: ${err.message}`);
            }
        } else {
            console.log(`File not found: ${file}`);
        }
    });
}); 