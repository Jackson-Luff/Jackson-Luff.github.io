document.addEventListener('DOMContentLoaded', () => {
    let percentage = 0;
    const delay = 20;

    const loadingText = document.querySelector(".loading-text");
    const loadingBar = document.querySelector(".loading-bar");

    function updateLoadingBarPercentage() {
        // The animation is already handled by CSS, this function primarily updates the percentage text.
        if (percentage < 99) {
            percentage++;
            if (loadingText) { // Ensure element exists before updating
                loadingText.textContent = percentage + "%";
            }
            setTimeout(updateLoadingBarPercentage, delay); // Adjust speed of count-up
        }
    }

    // Start the percentage update when the DOM is ready
    if (loadingBar) { // Only start if the loading bar element is present
        loadingBar.style.animation = "fillBar 2s forwards ease-in-out";
        updateLoadingBarPercentage();
    }
});