/* ================================================
   AfriTech Elite - Script principal
   Site: https://sonel10.github.io/afritech-elite
================================================ */

/* ── MEMBRES DATA ── */
  const membresData = [
    { initiales:'AM', nom:'Amara Mbaye', role:'Expert', pays:'🇸🇳 Sénégal', spec:'IA & Machine Learning', av:'av-orange' },
    { initiales:'KO', nom:'Kofi Osei', role:'Expert', pays:'🇬🇭 Ghana', spec:'Cloud Architecture', av:'av-green' },
    { initiales:'FN', nom:'Fatima Ndiaye', role:'Expert', pays:'🇲🇦 Maroc', spec:'Cybersécurité', av:'av-orange' },
    { initiales:'CI', nom:'Chidi Ike', role:'Expert', pays:'🇳🇬 Nigeria', spec:'Blockchain & Web3', av:'av-dark' },
    { initiales:'RD', nom:'Rania Diallo', role:'Mentor', pays:'🇫🇷 France', spec:'Product Management', av:'av-orange' },
    { initiales:'JM', nom:'Jean Mutombo', role:'Mentor', pays:'🇨🇩 RD Congo', spec:'Full Stack Dev', av:'av-green' },
    { initiales:'AB', nom:'Aïcha Ben Ali', role:'Mentor', pays:'🇹🇳 Tunisie', spec:'Data Science', av:'av-dark' },
    { initiales:'TK', nom:'Tunde Kola', role:'Mentor', pays:'🇨🇦 Canada', spec:'DevOps & SRE', av:'av-orange' },
    { initiales:'SM', nom:'Sara Mensah', role:'tech', pays:'🇬🇭 Ghana', spec:'Frontend Engineer', av:'av-green' },
    { initiales:'IB', nom:'Ibrahim Ba', role:'tech', pays:'🇸🇳 Sénégal', spec:'Backend Engineer', av:'av-dark' },
    { initiales:'NK', nom:'Natasha Kamau', role:'tech', pays:'🇰🇪 Kenya', spec:'Mobile Developer', av:'av-orange' },
    { initiales:'ML', nom:'Mamadou Ly', role:'comm', pays:'🇸🇳 Sénégal', spec:'Social Media Manager', av:'av-green' },
    { initiales:'ZA', nom:'Zainab Adeola', role:'comm', pays:'🇳🇬 Nigeria', spec:'Brand Manager', av:'av-orange' },
    { initiales:'EP', nom:'Espace Partner', role:'partenaire', pays:'🌍 Panafricain', spec:'Partenaire Stratégique', av:'av-dark' },
    { initiales:'TD', nom:'TechHub Dakar', role:'partenaire', pays:'🇸🇳 Sénégal', spec:'Incubateur Tech', av:'av-green' },
    { initiales:'GL', nom:'GreenLab Africa', role:'partenaire', pays:'🇰🇪 Kenya', spec:'Innovation Lab', av:'av-orange' },
  ];

  function filterMembres(type, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filtered = type === 'all' ? membresData : membresData.filter(m => m.role === type);
    renderMembres(filtered);
  }

  function renderMembres(data) {
    const grid = document.getElementById('membresGrid');
    grid.innerHTML = data.map(m => `
      <div class="membre-card">
        <div class="membre-avatar ${m.av}">${m.initiales}</div>
        <h4>${m.nom}</h4>
        <div class="role">${m.spec}</div>
        <div class="pays">${m.pays}</div>
      </div>
    `).join('');
  }
  renderMembres(membresData);

  /* ── FORMULAIRE ── */
  function scrollToForm() { document.getElementById('rejoindre').scrollIntoView({ behavior: 'smooth' }); }

  function submitForm() {
    const nom = document.getElementById('fNom').value.trim();
    const prenom = document.getElementById('fPrenom').value.trim();
    const profil = document.getElementById('fProfil').value;
    const domaine = document.getElementById('fDomaine').value;
    const pays = document.getElementById('fPays').value;
    const email = document.getElementById('fEmail').value.trim();
    if (!nom || !prenom || !profil || !domaine || !pays || !email) {
      alert('Veuillez remplir tous les champs obligatoires (*)'); return;
    }
    if (!email.includes('@')) { alert('Adresse email invalide'); return; }
    document.getElementById('formContent').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    showToast();
  }

  function showToast() {
    const t = document.getElementById('toast');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 4000);
  }

  /* ── COMPTEURS ANIMÉS ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString('fr-FR') + (target >= 3500 ? '+' : target === 54 ? '' : '+');
    }, 16);
  }

  /* ── SCROLL REVEAL ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Trigger counters
        const counters = e.target.querySelectorAll('[data-target]');
        counters.forEach(c => { if (!c.dataset.animated) { c.dataset.animated = true; animateCounter(c); } });
        if (e.target.dataset && e.target.dataset.target && !e.target.dataset.animated) {
          e.target.dataset.animated = true; animateCounter(e.target);
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));

  /* ── MENU MOBILE ── */
  function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
  }
  function closeMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
  }