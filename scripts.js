// Just because I add all cripts in one file so othe index pagethe functionality for cntact page won't ork there and also for about page
// Like each functionality runs only if the element exists

function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (!timeElement) return; // Exit if element doesn't exist

  const now = new Date();

  const timeString = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const dateString = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  timeElement.textContent = `${timeString} - ${dateString}`;
}

const timeElement = document.querySelector('[data-testid="test-user-time"]');
if (timeElement) {
  updateTime();
  setInterval(updateTime, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  const socialLinks = document.querySelectorAll(
    '[data-testid="test-user-social-links"] a'
  );

  if (socialLinks.length > 0) {
    socialLinks.forEach((link) => {
      if (!link.hasAttribute("target")) {
        link.setAttribute("target", "_blank");
      }
      if (!link.hasAttribute("rel")) {
        link.setAttribute("rel", "noopener noreferrer");
      }
    });
  }
});

// Contact Page Scripts
const form = document.querySelector(".contact_form");

if (form) {
  const successMessage = document.querySelector(
    '[data-testid="test-contact-success"]'
  );

  const nameInput = document.querySelector('[data-testid="test-contact-name"]');
  const emailInput = document.querySelector(
    '[data-testid="test-contact-email"]'
  );
  const subjectInput = document.querySelector(
    '[data-testid="test-contact-subject"]'
  );
  const messageInput = document.querySelector(
    '[data-testid="test-contact-message"]'
  );

  const nameError = document.querySelector(
    '[data-testid="test-contact-error-name"]'
  );
  const emailError = document.querySelector(
    '[data-testid="test-contact-error-email"]'
  );
  const subjectError = document.querySelector(
    '[data-testid="test-contact-error-subject"]'
  );
  const messageError = document.querySelector(
    '[data-testid="test-contact-error-message"]'
  );

  function validateName() {
    const value = nameInput.value.trim();
    if (value === "") {
      showError(nameInput, nameError, "Please enter your full name");
      return false;
    }
    hideError(nameInput, nameError);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
      showError(emailInput, emailError, "Please enter your email address");
      return false;
    }

    if (!emailRegex.test(value)) {
      showError(emailInput, emailError, "Please enter a valid email address");
      return false;
    }

    hideError(emailInput, emailError);
    return true;
  }

  function validateSubject() {
    const value = subjectInput.value.trim();
    if (value === "") {
      showError(subjectInput, subjectError, "Please enter a subject");
      return false;
    }
    hideError(subjectInput, subjectError);
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (value === "") {
      showError(messageInput, messageError, "Please enter a message");
      return false;
    }

    if (value.length < 10) {
      showError(
        messageInput,
        messageError,
        "Message must be at least 10 characters long"
      );
      return false;
    }

    hideError(messageInput, messageError);
    return true;
  }

  function showError(input, errorElement, message) {
    input.classList.add("error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function hideError(input, errorElement) {
    input.classList.remove("error");
    errorElement.style.display = "none";
  }

  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  subjectInput.addEventListener("blur", validateSubject);
  messageInput.addEventListener("blur", validateMessage);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    successMessage.style.display = "none";

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      // Show success message
      successMessage.style.display = "block";
      successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => {
        form.reset();

        setTimeout(() => {
          successMessage.style.display = "none";
        }, 3000);
      }, 2000);
    } else {
      // Focus on the first invalid field
      if (!isNameValid) nameInput.focus();
      else if (!isEmailValid) emailInput.focus();
      else if (!isSubjectValid) subjectInput.focus();
      else if (!isMessageValid) messageInput.focus();
    }
  });
}
