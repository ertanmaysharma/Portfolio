let currentUser = null;
let currentAchievementType = 'internship';

// Login functionality
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
        document.getElementById('login-error').textContent = error.message;
    } else {
        currentUser = data.user;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        loadAllData();
    }
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut();
    location.reload();
});

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
    });
});

// Achievement type switching
document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentAchievementType = btn.dataset.type;
        document.getElementById('achievement-type').value = currentAchievementType;
        loadAchievements();
    });
});

// Load all data
async function loadAllData() {
    await Promise.all([
        loadKeywords(),
        loadServices(),
        loadSkills(),
        loadEducation(),
        loadAchievements()
    ]);
}

// Keywords CRUD
document.getElementById('keyword-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('keyword-id').value;
    const keyword = document.getElementById('keyword-text').value;
    const order = parseInt(document.getElementById('keyword-order').value);
    
    if (id) {
        await supabase.from('keywords').update({ keyword, order_index: order }).eq('id', id);
    } else {
        await supabase.from('keywords').insert({ keyword, order_index: order });
    }
    
    e.target.reset();
    document.getElementById('keyword-id').value = '';
    loadKeywords();
});

async function loadKeywords() {
    const { data } = await supabase.from('keywords').select('*').order('order_index');
    const list = document.getElementById('keywords-list');
    list.innerHTML = '';
    
    data?.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-info">
                <h3>${item.keyword}</h3>
                <p>Order: ${item.order_index}</p>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick="editKeyword(${item.id}, '${item.keyword}', ${item.order_index})">Edit</button>
                <button class="delete-btn" onclick="deleteKeyword(${item.id})">Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

function editKeyword(id, keyword, order) {
    document.getElementById('keyword-id').value = id;
    document.getElementById('keyword-text').value = keyword;
    document.getElementById('keyword-order').value = order;
}

async function deleteKeyword(id) {
    if (confirm('Delete this keyword?')) {
        await supabase.from('keywords').delete().eq('id', id);
        loadKeywords();
    }
}

// Services CRUD
document.getElementById('service-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('service-id').value;
    const title = document.getElementById('service-title').value;
    const description = document.getElementById('service-description').value;
    const icon = document.getElementById('service-icon').value;
    const order = parseInt(document.getElementById('service-order').value);
    
    if (id) {
        await supabase.from('services').update({ title, description, icon, order_index: order }).eq('id', id);
    } else {
        await supabase.from('services').insert({ title, description, icon, order_index: order });
    }
    
    e.target.reset();
    document.getElementById('service-id').value = '';
    loadServices();
});

async function loadServices() {
    const { data } = await supabase.from('services').select('*').order('order_index');
    const list = document.getElementById('services-list');
    list.innerHTML = '';
    
    data?.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-info">
                <h3>${item.icon} ${item.title}</h3>
                <p>${item.description}</p>
                <p>Order: ${item.order_index}</p>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick='editService(${JSON.stringify(item)})'>Edit</button>
                <button class="delete-btn" onclick="deleteService(${item.id})">Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

function editService(item) {
    document.getElementById('service-id').value = item.id;
    document.getElementById('service-title').value = item.title;
    document.getElementById('service-description').value = item.description;
    document.getElementById('service-icon').value = item.icon;
    document.getElementById('service-order').value = item.order_index;
}

async function deleteService(id) {
    if (confirm('Delete this service?')) {
        await supabase.from('services').delete().eq('id', id);
        loadServices();
    }
}

// Skills CRUD
document.getElementById('skill-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('skill-id').value;
    const name = document.getElementById('skill-name').value;
    const icon = document.getElementById('skill-icon').value;
    const order = parseInt(document.getElementById('skill-order').value);
    
    if (id) {
        await supabase.from('skills').update({ name, icon, order_index: order }).eq('id', id);
    } else {
        await supabase.from('skills').insert({ name, icon, order_index: order });
    }
    
    e.target.reset();
    document.getElementById('skill-id').value = '';
    loadSkills();
});

async function loadSkills() {
    const { data } = await supabase.from('skills').select('*').order('order_index');
    const list = document.getElementById('skills-list');
    list.innerHTML = '';
    
    data?.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-info">
                <h3>${item.icon} ${item.name}</h3>
                <p>Order: ${item.order_index}</p>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick='editSkill(${JSON.stringify(item)})'>Edit</button>
                <button class="delete-btn" onclick="deleteSkill(${item.id})">Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

function editSkill(item) {
    document.getElementById('skill-id').value = item.id;
    document.getElementById('skill-name').value = item.name;
    document.getElementById('skill-icon').value = item.icon;
    document.getElementById('skill-order').value = item.order_index;
}

async function deleteSkill(id) {
    if (confirm('Delete this skill?')) {
        await supabase.from('skills').delete().eq('id', id);
        loadSkills();
    }
}

// Education CRUD
document.getElementById('education-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('education-id').value;
    const degree = document.getElementById('education-degree').value;
    const institution = document.getElementById('education-institution').value;
    const start_year = parseInt(document.getElementById('education-start-year').value);
    const end_year = document.getElementById('education-end-year').value ? parseInt(document.getElementById('education-end-year').value) : null;
    const status = document.getElementById('education-status').value;
    
    if (id) {
        await supabase.from('education').update({ degree, institution, start_year, end_year, status }).eq('id', id);
    } else {
        await supabase.from('education').insert({ degree, institution, start_year, end_year, status });
    }
    
    e.target.reset();
    document.getElementById('education-id').value = '';
    loadEducation();
});

async function loadEducation() {
    const { data } = await supabase.from('education').select('*').order('start_year', { ascending: false });
    const list = document.getElementById('education-list');
    list.innerHTML = '';
    
    data?.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        const dateRange = item.end_year ? `${item.start_year} - ${item.end_year}` : `${item.start_year} - Present`;
        card.innerHTML = `
            <div class="item-info">
                <h3>${item.degree}</h3>
                <p>${item.institution}</p>
                <p>${dateRange} | ${item.status}</p>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick='editEducation(${JSON.stringify(item)})'>Edit</button>
                <button class="delete-btn" onclick="deleteEducation(${item.id})">Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

function editEducation(item) {
    document.getElementById('education-id').value = item.id;
    document.getElementById('education-degree').value = item.degree;
    document.getElementById('education-institution').value = item.institution;
    document.getElementById('education-start-year').value = item.start_year;
    document.getElementById('education-end-year').value = item.end_year || '';
    document.getElementById('education-status').value = item.status;
}

async function deleteEducation(id) {
    if (confirm('Delete this education entry?')) {
        await supabase.from('education').delete().eq('id', id);
        loadEducation();
    }
}

// Achievements CRUD
document.getElementById('achievement-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('achievement-id').value;
    const title = document.getElementById('achievement-title').value;
    const description = document.getElementById('achievement-description').value;
    const type = document.getElementById('achievement-type').value;
    const imageFile = document.getElementById('achievement-image').files[0];
    
    let image_url = null;
    
    if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('achievements')
            .upload(fileName, imageFile);
        
        if (!uploadError) {
            const { data: urlData } = supabase.storage.from('achievements').getPublicUrl(fileName);
            image_url = urlData.publicUrl;
        }
    }
    
    if (id) {
        const updateData = { title, description, type };
        if (image_url) updateData.image_url = image_url;
        await supabase.from('achievements').update(updateData).eq('id', id);
    } else {
        await supabase.from('achievements').insert({ title, description, type, image_url });
    }
    
    e.target.reset();
    document.getElementById('achievement-id').value = '';
    loadAchievements();
});

async function loadAchievements() {
    const { data } = await supabase.from('achievements').select('*').eq('type', currentAchievementType).order('created_at', { ascending: false });
    const list = document.getElementById('achievements-list');
    list.innerHTML = '';
    
    data?.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            ${item.image_url ? `<img src="${item.image_url}" class="item-image" alt="${item.title}">` : ''}
            <div class="item-info">
                <h3>${item.title}</h3>
                <p>${item.description || ''}</p>
            </div>
            <div class="item-actions">
                <button class="edit-btn" onclick='editAchievement(${JSON.stringify(item)})'>Edit</button>
                <button class="delete-btn" onclick="deleteAchievement(${item.id}, '${item.image_url || ''}')">Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

function editAchievement(item) {
    document.getElementById('achievement-id').value = item.id;
    document.getElementById('achievement-title').value = item.title;
    document.getElementById('achievement-description').value = item.description || '';
    document.getElementById('achievement-type').value = item.type;
}

async function deleteAchievement(id, imageUrl) {
    if (confirm('Delete this achievement?')) {
        if (imageUrl) {
            const fileName = imageUrl.split('/').pop();
            await supabase.storage.from('achievements').remove([fileName]);
        }
        await supabase.from('achievements').delete().eq('id', id);
        loadAchievements();
    }
}

// Check if user is already logged in
supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
        currentUser = session.user;
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        loadAllData();
    }
});
