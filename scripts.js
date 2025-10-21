function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
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

updateTime();

setInterval(updateTime, 1000);

document.addEventListener("DOMContentLoaded", function () {
  const socialLinks = document.querySelectorAll(
    '[data-testid="test-user-social-links"] a'
  );
  socialLinks.forEach((link) => {
    if (!link.hasAttribute("target")) {
      link.setAttribute("target", "_blank");
    }
    if (!link.hasAttribute("rel")) {
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
});
