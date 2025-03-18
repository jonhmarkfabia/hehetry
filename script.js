const searchButton = document.querySelector('.search-bar button');
const searchInput = document.querySelector('.search-bar input[type="text"]');
const locationIndicator = document.getElementById('location-indicator');
const resultsContainer = document.getElementById('results-container');

// ... (defaultLatitude, defaultLongitude, displayLocation functions remain the same) ...

searchButton.addEventListener('click', () => {
    const query = searchInput.value;

    // ... (geolocation logic remains the same) ...

    function performSearch(query, latitude, longitude) {
        // Replace with your actual API endpoint
        const apiUrl = `/api/search-restaurants?query=${query}&latitude=${latitude}&longitude=${longitude}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(caterers => { // Changed 'restaurants' to 'caterers' for clarity
                resultsContainer.innerHTML = ''; // Clear previous results
                if (caterers && caterers.length > 0) {
                    caterers.forEach(caterer => {
                        const catererCard = document.createElement('div');
                        catererCard.classList.add('caterer-card');

                        catererCard.innerHTML = `
                            <h3>${caterer.name}</h3>
                            <p>${caterer.address}</p>
                            <p>${caterer.phone}</p>
                            <div class="caterer-links">
                                <a href="${caterer.website}" target="_blank">Website</a>
                                <a href="${caterer.directions}" target="_blank">Directions</a>
                            </div>
                        `;

                        resultsContainer.appendChild(catererCard);
                    });
                } else {
                    resultsContainer.textContent = 'No caterers found.';
                }
            })
            .catch(error => {
                console.error('Error fetching caterers:', error);
                resultsContainer.textContent = 'An error occurred while fetching caterers.';
            });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const orderOnlineLink = document.querySelector('a[href="#featured-restaurants"]');

    if (orderOnlineLink) {
        orderOnlineLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetElement = document.getElementById('featured-restaurants');
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});