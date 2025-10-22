 // ============================================
// ABOUT PAGE - JAVASCRIPT
// ============================================

/**
 * Initialize About Page
 * Verify all required sections exist with correct data-testids
 */
function initAboutPage() {
  console.log('About page initialized');
  
  // Verify all required sections exist
  const verification = verifyAboutSections();
  console.log('Section Verification:', verification);
  
  // Add smooth scroll behavior for any internal links
  addSmoothScroll();
  
  // Add animation on scroll (optional)
  addScrollAnimations();
}

/**
 * Verify all required about page sections exist
 * @returns {Object} - Verification results for each section
 */
function verifyAboutSections() {
  const requiredSections = {
    'test-about-page': document.querySelector('[data-testid="test-about-page"]'),
    'test-about-bio': document.querySelector('[data-testid="test-about-bio"]'),
    'test-about-goals': document.querySelector('[data-testid="test-about-goals"]'),
    'test-about-confidence': document.querySelector('[data-testid="test-about-confidence"]'),
    'test-about-future-note': document.querySelector('[data-testid="test-about-future-note"]'),
    'test-about-extra': document.querySelector('[data-testid="test-about-extra"]')
  };
  
  const verification = {};
  for (const [testid, element] of Object.entries(requiredSections)) {
    verification[testid] = element ? '✓ Found' : '✗ Missing';
  }
  
  return verification;
}

/**
 * Add smooth scrolling behavior for internal links
 */
function addSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Add fade-in animations when sections come into view
 */
function addScrollAnimations() {
  // Check if browser supports Intersection Observer
  if (!('IntersectionObserver' in window)) {
    console.log('Intersection Observer not supported');
    return;
  }
  
  const sections = document.querySelectorAll('.about-section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Set initial state and observe
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

/**
 * Get all about page content as an object
 * Useful for potential future features (export, print, etc.)
 * @returns {Object} - About page content
 */
function getAboutContent() {
  const bioSection = document.querySelector('[data-testid="test-about-bio"]');
  const goalsSection = document.querySelector('[data-testid="test-about-goals"]');
  const confidenceSection = document.querySelector('[data-testid="test-about-confidence"]');
  const futureNoteSection = document.querySelector('[data-testid="test-about-future-note"]');
  const extraSection = document.querySelector('[data-testid="test-about-extra"]');
  
  return {
    bio: bioSection ? bioSection.textContent.trim() : '',
    goals: goalsSection ? bioSection.textContent.trim() : '',
    confidence: confidenceSection ? confidenceSection.textContent.trim() : '',
    futureNote: futureNoteSection ? futureNoteSection.textContent.trim() : '',
    extra: extraSection ? extraSection.textContent.trim() : ''
  };
}

/**
 * Print About Page (optional feature)
 */
function printAboutPage() {
  window.print();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAboutPage);
} else {
  initAboutPage();
}