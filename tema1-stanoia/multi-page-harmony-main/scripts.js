
// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  // Year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Change hamburger to X
      const bars = menuBtn.querySelectorAll('.bar');
      bars[0].classList.toggle('rotate-45');
      bars[0].classList.toggle('translate-y-2');
      bars[1].classList.toggle('opacity-0');
      bars[2].classList.toggle('-rotate-45');
      bars[2].classList.toggle('-translate-y-2');
    });
  }

  // Header scroll effect
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        header.style.boxShadow = 'none';
      }
    });
  }

  // Contact form validation and submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (!field.value.trim()) {
          isValid = false;
          formGroup.classList.add('error');
          errorMessage.textContent = 'This field is required';
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
          isValid = false;
          formGroup.classList.add('error');
          errorMessage.textContent = 'Please enter a valid email address';
        } else {
          formGroup.classList.remove('error');
          errorMessage.textContent = '';
        }
      });
      
      if (isValid) {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('span:not(.spinner)');
        const spinner = submitButton.querySelector('.spinner');
        
        buttonText.textContent = 'Sending...';
        spinner.classList.remove('hidden');
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(function() {
          // Reset form
          contactForm.reset();
          
          // Reset button
          buttonText.textContent = 'Send Message';
          spinner.classList.add('hidden');
          submitButton.disabled = false;
          
          // Show success message
          showToast('success', 'Message Sent', 'Thank you for reaching out. We\'ll get back to you shortly.');
        }, 1500);
      }
    });

    // Live validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
      input.addEventListener('blur', function() {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (input.required && !input.value.trim()) {
          formGroup.classList.add('error');
          errorMessage.textContent = 'This field is required';
        } else if (input.type === 'email' && !isValidEmail(input.value) && input.value.trim()) {
          formGroup.classList.add('error');
          errorMessage.textContent = 'Please enter a valid email address';
        } else {
          formGroup.classList.remove('error');
          errorMessage.textContent = '';
        }
      });
    });
  }

  // Toast notification
  const toast = document.getElementById('toast');
  const toastClose = document.querySelector('.toast-close');
  
  if (toast && toastClose) {
    toastClose.addEventListener('click', function() {
      toast.classList.remove('show');
    });
  }
});

// Helper functions
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showToast(type, title, message) {
  const toast = document.getElementById('toast');
  const toastTitle = toast.querySelector('.toast-message h4');
  const toastMessage = toast.querySelector('.toast-message p');
  const toastIcon = toast.querySelector('.toast-icon');
  
  // Update toast content
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  
  // Update toast type
  toastIcon.className = 'toast-icon ' + type;
  
  // Show toast
  toast.classList.add('show');
  
  // Hide toast after 5 seconds
  setTimeout(function() {
    toast.classList.remove('show');
  }, 5000);
}
