// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const inicioSection = document.getElementById('inicio');

window.addEventListener('scroll', () => {
    const inicioBottom = inicioSection.offsetTop + inicioSection.offsetHeight;

    if (window.scrollY > inicioBottom - 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Optional: Auto-scroll carousel
const carousel = document.querySelector('.carousel');
let isScrolling = false;

// Intersection Observer for active nav links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('text-blue-600');
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('text-blue-600');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

(function () {
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