document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById("menuButton");
    const overlayMenu = document.getElementById("overlayMenu");
    const closeButton = document.getElementById("closeButton");

    menuButton.addEventListener("click", function() {
        overlayMenu.classList.add("show");
    });

    closeButton.addEventListener("click", function() {
        overlayMenu.classList.remove("show");
    });
});








// Wait for the DOM to fully load before executing JavaScript










document.addEventListener("DOMContentLoaded", function() {
  // Custom cursor elements
  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('cursor-dot');
  const circle = document.getElementById('cursor-circle');

  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let circleX = 0, circleY = 0;
  const delay = 0.1;

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dotX = mouseX;
    dotY = mouseY;
    cursor.style.left = dotX + 'px';
    cursor.style.top = dotY + 'px';
    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';
    
  });

  
  function animate() {
    circleX += (dotX - circleX) * delay;
    circleY += (dotY - circleY) * delay;
    
    circle.style.left = circleX + 'px';
    circle.style.top = circleY + 'px';
    requestAnimationFrame(animate);
  }



  
  animate();

  
});









document.addEventListener('DOMContentLoaded', () => {
  const marquee = document.querySelector('.marquee2');
  const marqueeLinks = document.querySelectorAll('.marquee-text2');

  marqueeLinks.forEach(link => {
      const clone = link.cloneNode(true);
      marquee.appendChild(clone);
  });

  // Pause animation on hover and resume smoothly
  marquee.addEventListener('mouseover', () => {
      marquee.style.animationPlayState = 'paused';
  });

  marquee.addEventListener('mouseout', () => {
      marquee.style.animationPlayState = 'running';
  });
});










document.querySelectorAll('.overlaymedia-trigger').forEach(item => {
  item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get video URL and images from data attributes
      const videoUrl = this.getAttribute('data-video');
      const images = this.getAttribute('data-images').split(',');

      // Set the video source correctly
      const videoElement = document.getElementById('overlaymedia-video');
      const sourceElement = document.getElementById('overlaymedia-source');
      sourceElement.src = videoUrl;  // Update the video source

      // Add images to the overlaymedia
      const overlayImagesContainer = document.getElementById('overlaymedia-images');
      overlayImagesContainer.innerHTML = ''; // Clear previous images
      images.forEach(imgSrc => {
          const img = document.createElement('img');
          img.src = imgSrc;
          overlayImagesContainer.appendChild(img);
      });

      // Ensure video plays automatically once the new source is loaded
      videoElement.load();  // Reload the video to apply the new source

      // Once the video metadata is loaded, autoplay and loop
      videoElement.onloadeddata = function() {
          videoElement.muted = true;  // Mute the video for autoplay policy
          videoElement.loop = true;   // Set the video to loop
          videoElement.play();        // Automatically play the video
      };

      // Show the overlay
      document.getElementById('overlaymedia').style.display = 'block';
  });
});

// Close the overlay when the close button is clicked
document.querySelector('.close-overlaymedia').addEventListener('click', function() {
  closeOverlay();
});

// Close the overlay when clicking outside of the content area
document.getElementById('overlaymedia').addEventListener('click', function(e) {
  if (e.target === this) {
      closeOverlay();
  }
});

function closeOverlay() {
  const overlay = document.getElementById('overlaymedia');
  overlay.style.display = 'none';

  // Stop the video by resetting the source
  const videoElement = document.getElementById('overlaymedia-video');
  videoElement.pause();  // Pause the video
  const sourceElement = document.getElementById('overlaymedia-source');
  sourceElement.src = '';  // Clear the video source
  videoElement.load();  // Reload the video to reset
}











