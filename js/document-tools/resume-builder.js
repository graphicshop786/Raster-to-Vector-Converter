// Resume Builder JavaScript

// Modern template generation
function generateModernTemplate(formData) {
    return `
        <div class="modern-resume p-4">
            <!-- Header -->
            <div class="text-center mb-4">
                <h1 class="display-4 mb-3">${formData.get('fullName') || 'Your Name'}</h1>
                <p class="lead">
                    ${formData.get('email') || 'email@example.com'} | 
                    ${formData.get('phone') || 'Phone'} | 
                    ${formData.get('location') || 'Location'}
                </p>
            </div>

            <!-- Professional Summary -->
            ${formData.get('summary') ? `
                <div class="mb-4">
                    <h2 class="h4 text-primary border-bottom pb-2">Professional Summary</h2>
                    <p>${formData.get('summary')}</p>
                </div>
            ` : ''}

            <!-- Work Experience -->
            ${generateExperienceSection(formData, 'modern')}

            <!-- Education -->
            ${generateEducationSection(formData, 'modern')}

            <!-- Skills -->
            ${generateSkillsSection(formData, 'modern')}
        </div>
    `;
}

// Classic template generation
function generateClassicTemplate(formData) {
    return `
        <div class="classic-resume p-4">
            <!-- Header -->
            <div class="mb-4">
                <h1 class="h2 mb-2">${formData.get('fullName') || 'Your Name'}</h1>
                <p>
                    ${formData.get('email') || 'email@example.com'} | 
                    ${formData.get('phone') || 'Phone'} | 
                    ${formData.get('location') || 'Location'}
                </p>
            </div>

            <!-- Professional Summary -->
            ${formData.get('summary') ? `
                <div class="mb-4">
                    <h2 class="h5 text-uppercase mb-3">Professional Summary</h2>
                    <p>${formData.get('summary')}</p>
                </div>
            ` : ''}

            <!-- Work Experience -->
            ${generateExperienceSection(formData, 'classic')}

            <!-- Education -->
            ${generateEducationSection(formData, 'classic')}

            <!-- Skills -->
            ${generateSkillsSection(formData, 'classic')}
        </div>
    `;
}

// Generate experience section
function generateExperienceSection(formData, template) {
    const companies = formData.getAll('company[]');
    const positions = formData.getAll('position[]');
    const startDates = formData.getAll('exp-start[]');
    const endDates = formData.getAll('exp-end[]');
    const descriptions = formData.getAll('exp-description[]');

    if (companies.length === 0) return '';

    const isModern = template === 'modern';
    let html = `
        <div class="mb-4">
            <h2 class="${isModern ? 'h4 text-primary border-bottom pb-2' : 'h5 text-uppercase mb-3'}">
                Work Experience
            </h2>
    `;

    for (let i = 0; i < companies.length; i++) {
        html += `
            <div class="mb-3">
                <div class="${isModern ? 'd-flex justify-content-between align-items-start' : ''}">
                    <div>
                        <h3 class="${isModern ? 'h5 mb-1' : 'h6 mb-1'}">${positions[i]}</h3>
                        <p class="mb-1"><strong>${companies[i]}</strong></p>
                    </div>
                    <div class="${isModern ? 'text-end' : ''}">
                        <p class="mb-1">
                            ${formatDate(startDates[i])} - ${endDates[i] ? formatDate(endDates[i]) : 'Present'}
                        </p>
                    </div>
                </div>
                <p class="mb-0">${descriptions[i]}</p>
            </div>
        `;
    }

    html += '</div>';
    return html;
}

// Generate education section
function generateEducationSection(formData, template) {
    const schools = formData.getAll('school[]');
    const degrees = formData.getAll('degree[]');
    const startDates = formData.getAll('edu-start[]');
    const endDates = formData.getAll('edu-end[]');

    if (schools.length === 0) return '';

    const isModern = template === 'modern';
    let html = `
        <div class="mb-4">
            <h2 class="${isModern ? 'h4 text-primary border-bottom pb-2' : 'h5 text-uppercase mb-3'}">
                Education
            </h2>
    `;

    for (let i = 0; i < schools.length; i++) {
        html += `
            <div class="mb-3">
                <div class="${isModern ? 'd-flex justify-content-between align-items-start' : ''}">
                    <div>
                        <h3 class="${isModern ? 'h5 mb-1' : 'h6 mb-1'}">${degrees[i]}</h3>
                        <p class="mb-1"><strong>${schools[i]}</strong></p>
                    </div>
                    <div class="${isModern ? 'text-end' : ''}">
                        <p class="mb-1">
                            ${formatDate(startDates[i])} - ${endDates[i] ? formatDate(endDates[i]) : 'Present'}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    html += '</div>';
    return html;
}

// Generate skills section
function generateSkillsSection(formData, template) {
    const skills = formData.getAll('skill[]');
    const levels = formData.getAll('skill-level[]');

    if (skills.length === 0) return '';

    const isModern = template === 'modern';
    let html = `
        <div class="mb-4">
            <h2 class="${isModern ? 'h4 text-primary border-bottom pb-2' : 'h5 text-uppercase mb-3'}">
                Skills
            </h2>
            <div class="row g-3">
    `;

    for (let i = 0; i < skills.length; i++) {
        html += `
            <div class="col-md-6">
                <div class="d-flex justify-content-between align-items-center">
                    <span>${skills[i]}</span>
                    <span class="badge ${isModern ? 'bg-primary' : 'bg-secondary'}">${levels[i]}</span>
                </div>
            </div>
        `;
    }

    html += '</div></div>';
    return html;
}

// Format date from YYYY-MM to Month YYYY
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// Export functions for use in main script
window.generateModernTemplate = generateModernTemplate;
window.generateClassicTemplate = generateClassicTemplate; 