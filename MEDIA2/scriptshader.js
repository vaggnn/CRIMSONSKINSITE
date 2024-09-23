const textContainer = document.getElementById("textContainer");
let easeFactor = 0.1;
let scene, camera, renderer, planeMesh;
let mousePosition = { x: 0.5, y: 0.5 };
let targetMousePosition = { x: 0.5, y: 0.5 };
let prevPosition = { x: 0.5, y: 0.5 };

let isInView = false; // Declare and initialize isInView here

// Create an intersection observer to detect when the textContainer is in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("textContainer is in view!");
      if (!scene) {
        initializeScene(texture); // Initialize the scene with the texture
      }
      isInView = true; // Start rendering the scene
      animateScene(); // Start the animation loop
    } else {
      console.log("textContainer is out of view.");
      isInView = false; // Stop rendering the scene
    }
  });
}, {
  threshold: 0.1 // Adjust the threshold as needed
});

// Observe the textContainer
observer.observe(textContainer);

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.4);
  }
`;

const fragmentShader = `
varying vec2 vUv;
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    // Calculate distance from the current fragment to the mouse
    float distanceToMouse = distance(vUv, u_mouse);

    // Control how far the distortion spreads (smaller means a more focused distortion)
    float distortionRadius = 0.15; // Adjust this to control the effect size
    float distortionStrength = smoothstep(distortionRadius, 0.01, distanceToMouse);

    // Create a watery ripple effect using sin waves based on the distance to the mouse and time
    float wave = sin(distanceToMouse * 20.0 - u_time * 5.0) * 0.2; // Adjust wave frequency and amplitude

    // Apply distortion to the UV coordinates
    vec2 distortedUv = vUv - (vUv - u_mouse) * distortionStrength * wave;

    // Sample the texture using the distorted UV coordinates
    vec4 color = texture2D(u_texture, distortedUv);

    // Output the final color with the texture's alpha value preserved
    gl_FragColor = color;
}
`;

function createTextTexture(text, font, size, color, fontWeight = "100") {
  const textCanvas = document.createElement("canvas");
  const ctx = textCanvas.getContext("2d");

  // Set a fixed large size for the canvas to render high-quality text
  const canvasWidth = window.innerWidth * 3.5; // Keep the large size for high resolution
  const canvasHeight = window.innerHeight * 3.5;

  textCanvas.width = canvasWidth;
  textCanvas.height = canvasHeight;

  // Set the background color to transparent
  ctx.fillStyle = "rgba(0,0,0,0)"; // Transparent background
  ctx.fillRect(0, 0, textCanvas.width, textCanvas.height);

  const fontSize = size || 150;
  ctx.fillStyle = "#EFEFEF"; // Default text color
  ctx.font = `${fontWeight} ${fontSize}px "${font || "EVERETT"}"`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Enable high-quality text rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Ensure the text is split into exactly 3 lines
  const words = text.split(' ');
  const wordsPerLine = Math.ceil(words.length / 3); // Split into 3 lines
  const lines = [
    words.slice(0, wordsPerLine).join(' '),                     // First line
    words.slice(wordsPerLine, wordsPerLine * 2).join(' '),      // Second line
    words.slice(wordsPerLine * 2).join(' '),                    // Third line
  ];

  // Draw each line of text with proper vertical spacing (centered around canvas height)
  const startY = canvasHeight / 2 - (fontSize * (lines.length - 1)) / 2; // Center the 3 lines vertically

  lines.forEach((line, index) => {
    ctx.fillText(line.trim(), canvasWidth / 2, startY + (index * fontSize));
  });

  // Return the created canvas as a texture for Three.js
  return new THREE.CanvasTexture(textCanvas);
}

function initializeScene(texture) {
  scene = new THREE.Scene();

  // Create renderer with transparent background
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0); // Black color with 0 opacity (fully transparent)
  renderer.setPixelRatio(window.devicePixelRatio);
  textContainer.appendChild(renderer.domElement);

  // Create camera
  camera = new THREE.OrthographicCamera(
    window.innerWidth / -1,
    window.innerWidth / 1,
    window.innerHeight / 1,
    window.innerHeight / -1,
    0.1,
    1000
  );
  camera.position.z = 1;

  let shaderUniforms = {
    u_mouse: { type: "v2", value: new THREE.Vector2() },
    u_texture: { type: "t", value: texture },
  };

  // Create the plane mesh
  planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(window.innerWidth, window.innerHeight),
    new THREE.ShaderMaterial({
      uniforms: shaderUniforms,
      vertexShader,
      fragmentShader,
      transparent: true, // Make sure the shader is set to transparent
    })
  );

  scene.add(planeMesh);

  // Adjust size on load
  handleWindowResize();
}

const texture = createTextTexture("Join us on our media journey. Follow us for the latest updates, sneak peeks, and behind-the-scenes content.", "EVERETT", 200, "#FF0000", "bold");

initializeScene(createTextTexture(
    ("Join us on our media journey. Follow us for the latest updates, sneak peeks, and behind-the-scenes content."),
    "EVERETT", 
    200, // Font size (this should now directly affect the text size)
    "#ffffff00", // Transparent background color
    "600" // Font weight
  ));

function animateScene() {
  requestAnimationFrame(animateScene);

  mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
  mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

  planeMesh.material.uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y);

  renderer.render(scene, camera);
}

animateScene();

textContainer.addEventListener("mousemove", handleMouseMove);
textContainer.addEventListener("mouseenter", handleMouseEnter);
textContainer.addEventListener("mouseleave", handleMouseLeave);

function handleMouseMove(event) {
  const bounds = textContainer.getBoundingClientRect();
  targetMousePosition.x = (event.clientX - bounds.left) / bounds.width;
  targetMousePosition.y = (event.clientY - bounds.top) / bounds.height;
}

function handleMouseEnter(event) {
  const bounds = textContainer.getBoundingClientRect();
  targetMousePosition.x = (event.clientX - bounds.left) / bounds.width;
  targetMousePosition.y = (event.clientY - bounds.top) / bounds.height;

  console.log("Mouse entered the text area");
}

// This function handles resizing both the camera and the plane
function handleWindowResize() {
  const aspectRatio = window.innerWidth / window.innerHeight;

  // Update camera
  camera.left = window.innerWidth / -1;
  camera.right = window.innerWidth / 1;
  camera.top = window.innerHeight / 1;
  camera.bottom = window.innerHeight / -1;
  camera.updateProjectionMatrix();

  // Resize renderer
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Resize the plane to match the window size
  planeMesh.geometry.dispose(); // Dispose of the old geometry
  planeMesh.geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
  console.log("Window resized: updated camera, renderer, and plane geometry");
}

// Call the resize handler to set the correct initial size
window.addEventListener("resize", handleWindowResize);
