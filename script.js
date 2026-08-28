/**
 * Warit Saritdichainanta — Neo-Brutalist Portfolio Scripts
 * Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. One-Click Copy Email to Clipboard
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyLabel = document.getElementById('copyLabel');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const emailAddress = 'warit.dev@gmail.com';

  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('active');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 2400);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        if (copyLabel) copyLabel.textContent = 'COPIED!';
        showToast('📋 Email copied: ' + emailAddress);

        setTimeout(() => {
          if (copyLabel) copyLabel.textContent = 'Copy Email';
        }, 2000);
      } catch {
        window.location.href = `mailto:${emailAddress}`;
      }
    });
  }

  // 2. Project Card Overview Action
  const demoButtons = document.querySelectorAll('.demo-btn');
  demoButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projName = btn.getAttribute('data-project') || 'Project';
      showToast(`⚡ Viewing overview for: ${projName}`);
    });
  });

  // 3. Smooth Navigation
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      try {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (err) {
        // Fallback for non-standard selector
      }
    });
  });
});
