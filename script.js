// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

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
                link.classList.remove('nav-link--active');
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('nav-link--active');
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