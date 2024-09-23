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
      "images/DevilTrigger/FirstFrameDevilCombo.gif",
      "images/FullCombo/FullComboFirstFrame.gif",
      "images/DevilTrigger/FirstFrameDevilTrigger.gif",
      "images/Nora/0385.png",
      "images/FullCombo/FullComboFirstFrame.gif",
      // Add more image URLs as needed
    ];

    var gifUrls = [
      "images/DevilTrigger/DevilTriggerComboOptimized.gif",
      "images/FullCombo/FullComboPart1Optimised.gif",
      "images/DevilTrigger/Comp 1.gif",
      "images/Nora/NoravsBoss01_2.gif",
       "images/FullCombo/FullComboPart2Optimised.gif"
      // Add more gif URLs as needed
    ];

 

    // Texts for each image
    const texts = [
      "",
      "",
      "",
      "",
      ""
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
        const time = Date.now() * 0.0005;
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


  function parallaxEffect() {
    const textOverlays = document.querySelectorAll('.overlay-text');
    textOverlays.forEach(overlay => {
      const scrollPosition = window.scrollY;
      const speed = -0.05; // Adjust the speed of the parallax effect
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











gsap.config({ trialWarn: false });
console.clear();
gsap.registerPlugin(ScrollTrigger, SplitText, );

const aeronText = "Aeron is a stoic warrior, wielding a powerful sword against the demonic forces that threaten the world. His strength and skill in combat make him a relentless protector, driven by a deep sense of duty and a desire to avenge those lost to darkness.";
const noraText = "Nora is a skilled marksman with unmatched precision. She moves with grace and agility, her guns always finding their mark. Nora is driven by a quest for justice and a fierce determination to protect the innocent from the shadows.";

const split = new SplitText("#description", { type: "lines" });

function updateTextContent(text) {
    const description = document.getElementById("description");
    description.textContent = text;
    const newSplit = new SplitText("#description", { type: "lines" });

    newSplit.lines.forEach((line) => {
        line.style.fontSize = ""; // Clear any inline font size
        line.style.lineHeight = ""; // Clear any inline line height
    });

    newSplit.lines.forEach((target) => {
        gsap.to(target, {
            backgroundPositionX: 0,
            ease: "none",
            scrollTrigger: {
                trigger: target,
                markers: false,
                scrub: 1,
                start: "top center",
                end: "bottom center",
              
            }
        });
    });
}

function handleTitleClick(selectedTitle) {
    document.querySelectorAll('.text > h2').forEach(title => {
        title.classList.remove('dimmed');
        if (title !== selectedTitle) {
            title.classList.add('dimmed');
        }
    });
}

// Function to handle hover animations and mouse movement
function handleTitleHover(title, imageSelector) {
    const image = document.querySelector(imageSelector);

    title.addEventListener('mouseenter', () => {
        gsap.to(image, { opacity: 1, visibility: 'visible', duration: 0.5, ease: "power2.out" });
    });

    title.addEventListener('mouseleave', () => {
        gsap.to(image, { opacity: 0, visibility: 'hidden', duration: 0.5, ease: "power2.out" });
    });

    title.addEventListener('mousemove', (e) => {
        const xPos = e.clientX;
        const yPos = e.clientY;

        gsap.to(image, {
            x: xPos - window.innerWidth / 3, // Adjusts position relative to the center
            y: yPos - 350, // Adjusts vertical position, you can tweak this
            duration: 0.2,
            ease: "power2.out"
        });
    });
}

document.querySelector(".AeronTitle").addEventListener("click", function() {
    updateTextContent(aeronText);
    handleTitleClick(this);
});

document.querySelector(".NoraTitle").addEventListener("click", function() {
    updateTextContent(noraText);
    handleTitleClick(this);
});

// Handle hover effects for images
handleTitleHover(document.querySelector(".AeronTitle"), '.aeron-image');
handleTitleHover(document.querySelector(".NoraTitle"), '.nora-image');

// Initialize with Aeron text and dim Nora
updateTextContent(aeronText);
handleTitleClick(document.querySelector(".AeronTitle"));


