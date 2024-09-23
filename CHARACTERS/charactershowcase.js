gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray("section");

sections.forEach((section, index) => {  
  let canvas = section.querySelector("canvas");
  if (canvas) {
    // Check if it's the first or second section
    if (index === 0) {
      initCanvas(section, canvas, "norapng", 301, 300); // First sequence for norapng
    } else if (index === 2) { 
      initCanvas(section, canvas, "aeronpng", 304, 234); // Second sequence for aeronpng
    }
  } else {
    initOther(section);
  }
});

function initCanvas(section, canvas, sequenceName, startFrame, frameCount) {
  
  let text = section.querySelector(".textSHOWCASE");
  let context = canvas.getContext("2d");
  canvas.width = 1900; // Adjust canvas size as needed
  canvas.height = 1000; // Adjust canvas size as needed

  // Update the currentFrame function to reference your Google Cloud Storage bucket
  const baseUrl = "https://storage.googleapis.com/crimsonskin-assets/"; // Replace with your actual bucket name
  const currentFrame = index => (
    `${baseUrl}${sequenceName}/${(startFrame + index).toString().padStart(4, '0')}.png`
  );

  let images = [];
  let frameData = { frame: 0 };
  
  for (let i = 0; i < frameCount; i++) {
    let img = new Image();
    img.src = currentFrame(i);  // Load image from Google Cloud Storage
    images.push(img);
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: 0.5,
      end: "+=100%",   // Adjust as needed
      markers: true
    }
  })
  .to(text, {
    opacity: 1,
    x: -100,
    duration: 0.5
  })
  .to(frameData, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    duration: 1,
    onUpdate: render
  }, 0);

  images[0].onload = render;

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[frameData.frame], 0, 0);
  }
}

function initOther(section) {
  ScrollTrigger.create({
    trigger: section,
    pin: true,
    end: "+=20%"
  });
}












// Register plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

// Create a timeline and pause it initially
var tl = gsap.timeline({ paused: true }),
  mySplitText = new SplitText("#quote", { type: "words,chars" }),
  chars = mySplitText.chars; // An array of all the divs that wrap each character

gsap.set("#quote", { perspective: 800 });

// Define the animation
tl.from(chars, {
  duration: 1,
  opacity: 3,
  scale: 0,
  y: 70,
  rotationX: 180,
  transformOrigin: "0% 50% -50",
  ease: "back",
  stagger: 0.05
});




// Play the animation on load
tl.play();

// ScrollTrigger to control the text's visibility and restart the animation on scroll
ScrollTrigger.create({
  trigger: "#quote",
  start: "top center", // Start the trigger when the quote is at the center of the viewport
  end: "bottom top", // End the trigger when the quote is out of the viewport
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

// Remove the hover effect to prevent restarting the animation
document.getElementById("quote").removeEventListener("mouseenter", function () {
  tl.restart();
});
















/* ROLLING TEXT */


let elements = document.querySelectorAll('.rolling-text');

elements.forEach(element => {
  let innerText = element.innerText;
  element.innerHTML = '';
  
  let textContainer = document.createElement('div');
  textContainer.classList.add('block');
  
  for (let letter of innerText) {
    let span = document.createElement('span');
    span.innerText = letter.trim() === '' ? '\xa0': letter;
    span.classList.add('letter');
    textContainer.appendChild(span);
  }
  
  element.appendChild(textContainer);
  element.appendChild(textContainer.cloneNode(true));
});






