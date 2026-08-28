/**
 * Warit Saritdichainanta — Neo-Brutalist Portfolio Scripts
 * Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Project Detail Data Store
  const projectDetails = {
    'line-bot': {
      category: 'AI & AUTOMATION',
      year: '2026',
      title: 'LINE Receipt & Expense Tracker Bot',
      tagline: 'An intelligent personal finance assistant in LINE that eliminates manual expense tracking through AI-powered receipt & banking slip recognition.',
      tags: [
        { name: 'Node.js', class: 'tag-cyan' },
        { name: 'LINE API', class: 'tag-yellow' },
        { name: 'Claude / Gemini Vision', class: 'tag-pink' },
        { name: 'Google Sheets API', class: 'tag-mint' },
        { name: 'Webhooks', class: 'tag-cyan' }
      ],
      architecture: [
        'LINE User (Slip/Receipt)',
        'Node.js Webhook Server',
        'Gemini Vision OCR & Parsing',
        'Google Sheets Ledger'
      ],
      highlights: [
        'Engineered an event-driven webhook pipeline that parses receipts and Thai mobile banking slips in under 2 seconds.',
        'Designed structured prompts with strict JSON validation to accurately extract merchant, category, date, and amount in THB.',
        'Built automated Google Sheets synchronization, custom text commands (/summary, /status), and weekly spending insights.'
      ],
      sourceUrl: 'https://github.com/warit44512-ux/receipt-bot'
    },
    'rest-api': {
      category: 'BACKEND & SECURITY',
      year: '2026',
      title: 'Secure RESTful API & Authentication Service',
      tagline: 'A modular, high-performance backend service featuring JWT authentication, role-based access control (RBAC), and persistent database storage.',
      tags: [
        { name: 'Node.js', class: 'tag-cyan' },
        { name: 'Express', class: 'tag-yellow' },
        { name: 'JWT', class: 'tag-pink' },
        { name: 'SQLite / SQL', class: 'tag-mint' },
        { name: 'RBAC Security', class: 'tag-cyan' }
      ],
      architecture: [
        'Client Request',
        'JWT Auth & Rate Limiting',
        'Controller Layer',
        'SQL Persistence Layer'
      ],
      highlights: [
        'Engineered secure authentication using bcrypt password hashing (10 salt rounds) and stateless JWT verification tokens.',
        'Implemented Role-Based Access Control (RBAC) middleware to guard administrative routes and prevent unauthorized access.',
        'Added payload validation, centralized error handling, and structured SQL queries with parameterized injection protection.'
      ],
      sourceUrl: 'https://github.com/warit44512-ux'
    }
  };

  // 2. Interactive Modal Elements & Handlers
  const modal = document.getElementById('projectModal');
  const modalCategory = document.getElementById('modalCategory');
  const modalYear = document.getElementById('modalYear');
  const modalTitle = document.getElementById('modalTitle');
  const modalTagline = document.getElementById('modalTagline');
  const modalTags = document.getElementById('modalTags');
  const modalArchFlow = document.getElementById('modalArchFlow');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalSourceBtn = document.getElementById('modalSourceBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalSecondaryCloseBtn = document.getElementById('modalSecondaryCloseBtn');

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !modal) return;

    // Populate data
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalYear) modalYear.textContent = data.year;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalTagline) modalTagline.textContent = data.tagline;

    // Render tags
    if (modalTags) {
      modalTags.innerHTML = data.tags
        .map(t => `<span class="nb-tag ${t.class}">${t.name}</span>`)
        .join('');
    }

    // Render architecture flow
    if (modalArchFlow) {
      modalArchFlow.innerHTML = data.architecture
        .map((step, idx) => {
          const arrow = idx < data.architecture.length - 1 ? '<span class="arch-arrow">➔</span>' : '';
          return `<span class="arch-node">${step}</span>${arrow}`;
        })
        .join('');
    }

    // Render highlights
    if (modalHighlights) {
      modalHighlights.innerHTML = data.highlights
        .map(h => `<li>${h}</li>`)
        .join('');
    }

    // Source link
    if (modalSourceBtn) {
      modalSourceBtn.href = data.sourceUrl;
    }

    // Display modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach demo/overview button listeners
  const demoButtons = document.querySelectorAll('.demo-btn');
  demoButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      if (projectId && projectDetails[projectId]) {
        openProjectModal(projectId);
      } else {
        const projName = btn.getAttribute('data-project') || 'Project';
        showToast(`⚡ Viewing: ${projName}`);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalSecondaryCloseBtn) modalSecondaryCloseBtn.addEventListener('click', closeProjectModal);

  // Close when clicking outside dialog
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // 3. One-Click Copy Email to Clipboard
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

  // 4. Smooth Navigation
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
