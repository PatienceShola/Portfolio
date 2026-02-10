// ================= HEADER ANIMATION =================
window.addEventListener("load", () => {
  const image = document.querySelector(".profile-photo");
  const headerRight = document.querySelector(".header-right");

  if (image) {
    image.style.transform = "translateX(0)";
  }

  if (headerRight) {
    headerRight.classList.add("show");
  }
});

// ================= SKILLS BAR ANIMATION =================
document.addEventListener("DOMContentLoaded", () => {
  const skillLevels = document.querySelectorAll(".skill-level");

  if (!skillLevels.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skill = entry.target;
          const level = skill.dataset.level;

          skill.style.width = level + "%";
          skill.textContent = level + "%";

          observer.unobserve(skill);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillLevels.forEach(skill => {
    skill.style.width = "0%";
    skill.textContent = "";
    observer.observe(skill);
  });
});

// ================= INTERVIEW FORM MODAL =================
document.addEventListener("DOMContentLoaded", () => {
  const interviewBtn = document.getElementById("interviewBtn");
  const interviewFormModal = document.getElementById("interviewForm");
  const closeForm = document.getElementById("closeForm");
  const formResponse = document.getElementById("formResponse");
  const actualForm = interviewFormModal?.querySelector("form");

  if (!interviewBtn || !interviewFormModal || !actualForm) return;

  // Open modal
  interviewBtn.addEventListener("click", () => {
    interviewFormModal.style.display = "flex";
    if (formResponse) formResponse.style.display = "none";
  });

  // Close modal
  closeForm?.addEventListener("click", () => {
    interviewFormModal.style.display = "none";
  });

  interviewFormModal.addEventListener("click", e => {
    if (e.target === interviewFormModal) {
      interviewFormModal.style.display = "none";
    }
  });

  // Formspree submission (FIXED)
  actualForm.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(actualForm);

    fetch(actualForm.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    })
      .then(response => {
        if (response.ok) {
          formResponse.textContent = "Request sent successfully! I’ll get back to you soon.";
          formResponse.style.color = "#4CAF50";
          formResponse.style.display = "block";
          actualForm.reset();
        } else {
          throw new Error("Submission failed");
        }
      })
      .catch(() => {
        formResponse.textContent = "Something went wrong. Please try again.";
        formResponse.style.color = "#ff4d4d";
        formResponse.style.display = "block";
      });
  });
});

// ================= CV MODAL =================
document.addEventListener("DOMContentLoaded", () => {
  const cvBtn = document.getElementById("cvBtn");
  const cvModal = document.getElementById("cvContent");
  const cvClose = cvModal?.querySelector(".cv-close");

  if (!cvBtn || !cvModal || !cvClose) return;

  cvBtn.addEventListener("click", () => {
    cvModal.style.display = "flex";
  });

  cvClose.addEventListener("click", () => {
    cvModal.style.display = "none";
  });

  cvModal.addEventListener("click", e => {
    if (e.target === cvModal) {
      cvModal.style.display = "none";
    }
  });
});