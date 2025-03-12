// Function to load footer
async function loadFooter() {
    try {
        // Get the current path and adjust component path accordingly
        const path = window.location.pathname;
        const componentsPath = path.includes('/tools/') ? '../../components/footer.html' : '../components/footer.html';
        const response = await fetch(componentsPath);
        const footerContent = await response.text();
        document.getElementById('footer-placeholder').innerHTML = footerContent;
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Function to initialize social media links
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').classList[1].split('-')[2];
            const url = getSocialMediaUrl(platform);
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
}

// Function to get social media URLs
function getSocialMediaUrl(platform) {
    const urls = {
        'facebook': 'https://facebook.com/your-page',
        'twitter': 'https://twitter.com/your-handle',
        'linkedin': 'https://linkedin.com/company/your-company',
        'github': 'https://github.com/your-username'
    };
    return urls[platform] || null;
}

// Load footer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer class="mt-5">
                <div class="container">
                    <div class="row g-4">
                        <div class="col-lg-4">
                            <h5>About MultiTools</h5>
                            <p>A comprehensive collection of free online tools for developers, designers, and digital professionals.</p>
                        </div>
                        <div class="col-lg-4">
                            <h5>Quick Links</h5>
                            <ul class="footer-links list-unstyled">
                                <li><a href="#image-tools">Image Tools</a></li>
                                <li><a href="#seo-tools">SEO Tools</a></li>
                                <li><a href="#developer-tools">Developer Tools</a></li>
                                <li><a href="#calculators">Calculators</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-4">
                            <h5>Connect With Us</h5>
                            <div class="social-links">
                                <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                                <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
                                <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom text-center mt-4">
                        <p>&copy; ${new Date().getFullYear()} MultiTools. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
    loadFooter();
}); 