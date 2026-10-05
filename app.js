/* ==========================================================================
   NEO-GEN AI APP - STREAMLINED JAVASCRIPT LOGIC
   Engine: Pollinations AI (https://image.pollinations.ai)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- State Variables ---
  let currentWidth = 1024;
  let currentHeight = 1024;
  let currentRatioLabel = '1:1';
  let selectedStyle = 'none';
  let currentImageUrl = '';
  let currentPrompt = '';

  // --- DOM Elements ---
  const tabCreateBtn = document.getElementById('tabCreateBtn');
  const tabGalleryBtn = document.getElementById('tabGalleryBtn');
  const createView = document.getElementById('createView');
  const galleryView = document.getElementById('galleryView');
  const galleryCountBadge = document.getElementById('galleryCountBadge');

  const promptInput = document.getElementById('promptInput');
  const randomPromptBtn = document.getElementById('randomPromptBtn');
  const clearPromptBtn = document.getElementById('clearPromptBtn');
  const toggleSettingsBtn = document.getElementById('toggleSettingsBtn');
  const settingsBadge = document.getElementById('settingsBadge');
  const settingsPanel = document.getElementById('settingsPanel');

  const ratioBtns = document.querySelectorAll('.ratio-btn');
  const customDimensions = document.getElementById('customDimensions');
  const customWidthInput = document.getElementById('customWidth');
  const customHeightInput = document.getElementById('customHeight');
  const styleCards = document.querySelectorAll('.style-card');
  const modelSelect = document.getElementById('modelSelect');
  const enhanceToggle = document.getElementById('enhanceToggle');
  const seedInput = document.getElementById('seedInput');
  const randomSeedBtn = document.getElementById('randomSeedBtn');
  const generateBtn = document.getElementById('generateBtn');

  // Stage & Preview elements
  const placeholderState = document.getElementById('placeholderState');
  const loadingState = document.getElementById('loadingState');
  const loadingStatusText = document.getElementById('loadingStatusText');
  const resultImage = document.getElementById('resultImage');
  const stageActions = document.getElementById('stageActions');
  const downloadBtn = document.getElementById('downloadBtn');
  const copyUrlBtn = document.getElementById('copyUrlBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const metaRatio = document.getElementById('metaRatio');
  const metaModel = document.getElementById('metaModel');

  // Gallery elements
  const galleryGrid = document.getElementById('galleryGrid');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');

  // Theme elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  // Modal elements
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalPromptTitle = document.getElementById('modalPromptTitle');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // --- Creative Prompts Samples ---
  const samplePrompts = [
    "A neon cyberpunk cat wearing futuristic goggles in a rain-slicked Tokyo alley",
    "A majestic floating island with waterfalls, glowing mushrooms, and ancient ruins in 3D Pixar style",
    "Neo-brutalism illustration of a retro robot drinking espresso in a sunny cafe, bold outlines, vibrant yellow",
    "A realistic majestic lion crowned with glowing cosmic stars, dramatic cinematic lighting, 8k",
    "A cozy miniature cottage inside a glowing glass terrarium, detailed fantasy art",
    "An astronaut surfing on cosmic waves made of stardust and colorful nebulae, synthwave style",
    "Cute samurai red panda holding a katana under cherry blossom trees, Japanese manga art style",
    "A vintage 1980s muscle car driving through a glowing synthwave grid at sunset"
  ];

  // --- Preset Style Map ---
  const stylePresetsMap = {
    'none': '',
    'neo-brutalist': ', neo-brutalism art style, bold black outlines, vibrant high-contrast colors',
    'anime': ', high quality anime illustration, studio ghibli style, vibrant colors',
    'cyberpunk': ', cyberpunk style, glowing neon lights, rain reflections, futuristic dark atmosphere',
    'photorealistic': ', photorealistic, 8k resolution, ultra detailed, professional studio lighting',
    '3d-render': ', 3d render, octan render, pixar animation style, soft volumetric lighting'
  };

  // --- Navigation Tabs Logic ---
  tabCreateBtn.addEventListener('click', () => {
    tabCreateBtn.classList.add('active');
    tabGalleryBtn.classList.remove('active');
    createView.style.display = 'flex';
    galleryView.style.display = 'none';
  });

  tabGalleryBtn.addEventListener('click', () => {
    tabGalleryBtn.classList.add('active');
    tabCreateBtn.classList.remove('active');
    galleryView.style.display = 'block';
    createView.style.display = 'none';
    renderGallery();
  });

  // --- Popover Settings Toggle ---
  toggleSettingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('active');
  });

  // --- Theme Toggle Logic ---
  const savedTheme = localStorage.getItem('neo_gen_theme') || 'light';
  setTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('neo_gen_theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // --- Aspect Ratio Selector Logic ---
  ratioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ratioBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const ratio = btn.dataset.ratio;
      currentRatioLabel = ratio;

      if (ratio === 'custom') {
        customDimensions.style.display = 'flex';
        currentWidth = parseInt(customWidthInput.value) || 1024;
        currentHeight = parseInt(customHeightInput.value) || 1024;
        settingsBadge.textContent = `${currentWidth}x${currentHeight}`;
      } else {
        customDimensions.style.display = 'none';
        currentWidth = parseInt(btn.dataset.w);
        currentHeight = parseInt(btn.dataset.h);
        settingsBadge.textContent = ratio;
      }
    });
  });

  customWidthInput.addEventListener('input', () => {
    currentWidth = parseInt(customWidthInput.value) || 1024;
    settingsBadge.textContent = `${currentWidth}x${currentHeight}`;
  });

  customHeightInput.addEventListener('input', () => {
    currentHeight = parseInt(customHeightInput.value) || 1024;
    settingsBadge.textContent = `${currentWidth}x${currentHeight}`;
  });

  // --- Style Presets ---
  styleCards.forEach(card => {
    card.addEventListener('click', () => {
      styleCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedStyle = card.dataset.style;
    });
  });

  // --- Prompt Controls ---
  randomPromptBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * samplePrompts.length);
    promptInput.value = samplePrompts[randomIndex];
    showToast('🎲 Prompt aléatoire choisi !');
  });

  clearPromptBtn.addEventListener('click', () => {
    promptInput.value = '';
    promptInput.focus();
  });

  randomSeedBtn.addEventListener('click', () => {
    seedInput.value = Math.floor(Math.random() * 99999999);
    showToast('🎲 Nouvelle graine seed !');
  });

  // Keypress Enter inside prompt input triggers generation
  promptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      generateImage();
    }
  });

  // --- GENERATE IMAGE FUNCTION ---
  generateBtn.addEventListener('click', generateImage);

  async function generateImage() {
    const userPrompt = promptInput.value.trim();
    if (!userPrompt) {
      showToast('⚠️ Veuillez d\'abord saisir une idée !');
      promptInput.focus();
      return;
    }

    // Close settings popover when generating
    settingsPanel.classList.remove('active');

    // Build prompt & parameters
    const styleModifier = stylePresetsMap[selectedStyle] || '';
    const fullPrompt = userPrompt + styleModifier;
    currentPrompt = userPrompt;

    const model = modelSelect.value;
    const enhance = enhanceToggle.checked;
    const seed = seedInput.value ? parseInt(seedInput.value) : Math.floor(Math.random() * 99999999);

    // Pollinations URL
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${currentWidth}&height=${currentHeight}&seed=${seed}&model=${model}&nologo=true&enhance=${enhance}`;

    // UI Loading State
    placeholderState.style.display = 'none';
    resultImage.classList.remove('loaded');
    resultImage.style.display = 'none';
    stageActions.style.display = 'none';
    loadingState.classList.add('active');

    generateBtn.disabled = true;
    generateBtn.textContent = '⏳ CREATION...';

    // Status message cycling
    const statusMessages = [
      'Connexion à Pollinations AI...',
      'Calcul des détails graphiques...',
      'Rendu des pixels haute définition...',
      'Finition Neo-Brutalism...'
    ];
    let msgIdx = 0;
    const statusInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % statusMessages.length;
      loadingStatusText.textContent = statusMessages[msgIdx];
    }, 1500);

    try {
      await preloadImage(imageUrl);

      currentImageUrl = imageUrl;
      resultImage.src = imageUrl;
      resultImage.style.display = 'block';
      resultImage.classList.add('loaded');

      metaRatio.textContent = `${currentWidth}x${currentHeight}`;
      metaModel.textContent = model.toUpperCase();
      stageActions.style.display = 'flex';

      // Save to History
      saveToHistory({
        url: imageUrl,
        prompt: userPrompt,
        width: currentWidth,
        height: currentHeight,
        model: model,
        seed: seed,
        timestamp: Date.now()
      });

      showToast('✨ Image créée avec succès !');

    } catch (error) {
      console.error('Image Generation Error:', error);
      showToast('❌ Erreur lors de la génération. Reessayez.');
      placeholderState.style.display = 'flex';
    } finally {
      clearInterval(statusInterval);
      loadingState.classList.remove('active');
      generateBtn.disabled = false;
      generateBtn.textContent = '🚀 GÉNÉRER';
    }
  }

  function preloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = (err) => reject(err);
      img.src = url;
    });
  }

  // --- ACTION BUTTONS ---
  downloadBtn.addEventListener('click', async () => {
    if (!currentImageUrl) return;
    try {
      downloadBtn.textContent = '⏳ Téléchargement...';
      const response = await fetch(currentImageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `neo-gen-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      showToast('📥 Image enregistrée dans votre PC !');
    } catch {
      window.open(currentImageUrl, '_blank');
    } finally {
      downloadBtn.textContent = '📥 Télécharger';
    }
  });

  copyUrlBtn.addEventListener('click', () => {
    if (!currentImageUrl) return;
    navigator.clipboard.writeText(currentImageUrl).then(() => {
      showToast('🔗 Lien direct copié !');
    });
  });

  fullscreenBtn.addEventListener('click', () => {
    if (!currentImageUrl) return;
    modalImage.src = currentImageUrl;
    modalPromptTitle.textContent = currentPrompt ? `"${currentPrompt}"` : 'IMAGE HD';
    imageModal.classList.add('active');
  });

  closeModalBtn.addEventListener('click', () => {
    imageModal.classList.remove('active');
  });

  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) imageModal.classList.remove('active');
  });

  // --- GALLERY & LOCALSTORAGE HISTORY ---
  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem('neo_gen_gallery') || '[]');
    } catch {
      return [];
    }
  }

  function saveToHistory(item) {
    let history = getHistory();
    history.unshift(item);
    if (history.length > 30) history = history.slice(0, 30);
    localStorage.setItem('neo_gen_gallery', JSON.stringify(history));
    updateGalleryCount();
  }

  function updateGalleryCount() {
    const history = getHistory();
    galleryCountBadge.textContent = history.length;
  }

  function renderGallery() {
    const history = getHistory();
    galleryGrid.innerHTML = '';
    updateGalleryCount();

    if (history.length === 0) {
      galleryGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2rem; text-align: center; font-weight: 700; opacity: 0.7;">
          Aucune image enregistrée pour le moment.
        </div>
      `;
      return;
    }

    history.forEach(item => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.innerHTML = `
        <img src="${item.url}" alt="${item.prompt}" loading="lazy" />
        <div class="gallery-card-overlay">
          <span>${item.width}x${item.height} • ${item.model || 'FLUX'}</span>
          <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.prompt}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        promptInput.value = item.prompt;
        currentImageUrl = item.url;
        currentPrompt = item.prompt;
        resultImage.src = item.url;
        resultImage.style.display = 'block';
        resultImage.classList.add('loaded');
        placeholderState.style.display = 'none';
        stageActions.style.display = 'flex';

        metaRatio.textContent = `${item.width}x${item.height}`;
        metaModel.textContent = (item.model || 'FLUX').toUpperCase();

        // Switch to Create View
        tabCreateBtn.click();
        showToast('🖼️ Prompt et image rechargés !');
      });

      galleryGrid.appendChild(card);
    });
  }

  clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Voulez-vous supprimer tout votre historique d\'images ?')) {
      localStorage.removeItem('neo_gen_gallery');
      renderGallery();
      showToast('🗑️ Galerie effacée !');
    }
  });

  // --- TOAST NOTIFICATION SYSTEM ---
  function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --- Initial Load ---
  updateGalleryCount();

});
