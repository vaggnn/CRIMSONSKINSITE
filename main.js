





/* RAYCASTING ONLY WHEN HOVERING JS CODE */ 










document.addEventListener("DOMContentLoaded", function() {
    // Function to check if an element is in viewport
    function isInViewport(element) {
      var rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
    }
  
    // Function to load images vertically as user scrolls
    function loadImagesVertically() {
      var imageContainer = document.getElementById("imageContainer");
  
      // Example URLs of images to load (replace with your image URLs)
      var imageUrls = [
        "images/img-2.png",
        "images/image.png",
        "images/AERONNORA1.png",
        "img-1.jpg"
        // Add more image URLs as needed
      ];
  
      var gifUrls = [
        "images/gif2.gif",
        "images/gif2.gif",
        "images/gif2.gif",
        "images/gif2.gif"
        // Add more gif URLs as needed
      ];
  
      var imageLinks = [
        "index.html",
        "homepage.html",
        "page3.html",
        "page4.html"
        // Add more URLs as needed
      ];
  
      // Texts for each image
      const texts = [
        "TRAILER",
        "ABOUT",
        "CHARACTERS",
        "MEDIA"
        // Add more texts as needed
      ];
  
      // Loop through imageUrls and create <img> elements
      imageUrls.forEach(function(url, index) {
        var img = document.createElement("img");
        img.src = url;
        img.alt = texts[index]; // Replace with appropriate alt text
        img.classList.add("vertical-image"); // Add a class for styling (optional)
        imageContainer.appendChild(img);
  
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let floatX = 0;
        let floatY = 0;
  
        // Set alternating initial offset for each image
        const initialOffsetX = (index % 2 === 0 ? -50 : 50) * (index + 1); // Adjust this value as needed
        const initialOffsetY = 0; // Adjust this value as needed
  
        // Add random phase offset for each image
        const phaseOffset = Math.random() * Math.PI * 2;
  
        img.style.transform = `translate(${initialOffsetX}px, ${initialOffsetY}px)`;
  
        function updatePosition() {
          const time = Date.now() * 0.0008;
          floatX = Math.sin(time + phaseOffset + index) * 50; // Increase amplitude
          floatY = Math.cos(time + phaseOffset + index) * 50; // Increase amplitude
  
          currentX += (targetX - currentX) * 0.2;
          currentY += (targetY - currentY) * 0.1;
          img.style.transform = `translate(${currentX + initialOffsetX + floatX}px, ${currentY + initialOffsetY + floatY}px)`;
          requestAnimationFrame(updatePosition);
        }
  
        img.addEventListener("mousemove", (event) => {
          const imgRect = img.getBoundingClientRect();
          const mouseX = event.clientX;
          const mouseY = event.clientY;
  
          const imgX = imgRect.left + imgRect.width / 2;
          const imgY = imgRect.top + imgRect.height / 2;
  
          const diffX = mouseX - imgX;
          const diffY = mouseY - imgY;
  
          targetX = diffX * -0.1;
          targetY = diffY * -0.1;
        });
  
        // Reset image position on mouse leave
        img.addEventListener("mouseleave", () => {
          targetX = 0;
          targetY = 0;
        });
  
        updatePosition();
  
        // Create text overlay
        const wrapper = document.createElement("div");
        wrapper.className = "image-wrapper";
        wrapper.style.width = img.width + 'px';
        wrapper.style.height = img.height + 'px';
  
        const textOverlay = document.createElement("div");
        textOverlay.className = "overlay-text";
        textOverlay.innerText = texts[index];
        wrapper.appendChild(textOverlay);
        imageContainer.appendChild(wrapper);
  
        // Synchronize the wrapper's position with the image
        function syncPosition() {
          const rect = img.getBoundingClientRect();
          const containerRect = imageContainer.getBoundingClientRect();
          wrapper.style.left = rect.left - containerRect.left + 'px';
          wrapper.style.top = rect.top - containerRect.top + 'px';
          requestAnimationFrame(syncPosition);
        }
  
        requestAnimationFrame(syncPosition);
  
        // Add click event listener to navigate to the corresponding URL
        img.addEventListener("click", () => {
          window.location.href = imageLinks[index];
        });
  
        // Change image to gif on hover
        img.addEventListener("mouseenter", () => {
          img.src = gifUrls[index];
        });
  
        // Change back to original image on mouse leave
        img.addEventListener("mouseleave", () => {
          img.src = imageUrls[index];
        });
      });
  
      // Remove the scroll listener once all images are loaded
      if (imageUrls.length === 0) {
        window.removeEventListener("scroll", loadImagesVertically);
      }
    }
  
    // Initial load of images (if the initial page load shows images)
    loadImagesVertically();
  
    // Load more images as the user scrolls
    window.addEventListener("scroll", function() {
      if (isInViewport(document.getElementById("imageContainer"))) {
        loadImagesVertically();
      }
      adjustOpacity();
    });
  
    // Parallax effect for text overlays
    function parallaxEffect() {
      const textOverlays = document.querySelectorAll('.overlay-text');
      textOverlays.forEach(overlay => {
        const scrollPosition = window.scrollY;
        const speed = -0.06; // Adjust the speed of the parallax effect
        const offset = scrollPosition * speed;
        overlay.style.transform = `translateY(${offset}px)`;
      });
    }
  
    function adjustOpacity() {
      const images = document.querySelectorAll('.vertical-image');
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const lowerOpacityStart = windowHeight * 0.7; // Start applying lower opacity when the element is 80% of the viewport height
  
      images.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top >= lowerOpacityStart) {
          const opacity = Math.max(0.5, 1 - ((rect.top - lowerOpacityStart) / (windowHeight - lowerOpacityStart)));
          img.style.opacity = opacity;
        } else {
          img.style.opacity = 1; // Full opacity for elements not in the lower opacity zone
        }
      });
    }
  
    window.addEventListener('scroll', parallaxEffect);
    parallaxEffect(); // Initial check on page load
  });
  