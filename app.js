// Load all data from Supabase
async function loadPortfolioData() {
    try {
        await Promise.all([
            loadKeywords(),
            loadServices(),
            loadSkills(),
            loadEducation(),
            loadAchievements()
        ]);
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

// Load keywords for hero description and rotation
let keywordsData = [];
let currentKeywordIndex = 0;

async function loadKeywords() {
    const { data, error } = await supabase
        .from('keywords')
        .select('*')
        .order('order_index');
    
    if (error) {
        console.error('Error loading keywords:', error);
        return;
    }
    
    if (data && data.length > 0) {
        keywordsData = data.map(k => k.keyword);
        const keywords = keywordsData.join(', ');
        document.getElementById('hero-description').textContent = 
            `Passionate about creating innovative digital solutions. Specializing in ${keywords} to bring ideas to life.`;
        
        // Start rotating keywords
        rotateKeywords();
    }
}

function rotateKeywords() {
    if (keywordsData.length === 0) return;
    
    const keywordElement = document.getElementById('rotating-keyword');
    let charIndex = 0;
    
    function typeWriter() {
        const currentWord = keywordsData[currentKeywordIndex];
        
        if (charIndex < currentWord.length) {
            keywordElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                charIndex = 0;
                currentKeywordIndex = (currentKeywordIndex + 1) % keywordsData.length;
                keywordElement.textContent = '';
                typeWriter();
            }, 2000);
        }
    }
    
    typeWriter();
}

// Load services
async function loadServices() {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index');
    
    if (error) {
        console.error('Error loading services:', error);
        return;
    }
    
    const grid = document.getElementById('services-grid');
    grid.innerHTML = '';
    
    data.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-icon">${service.icon || '🔧'}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        grid.appendChild(card);
    });
}

// Load skills
async function loadSkills() {
    const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('order_index');
    
    if (error) {
        console.error('Error loading skills:', error);
        return;
    }
    
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = '';
    
    data.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `
            <div class="skill-icon">${skill.icon || '⚡'}</div>
            <h3>${skill.name}</h3>
        `;
        grid.appendChild(card);
    });
}

// Load education
async function loadEducation() {
    const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('start_year', { ascending: false });
    
    if (error) {
        console.error('Error loading education:', error);
        return;
    }
    
    const grid = document.getElementById('education-grid');
    grid.innerHTML = '';
    
    data.forEach(edu => {
        const card = document.createElement('div');
        card.className = 'education-card';
        const dateRange = edu.end_year ? `${edu.start_year} - ${edu.end_year}` : `${edu.start_year} - Present`;
        card.innerHTML = `
            <div class="education-icon">🎓</div>
            <div class="education-info">
                <div class="education-header">
                    <h3>${edu.degree}</h3>
                    <span class="education-status">${edu.status}</span>
                </div>
                <p class="education-institution">${edu.institution}</p>
                <p class="education-date">📅 ${dateRange}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Load achievements (internships and certificates)
async function loadAchievements() {
    // Load internships
    const { data: internships, error: intError } = await supabase
        .from('achievements')
        .select('*')
        .eq('type', 'internship')
        .order('created_at', { ascending: false });
    
    if (intError) {
        console.error('Error loading internships:', intError);
    } else {
        const grid = document.getElementById('internships-grid');
        grid.innerHTML = internships.length > 0 ? '' : '<p style="text-align: center; color: #aaa;">Internship experiences will appear here</p>';
        
        internships.forEach(item => {
            const card = document.createElement('div');
            card.className = 'achievement-card';
            card.innerHTML = `
                ${item.image_url ? `<img src="${item.image_url}" alt="${item.title}">` : ''}
                <h3>${item.title}</h3>
                <p>${item.description || ''}</p>
            `;
            grid.appendChild(card);
        });
    }
    
    // Load certificates
    const { data: certificates, error: certError } = await supabase
        .from('achievements')
        .select('*')
        .eq('type', 'certificate')
        .order('created_at', { ascending: false });
    
    if (certError) {
        console.error('Error loading certificates:', certError);
    } else {
        const grid = document.getElementById('certificates-grid');
        grid.innerHTML = certificates.length > 0 ? '' : '<p style="text-align: center; color: #aaa;">Certificates will appear here</p>';
        
        certificates.forEach(item => {
            const card = document.createElement('div');
            card.className = 'achievement-card';
            card.innerHTML = `
                ${item.image_url ? `<img src="${item.image_url}" alt="${item.title}">` : ''}
                <h3>${item.title}</h3>
                <p>${item.description || ''}</p>
            `;
            grid.appendChild(card);
        });
    }
}

// Smooth scrolling for navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                
                // Update active link
                document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// Hire me modal functionality
const modal = document.getElementById('contact-modal');
const hireBtn = document.getElementById('hire-btn');
const closeModal = document.querySelector('.close-modal');

hireBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadPortfolioData);
