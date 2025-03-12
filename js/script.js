// Function to create tool card HTML
function createToolCard(tool) {
    if (!tool || !tool.title || !tool.description || !tool.icon || !tool.url) {
        console.error('Invalid tool data:', tool);
        return null;
    }

    const col = document.createElement('div');
    col.className = 'col-sm-6 col-lg-4';
    
    col.innerHTML = `
        <a href="${tool.url}" class="card h-100 tool-card">
            <div class="card-body">
                <div class="d-flex align-items-center mb-2">
                    <i class="fas ${tool.icon} fa-2x me-2" aria-hidden="true"></i>
                    <h5 class="card-title mb-0">${tool.title}</h5>
                </div>
                <p class="card-text">${tool.description}</p>
            </div>
        </a>
    `;
    
    return col;
}

// Function to create loading placeholder
function createLoadingPlaceholder() {
    const container = document.createElement('div');
    container.className = 'loading-container';
    container.innerHTML = '<div class="loading-spinner" role="status"><span class="sr-only">Loading...</span></div>';
    return container;
}

// Function to create shimmer placeholders
function createShimmerPlaceholders(count) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
        col.innerHTML = '<div class="placeholder-card" role="status" aria-label="Loading"></div>';
        fragment.appendChild(col);
    }
    return fragment;
}

// Category mapping
const categoryMapping = {
    imageTools: 'image-tools',
    textTools: 'text-tools',
    developerTools: 'developer-tools',
    seoTools: 'seo-tools',
    calculators: 'calculators',
    converters: 'converters',
    securityTools: 'security-tools',
    gameTools: 'game-tools',
    documentTools: 'document-tools',
    utilityTools: 'utility-tools',
    graphicsDesignTools: 'graphics-design-tools'
};

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to load tools into their respective containers
async function loadTools() {
    try {
        // Load tools for each category
        Object.entries(toolsData).forEach(([category, tools]) => {
            // Get the correct container ID from the mapping
            const containerId = `${categoryMapping[category]}-container`;
            const container = document.getElementById(containerId);
            
            if (container && Array.isArray(tools)) {
                // Add shimmer placeholders
                container.appendChild(createShimmerPlaceholders(4));
                
                // Use requestAnimationFrame for smoother loading
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        // Clear placeholders
                        container.innerHTML = '';
                        
                        // Create document fragment for better performance
                        const fragment = document.createDocumentFragment();
                        
                        // Add actual tools
                        tools.forEach(tool => {
                            const toolCard = createToolCard(tool);
                            if (toolCard) {
                                fragment.appendChild(toolCard);
                            }
                        });
                        
                        container.appendChild(fragment);
                    }, 800);
                });
            } else {
                console.warn(`Container not found for category: ${category}`);
            }
        });
    } catch (error) {
        console.error('Error loading tools:', error);
        // Show error message to user
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger';
        errorMessage.role = 'alert';
        errorMessage.textContent = 'Failed to load tools. Please try refreshing the page.';
        document.querySelector('main').prepend(errorMessage);
    }
}

// Function to initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchContainer = document.querySelector('.search-container');

    if (!searchInput || !searchButton || !searchContainer) {
        console.error('Search elements not found');
        return;
    }

    let searchResults;
    const debouncedSearch = debounce(() => performSearch(searchInput.value.trim()), 300);

    const performSearch = (query) => {
        if (!query) {
            if (searchResults) {
                searchResults.remove();
                searchResults = null;
            }
            return;
        }

        try {
            // Get all tools from all categories
            const allTools = Object.values(toolsData).flat();
            const queryLower = query.toLowerCase();

            // Filter tools based on search query
            const results = allTools.filter(tool => 
                tool.title.toLowerCase().includes(queryLower) ||
                tool.description.toLowerCase().includes(queryLower)
            );

            // Display instant search results
            displayInstantResults(results, searchContainer);
        } catch (error) {
            console.error('Error performing search:', error);
        }
    };

    // Add event listeners
    searchInput.addEventListener('input', debouncedSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(searchInput.value.trim());
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (searchResults && !searchContainer.contains(e.target)) {
            searchResults.remove();
            searchResults = null;
        }
    });
}

// Function to display instant search results
function displayInstantResults(results, container) {
    // Remove existing results
    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }

    // Create results container
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';

    if (results.length > 0) {
        results.slice(0, 5).forEach(tool => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.innerHTML = `
                <a href="${tool.url}" class="d-flex align-items-center text-decoration-none text-dark">
                    <i class="fas ${tool.icon} me-3"></i>
                    <div>
                        <h6 class="mb-1">${tool.title}</h6>
                        <small class="text-muted">${tool.description}</small>
                    </div>
                </a>
            `;
            resultsContainer.appendChild(item);
        });

        if (results.length > 5) {
            const moreItem = document.createElement('div');
            moreItem.className = 'search-result-item text-center';
            moreItem.innerHTML = `<small class="text-primary">See all ${results.length} results</small>`;
            moreItem.addEventListener('click', () => displaySearchResults(results));
            resultsContainer.appendChild(moreItem);
        }
    } else {
        resultsContainer.innerHTML = `
            <div class="search-result-item text-center text-muted">
                <i class="fas fa-search me-2"></i>No results found
            </div>
        `;
    }

    container.appendChild(resultsContainer);
    resultsContainer.classList.add('show');
}

// Function to display full search results modal
function displaySearchResults(results) {
    const modalHtml = `
        <div class="modal fade" id="searchResultsModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Search Results</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${results.length > 0 ? `
                            <div class="row g-3">
                                ${results.map(tool => `
                                    <div class="col-md-6">
                                        <a href="${tool.url}" class="text-decoration-none">
                                            <div class="card h-100">
                                                <div class="card-body">
                                                    <h5 class="card-title">
                                                        <i class="fas ${tool.icon} me-2"></i>
                                                        ${tool.title}
                                                    </h5>
                                                    <p class="card-text text-muted">${tool.description}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                `).join('')}
                            </div>
                        ` : `
                            <div class="text-center py-4">
                                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                                <p class="text-muted">No tools found matching your search.</p>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('searchResultsModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add new modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('searchResultsModal'));
    modal.show();
}

// Function to initialize back to top button
function initializeBackToTop() {
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Function to initialize smooth scrolling for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        loadTools();
        initializeSearch();
        initializeBackToTop();
        initializeSmoothScroll();
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}); 