// dark mode -----------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const darkModeClass = 'dark-mode';
    
    // Vérifie si le mode sombre est déjà activé
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Applique le mode sombre si nécessaire
    if (isDarkMode) {
        body.classList.add(darkModeClass);
        themeToggle.checked = true; 
    }
    
    themeToggle.addEventListener('change', function () {
        // Inverse l'état du mode sombre
        const toggleDarkMode = !body.classList.contains(darkModeClass);
        
        // Ajoute ou retire la classe en fonction de l'état
        if (toggleDarkMode) {
            body.classList.add(darkModeClass);
        } else {
            body.classList.remove(darkModeClass);
        }
        
        // Enregistre l'état du mode sombre
        localStorage.setItem('darkMode', toggleDarkMode);
    });
});

// -----------------------------------------------------

// menu burger -----------------------------------------------------

function toggleMenu() {
    var burgerMenu = document.querySelector('.burger-menu');
    burgerMenu.classList.toggle('active');

    var navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function(link) {
      link.style.display = link.style.display === 'none' ? 'block' : 'none';
    });
  }

// -----------------------------------------------------


// afficher les persos hp -----------------------------------------------------

function fetchCharacters() {
    return fetch('https://hp-api.lainocs.fr/characters')
    .then((response) => response.json())
}  

async function displayCharacters() {
    const characters = await fetchCharacters();
    const slider = document.getElementById('slider');
    const characterDropdown = document.getElementById('character-dropdown');
    
    characters.forEach(character => {
        const option = document.createElement('option');
        option.value = character.slug;
        option.textContent = character.name;
        characterDropdown.appendChild(option);

        slider.innerHTML += `
        <img src="${character.image}" alt="${character.name}">
        `;
    });
    startSlider();
}

function startSlider() {
    const images = document.querySelectorAll('.slider img');
    let currentImageIndex = 0;

    function nextImage() {
        images[currentImageIndex].style.display = 'none';
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].style.display = 'block';
    }

    setInterval(nextImage, 2000); // Change image every 2 seconds (2000 milliseconds)
}

displayCharacters();

const characterDropdown = document.getElementById('character-dropdown');
characterDropdown.addEventListener('change', function() {
    const selectedSlug = this.value;
    if (selectedSlug) {
        window.location.href = `single-hp.html?slug=${selectedSlug}`;
    }
});

//  -----------------------------------------------------
