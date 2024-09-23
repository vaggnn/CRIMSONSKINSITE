document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.slide');
    
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = null;
    let currentIndex = 0;
  
    
    function dragStart(event) {
      event.preventDefault();
  
      if (event.type === 'touchstart') {
        startPosition = event.touches[0].clientY;
      } else {
        startPosition = event.clientY;
        isDragging = true;
      }
  
      carousel.style.transition = 'none';
      prevTranslate = currentTranslate;
  
      document.addEventListener('mousemove', dragMove);
      document.addEventListener('touchmove', dragMove);
      document.addEventListener('mouseup', dragEnd);
      document.addEventListener('touchend', dragEnd);
  
      cancelAnimationFrame(animationID);
    }
  
    function dragMove(event) {
      if (!isDragging) return;
  
      const currentPosition = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;
      const diff = currentPosition - startPosition;
  
      currentTranslate = prevTranslate + diff;
  
      // Limit scroll boundaries
      const minTranslate = -(slides.length - 1) * slides[0].offsetHeight;
      const maxTranslate = 0;
  
      if (currentTranslate < minTranslate) {
        currentTranslate = minTranslate;
      } else if (currentTranslate > maxTranslate) {
        currentTranslate = maxTranslate;
      }
  
      applyTransform(currentTranslate);
    }
  
    function applyTransform(translate) {
      carousel.style.transform = `translateY(${translate}px)`;
    }
  
    function dragEnd() {
      isDragging = false;
  
      // Snap to the nearest slide
      const slideHeight = slides[0].offsetHeight;
      const slideIndex = Math.round(currentTranslate / slideHeight);
      const targetTranslate = slideIndex * slideHeight;
  
      currentTranslate = targetTranslate;
      applyTransform(currentTranslate);
  
      carousel.style.transition = 'transform 0.5s ease-in-out';
  
      document.removeEventListener('mousemove', dragMove);
      document.removeEventListener('touchmove', dragMove);
      document.removeEventListener('mouseup', dragEnd);
      document.removeEventListener('touchend', dragEnd);
  
      animationID = requestAnimationFrame(autoScroll);
    }
  
    function autoScroll() {
      const slideHeight = slides[0].offsetHeight;
      const slideIndex = Math.round(currentTranslate / slideHeight);
      const targetTranslate = slideIndex * slideHeight;
  
      carousel.style.transition = 'transform 0.5s ease-in-out';
      applyTransform(targetTranslate);
  
      prevTranslate = currentTranslate = targetTranslate;
  
      currentIndex = Math.abs(Math.round(currentTranslate / slideHeight));
    }
  
    // Event listeners for dragging
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);
  
    // Prevent image drag behavior
    slides.forEach(slide => {
      slide.addEventListener('dragstart', e => e.preventDefault());
    });
  
    // Initial auto scroll on load
    animationID = requestAnimationFrame(autoScroll);
  
    // Ensure smooth scrolling on mouse wheel
    carousel.addEventListener('wheel', function(event) {
      event.preventDefault();
      
      const delta = Math.sign(event.deltaY);
      const slideHeight = slides[0].offsetHeight;
  
      // Calculate target slide index
      let targetIndex = currentIndex - delta;
  
      // Limit scroll boundaries
      const minIndex = 0;
      const maxIndex = slides.length - 1;
      targetIndex = Math.max(minIndex, Math.min(maxIndex, targetIndex));
      
      const targetTranslate = targetIndex * slideHeight;
  
      carousel.style.transition = 'transform 0.5s ease-in-out';
      applyTransform(targetTranslate);
  
      prevTranslate = currentTranslate = targetTranslate;
  
      currentIndex = targetIndex;
    });
  });
  