// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();
// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(71, window.innerWidth / window.innerHeight, 1, 1000);

// Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 5;
let mouseY = window.innerHeight / 3;

// Keep the 3D object on a global variable so we can access it later
let object;

// OrbitControls allow the camera to move around the scene
let controls;

// Set which object to render
let objToRender = 'keri';

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Load the file
loader.load(
  `models/${objToRender}/scene.glb`,
  function (gltf) {
    // If the file is loaded, add it to the scene
    object = gltf.scene;


    
    // Create a video element and texture
    const video = document.createElement('video');
    video.src = '../MEDIA2/videos/ForLogoAllAnims.mp4'; // Specify the path to your video file
    video.loop = true; // Loop the video
    video.load(); // Load the video
    video.play(); // Play the video

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;
    videoTexture.flipY = false; // Correct the upside-down issue

    // Apply the video texture to the object's material
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          map: videoTexture,
        });
      }
    });

    scene.add(object);

    object.scale.set(1, 1, 1);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Set how far the camera will be from the 3D model
camera.position.z = objToRender === "keri" ? 2.3 : 500;

// Add lights to the scene, so we can actually see the 3D model

const topLight = new THREE.DirectionalLight(0xffffff, 50); // (color, intensity)
topLight.position.set(50, 50, 50); // top-left-ish
topLight.castShadow = true;
scene.add(topLight);



const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "keri" ? 5 : 1);
scene.add(ambientLight);




// Render the scene
function animate() {
  requestAnimationFrame(animate);
 

  // Make the eye move
  if (object && objToRender === "keri") {
    
    // I've played with the constants here until it looked good 
    object.rotation.y = -0.1 + mouseX / window.innerWidth * 0.5;
    object.rotation.x = 0.2 + mouseY / window.innerWidth * 0.5;
  }
  renderer.render(scene, camera);
  
}

// Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

// Start the 3D rendering
animate();
