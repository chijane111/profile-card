// ============================================
// CONTACT FORM VALIDATION
// ============================================

// Get form and all input elements
const form = document.getElementById('contact-form');
const nameInput = document.querySelector('[data-testid="test-contact-name"]');
const emailInput = document.querySelector('[data-testid="test-contact-email"]');
const subjectInput = document.querySelector('[data-testid="test-contact-subject"]');
const messageInput = document.querySelector('[data-testid="test-contact-message"]');
const successMessage = document.querySelector('[data-testid="test-contact-success"]');

// Get error message elements
const nameError = document.querySelector('[data-testid="test-contact-error-name"]');
const emailError = document.querySelector('[data-testid="test-contact-error-email"]');
const subjectError = document.querySelector('[data-testid="test-contact-error-subject"]');
const messageError = document.querySelector('[data-testid="test-contact-error-message"]');

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validate that a field is not empty
 * @param {string} value - The field value to validate
 * @returns {boolean} - True if valid, false if empty
 */
function validateRequired(value) {
  return value.trim().length > 0;
}

/**
 * Validate email format using regex
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid email format
 */
function validateEmail(email) {
  // Email regex pattern: name@domain.extension
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate minimum length requirement
 * @param {string} value - The value to validate
 * @param {number} minLength - Minimum required length
 * @returns {boolean} - True if meets minimum length
 */
function validateMinLength(value, minLength) {
  return value.trim().length >= minLength;
}

// ============================================
// ERROR DISPLAY FUNCTIONS
// ============================================

/**
 * Show error message for a field
 * @param {HTMLElement} errorElement - The error message element
 * @param {HTMLElement} inputElement - The input field element
 * @param {string} message - The error message to display
 */
function showError(errorElement, inputElement, message) {
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  inputElement.setAttribute('aria-invalid', 'true');
  inputElement.classList.add('input-error');
}

/**
 * Clear error message for a field
 * @param {HTMLElement} errorElement - The error message element
 * @param {HTMLElement} inputElement - The input field element
 */
function clearError(errorElement, inputElement) {
  errorElement.textContent = '';
  errorElement.style.display = 'none';
  inputElement.setAttribute('aria-invalid', 'false');
  inputElement.classList.remove('input-error');
}

/**
 * Clear all error messages
 */
function clearAllErrors() {
  clearError(nameError, nameInput);
  clearError(emailError, emailInput);
  clearError(subjectError, subjectInput);
  clearError(messageError, messageInput);
}

// ============================================
// FIELD-SPECIFIC VALIDATION
// ============================================

/**
 * Validate the name field
 * @returns {boolean} - True if valid
 */
function validateName() {
  const value = nameInput.value;
  
  if (!validateRequired(value)) {
    showError(nameError, nameInput, 'Name is required');
    return false;
  }
  
  clearError(nameError, nameInput);
  return true;
}

/**
 * Validate the email field
 * @returns {boolean} - True if valid
 */
function validateEmailField() {
  const value = emailInput.value;
  
  if (!validateRequired(value)) {
    showError(emailError, emailInput, 'Email is required');
    return false;
  }
  
  if (!validateEmail(value)) {
    showError(emailError, emailInput, 'Please enter a valid email address (e.g., name@example.com)');
    return false;
  }
  
  clearError(emailError, emailInput);
  return true;
}

/**
 * Validate the subject field
 * @returns {boolean} - True if valid
 */
function validateSubject() {
  const value = subjectInput.value;
  
  if (!validateRequired(value)) {
    showError(subjectError, subjectInput, 'Subject is required');
    return false;
  }
  
  clearError(subjectError, subjectInput);
  return true;
}

/**
 * Validate the message field
 * @returns {boolean} - True if valid
 */
function validateMessage() {
  const value = messageInput.value;
  
  if (!validateRequired(value)) {
    showError(messageError, messageInput, 'Message is required');
    return false;
  }
  
  if (!validateMinLength(value, 10)) {
    showError(messageError, messageInput, 'Message must be at least 10 characters long');
    return false;
  }
  
  clearError(messageError, messageInput);
  return true;
}

/**
 * Validate entire form
 * @returns {boolean} - True if all fields are valid
 */
function validateForm() {
  // Validate all fields
  const isNameValid = validateName();
  const isEmailValid = validateEmailField();
  const isSubjectValid = validateSubject();
  const isMessageValid = validateMessage();
  
  // Return true only if ALL fields are valid
  return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
}

// ============================================
// FORM SUBMISSION
// ============================================

/**
 * Handle form submission
 * @param {Event} event - The submit event
 */
function handleSubmit(event) {
  // Prevent default form submission (page reload)
  event.preventDefault();
  
  // Clear previous errors
  clearAllErrors();
  
  // Validate form
  if (validateForm()) {
    // Form is valid - show success message
    showSuccessMessage();
    
    // Log form data to console (for testing)
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim(),
      timestamp: new Date().toISOString()
    };
    console.log('Form submitted successfully:', formData);
    
    // Clear form fields
    form.reset();
  } else {
    // Form is invalid - errors are already shown by validation functions
    console.log('Form validation failed');
    
    // Focus on first field with error
    if (nameError.textContent) {
      nameInput.focus();
    } else if (emailError.textContent) {
      emailInput.focus();
    } else if (subjectError.textContent) {
      subjectInput.focus();
    } else if (messageError.textContent) {
      messageInput.focus();
    }
  }
}

/**
 * Show success message and hide form
 */
function showSuccessMessage() {
  // Hide the form
  form.style.display = 'none';
  
  // Show success message
  successMessage.style.display = 'block';
  
  // Scroll to success message
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Optional: Reset and show form again after 5 seconds
  setTimeout(() => {
    successMessage.style.display = 'none';
    form.style.display = 'block';
  }, 5000);
}

// ============================================
// REAL-TIME VALIDATION (OPTIONAL)
// ============================================

/**
 * Add real-time validation on blur (when user leaves field)
 */
function addRealTimeValidation() {
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmailField);
  subjectInput.addEventListener('blur', validateSubject);
  messageInput.addEventListener('blur', validateMessage);
}

/**
 * Clear error when user starts typing
 */
function addInputListeners() {
  nameInput.addEventListener('input', () => {
    if (nameError.textContent) {
      clearError(nameError, nameInput);
    }
  });
  
  emailInput.addEventListener('input', () => {
    if (emailError.textContent) {
      clearError(emailError, emailInput);
    }
  });
  
  subjectInput.addEventListener('input', () => {
    if (subjectError.textContent) {
      clearError(subjectError, subjectInput);
    }
  });
  
  messageInput.addEventListener('input', () => {
    if (messageError.textContent) {
      clearError(messageError, messageInput);
    }
  });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize form validation
 */
function initContactForm() {
  console.log('Contact form initialized');
  
  // Add form submit event listener
  form.addEventListener('submit', handleSubmit);
  
  // Add real-time validation
  addRealTimeValidation();
  
  // Add input listeners to clear errors while typing
  addInputListeners();
  
  // Set initial aria-invalid to false
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input.setAttribute('aria-invalid', 'false');
  });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}