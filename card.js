
const timeElement = document.querySelector('[data-testid="test-user-time"]');
const avatarElement = document.querySelector('[data-testid="test-user-avatar"]');
const socialLinks = document.querySelectorAll('[data-testid^="test-user-social-"]');

function updateTime() {
  const now = new Date(); // current date/time
  const formattedTime = now.toLocaleString(); 
  timeElement.textContent = formattedTime;
}

// Run immediately on page load
updateTime();

// Update every 1 second
setInterval(updateTime, 1000);

  

   const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';

  // Append input to body (needed for browser file picker)
  document.body.appendChild(fileInput);

  // Listen for file selection
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      avatarElement.src = imageURL; // update avatar to uploaded image
      avatarElement.alt = 'User uploaded profile photo';
    }
  });

  // Allow user to click avatar to trigger upload
  avatarElement.style.cursor = 'pointer';
  avatarElement.title = 'Click to change your avatar';
  avatarElement.addEventListener('click', () => fileInput.click());

 
  socialLinks.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

 