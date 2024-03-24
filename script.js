function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Get the blobs
const blobs = Array.from(document.querySelectorAll('.blob'));

// Initialize the state of each blob
blobs.forEach((blob, index) => {
  blob.style.position = 'fixed'; // Make sure the blobs are positioned relative to the viewport
  blob.x = Math.random() * (window.innerWidth - blob.offsetWidth); // Random initial x position, adjusted for blob size
  blob.y = Math.random() * (window.innerHeight - blob.offsetHeight); // Random initial y position, adjusted for blob size
  
  // Different velocity for each blob
  switch(index) {
    case 0:
      blob.dx = 0.12; // Slightly faster velocity
      blob.dy = 0.12; // Slightly faster velocity
      break;
    case 1:
      blob.dx = -0.12; // Slightly faster velocity
      blob.dy = -0.12; // Slightly faster velocity
      break;
    default:
      blob.dx = (Math.random() - 0.5) / 5; // Random velocity for any additional blobs
      blob.dy = (Math.random() - 0.5) / 5;
      break;
  }
});
// The main animation loop
function animate() {
  blobs.forEach(blob => {
    // Update the position of the blob
    blob.x += blob.dx;
    blob.y += blob.dy;
    blob.style.left = `${blob.x}px`;
    blob.style.top = `${blob.y}px`;

    // Change the shape of the blob
    blob.style.borderRadius = `${Math.random() * 200}% ${Math.random() * 200}% ${Math.random() * 200}% ${Math.random() * 200}% / ${Math.random() * 200}% ${Math.random() * 200}% ${Math.random() * 200}% ${Math.random() * 200}%`;

    // Change the color of the blob
    let time = Date.now() * 0.001; // Get the current time (in seconds)
    let value = Math.sin(time) * 0.5 + 0.5; // Calculate a value that oscillates between 0 and 1
    let r = Math.floor(128 * value); // Interpolate between 128 (for purple) and 0 (for blue)
    let b = Math.floor(255 * (1 - value)); // Interpolate between 255 (for purple) and 255 (for blue)
    blob.style.backgroundColor = `rgb(${r}, 0, ${b})`;

    // Reverse the direction of the blob if it hits the edge of the viewport
    if (blob.x < 0 || blob.x + blob.offsetWidth > window.innerWidth) {
      blob.dx *= -1;
    }
    if (blob.y < 0 || blob.y + blob.offsetHeight > window.innerHeight) {
      blob.dy *= -1;
    }
  });

  // Call animate again on the next frame
  requestAnimationFrame(animate);
}

// Start the animation
animate();
// The main animation loop
function animate() {
  blobs.forEach(blob => {
    // Update the position of the blob
    blob.x += blob.dx;
    blob.y += blob.dy;

    // If the blob hits the edge of the viewport, reverse its direction and adjust its position
    if (blob.x < 0) {
      blob.dx *= -1;
      blob.x = 0;
    } else if (blob.x + blob.offsetWidth > window.innerWidth) {
      blob.dx *= -1;
      blob.x = window.innerWidth - blob.offsetWidth;
    }
    if (blob.y < 0) {
      blob.dy *= -1;
      blob.y = 0;
    } else if (blob.y + blob.offsetHeight > window.innerHeight) {
      blob.dy *= -1;
      blob.y = window.innerHeight - blob.offsetHeight;
    }

    blob.style.left = `${blob.x}px`;
    blob.style.top = `${blob.y}px`;
  });

  // Request the next animation frame
  requestAnimationFrame(animate);
}