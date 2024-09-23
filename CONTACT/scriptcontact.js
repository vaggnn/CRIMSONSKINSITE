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




let elements = document.querySelectorAll('.rolling-text');

elements.forEach(element => {
  let innerText = element.innerText;
  element.innerHTML = '';
  
  let textContainer = document.createElement('div');
  textContainer.classList.add('block');
  
  for (let letter of innerText) {
    let span = document.createElement('span');
    span.innerText = letter.trim() === '' ? '\xa0' : letter;
    span.classList.add('letter');
    textContainer.appendChild(span);
  }
  
  element.appendChild(textContainer);
  element.appendChild(textContainer.cloneNode(true)); // Clone for repeating effect
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









