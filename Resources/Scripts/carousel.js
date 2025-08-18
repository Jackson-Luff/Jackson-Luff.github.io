// Slide button management
var gSlides = null;
var gSlideIndex = 0;
var gSlideCount = 0;
// Navigation button management
var gNavigationButtons = null;
var gPreviousSlideIndex = null;

function ShowSlide(index)
{
    gPreviousSlideIndex = gSlideIndex;
    gSlideIndex = (index % gSlideCount + gSlideCount) % gSlideCount;
    
    // This line updates the URL hash based on the current slide index
    window.location.hash = `#carousel__slide${gSlideIndex + 1}`;

    // scrollIntoView() makes the element visible to the user.
    gSlides[gSlideIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
    });
}

// A function to update the navigation buttons based on the new active index
function updateNavigationButtons(newIndex) {
  if (gPreviousSlideIndex !== null) {
    gNavigationButtons[gPreviousSlideIndex].classList.remove('active');
  }
  gNavigationButtons[newIndex].classList.add('active');
  gPreviousSlideIndex = newIndex;
}

function observerNavigation()
{
    const options = {
        root: carousel, // The carousel element is the scroll container
        rootMargin: '0px',
        threshold: 0.8 // Trigger when 80% of the slide is visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(gSlides).indexOf(entry.target);
            updateNavigationButtons(index);
        }
        });
    }, options);

    // Tell the observer to watch each slide
    gSlides.forEach(slide => {
        observer.observe(slide);
    });

    // Initial state
    if (gSlideIndex !== null) {
        updateNavigationButtons(gSlideIndex);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const slides = carousel.querySelectorAll('.carousel__slide');
    const navigationButtons = carousel.querySelectorAll('.carousel__navigation-button');
    const prevButton = document.querySelector('.carousel_prev');
    const nextButton = document.querySelector('.carousel_next');

    // Assign variables
    gSlideCount = slides.length;
    gSlides = slides;
    gNavigationButtons = navigationButtons;

    // Assign the current index from a hashed url
    const fragment = window.location.hash;
        if (fragment.startsWith('#carousel__slide')) {
            // Extract the number from the string
            const slideIndex = parseInt(fragment.replace('#carousel__slide', ''), 5);
            if(slideIndex)
            {
                ShowSlide(slideIndex);
            }
        }

    // button event: Go to the next slide.
    nextButton.addEventListener('click', () => {
        ShowSlide(gSlideIndex + 1);
    });

    // button event: Go to the previous slide.
    prevButton.addEventListener('click', () => {
        ShowSlide(gSlideIndex - 1);
    });

    observerNavigation();
});