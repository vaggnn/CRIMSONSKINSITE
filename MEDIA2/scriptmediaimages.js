let mouseX = 0;
let mouseY = 0;
let scrollY = 0; // Track scroll position

// Track mouse position
document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Track scroll position
document.addEventListener('scroll', function() {
    scrollY = window.scrollY;
});

function animate() {
    const galleryItems = document.querySelectorAll('.gallery-item-wrapper');

    galleryItems.forEach((wrapper, index) => {
        const item = wrapper.querySelector('.gallery-item');
        
        if (!wrapper.classList.contains('hovered')) {
            const itemX = wrapper.offsetLeft + wrapper.clientWidth / 2;
            const itemY = wrapper.offsetTop + wrapper.clientHeight / 2;

            const deltaX = mouseX - itemX;
            const deltaY = mouseY - itemY;

            const speedFactor = 0.05 + (index * 0.02);
            const offsetX = deltaX * speedFactor;
            const offsetY = deltaY * speedFactor;

            // Parallax effect based on scroll position
            const parallaxOffsetY = scrollY * (0.1 + index * 0.05); // Adjust the multiplier for parallax strength

            // Apply smooth transformations with parallax
            wrapper.style.transform = `translate(${offsetX}px, ${offsetY + parallaxOffsetY}px)`;
            wrapper.style.zIndex = 1; // Reset z-index when not hovered
        }
    });

    requestAnimationFrame(animate);
}

// Start the animation loop
requestAnimationFrame(animate);

const galleryItems = document.querySelectorAll('.gallery-item-wrapper');

galleryItems.forEach(wrapper => {
    const item = wrapper.querySelector('.gallery-item');

    wrapper.addEventListener('mouseover', function() {
        wrapper.classList.add('hovered');

        // Bring the hovered wrapper to the front
        wrapper.style.zIndex = 7; // Higher value to bring it to the front

        // Only scale the image, no translation
        item.style.transition = 'transform 0.3s ease-out';
        item.style.transform = 'scale(1.5)';
    });

    wrapper.addEventListener('mouseout', function() {
        wrapper.classList.remove('hovered');

        // Reset z-index and return the image to its original scale and position
        wrapper.style.zIndex = 1; // Reset z-index
        item.style.transition = 'transform 0.3s ease-out';
        item.style.transform = ''; // Reset to the state handled by the animate function
    });
});
