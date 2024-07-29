document.addEventListener('DOMContentLoaded', () => {
    // Carousel Image Slider
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

    setInterval(changeImage, 8000); // Change image every 8 seconds

    // Section Visibility on Scroll
    const servicesSection = document.querySelector('#services');

    function handleScroll() {
        const rect = servicesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (rect.top <= windowHeight && rect.bottom >= 0) {
            servicesSection.classList.add('visible');
        } else {
            servicesSection.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the section is already in view
    handleScroll();

    // Search Functionality
    const searchButton = document.querySelector('.search-container button');
    const searchBar = document.querySelector('.search-bar');

    searchButton.addEventListener('click', () => {
        const query = searchBar.value.trim();
        if (query !== '') {
            alert(`Searching for: ${query}`);
            // Add actual search functionality here
        }
    });

    searchBar.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchButton.click();
        }
    });

    // Search Functionality with Section Visibility
    const searchButtonAlt = document.getElementById('searchButton');
    const searchBarAlt = document.getElementById('searchBar');

    searchButtonAlt.addEventListener('click', () => {
        const query = searchBarAlt.value.trim().toLowerCase();
        if (query !== "") {
            performSearch(query);
        } else {
            alert("Please enter a search term.");
        }
    });

    function performSearch(query) {
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

    // Contact Form Submission
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

    // Smooth Scroll to Contact Section
    document.getElementById("get-started").addEventListener("click", () => {
        const contactSection = document.getElementById("contacts");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('Contact section not found');
        }
    });

    // Smooth Scroll on Link Click
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Scroll Animation
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

document.addEventListener('DOMContentLoaded', () => {
    const carouselSlider = document.querySelector('.testimonial-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let index = 0;

    function updateSlider() {
        carouselSlider.style.transform = `translateX(${-index * 100}%)`;
    }

    prevButton.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : testimonialItems.length - 1;
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        index = (index < testimonialItems.length - 1) ? index + 1 : 0;
        updateSlider();
    });

    // Initial setup
    updateSlider();
});
