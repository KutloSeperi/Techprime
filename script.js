document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    let index = 0;

    function changeImage() {
        images.forEach(img => img.classList.remove('active')); // Remove active class from all images
        index++;
        if (index >= images.length) {
            index = 0;
        }
        images[index].classList.add('active'); // Add active class to the current image
        carouselImages.style.transform = `translateX(${-index * 100}%)`;
    }

    setInterval(changeImage, 3000); // Change image every 3 seconds
});

// Add this to your script.js file

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search-container button');
    const searchBar = document.querySelector('.search-bar');

    searchButton.addEventListener('click', function() {
        const query = searchBar.value.trim();
        if (query !== '') {
            alert(`Searching for: ${query}`);
            // Here you can add the actual search functionality, e.g., sending the query to your backend or filtering content on the page.
        }
    });

    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchButton.click();
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const searchBar = document.getElementById("searchBar");

    searchButton.addEventListener("click", function () {
        const query = searchBar.value.trim().toLowerCase();
        if (query !== "") {
            performSearch(query);
        } else {
            alert("Please enter a search term.");
        }
    });

    function performSearch(query) {
        // Example search logic: You can customize this as per your requirements
        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
            section.style.display = "none"; // Hide all sections initially
        });

        let found = false;
        sections.forEach(section => {
            if (section.textContent.toLowerCase().includes(query)) {
                section.style.display = "block"; // Show the section if the query matches
                found = true;
            }
        });

        if (!found) {
            alert("No results found.");
        }
    }
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);

    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
        document.getElementById('contact-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});


document.getElementById("get-started").addEventListener("click", function() {
    var contactSection = document.getElementById("contacts");
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error('Contact section not found');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll to section on link click
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Add scroll animation to sections
    document.addEventListener('DOMContentLoaded', () => {
        // Smooth scroll to section on link click
        document.querySelectorAll('nav ul li a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    
        // Add scroll animation to sections
        const sections = document.querySelectorAll('section');
    
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
    
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
    
                    // Determine the position to apply the animation
                    if (section.getBoundingClientRect().left < window.innerWidth / 2) {
                        section.classList.add('animate-left');
                    } else {
                        section.classList.add('animate-right');
                    }
    
                    observer.unobserve(section); // Stop observing after animation
                } else {
                    section.classList.remove('animate-left', 'animate-right');
                }
            });
        }, options);
    
        sections.forEach(section => {
            observer.observe(section);
        });
    });
    
});
