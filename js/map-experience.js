/* ============================================================
   TRACA — 3D Map Experience (Open-Source / MapLibre)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Configuration RTL pour l'arabe
    if (window.maplibregl) {
        maplibregl.setRTLTextPlugin(
            'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js',
            null,
            true
        );
    }

    let map;

    try {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) {
            console.error("Map container #map is missing from DOM.");
            return;
        }

        map = new maplibregl.Map({
            container: 'map',
            style: 'https://tiles.openfreemap.org/styles/bright',
            center: [3.0, 31.0], // Center on Algeria
            zoom: 4.8,
            pitch: 45,
            bearing: -10,
            antialias: true
        });

        window.tracaMapInstance = map;

        map.on('error', (e) => {
            console.error("MapLibre Error:", e);
        });

        // Forcer le redimensionnement de la carte après son initialisation pour éviter un canvas vide
        setTimeout(() => {
            map.resize();
        }, 100);

    } catch (e) {
        console.error("MapLibre Init Failed:", e);
        return;
    }

    if (map) {
        let allMarkers = [];
        let placesData = [];

        async function loadPlaces() {
            try {
                const response = await fetch('/data/algeria-lieux.geojson');
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                const data = await response.json();
                placesData = data.features;
                renderMarkers(placesData);
            } catch (err) {
                console.error("Erreur lors du chargement des lieux:", err);
            }
        }

        function renderMarkers(features) {
            allMarkers.forEach(m => m.remove());
            allMarkers = [];

            features.forEach(feature => {
                const { id, name, name_ar, wilaya, type, era, description, url, image } = feature.properties;
                const coords = feature.geometry.coordinates;

                const el = document.createElement('div');
                el.className = 'traca-marker';
                el.dataset.type = type;
                el.dataset.era = era;

                const popup = new maplibregl.Popup({ offset: 25, maxWidth: '280px' })
                    .setHTML(`
                    <div class="poi-popup">
                        ${image ? `<div class="poi-popup-img" style="background-image: url('${image}')"></div>` : ''}
                        <div class="poi-popup-content">
                            <span class="poi-popup-name_ar">${name_ar}</span>
                            <h3 class="poi-popup-name">${name}</h3>
                            <div class="poi-popup-meta">${era.toUpperCase()} • ${wilaya}</div>
                            <p class="poi-popup-desc">${description}</p>
                            <a href="${url}" class="poi-popup-link">Voir détails →</a>
                        </div>
                    </div>
                `);

                const marker = new maplibregl.Marker(el)
                    .setLngLat(coords)
                    .setPopup(popup)
                    .addTo(map);

                allMarkers.push(marker);
            });

            window.tracaAllMarkers = allMarkers;
        }

        // Filtering Logic
        const filterBtns = document.querySelectorAll('.filter-btn');
        const wilayaSelect = document.getElementById('wilaya-select');
        const mapSearch = document.getElementById('map-search');

        let activeFilters = { era: 'all', type: 'all', wilaya: 'all', search: '' };

        function applyFilters() {
            const filteredFeatures = placesData.filter(f => {
                const eraMatch = activeFilters.era === 'all' || f.properties.era === activeFilters.era;
                const typeMatch = activeFilters.type === 'all' || f.properties.type === activeFilters.type;
                const wilayaMatch = activeFilters.wilaya === 'all' || f.properties.wilaya === activeFilters.wilaya;
                const searchMatch = !activeFilters.search ||
                    f.properties.name.toLowerCase().includes(activeFilters.search) ||
                    f.properties.wilaya.toLowerCase().includes(activeFilters.search);
                return eraMatch && typeMatch && wilayaMatch && searchMatch;
            });
            renderMarkers(filteredFeatures);
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterType = btn.dataset.filter;
                const value = btn.dataset.value;
                document.querySelectorAll(".filter-btn[data-filter='" + filterType + "']").forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilters[filterType] = value;
                applyFilters();
            });
        });

        if (wilayaSelect) {
            wilayaSelect.addEventListener('change', (e) => {
                activeFilters.wilaya = e.target.value;
                applyFilters();
            });
        }

        if (mapSearch) {
            mapSearch.addEventListener('input', (e) => {
                activeFilters.search = e.target.value.toLowerCase();
                applyFilters();
            });
        }

        // Sidebar Toggle
        const sidebar = document.getElementById('map-sidebar');
        const toggle = document.getElementById('sidebar-toggle');
        if (toggle && sidebar) {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('hidden');
                toggle.innerHTML = sidebar.classList.contains('hidden') ? '<span>☰</span>' : '<span>×</span>';
            });
        }

        // Load data when map is fully loaded
        map.on('load', () => {
            loadPlaces();
            map.resize();
        });
    }
});
