// ===== Navbar compartilhada (partial injetado em #site-navbar) =====
function initNavbar() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // "Evento" dropdown: open by click/keyboard too (complements the CSS hover)
    const eventoDropdown = document.querySelector('.dropdown-container');
    if (eventoDropdown) {
        const eventoBtn = eventoDropdown.querySelector('#evento-btn');

        eventoBtn.addEventListener('click', () => {
            const isOpen = eventoDropdown.classList.toggle('dropdown-open');
            eventoBtn.setAttribute('aria-expanded', isOpen);
        });

        // Close when clicking anywhere outside the toggle button (incl. menu items)
        document.addEventListener('click', (e) => {
            if (!eventoBtn.contains(e.target)) {
                eventoDropdown.classList.remove('dropdown-open');
                eventoBtn.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                eventoDropdown.classList.remove('dropdown-open');
                eventoBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth scrolling for in-page anchors (+ close mobile menu)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (mobileMenu) mobileMenu.classList.add('hidden');
        });
    });

    // Intersection Observer for active nav links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    if (sections.length && navLinks.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('nav-link--active');
                        if (link.getAttribute('href') === `#${entry.target.id}`) {
                            link.classList.add('nav-link--active');
                        }
                    });
                }
            });
        }, { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 });
        sections.forEach(section => observer.observe(section));
    }
}

// Navbar compartilhada — FONTE ÚNICA. Editar só aqui; é injetada em todas
// as páginas (index e subpáginas) no elemento <div id="site-navbar">.
// Âncoras usam #... (a home); em subpáginas o script reescreve para index.html#...
const NAVBAR_HTML = `
<nav id="navbar" class="fixed w-full top-0 z-50">
    <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between md:justify-between relative">
            <!-- Logo -->
            <a href="#inicio" class="flex-shrink-0">
                <img src="assets/Nome.svg" alt="Python Nordeste 2026" class="h-12 md:h-14">
            </a>
            <!-- Desktop Menu -->
            <div class="hidden md:flex space-x-8">
                <a href="#inicio" class="nav-link font-semibold hover:text-yellow-400 transition">Início</a>
                <div class="relative dropdown-container">
                    <button id="evento-btn" aria-haspopup="true" aria-expanded="false" class="nav-link font-semibold hover:text-yellow-400 transition inline-flex items-center gap-1">
                        Evento
                        <svg class="dropdown-chevron w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="dropdown-menu absolute hidden shadow-lg rounded-md mt-2 py-2 w-48" style="background-color: rgba(43, 54, 146, 0.95);">
                        <a href="https://ingressos.python.org.br/nordeste/2026/" target="_blank" class="block px-4 py-2 hover:bg-opacity-80 font-semibold" style="color: #80b80c;">Ingressos</a>
                        <a href="#locais" class="block px-4 py-2 hover:bg-opacity-80" style="color: #fff8e5;">Locais</a>
                        <a href="#cidade" class="block px-4 py-2 hover:bg-opacity-80" style="color: #fff8e5;">Cidade</a>
                        <a href="#sobre" class="block px-4 py-2 hover:bg-opacity-80" style="color: #fff8e5;">Sobre o Evento</a>
                    </div>
                </div>
                <a href="#patrocinadores" class="nav-link font-semibold hover:text-yellow-400 transition">Patrocínio</a>
                <a href="#vagas" class="nav-link font-semibold hover:text-yellow-400 transition">Vagas</a>
                <a href="agenda.html" class="nav-link font-semibold hover:text-yellow-400 transition">Agenda</a>
                <a href="https://photos.google.com/share/AF1QipNzH7oJ2V8ZUoheoiLbhUa0mp8bNPG0eYJga-viCKJnoYcJ_TorOyn1190g-YDsbg?key=LUFWWEpkWDJSeEsxOG5CNjJsNEJoQzlNNEVFMWJB" target="_blank" rel="noopener noreferrer" class="nav-link font-semibold hover:text-yellow-400 transition">Fotos</a>
                <a href="faq.html" class="nav-link font-semibold hover:text-yellow-400 transition">Perguntas Frequentes</a>
                <a href="codigo-conduta.html" class="nav-link font-semibold hover:text-yellow-400 transition">Código de Conduta</a>
            </div>
            <!-- Mobile Menu Button -->
            <button id="mobile-menu-btn" class="md:hidden">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 text-center rounded-lg" style="background-color: rgba(43, 54, 146, 0.95);">
            <a href="#inicio" class="block py-2 hover:text-yellow-300" style="color: #fff8e5;">Início</a>
            <a href="#locais" class="block py-2 hover:text-yellow-300" style="color: #fff8e5;">Locais</a>
            <a href="#cidade" class="block py-2 hover:text-yellow-300" style="color: #fff8e5;">Cidade</a>
            <a href="#sobre" class="block py-2 hover:text-yellow-300" style="color: #fff8e5;">Sobre o Evento</a>
            <a href="#patrocinadores" class="block py-2 hover:text-yellow-300" style="color: #fff8e5;">Patrocínio</a>
            <a href="#vagas" class="block py-2 hover:text-yellow-300" style="color: #fff8e5;">Vagas</a>
            <a href="agenda.html" class="block py-2 hover:text-yellow-300" style="color: #fff8e5;">Agenda</a>
            <a href="https://photos.google.com/share/AF1QipNzH7oJ2V8ZUoheoiLbhUa0mp8bNPG0eYJga-viCKJnoYcJ_TorOyn1190g-YDsbg?key=LUFWWEpkWDJSeEsxOG5CNjJsNEJoQzlNNEVFMWJB" target="_blank" rel="noopener noreferrer" class="block py-2 hover:text-yellow-300" style="color: #fff8e5;">Fotos</a>
            <a href="https://ingressos.python.org.br/nordeste/2026/" target="_blank" class="block py-2 hover:text-yellow-300 font-semibold" style="color: #80b80c;">Ingressos</a>
            <a href="faq.html" class="block py-2 hover:text-yellow-300" style="color: #fff8e5;">Perguntas Frequentes</a>
            <a href="codigo-conduta.html" class="block py-2 hover:text-yellow-300" style="color: #fff8e5;">Código de Conduta</a>
        </div>
    </div>
</nav>`;

(function loadNavbar() {
    const holder = document.getElementById('site-navbar');
    if (!holder) return;
    holder.innerHTML = NAVBAR_HTML;
    // Em subpáginas, apontar as âncoras de seção (#...) para a home
    const onIndex = location.pathname === '/' || location.pathname.endsWith('/index.html');
    if (!onIndex) {
        holder.querySelectorAll('a[href^="#"]').forEach((a) => {
            a.setAttribute('href', 'index.html' + a.getAttribute('href'));
        });
    }
    initNavbar();
})();

(function () {
    if (!document.getElementById('locais-map')) return; // só na home
    const map = L.map('locais-map');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const eventIcon = L.divIcon({
        html: '<div style="background:#2b3692;width:16px;height:16px;border-radius:50%;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>',
        className: '', iconAnchor: [8, 8], popupAnchor: [0, -12]
    });
    const hotelIcon = L.divIcon({
        html: '<div style="background:#ef7512;width:14px;height:14px;border-radius:50%;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>',
        className: '', iconAnchor: [7, 7], popupAnchor: [0, -10]
    });

    const places = [
        {
            lat: -3.7642974, lon: -38.4866188,
            label: 'Centro Universitário Estácio do Ceará | Via Corpvs',
            url: 'https://maps.app.goo.gl/4VKcmWRzHNbcpKap6',
            icon: eventIcon
        },
        {
            lat: -3.7239797, lon: -38.5086837,
            label: 'Ibis Fortaleza Praia de Iracema',
            url: 'https://maps.app.goo.gl/tDR6eciuLrcAvfPR6',
            icon: hotelIcon
        },
        {
            lat: -3.7232207, lon: -38.5151838,
            label: 'Ibis Budget Fortaleza Praia de Iracema',
            url: 'https://maps.app.goo.gl/eM1TagaM2czahgYX8',
            icon: hotelIcon
        },
        {
            lat: -3.7630502, lon: -38.4858909,
            label: 'Ibis Fortaleza Centro de Eventos',
            url: 'https://maps.app.goo.gl/MB8sChLPhvFLjWSV9',
            icon: hotelIcon
        },
        {
            lat: -3.7266255, lon: -38.4986645,
            label: 'Mercure Fortaleza Meireles',
            url: 'https://maps.app.goo.gl/w2a6yaLT3y6AQJQ27',
            icon: hotelIcon
        }
    ];

    const bounds = [];
    places.forEach(function (place) {
        bounds.push([place.lat, place.lon]);
        L.marker([place.lat, place.lon], { icon: place.icon })
            .addTo(map)
            .bindPopup('<b>' + place.label + '</b><br><a href="' + place.url + '" target="_blank" style="color:#2b3692;font-weight:600;">Abrir no Google Maps</a>');
    });
    map.fitBounds(bounds, { padding: [40, 40] });
})();

// Painel de Vagas
// Cada vaga em jobs.json tem o formato:
// { company, logo, role, location, tags?, summary, description, applyUrl }
(function () {
    const container = document.getElementById('jobs-container');
    const emptyState = document.getElementById('jobs-empty');
    if (!container) return;

    const modal = document.getElementById('job-modal');
    const modalLogo = document.getElementById('job-modal-logo');
    const modalRole = document.getElementById('job-modal-role');
    const modalCompany = document.getElementById('job-modal-company');
    const modalLocation = document.getElementById('job-modal-location');
    const modalDescription = document.getElementById('job-modal-description');
    const modalApply = document.getElementById('job-modal-apply');
    const modalClose = document.getElementById('job-modal-close');

    function openModal(job) {
        modalLogo.src = job.logo || '';
        modalLogo.alt = job.company || '';
        modalRole.textContent = job.role || '';
        modalCompany.textContent = job.company || '';
        modalLocation.textContent = job.location || '';
        modalDescription.textContent = job.description || job.summary || '';
        modalApply.href = job.applyUrl || '#';
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    if (modal) {
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    function renderJob(job) {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'text-left rounded-lg shadow-md p-6 bg-white hover:shadow-xl transition flex flex-col gap-3';
        card.innerHTML = `
            <div class="flex items-center gap-4">
                <img src="${job.logo || ''}" alt="${job.company || ''}" class="w-12 h-12 object-contain" />
                <div>
                    <h3 class="text-lg font-bold" style="color: #2b3692;">${job.role || ''}</h3>
                    <p class="text-sm" style="color: #333;">${job.company || ''}</p>
                </div>
            </div>
            ${job.location ? `<p class="text-sm" style="color: #666;">${job.location}</p>` : ''}
            ${job.summary ? `<p class="text-sm" style="color: #333;">${job.summary}</p>` : ''}
            <span class="text-sm font-semibold mt-auto" style="color: #80b80c;">Ver detalhes →</span>
        `;
        card.addEventListener('click', () => openModal(job));
        container.appendChild(card);
    }

    fetch('jobs.json', { cache: 'no-cache' })
        .then((res) => {
            if (!res.ok) throw new Error('Falha ao carregar jobs.json: ' + res.status);
            return res.json();
        })
        .then((jobs) => {
            if (!Array.isArray(jobs) || jobs.length === 0) {
                if (emptyState) emptyState.classList.remove('hidden');
                return;
            }
            jobs.forEach(renderJob);
        })
        .catch((err) => {
            console.error(err);
            if (emptyState) emptyState.classList.remove('hidden');
        });
})();