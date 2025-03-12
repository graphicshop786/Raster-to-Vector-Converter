const toolsData = {
    imageTools: [
        {
            title: "QR Code Scanner",
            description: "Scan QR codes using camera or uploaded images",
            icon: "fa-qrcode",
            url: "tools/image-tools/qr-code-scanner.html"
        },
        {
            title: "Image Resizer",
            description: "Resize images to specific dimensions",
            icon: "fa-expand",
            url: "tools/image-tools/image-resizer.html"
        },
        {
            title: "Image Format Converter",
            description: "Convert images between different formats",
            icon: "fa-image",
            url: "tools/image-tools/image-format-converter.html"
        },
        {
            title: "Image Cropper",
            description: "Crop and edit images online",
            icon: "fa-crop",
            url: "tools/image-tools/image-cropper.html"
        },
        {
            title: "Image to Base64",
            description: "Convert images to Base64 format",
            icon: "fa-code",
            url: "tools/image-tools/image-to-base64.html"
        },
        {
            title: "WebP to PNG",
            description: "Convert WebP images to PNG format",
            icon: "fa-file-image",
            url: "tools/image-tools/webp-to-png.html"
        },
        {
            title: "QR Code Generator",
            description: "Create QR codes from text or URLs",
            icon: "fa-qrcode",
            url: "tools/image-tools/qr-code-generator.html"
        },
        {
            title: "Screenshot to PDF",
            description: "Convert screenshots to PDF format",
            icon: "fa-file-pdf",
            url: "tools/image-tools/screenshot-to-pdf.html"
        },
        {
            title: "GIF Maker",
            description: "Create animated GIFs from images",
            icon: "fa-film",
            url: "tools/image-tools/gif-maker.html"
        },
        {
            title: "Image Compressor",
            description: "Compress images without losing quality",
            icon: "fa-compress",
            url: "tools/image-tools/image-compressor.html"
        },
        {
            title: "Meme Generator",
            description: "Create custom memes online",
            icon: "fa-laugh",
            url: "tools/image-tools/meme-generator.html"
        }
    ],
    textTools: [
        {
            title: "Word Counter",
            description: "Count words, characters and paragraphs",
            icon: "fa-calculator",
            url: "tools/text-tools/word-counter.html"
        },
        {
            title: "Character Counter",
            description: "Count characters with and without spaces",
            icon: "fa-text-width",
            url: "tools/text-tools/character-counter.html"
        },
        {
            title: "Plagiarism Checker",
            description: "Check text for potential plagiarism",
            icon: "fa-check-double",
            url: "tools/text-tools/plagiarism-checker.html"
        },
        {
            title: "Grammar Checker",
            description: "Check text for grammar and spelling errors",
            icon: "fa-spell-check",
            url: "tools/text-tools/grammar-checker.html"
        },
        {
            title: "Speech to Text",
            description: "Convert speech to text",
            icon: "fa-microphone",
            url: "tools/text-tools/speech-to-text.html"
        },
        {
            title: "URL Encoder/Decoder",
            description: "Encode and decode URLs",
            icon: "fa-link",
            url: "tools/text-tools/url-encoder-decoder.html"
        },
        {
            title: "Fancy Text Generator",
            description: "Create stylized text for social media",
            icon: "fa-magic",
            url: "tools/text-tools/fancy-text-generator.html"
        },
        {
            title: "Random Text Generator",
            description: "Generate random text for testing",
            icon: "fa-random",
            url: "tools/text-tools/random-text-generator.html"
        },
        {
            title: "Text to Speech",
            description: "Convert text to natural speech",
            icon: "fa-volume-up",
            url: "tools/text-tools/text-to-speech.html"
        },
        {
            title: "Case Converter",
            description: "Convert text between different cases",
            icon: "fa-font",
            url: "tools/text-tools/case-converter.html"
        }
    ],
    developerTools: [
        {
            title: "JSON Formatter",
            description: "Format and validate JSON data",
            icon: "fa-code",
            url: "tools/developer-tools/json-formatter.html"
        },
        {
            title: "HTML to Markdown",
            description: "Convert HTML to Markdown format",
            icon: "fa-file-code",
            url: "tools/developer-tools/html-to-markdown.html"
        },
        {
            title: "CSS Minifier",
            description: "Minify CSS code",
            icon: "fa-file-code",
            url: "tools/developer-tools/css-minifier.html"
        },
        {
            title: "JavaScript Minifier",
            description: "Minify JavaScript code",
            icon: "fa-js",
            url: "tools/developer-tools/javascript-minifier.html"
        },
        {
            title: "SQL Formatter",
            description: "Format and beautify SQL queries",
            icon: "fa-database",
            url: "tools/developer-tools/sql-formatter.html"
        },
        {
            title: "HTAccess Generator",
            description: "Generate .htaccess rules",
            icon: "fa-cog",
            url: "tools/developer-tools/htaccess-generator.html"
        },
        {
            title: "Markdown to HTML",
            description: "Convert Markdown to HTML",
            icon: "fa-file-code",
            url: "tools/developer-tools/markdown-to-html.html"
        },
        {
            title: "Base64 Converter",
            description: "Encode and decode Base64",
            icon: "fa-exchange-alt",
            url: "tools/developer-tools/base64-converter.html"
        },
        {
            title: "IP Lookup",
            description: "Get detailed information about an IP address",
            icon: "fa-search",
            url: "tools/developer-tools/ip-lookup.html"
        }
    ],
    seoTools: [
        {
            title: "Meta Tag Generator",
            description: "Generate meta tags for better SEO",
            icon: "fa-tags",
            url: "tools/seo-tools/meta-tag-generator.html"
        },
        {
            title: "Keyword Density Checker",
            description: "Check keyword density in content",
            icon: "fa-percentage",
            url: "tools/seo-tools/keyword-density-checker.html"
        },
        {
            title: "Sitemap Generator",
            description: "Generate XML sitemaps",
            icon: "fa-sitemap",
            url: "tools/seo-tools/sitemap-generator.html"
        },
        {
            title: "Robots.txt Generator",
            description: "Create robots.txt files",
            icon: "fa-robot",
            url: "tools/seo-tools/robots-txt-generator.html"
        },
        {
            title: "Google Index Checker",
            description: "Check if pages are indexed by Google",
            icon: "fa-search",
            url: "tools/seo-tools/google-index-checker.html"
        },
        {
            title: "Domain Authority Checker",
            description: "Check domain authority score",
            icon: "fa-chart-line",
            url: "tools/seo-tools/domain-authority-checker.html"
        },
        {
            title: "Backlink Checker",
            description: "Analyze website backlinks",
            icon: "fa-link",
            url: "tools/seo-tools/backlink-checker.html"
        },
        {
            title: "Page Speed Checker",
            description: "Test website loading speed",
            icon: "fa-tachometer-alt",
            url: "tools/seo-tools/page-speed-checker.html"
        },
        {
            title: "XML Sitemap Validator",
            description: "Validate XML sitemaps",
            icon: "fa-check-circle",
            url: "tools/seo-tools/xml-sitemap-validator.html"
        },
        {
            title: "Mobile Friendly Test",
            description: "Test mobile compatibility",
            icon: "fa-mobile-alt",
            url: "tools/seo-tools/mobile-friendly-test.html"
        }
    ],
    calculators: [
        {
            title: "Scientific Calculator",
            description: "Complex mathematical calculations",
            icon: "fa-calculator",
            url: "tools/calculators/scientific-calculator.html"
        },
        {
            title: "Percentage Calculator",
            description: "Calculate percentages and discounts",
            icon: "fa-percent",
            url: "tools/calculators/percentage-calculator.html"
        },
        {
            title: "Age Calculator",
            description: "Calculate age between dates",
            icon: "fa-calendar-alt",
            url: "tools/calculators/age-calculator.html"
        },
        {
            title: "BMI Calculator",
            description: "Calculate Body Mass Index",
            icon: "fa-weight",
            url: "tools/calculators/bmi-calculator.html"
        },
        {
            title: "Loan EMI Calculator",
            description: "Calculate loan EMI payments",
            icon: "fa-money-bill-wave",
            url: "tools/calculators/loan-emi-calculator.html"
        },
        {
            title: "Discount Calculator",
            description: "Calculate discounts and savings",
            icon: "fa-tags",
            url: "tools/calculators/discount-calculator.html"
        },
        {
            title: "Currency Converter",
            description: "Convert between currencies",
            icon: "fa-money-bill-alt",
            url: "tools/calculators/currency-converter.html"
        },
        {
            title: "Timezone Converter",
            description: "Convert between timezones",
            icon: "fa-clock",
            url: "tools/calculators/timezone-converter.html"
        },
        {
            title: "Binary Decimal Converter",
            description: "Convert between binary and decimal",
            icon: "fa-binary",
            url: "tools/calculators/binary-decimal-converter.html"
        },
        {
            title: "Tip Calculator",
            description: "Calculate tips and split bills",
            icon: "fa-receipt",
            url: "tools/calculators/tip-calculator.html"
        }
    ],
    converters: [
        {
            title: "Length Converter",
            description: "Convert between length units",
            icon: "fa-ruler",
            url: "tools/converters/length-converter.html"
        },
        {
            title: "Weight Converter",
            description: "Convert between weight units",
            icon: "fa-weight",
            url: "tools/converters/weight-converter.html"
        },
        {
            title: "Temperature Converter",
            description: "Convert between temperature units",
            icon: "fa-thermometer-half",
            url: "tools/converters/temperature-converter.html"
        },
        {
            title: "Volume Converter",
            description: "Convert between volume units",
            icon: "fa-flask",
            url: "tools/converters/volume-converter.html"
        },
        {
            title: "Data Storage Converter",
            description: "Convert between data storage units",
            icon: "fa-database",
            url: "tools/converters/data-storage-converter.html"
        },
        {
            title: "Energy Converter",
            description: "Convert between energy units",
            icon: "fa-bolt",
            url: "tools/converters/energy-converter.html"
        },
        {
            title: "Pressure Converter",
            description: "Convert between pressure units",
            icon: "fa-tachometer-alt",
            url: "tools/converters/pressure-converter.html"
        },
        {
            title: "Fuel Efficiency Converter",
            description: "Convert between fuel efficiency units",
            icon: "fa-gas-pump",
            url: "tools/converters/fuel-efficiency-converter.html"
        },
        {
            title: "Angle Converter",
            description: "Convert between angle units",
            icon: "fa-circle-notch",
            url: "tools/converters/angle-converter.html"
        },
        {
            title: "Speed Converter",
            description: "Convert between speed units",
            icon: "fa-tachometer-alt",
            url: "tools/converters/speed-converter.html"
        }
    ],
    securityTools: [
        {
            title: "Password Generator",
            description: "Generate secure passwords",
            icon: "fa-key",
            url: "tools/security-tools/password-generator.html"
        },
        {
            title: "Hash Generator",
            description: "Generate various hash values",
            icon: "fa-hashtag",
            url: "tools/security-tools/hash-generator.html"
        },
        {
            title: "Encryption Tool",
            description: "Encrypt and decrypt text",
            icon: "fa-lock",
            url: "tools/security-tools/encryption-tool.html"
        },
        {
            title: "Random String Generator",
            description: "Generate random strings",
            icon: "fa-random",
            url: "tools/security-tools/random-string-generator.html"
        },
        {
            title: "IP Geolocation",
            description: "Get location from IP address",
            icon: "fa-map-marker-alt",
            url: "tools/security-tools/ip-geolocation.html"
        },
        {
            title: "MD5 Generator",
            description: "Generate MD5 hashes",
            icon: "fa-fingerprint",
            url: "tools/security-tools/md5-generator.html"
        },
        {
            title: "SHA256 Generator",
            description: "Generate SHA256 hashes",
            icon: "fa-fingerprint",
            url: "tools/security-tools/sha256-generator.html"
        },
        {
            title: "URL Shortener",
            description: "Create short URLs",
            icon: "fa-link",
            url: "tools/security-tools/url-shortener.html"
        },
        {
            title: "WHOIS Lookup",
            description: "Domain WHOIS information",
            icon: "fa-search",
            url: "tools/security-tools/whois-lookup.html"
        },
        {
            title: "HTTP Headers",
            description: "Check HTTP security headers",
            icon: "fa-shield-alt",
            url: "tools/security-tools/http-headers.html"
        },
        {
            title: "Privacy Policy Generator",
            description: "Generate privacy policies",
            icon: "fa-file-alt",
            url: "tools/security-tools/privacy-policy-generator.html"
        },
        {
            title: "SSL Checker",
            description: "Check SSL certificate status",
            icon: "fa-lock",
            url: "tools/security-tools/ssl-checker.html"
        },
        {
            title: "IP Lookup",
            description: "Get IP address information",
            icon: "fa-search",
            url: "tools/security-tools/ip-lookup.html"
        }
    ],
    gameTools: [
        {
            title: "Lottery Generator",
            description: "Generate random lottery numbers",
            icon: "fa-ticket-alt",
            url: "tools/game-tools/lottery-generator.html"
        },
        {
            title: "Random Name Generator",
            description: "Generate character names for games and stories",
            icon: "fa-user-tag",
            url: "tools/game-tools/random-name-generator.html"
        },
        {
            title: "Dice Roller",
            description: "Roll virtual dice for tabletop games and RPGs",
            icon: "fa-dice",
            url: "tools/game-tools/dice-roller.html"
        }
    ],
    documentTools: [
        {
            title: "Text Editor",
            description: "Simple online text editor with formatting options",
            icon: "fa-edit",
            url: "tools/document-tools/text-editor.html"
        },
        {
            title: "Online Document Viewer",
            description: "View various document formats online",
            icon: "fa-file-alt",
            url: "tools/document-tools/document-viewer.html"
        },
        {
            title: "Markdown Editor",
            description: "Create and preview Markdown documents",
            icon: "fa-markdown",
            url: "tools/document-tools/markdown-editor.html"
        },
        {
            title: "Resume Builder",
            description: "Create professional resumes easily",
            icon: "fa-file-user",
            url: "tools/document-tools/resume-builder.html"
        },
        {
            title: "Invoice Generator",
            description: "Generate professional invoices",
            icon: "fa-file-invoice-dollar",
            url: "tools/document-tools/invoice-generator.html"
        },
        {
            title: "Note-Taking App",
            description: "Take and organize notes online",
            icon: "fa-sticky-note",
            url: "tools/document-tools/note-taking.html"
        },
        {
            title: "PDF Generator",
            description: "Convert documents to PDF format",
            icon: "fa-file-pdf",
            url: "tools/document-tools/pdf-generator.html"
        },
        {
            title: "Online Form Filler",
            description: "Fill PDF forms online",
            icon: "fa-wpforms",
            url: "tools/document-tools/form-filler.html"
        },
        {
            title: "Collaborative Document Editor",
            description: "Edit documents with others in real-time",
            icon: "fa-users",
            url: "tools/document-tools/collaborative-editor.html"
        },
        {
            title: "Word Counter Tool",
            description: "Count words, characters, and paragraphs",
            icon: "fa-calculator",
            url: "tools/document-tools/word-counter.html"
        },
        {
            title: "Document Merger",
            description: "Combine multiple documents into a single file",
            icon: "fa-object-group",
            url: "tools/document-tools/document-merger.html"
        }
    ],
    utilityTools: [
        {
            title: "Barcode Generator",
            description: "Generate various types of barcodes",
            icon: "fa-barcode",
            url: "tools/utility-tools/barcode-generator.html"
        },
        {
            title: "Color Picker",
            description: "Select colors and get color codes",
            icon: "fa-palette",
            url: "tools/utility-tools/color-picker.html"
        }
    ],
    graphicsDesignTools: [
        {
            title: "Logo Maker",
            description: "Create professional logos with customizable templates",
            icon: "fa-pen-fancy",
            url: "tools/graphics-design-tools/logo-maker.html"
        },
        {
            title: "Color Palette Generator",
            description: "Generate beautiful color schemes and palettes",
            icon: "fa-palette",
            url: "tools/graphics-design-tools/color-palette-generator.html"
        },
        {
            title: "Image Crop & Resize",
            description: "Crop and resize images with precision",
            icon: "fa-crop",
            url: "tools/graphics-design-tools/image-crop-resize.html"
        },
        {
            title: "Font Preview",
            description: "Preview and compare different fonts",
            icon: "fa-font",
            url: "tools/graphics-design-tools/font-preview.html"
        },
        {
            title: "Photo Editor",
            description: "Edit photos with filters and effects",
            icon: "fa-image",
            url: "tools/graphics-design-tools/photo-editor.html"
        },
        {
            title: "Icon Maker",
            description: "Create custom icons for your projects",
            icon: "fa-icons",
            url: "tools/graphics-design-tools/icon-maker.html"
        },
        {
            title: "Poster Maker",
            description: "Design stunning posters online",
            icon: "fa-file-image",
            url: "tools/graphics-design-tools/poster-maker.html"
        }
    ]
}; 