

gsap.registerPlugin(SplitText, ScrollTrigger);

// Create a timeline and pause it initially
var tl = gsap.timeline({ paused: true }),
  mySplitText = new SplitText("#quote", { type: "words,chars" }),
  chars = mySplitText.chars; // An array of all the divs that wrap each character

gsap.set("#quote", { perspective: 800 });

// Define the animation
tl.from(chars, {
  duration: 1,
  opacity: 0, // Start from opacity 0
  scale: 1.2,
  y: 100,
  rotationX: 150,
  transformOrigin: "20% 50% -50",
  ease: "back",
  stagger: 0.04
});

// ScrollTrigger to control the animation on scroll
ScrollTrigger.create({
  trigger: "#quote",
  start: "top 100%", // Trigger the animation when the quote is near the center of the viewport
  end: "bottom top", // End the trigger when the quote is out of the viewport
  onEnter: () => {
    tl.restart(); // Play the animation when the quote enters the viewport
  },
  onLeaveBack: () => {
    tl.restart(); // Restart the animation when scrolling back up into view
  },
  markers: true // Remove this line in production, useful for debugging
});

// Optional: If you want to reset the animation on scroll out and back in, you can uncomment below.
// ScrollTrigger.create({
//   trigger: "#quote",
//   start: "top bottom", // Trigger when the quote enters the viewport from the bottom
//   onLeave: () => {
//     tl.pause(0); // Reset the animation when the quote leaves the viewport
//   },
//   onEnterBack: () => {
//     tl.restart(); // Restart the animation when scrolling back up into view
//   }
// });





