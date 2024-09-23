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
      "images/untitled1αι.png",
      "images/MonsterPortal_21.gif",
      "images/img-2.png",
      "images/SkyTemple/SkyTempleRunning00.gif"
    ];

    var gifUrls = [
      "../images/FullComboPart1Optimised.gif",
      "images/MonsterPortal.gif",
      "../CHARACTERS/images/DevilTrigger/Comp 1.gif ",
      "images/SkyTemple/SkyTempleRunning_1.gif"
    ];

 

    // Texts for each image
    const texts = [
      { title: "LORE", body: "Centuries ago, a cosmic event known as the 'Great Convergence' occurred, aligning multiple dimensions and weakening the barriers between them. This rare phenomenon allowed beings from other realms to cross over into Earth, including powerful demons from Hell. Ancient civilizations fought valiantly to repel these invaders, using magic and technology that has since been lost to time. However, they could only seal some of them, not completely eradicate them." },
      { title: "The Demon Invasion", body: "In the present day, a secretive cult known as the 'Order of the Crimson Dawn' has been working tirelessly to bring about the next Great Convergence. Believing that the demons will grant them unimaginable power and immortality, they perform forbidden rituals to weaken the barriers between worlds once again. Their ultimate goal is to merge the UnderWorld with Earth, creating a new realm where they reign supreme." },
      { title: "The Protagonist", body: "Our protagonist, a skilled warrior with a mysterious past, discovers their lineage is tied to the ancient guardians who originally sealed the demons. They possess latent powers that awaken as they confront the demonic threat. Haunted by visions and guided by the spirit of an ancient guardian, they embark on a quest with the help of his childhood friend, Nora to stop the Order of the Crimson Dawn and close the rift between worlds." },
      { title: "The Final Goal", body: "Your ultimate goal is to prevent the complete merging of the UnderWorld with Earth. Stop the 'Order of the Crimson Dawn' and destroy the Demon rulers" }
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
      const initialOffsetX = (index % 2 === 0 ? -50 : 50) * (index + 1);
      const initialOffsetY = 0;

      // Add random phase offset for each image
      const phaseOffset = Math.random() * Math.PI * 2;

      img.style.transform = `translate(${initialOffsetX}px, ${initialOffsetY}px)`;

      function updatePosition() {
        const time = Date.now() * 0.0004;
        floatX = Math.sin(time + phaseOffset + index) * 50;
        floatY = Math.cos(time + phaseOffset + index) * 50;

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
      const title = document.createElement("div");
      title.className = "overlay-title";
      title.innerText = texts[index].title;
      const body = document.createElement("div");
      body.className = "overlay-body";
      body.innerText = texts[index].body;

      textOverlay.appendChild(title);
      textOverlay.appendChild(body);
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

      // Apply SplitText and GSAP animations to overlay text
     

      // Add click event listener to navigate to the corresponding URL
      img.addEventListener("click", () => {
        window.location.href = imageLinks[index];
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









// Manually split the text into characters and wrap each in a span
var quote = document.getElementById("quote");
var text = quote.innerText;
quote.innerHTML = ""; // Clear the original text

// Wrap each character in a span and append to #quote, including spaces
text.split("").forEach(function (char) {
  var span = document.createElement("span");
  span.innerText = char === " " ? "\u00A0" : char; // Preserve spaces with &nbsp;
  quote.appendChild(span);
});

// Get all the characters in the quote
var chars = document.querySelectorAll("#quote span");

// Create the GSAP timeline
var tl = gsap.timeline({ paused: true });

// Set perspective for a 3D effect
gsap.set("#quote", { perspective: 50 });
 gsap.set("#quote", { perspective: window.innerWidth / 2 });

// Apply animation to the characters with a consistent direction from up to down
tl.from(chars, {
  duration: 0.7,
  opacity: 0,
  scale: 0.8,
  x: 19,         // No horizontal offset
  y: -80,      // Characters start above the viewport
  rotationX: -20, // Angular rotation for a 3D effect
  transformOrigin: "bottom center", // Rotate from the bottom of each character
  ease: "power3.out",  // Smooth easing for fluid motion
  stagger: 0.04   // Stagger each character's entrance for a flowing effect
});

// Play the animation on page load
tl.play();

// Add ScrollTrigger to control text animation on scroll
ScrollTrigger.create({
  trigger: "#quote",
  start: "top center", // When the quote is at the center of the viewport
  end: "bottom top",   // End the trigger when the quote is out of the viewport
  onLeave: () => {
    gsap.to("#quote", { opacity: 0, duration: 0.5 }); // Fade out the text when scrolling down
  },
  onEnterBack: () => {
    gsap.to("#quote", { opacity: 1, duration: 0.5 }); // Fade in the text when scrolling back up
    tl.restart(); // Restart the animation when scrolling back up
  },
  onEnter: () => {
    gsap.to("#quote", { opacity: 1, duration: 0.5 }); // Ensure text is visible when scrolling up again
  }
});


