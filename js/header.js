// Function to load header
async function loadHeader() {
    try {
        // Get the current path and adjust component path accordingly
        const path = window.location.pathname;
        const componentsPath = path.includes('/tools/') ? '../../components/header.html' : '../components/header.html';
        const response = await fetch(componentsPath);
        const headerContent = await response.text();
        document.getElementById('header-placeholder').innerHTML = headerContent;

        // Initialize search functionality
        initializeHeaderSearch();
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Function to initialize header search
function initializeHeaderSearch() {
    const headerSearchForm = document.querySelector('form.d-flex');
    const headerSearchInput = document.getElementById('header-search');

    if (headerSearchForm && headerSearchInput) {
        headerSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchQuery = headerSearchInput.value.trim();
            if (searchQuery) {
                performSearch(searchQuery);
            }
        });
    }
}

// Function to perform search
function performSearch(query) {
    // Convert query to lowercase for case-insensitive search
    query = query.toLowerCase();

    // Get all tools from all categories
    const allTools = Object.values(toolsData).flat();

    // Filter tools based on search query
    const searchResults = allTools.filter(tool => 
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
    );

    // Display search results
    displaySearchResults(searchResults);
}

// Function to display search results
function displaySearchResults(results) {
    // Create a modal to display results
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
                                                        ${tool.name}
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

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <header>
                <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="container">
                        <a class="navbar-brand" href="index.html">MultiTools</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav me-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="#image-tools">Image Tools</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#seo-tools">SEO Tools</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#developer-tools">Developer Tools</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#calculators">Calculators</a>
                                </li>
                            </ul>
                            <form class="d-flex">
                                <input class="form-control me-2" type="search" id="header-search" placeholder="Search tools..." aria-label="Search">
                                <button class="btn btn-outline-primary" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
        `;
        
        // Initialize header search after adding the header
        initializeHeaderSearch();
    }
    loadHeader();
}); 