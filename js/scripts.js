document.addEventListener("DOMContentLoaded", function () {
  // Menu toggle functionality
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  function toggleMenu() {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("active");
  }

  menuToggle.addEventListener("click", toggleMenu);
  // end of - Menu toggle functionality

  // Smooth scrolling for navigation links
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      targetSection.scrollIntoView({
        behavior: "smooth",
      });

      // Close mobile menu after clicking a link
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    });
  });
  // end of - Smooth scrolling for navigation links

  // Lightbox functionality
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  // Get all project images
  const projectImages = document.querySelectorAll(".project img");

  // Add click event to each project image
  projectImages.forEach((img) => {
    img.addEventListener("click", function () {
      lightbox.style.display = "block";
      lightboxImg.src = this.src;
    });
  });

  // Close lightbox when clicking the close button
  closeBtn.addEventListener("click", function () {
    lightbox.style.display = "none";
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // Close lightbox with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.style.display === "block") {
      lightbox.style.display = "none";
    }
  });
  // end of - Lightbox functionality

  // Form validation
  const contactForm = document.getElementById("contact-form");
  const formInputs = contactForm.querySelectorAll("input, textarea");

  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      errorMessage: "Name must be at least 2 characters long",
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: "Please enter a valid email address",
    },
    message: {
      required: true,
      minLength: 10,
      errorMessage: "Message must be at least 10 characters long",
    },
  };

  function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const rules = validationRules[fieldName];

    // Check required
    if (rules.required && !fieldValue) {
      showError(
        field,
        fieldName,
        `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
      );
      return false;
    }

    // Check pattern (email)
    if (rules.pattern && !rules.pattern.test(fieldValue)) {
      showError(field, fieldName, rules.errorMessage);
      return false;
    }

    // Check length
    if (rules.minLength && fieldValue.length < rules.minLength) {
      showError(field, fieldName, rules.errorMessage);
      return false;
    }

    // Field is valid
    field.classList.remove("invalid");
    field.classList.add("valid");
    return true;
  }

  function showError(field, fieldName, message) {
    field.classList.remove("valid");
    field.classList.add("invalid");

    const errorDiv = document.querySelector(
      `.error-message[data-name="${fieldName}"]`
    );
    errorDiv.textContent = message;
  }

  // Real-time validation
  formInputs.forEach((input) => {
    input.addEventListener("blur", () => {
      validateField(input);
    });

    input.addEventListener("input", () => {
      // Remove error styling while typing
      input.classList.remove("invalid", "valid");
    });
  });

  // Form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    formInputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Here you would typically send the form data to a server
      alert("Form submitted successfully!");
      contactForm.reset();
      formInputs.forEach((input) => {
        input.classList.remove("valid", "invalid");
      });
    }
  });
  // end of - Form validation
});
