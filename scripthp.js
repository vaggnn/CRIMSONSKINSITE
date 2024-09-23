







document.addEventListener("DOMContentLoaded", function() {
  const preloader = document.getElementById('preloader');
  const content = document.getElementById('content');

  // Function to hide the preloader
  function hidePreloader() {
      preloader.style.display = 'none';
      content.style.display = 'block';
  }

  // Event listener for the video ending
  const preloaderVideo = document.getElementById('preloader-video');
  preloaderVideo.addEventListener('ended', hidePreloader);

  // Fallback to hide the preloader after a certain time (in case the video doesn't end)
  setTimeout(hidePreloader, 10000); // 10 seconds fallback
});





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







document.addEventListener("DOMContentLoaded", function() {
  // Overlay elements
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.display = "none";
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  overlay.style.zIndex = 1000;

  const video = document.createElement("video");
  video.id = "video";
  video.src = "videos/Trailer.mp4"; // Set your video source
  video.loop = true; // Enable looping

  video.controls = true;
  video.style.maxWidth = "80%";
  video.style.maxHeight = "80%";
  video.style.position = "absolute";
  video.style.top = "50%";
  video.style.left = "50%";
  video.style.transform = "translate(-50%, -50%)";
  video.volume = 0.1; // Set volume to 20%
  overlay.appendChild(video);
  document.body.appendChild(overlay);

  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
      video.style.cursor = 'default'; // Keep the cursor visible when in fullscreen
    } else {
      video.style.cursor = 'auto'; // Reset cursor when exiting fullscreen
    }
  });
  
  // Also handle WebKit-specific fullscreen change event for Safari and older Chrome versions
  document.addEventListener('webkitfullscreenchange', () => {
    if (document.webkitFullscreenElement) {
      video.style.cursor = 'default'; // Ensure cursor is visible in fullscreen
    } else {
      video.style.cursor = 'auto'; // Reset cursor when exiting fullscreen
    }
  });


  const closeIndicator = document.createElement("img");
  closeIndicator.src = "1x/closeoverlay.png"; // Path to your red X image
  closeIndicator.style.display = "none";
  closeIndicator.style.position = "absolute";
  closeIndicator.style.pointerEvents = "none"; // Allow clicks to pass through
  closeIndicator.style.zIndex = 1001;
  closeIndicator.style.transform = "scale(0.2)"; // Start at 20% scale
closeIndicator.style.transition = "transform 0.3s ease"; // Add transition for scaling
  document.body.appendChild(closeIndicator);

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

    var imageUrls = [
      "images/FireLogo.gif",
      "images/SkyTemple/PNGSequence2/NewLevelSequencePNG.-0001.png",
      "images/AERONNORA1.png",
      "images/wind-1.gif"
    ];

    var gifUrls = [
      "https://storage.googleapis.com/crimsonskin-assets/images/FireLogoGif.gif",
      "https://storage.googleapis.com/crimsonskin-assets/images/SkyTemple/SkyTempleOptimized.gif",
      "https://storage.googleapis.com/crimsonskin-assets/images/FullComboPart1Optimised.gif",
      "https://storage.googleapis.com/crimsonskin-assets/images/wind.gif"
    ];

    var imageLinks = [
      "https://www.youtube.com/watch?v=tZ40aYKaPTQ",
      "ABOUT/about.html",
      "CHARACTERS/character.html",
      "MEDIA2/media.html"
    ];

    const texts = [
      {
        title: "TRAILER",
        subtitle: "Watch the official trailer "
      },
      {
        title: "ABOUT",
        subtitle: "Learn more about the Crimson Skin World"
      },
      {
        title: "CHARACTERS",
        subtitle: "Meet the characters"
      },
      {
        title: "MEDIA",
        subtitle: "Explore our gallery of media content."
      }
    ];

    imageUrls.forEach(function(url, index) {
      var img = document.createElement("img");
      img.src = url;
      img.alt = texts[index].title;
      img.classList.add("vertical-image");
      imageContainer.appendChild(img);

      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let floatX = 0;
      let floatY = 0;

      const initialOffsetX = (index % 2 === 0 ? -50 : 50) * (index + 1);
      const initialOffsetY = 0;

      const phaseOffset = Math.random() * Math.PI * 2;

      img.style.transform = `translate(${initialOffsetX}px, ${initialOffsetY}px)`;

      function updatePosition() {
        const time = Date.now() * 0.0008;
        floatX = Math.sin(time + phaseOffset + index) * 40;
        floatY = Math.cos(time + phaseOffset + index) * 50;

        currentX += (targetX - currentX) * 0.2;
        currentY += (targetY - currentY) * 0.1;
        img.style.transform = `translate(${currentX + initialOffsetX + floatX}px, ${currentY + initialOffsetY + floatY}px)`;
        requestAnimationFrame(updatePosition);
      }

      // Listen for mousemove on the document instead of individual images
      document.addEventListener("mousemove", (event) => {
        const imgRect = img.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const imgX = imgRect.left + imgRect.width / 2;
        const imgY = imgRect.top + imgRect.height / 2;

        const diffX = mouseX - imgX;
        const diffY = mouseY - imgY;

        targetX = diffX * -0.13;
        targetY = diffY * -0.1;
      });

      // Reset image position on mouse leave
      img.addEventListener("mouseleave", () => {
        targetX = 0;
        targetY = 0;
      });

      updatePosition();

      const wrapper = document.createElement("div");
      wrapper.className = "image-wrapper";
      wrapper.style.width = img.width + 'px';
      wrapper.style.height = img.height + 'px';

      const textOverlay = document.createElement("div");
      textOverlay.className = "overlay-text";
      textOverlay.innerHTML = `<strong>${texts[index].title}</strong><br><span class="subtitle">${texts[index].subtitle}</span>`;
      wrapper.appendChild(textOverlay);
      imageContainer.appendChild(wrapper);

      function syncPosition() {
        const rect = img.getBoundingClientRect();
        const containerRect = imageContainer.getBoundingClientRect();
        wrapper.style.left = rect.left - containerRect.left + 'px';
        wrapper.style.top = rect.top - containerRect.top + 'px';
        requestAnimationFrame(syncPosition);
      }

      requestAnimationFrame(syncPosition);

      img.addEventListener("click", () => {
        // Open overlay for specific image
        if (index === 0) { // Change this condition based on which image should open the overlay
          overlay.style.display = 'block';
          video.play(); // Start playing the video
        } else {
          window.location.href = imageLinks[index];
        }
      });

      img.addEventListener("mouseenter", () => {
        img.src = gifUrls[index];
      });

      img.addEventListener("mouseleave", () => {
        img.src = imageUrls[index];
      });
    });

    if (imageUrls.length === 0) {
      window.removeEventListener("scroll", loadImagesVertically);
    }
  }

  loadImagesVertically();

  window.addEventListener("scroll", function() {
    if (isInViewport(document.getElementById("imageContainer"))) {
      loadImagesVertically();
    }
    adjustOpacity();
  });

  function parallaxEffect() {
    const textOverlays = document.querySelectorAll('.overlay-text');
    textOverlays.forEach(overlay => {
      const scrollPosition = window.scrollY;
      const speed = -0.06;
      const offset = scrollPosition * speed;
      overlay.style.transform = `translateY(${offset}px)`;
    });
  }

  function adjustOpacity() {
    const images = document.querySelectorAll('.vertical-image');
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const lowerOpacityStart = windowHeight * 0.7;

    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top >= lowerOpacityStart) {
        const opacity = Math.max(0.5, 1 - ((rect.top - lowerOpacityStart) / (windowHeight - lowerOpacityStart)));
        img.style.opacity = opacity;
      } else {
        img.style.opacity = 1;
      }
    });
  }

  window.addEventListener('scroll', parallaxEffect);
  parallaxEffect();


  window.addEventListener('mousemove', (e) => {
    if (overlay.style.display === 'block') {
      const rect = video.getBoundingClientRect();
      const scrollY = window.scrollY; // Get the current vertical scroll position
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        closeIndicator.style.display = 'block';
        closeIndicator.style.left = `${e.clientX - (closeIndicator.width / 2)}px`; // Centering horizontally
        closeIndicator.style.top = `${e.clientY + scrollY - (closeIndicator.height / 2)}px`; // Centering vertically with scroll offset
        
        // Trigger the zoom effect
        setTimeout(() => {
          closeIndicator.style.transform = "scale(1)"; // Zoom to 100%
        }, 10); // Small timeout to ensure the transition takes effect
      } else {
        closeIndicator.style.display = 'none';
        closeIndicator.style.transform = "scale(0.2)"; // Reset scale
      }
    }
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeOverlay();
    }
  });

  closeIndicator.addEventListener('click', closeOverlay);

  function closeOverlay() {
    overlay.style.display = 'none';
    video.pause(); // Pause video when overlay is closed
    closeIndicator.style.display = 'none';
  }
});












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







document.getElementById("fullscreen-btn").addEventListener("click", function () {
  const fullscreenIcon = document.getElementById("fullscreen-icon");

  // Paths to your SVG files
  const fullscreenIconPath = "images/fullscreen.svg";
  const exitFullscreenIconPath = "images/closefullscreen.svg";

  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      fullscreenIcon.setAttribute("src", exitFullscreenIconPath);  // Change to exit fullscreen icon
  } else {
      if (document.exitFullscreen) {
          document.exitFullscreen();
          fullscreenIcon.setAttribute("src", fullscreenIconPath);  // Change back to fullscreen icon
      }
  }
});
