/**
 * DIVYESH - Personal Portfolio Scripts
 * OASIS INFOBYTE Internship - Level 1 Task 2
 * Author: Divyesh (B.Tech AIML)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Active Link on Scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  
  function highlightCurrentSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightCurrentSection);

  // 3. Navbar Background Elevation on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.borderBottomColor = 'rgba(56, 189, 248, 0.25)';
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    } else {
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
      navbar.style.boxShadow = 'none';
    }
  });

  // 4. Contact Form Interaction
  const contactForm = document.getElementById('portfolioContactForm');
  const formStatus = document.getElementById('formStatus');
  const sendBtn = document.getElementById('sendBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('msgSubject').value.trim();
      const message = document.getElementById('msgBody').value.trim();

      if (!name || !email || !subject || !message) {
        showStatus('Please fill out all fields before submitting.', false);
        return;
      }

      // Basic email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Please provide a valid email address.', false);
        return;
      }

      // Simulated sending feedback
      sendBtn.disabled = true;
      sendBtn.textContent = 'Sending message...';

      setTimeout(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send Message';
        showStatus(`Thank you, ${name}! Your message has been received successfully. I'll get back to you shortly at ${email}.`, true);
        contactForm.reset();

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 8000);
      }, 900);
    });
  }

  function showStatus(text, isSuccess) {
    if (!formStatus) return;
    formStatus.textContent = text;
    formStatus.style.display = 'block';
    if (isSuccess) {
      formStatus.className = 'form-status success';
    } else {
      formStatus.className = 'form-status';
      formStatus.style.background = 'rgba(239, 68, 68, 0.15)';
      formStatus.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      formStatus.style.color = '#f87171';
    }
  }
});
