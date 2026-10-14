/**
 * ============================================================
 * SHERLY'S BIRTHDAY WORLD - INTERACTIVE JAVASCRIPT
 * Pure Vanilla JS, Zero dependencies, 100% offline & Cloudflare ready
 * ============================================================
 */

// --- 1. PERSONALIZATION CONFIGURATION ---
// You can edit any of these details directly here or via the Settings menu!
const sherlyConfig = {
  name: "Sherly",
  // Secret 4-digit PIN to unlock the app (Option 2)
  passcode: "1105",
  passcodeHint: "Hint: Sherly's birthday month & day (MMDD) ♡",

  // Format: YYYY-MM-DD. If left empty, defaults to 30 days from today so the countdown is always active!
  birthdayDate: "2026-11-05",
  
  // Music Details
  song: {
    title: "Better Days",
    artist: "SZA",
    duration: "3:52",
    spotifyUrl: "https://open.spotify.com/"
  },

  // 6 Wireframe Mystery Gift Boxes
  gifts: [
    {
      id: 1,
      type: "Compliment",
      sub: "Because you're amazing ♡",
      icon: "🎀",
      boxClass: "box-pink",
      modalIcon: "🌸",
      title: "A Little Reminder ♡",
      message: "You are appreciated more than you know. Your smile, your kindness, and the warmth you give to everyone around you makes the world genuinely brighter. Never forget how special you are!"
    },
    {
      id: 2,
      type: "Funny Moment",
      sub: "A little laugh for you 😊",
      icon: "🎁",
      boxClass: "box-lavender",
      modalIcon: "😂",
      title: "Birthday Law #1",
      message: "It is legally and scientifically proven: calories on your birthday do not count, questionable dance moves are strictly encouraged, and eating dessert before dinner is required!"
    },
    {
      id: 3,
      type: "Photo",
      sub: "A special memory 📷",
      icon: "📷",
      boxClass: "box-mint",
      modalIcon: "📸",
      title: "Golden Memories",
      message: "Looking back at all the laughs, silly stories, and moments we shared... every single one brings a smile. Here's to making a hundred more unforgettable memories together!"
    },
    {
      id: 4,
      type: "Challenge",
      sub: "Something fun for you ⭐",
      icon: "🌟",
      boxClass: "box-gold",
      modalIcon: "✨",
      title: "Your Birthday Quest",
      message: "Your special mission today: pause whatever you're doing, get your absolute favorite sweet treat or beverage, snap a cute selfie, and treat yourself like the queen you are!"
    },
    {
      id: 5,
      type: "Message",
      sub: "From your friends ✉️",
      icon: "💌",
      boxClass: "box-magenta",
      modalIcon: "💖",
      title: "From The Heart",
      message: "I hope this new chapter brings you peace in your heart, endless reasons to laugh, and adventures that take your breath away. You deserve every good thing coming your way."
    },
    {
      id: 6,
      type: "Surprise",
      sub: "The best is saved for last... ?",
      icon: "❓",
      boxClass: "box-violet",
      modalIcon: "✨",
      title: "Almost There!",
      message: "You've unlocked all the mystery boxes! There is one grand final surprise waiting for you. Head to 'The Final Surprise' screen in the menu to see it!"
    }
  ],

  // Memories Scrapbook
  memories: {
    photos: [
      {
        image: "images/photo1.jpg",
        caption: "Good vibes only ♡",
        emoji: "🌅",
        bg: "linear-gradient(135deg, #ffd3b6, #ffaaa5)"
      },
      {
        image: "images/photo2.jpg",
        caption: "Same chaos forever that's us ♡",
        emoji: "🐱",
        bg: "linear-gradient(135deg, #e8dff5, #fce1e4)"
      },
      {
        image: "images/photo3.jpg",
        caption: "So lucky to have you in my life ♡",
        emoji: "✨",
        bg: "linear-gradient(135deg, #b5ead7, #c7ceea)"
      }
    ],
    moments: [
      {
        icon: "☕",
        title: "Late night coffee & deep talks",
        desc: "When an hour of catching up somehow turned into three hours of laughing."
      },
      {
        icon: "🚗",
        title: "Singing along with no lyrics",
        desc: "Blasting our favorite songs and making up half the words on the spot."
      },
      {
        icon: "🍕",
        title: "The endless food debates",
        desc: "Spending 40 minutes deciding what to eat, only to order our usual anyway."
      }
    ],
    messages: [
      { note: "Sherly, your energy is infectious! Never change. ♡", color: "sticky-pink" },
      { note: "Happy Birthday to the most resilient and kind soul! 🌟", color: "sticky-yellow" },
      { note: "Wishing you a year filled with big wins & small moments of pure joy. ✨", color: "sticky-purple" },
      { note: "Always grateful for you and your huge heart! 🌷", color: "sticky-mint" }
    ]
  },

  // Final Surprise Modal
  finalSurprise: {
    title: "Happy Birthday Sherly! 🎉",
    message: "You unlocked the final surprise! ♡\n\nYou mean the world to everyone around you. May your year be blessed with great health, boundless joy, and dreams coming true. Here is your special birthday wish, sent with all the love in the world! 🎂✨"
  }
};

// Load saved settings if any
try {
  const savedBirthday = localStorage.getItem("sherly_birthday");
  if (savedBirthday) sherlyConfig.birthdayDate = savedBirthday;
  const savedName = localStorage.getItem("sherly_name");
  if (savedName) sherlyConfig.name = savedName;
  const savedPasscode = localStorage.getItem("sherly_passcode");
  if (savedPasscode) sherlyConfig.passcode = savedPasscode;
  const savedHint = localStorage.getItem("sherly_hint");
  if (savedHint) sherlyConfig.passcodeHint = savedHint;
  const savedTitle = localStorage.getItem("sherly_song_title");
  if (savedTitle) sherlyConfig.song.title = savedTitle;
  const savedArtist = localStorage.getItem("sherly_song_artist");
  if (savedArtist) sherlyConfig.song.artist = savedArtist;
  const savedSpotify = localStorage.getItem("sherly_song_spotify");
  if (savedSpotify) sherlyConfig.song.spotifyUrl = savedSpotify;
  const savedAudio = localStorage.getItem("sherly_custom_audio");
  if (savedAudio) sherlyConfig.song.audioSrc = savedAudio;
} catch (e) {
  console.log("Local storage not accessible", e);
}

// --- 2. SOUND EFFECTS (Web Audio API - Zero External Files Required) ---
class SoundFX {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }
  playChime() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.18, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.6);
    });
  }
}
const sfx = new SoundFX();

// --- 3. BUILT-IN CONFETTI GENERATOR (Pure Canvas Confetti) ---
function fireConfetti() {
  let canvas = document.getElementById("confettiCanvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "confettiCanvas";
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#f472b6", "#a855f7", "#38bdf8", "#fbbf24", "#34d399", "#f43f5e"];
  const particles = [];
  const particleCount = 80;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      w: Math.random() * 9 + 5,
      h: Math.random() * 9 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 16,
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 12,
      alpha: 1,
      shape: Math.random() > 0.4 ? "rect" : "circle"
    });
  }

  let animationFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeParticles = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rot += p.vrot;
      p.alpha -= 0.012;

      if (p.alpha > 0) {
        activeParticles++;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      }
    });

    if (activeParticles > 0) {
      animationFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }
  render();
}

// --- 4. NAVIGATION ROUTER & SCREEN SWITCHING ---
const screenTitles = {
  "screen-home": "Sherly's World",
  "screen-countdown": "Birthday Countdown",
  "screen-memories": "Our Memories",
  "screen-gifts": "Birthday Gifts",
  "screen-music": "Music",
  "screen-letter": "A Letter for You",
  "screen-surprise": "The Final Surprise"
};

function navigateToScreen(targetId) {
  const screens = document.querySelectorAll(".screen-view");
  screens.forEach(s => s.classList.remove("active"));

  const targetScreen = document.getElementById(targetId);
  if (targetScreen) {
    targetScreen.classList.add("active");
    // Scroll viewport to top
    const viewport = document.querySelector(".screens-viewport");
    if (viewport) viewport.scrollTop = 0;
  }

  // Update header title
  const headerTitle = document.getElementById("headerTitle");
  if (headerTitle) {
    headerTitle.textContent = screenTitles[targetId] || "Sherly's World";
  }

  // Update Bottom Nav bar active state
  document.querySelectorAll(".nav-tab").forEach(tab => {
    if (tab.dataset.target === targetId) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // Update Side Drawer active state
  document.querySelectorAll(".drawer-item").forEach(item => {
    if (item.dataset.target === targetId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Close Side Drawer if open
  closeDrawer();
}

// Attach all navigation triggers
document.addEventListener("DOMContentLoaded", () => {
  // Elements with data-target attribute
  document.querySelectorAll("[data-target]").forEach(elem => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      const target = elem.dataset.target;
      if (target) navigateToScreen(target);
    });
  });

  // Heart button on header triggers mini celebration
  const heartBtn = document.getElementById("headerHeartBtn");
  if (heartBtn) {
    heartBtn.addEventListener("click", () => {
      sfx.playChime();
      fireConfetti();
    });
  }

  // Explore button on home screen
  const exploreBtn = document.getElementById("exploreBtn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      navigateToScreen("screen-countdown");
    });
  }

  initSideDrawer();
  initCountdown();
  renderMemories();
  renderGifts();
  initMusicPlayer();
  initSurprise();
  initSettings();
  initLockScreen();
});

// --- 5. SIDE DRAWER MENU (Screen 8) ---
function initSideDrawer() {
  const drawer = document.getElementById("sideDrawer");
  const overlay = document.getElementById("drawerOverlay");
  const openBtn = document.getElementById("menuToggleBtn");
  const closeBtn = document.getElementById("closeDrawerBtn");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      drawer.classList.add("open");
      overlay.classList.add("active");
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);
}

function closeDrawer() {
  const drawer = document.getElementById("sideDrawer");
  const overlay = document.getElementById("drawerOverlay");
  if (drawer) drawer.classList.remove("open");
  if (overlay) overlay.classList.remove("active");
}

// --- 6. BIRTHDAY COUNTDOWN (Screen 2) ---
function initCountdown() {
  function calculate() {
    let targetDateStr = sherlyConfig.birthdayDate;
    
    // If not set, set default to 30 days from now
    if (!targetDateStr) {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 30);
      targetDateStr = defaultDate.toISOString().split("T")[0];
    }

    const now = new Date();
    let target = new Date(`${targetDateStr}T00:00:00`);

    // If target is in the past, roll over to the next year
    if (target < now) {
      const nextYear = now.getFullYear() + 1;
      const monthDay = targetDateStr.slice(4);
      target = new Date(`${nextYear}${monthDay}T00:00:00`);
    }

    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const cdDays = document.getElementById("cdDays");
    const cdHours = document.getElementById("cdHours");
    const cdMinutes = document.getElementById("cdMinutes");
    const cdSeconds = document.getElementById("cdSeconds");
    const badge = document.getElementById("countdownStatusBadge");

    if (cdDays) cdDays.textContent = String(days).padStart(2, "0");
    if (cdHours) cdHours.textContent = String(hours).padStart(2, "0");
    if (cdMinutes) cdMinutes.textContent = String(minutes).padStart(2, "0");
    if (cdSeconds) cdSeconds.textContent = String(seconds).padStart(2, "0");

    if (diff <= 0 && badge) {
      badge.textContent = "🎉 Happy Birthday Sherly! Today is the day! ♡";
    }
  }

  calculate();
  setInterval(calculate, 1000);
}

// --- 7. MEMORIES SECTION WITH 3 TABS (Screen 3) ---
function renderMemories() {
  // Tab switching
  const tabs = document.querySelectorAll(".tab-pill");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const targetTabId = `tab-${tab.dataset.tab}`;
      document.querySelectorAll(".tab-pane").forEach(pane => {
        pane.classList.toggle("active", pane.id === targetTabId);
      });
    });
  });

  // Load photos from localStorage if customized
  let storedPhotos = null;
  try {
    storedPhotos = JSON.parse(localStorage.getItem("all_photos"));
  } catch (e) {}

  if (Array.isArray(storedPhotos)) {
    sherlyConfig.memories.photos = storedPhotos;
  }

  const allPhotos = sherlyConfig.memories.photos;

  // Render Polaroids in Photos Tab
  const polaroidContainer = document.getElementById("polaroidContainer");
  if (polaroidContainer) {
    if (allPhotos.length === 0) {
      polaroidContainer.innerHTML = `
        <div style="text-align:center; padding: 40px 10px; color: var(--ink-muted);">
          <div style="font-size:3rem; margin-bottom:8px;">📷</div>
          <p>No photos here yet!</p>
          <p style="font-size:0.85rem;">Tap <strong>"Add / Pick Photo"</strong> below to add your favorite memories with Sherly ♡</p>
        </div>
      `;
    } else {
      polaroidContainer.innerHTML = allPhotos.map((p, idx) => `
        <div class="polaroid-card">
          <button class="delete-photo-btn" data-delete-idx="${idx}" title="Remove photo" aria-label="Remove photo">&times;</button>
          <div class="washi-tape"></div>
          <div class="polaroid-photo-box" style="background: ${p.bg || '#fce7f3'}">
            ${p.image ? `
              <img src="${p.image}" alt="${p.caption || 'Memory'}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
              <span style="display:none;">${p.emoji || '📸'}</span>
            ` : `
              <span>${p.emoji || '📸'}</span>
            `}
          </div>
          <div class="polaroid-caption">${p.caption || 'Special Memory ♡'}</div>
        </div>
      `).join("");
    }

    // Attach click listener for photo deletion
    polaroidContainer.querySelectorAll(".delete-photo-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const deleteIdx = parseInt(btn.dataset.deleteIdx);
        if (confirm("Remove this photo from the scrapbook? ♡")) {
          sherlyConfig.memories.photos.splice(deleteIdx, 1);
          try {
            localStorage.setItem("all_photos", JSON.stringify(sherlyConfig.memories.photos));
          } catch (err) {}
          sfx.playChime();
          renderMemories();
        }
      });
    });
  }

  // Handle In-App Photo Upload from Phone / PC
  const uploadBtn = document.getElementById("uploadPhotoBtn");
  const fileInput = document.getElementById("photoFileInput");

  if (uploadBtn && fileInput && !uploadBtn.dataset.bound) {
    uploadBtn.dataset.bound = "true";
    uploadBtn.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Img = event.target.result;
        const caption = prompt("Enter a cute caption for this photo:", "Special memory with Sherly ♡") || "Special memory ♡";

        const newPhoto = {
          image: base64Img,
          caption: caption,
          emoji: "📸",
          bg: "#fce7f3"
        };

        sherlyConfig.memories.photos.push(newPhoto);
        try {
          localStorage.setItem("all_photos", JSON.stringify(sherlyConfig.memories.photos));
        } catch (err) {
          console.warn("Storage warning, adding to current session", err);
        }

        sfx.playChime();
        fireConfetti();
        renderMemories();
      };
      reader.readAsDataURL(file);
    });
  }

  // Render Moments Tab
  const momentsContainer = document.getElementById("momentsContainer");
  if (momentsContainer) {
    momentsContainer.innerHTML = sherlyConfig.memories.moments.map(m => `
      <div class="moment-card">
        <div class="moment-icon">${m.icon}</div>
        <div class="moment-text">
          <h4>${m.title}</h4>
          <p>${m.desc}</p>
        </div>
      </div>
    `).join("");
  }

  // Render Messages Tab
  const stickyContainer = document.getElementById("stickyContainer");
  if (stickyContainer) {
    stickyContainer.innerHTML = sherlyConfig.memories.messages.map(m => `
      <div class="sticky-note ${m.color}">
        ${m.note}
      </div>
    `).join("");
  }
}

// --- 8. MYSTERY GIFTS SECTION (Screen 4) ---
function renderGifts() {
  const giftsGrid = document.getElementById("giftsGrid");
  if (!giftsGrid) return;

  const openedGifts = JSON.parse(localStorage.getItem("opened_gifts") || "[]");

  giftsGrid.innerHTML = sherlyConfig.gifts.map(gift => {
    const isOpened = openedGifts.includes(gift.id);
    return `
      <div class="mystery-gift-card ${gift.boxClass}" data-gift-id="${gift.id}">
        ${isOpened ? '<span class="gift-opened-pill">Opened ♡</span>' : ''}
        <div class="gift-box-icon">${gift.icon}</div>
        <div class="gift-type-name">${gift.type}</div>
        <div class="gift-sub-desc">${gift.sub}</div>
      </div>
    `;
  }).join("");

  // Attach click to open gift
  document.querySelectorAll(".mystery-gift-card").forEach(card => {
    card.addEventListener("click", () => {
      const giftId = parseInt(card.dataset.giftId);
      const gift = sherlyConfig.gifts.find(g => g.id === giftId);
      if (gift) openGiftModal(gift, card);
    });
  });
}

function openGiftModal(gift, cardElem) {
  sfx.playChime();
  fireConfetti();

  // Save opened state
  try {
    const openedGifts = JSON.parse(localStorage.getItem("opened_gifts") || "[]");
    if (!openedGifts.includes(gift.id)) {
      openedGifts.push(gift.id);
      localStorage.setItem("opened_gifts", JSON.stringify(openedGifts));
      if (cardElem && !cardElem.querySelector(".gift-opened-pill")) {
        const pill = document.createElement("span");
        pill.className = "gift-opened-pill";
        pill.textContent = "Opened ♡";
        cardElem.appendChild(pill);
      }
    }
  } catch (e) {}

  const modal = document.getElementById("giftModal");
  document.getElementById("modalIcon").textContent = gift.modalIcon || "🎁";
  document.getElementById("modalTitle").textContent = gift.title;
  document.getElementById("modalBody").textContent = gift.message;

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    alert(`${gift.title}\n\n${gift.message}`);
  }

  const okBtn = document.getElementById("modalOkBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const handleClose = () => modal.close();
  okBtn.onclick = handleClose;
  closeBtn.onclick = handleClose;
  modal.onclick = (e) => { if (e.target === modal) modal.close(); };
}

// --- 9. MUSIC PLAYER (Screen 5) ---
function initMusicPlayer() {
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playIcon = document.getElementById("playIcon");
  const progressFill = document.getElementById("progressBarFill");
  const progressBarBg = document.getElementById("progressBarBg");
  const currentTimeEl = document.getElementById("currentTime");
  const totalDurationEl = document.getElementById("totalDuration");
  const songTitleEl = document.getElementById("songTitle");
  const songArtistEl = document.getElementById("songArtist");
  const spotifyLink = document.getElementById("spotifyExternalLink");
  const audioEl = document.getElementById("audioPlayer");

  if (songTitleEl) songTitleEl.textContent = sherlyConfig.song.title;
  if (songArtistEl) songArtistEl.textContent = `${sherlyConfig.song.artist} • Sherly's Birthday Vibes`;
  if (spotifyLink && sherlyConfig.song.spotifyUrl) {
    spotifyLink.href = sherlyConfig.song.spotifyUrl;
  }
  if (audioEl && sherlyConfig.song.audioSrc) {
    audioEl.src = sherlyConfig.song.audioSrc;
  }

  let isPlaying = false;
  let progressPercent = 0;
  let progressInterval = null;

  function togglePlay() {
    isPlaying = !isPlaying;
    sfx.init();

    if (isPlaying) {
      playIcon.textContent = "⏸";
      playPauseBtn.style.boxShadow = "0 0 25px rgba(236, 72, 153, 0.7)";

      if (audioEl && audioEl.src) {
        audioEl.play().catch(e => console.log("Audio autoplay restriction", e));
      } else {
        sfx.playChime();
      }

      // Progress bar loop
      progressInterval = setInterval(() => {
        if (audioEl && audioEl.src && !isNaN(audioEl.duration) && audioEl.duration > 0) {
          progressPercent = (audioEl.currentTime / audioEl.duration) * 100;
          const curSecs = Math.floor(audioEl.currentTime);
          const mins = Math.floor(curSecs / 60);
          const secs = curSecs % 60;
          if (currentTimeEl) currentTimeEl.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;

          const durSecs = Math.floor(audioEl.duration);
          const dmins = Math.floor(durSecs / 60);
          const dsecs = durSecs % 60;
          if (totalDurationEl) totalDurationEl.textContent = `${dmins}:${dsecs.toString().padStart(2, "0")}`;
        } else {
          progressPercent = (progressPercent + 0.3) % 100;
          const totalSecs = 232; // 3:52
          const curSecs = Math.floor((progressPercent / 100) * totalSecs);
          const mins = Math.floor(curSecs / 60);
          const secs = curSecs % 60;
          if (currentTimeEl) currentTimeEl.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
        }
        if (progressFill) progressFill.style.width = `${progressPercent}%`;
      }, 250);
    } else {
      playIcon.textContent = "▶";
      playPauseBtn.style.boxShadow = "";
      if (audioEl && audioEl.src) audioEl.pause();
      clearInterval(progressInterval);
    }
  }

  if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlay);

  if (progressBarBg) {
    progressBarBg.addEventListener("click", (e) => {
      const rect = progressBarBg.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      progressPercent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
      if (progressFill) progressFill.style.width = `${progressPercent}%`;

      if (audioEl && audioEl.src && !isNaN(audioEl.duration)) {
        audioEl.currentTime = (progressPercent / 100) * audioEl.duration;
      }
    });
  }

  const shuffleBtn = document.getElementById("shuffleBtn");
  const repeatBtn = document.getElementById("repeatBtn");
  if (shuffleBtn) shuffleBtn.addEventListener("click", () => { sfx.playChime(); });
  if (repeatBtn) repeatBtn.addEventListener("click", () => { sfx.playChime(); });
}

// --- 10. THE FINAL SURPRISE (Screen 7) ---
function initSurprise() {
  const surpriseBtn = document.getElementById("openFinalSurpriseBtn");
  const magicalGift = document.getElementById("magicalGift");

  function triggerGrandSurprise() {
    sfx.playChime();
    fireConfetti();

    // Secondary burst of confetti
    setTimeout(fireConfetti, 350);
    setTimeout(fireConfetti, 700);

    const modal = document.getElementById("giftModal");
    document.getElementById("modalIcon").textContent = "✨ 🎂 ✨";
    document.getElementById("modalTitle").textContent = sherlyConfig.finalSurprise.title;
    document.getElementById("modalBody").innerHTML = `
      <p style="white-space: pre-line; line-height: 1.6;">${sherlyConfig.finalSurprise.message}</p>
      <div style="font-size: 2.5rem; margin: 15px 0;">💖 🎀 🌟</div>
    `;

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      alert(`${sherlyConfig.finalSurprise.title}\n\n${sherlyConfig.finalSurprise.message}`);
    }

    const okBtn = document.getElementById("modalOkBtn");
    const closeBtn = document.getElementById("closeModalBtn");
    const handleClose = () => modal.close();
    okBtn.onclick = handleClose;
    closeBtn.onclick = handleClose;
    modal.onclick = (e) => { if (e.target === modal) modal.close(); };
  }

  if (surpriseBtn) surpriseBtn.addEventListener("click", triggerGrandSurprise);
  if (magicalGift) magicalGift.addEventListener("click", triggerGrandSurprise);
}

// --- 11. IN-BROWSER SETTINGS CUSTOMIZER ---
function initSettings() {
  const openSettingsBtn = document.getElementById("openSettingsBtn");
  const settingsModal = document.getElementById("settingsModal");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");
  const saveSettingsBtn = document.getElementById("saveSettingsBtn");
  const birthdayInput = document.getElementById("settingBirthday");
  const nameInput = document.getElementById("settingName");
  const songInput = document.getElementById("settingSong");
  const artistInput = document.getElementById("settingArtist");
  const spotifyInput = document.getElementById("settingSpotify");
  const audioFileInput = document.getElementById("settingAudioFile");
  const passcodeInput = document.getElementById("settingPasscode");
  const hintInput = document.getElementById("settingPasscodeHint");
  const resetPhotosBtn = document.getElementById("resetPhotosBtn");

  if (openSettingsBtn && settingsModal) {
    openSettingsBtn.addEventListener("click", () => {
      closeDrawer();
      if (birthdayInput) birthdayInput.value = sherlyConfig.birthdayDate;
      if (nameInput) nameInput.value = sherlyConfig.name;
      if (songInput) songInput.value = sherlyConfig.song.title;
      if (artistInput) artistInput.value = sherlyConfig.song.artist;
      if (spotifyInput) spotifyInput.value = sherlyConfig.song.spotifyUrl;
      if (passcodeInput) passcodeInput.value = sherlyConfig.passcode;
      if (hintInput) hintInput.value = sherlyConfig.passcodeHint;
      settingsModal.showModal();
    });
  }

  if (closeSettingsBtn && settingsModal) {
    closeSettingsBtn.addEventListener("click", () => settingsModal.close());
  }

  // Reset / Clear Photos button
  if (resetPhotosBtn) {
    resetPhotosBtn.addEventListener("click", () => {
      if (confirm("Reset scrapbook and remove all custom photos? ♡")) {
        sherlyConfig.memories.photos = [];
        try {
          localStorage.setItem("all_photos", JSON.stringify([]));
        } catch (e) {}
        sfx.playChime();
        renderMemories();
        settingsModal.close();
      }
    });
  }

  if (saveSettingsBtn && settingsModal) {
    saveSettingsBtn.addEventListener("click", () => {
      if (birthdayInput && birthdayInput.value) {
        sherlyConfig.birthdayDate = birthdayInput.value;
        try { localStorage.setItem("sherly_birthday", birthdayInput.value); } catch (e) {}
      }
      if (nameInput && nameInput.value) {
        sherlyConfig.name = nameInput.value;
        try { localStorage.setItem("sherly_name", nameInput.value); } catch (e) {}
      }
      if (songInput && songInput.value) {
        sherlyConfig.song.title = songInput.value;
        try { localStorage.setItem("sherly_song_title", songInput.value); } catch (e) {}
        const songTitleEl = document.getElementById("songTitle");
        if (songTitleEl) songTitleEl.textContent = songInput.value;
      }
      if (artistInput && artistInput.value) {
        sherlyConfig.song.artist = artistInput.value;
        try { localStorage.setItem("sherly_song_artist", artistInput.value); } catch (e) {}
        const songArtistEl = document.getElementById("songArtist");
        if (songArtistEl) songArtistEl.textContent = `${artistInput.value} • Sherly's Birthday Vibes`;
      }
      if (spotifyInput && spotifyInput.value) {
        sherlyConfig.song.spotifyUrl = spotifyInput.value;
        try { localStorage.setItem("sherly_song_spotify", spotifyInput.value); } catch (e) {}
        const spotifyLink = document.getElementById("spotifyExternalLink");
        if (spotifyLink) spotifyLink.href = spotifyInput.value;
      }
      if (passcodeInput && passcodeInput.value) {
        sherlyConfig.passcode = passcodeInput.value.trim();
        try { localStorage.setItem("sherly_passcode", passcodeInput.value.trim()); } catch (e) {}
      }
      if (hintInput && hintInput.value) {
        sherlyConfig.passcodeHint = hintInput.value;
        try { localStorage.setItem("sherly_hint", hintInput.value); } catch (e) {}
      }

      // Check if custom audio file was uploaded
      if (audioFileInput && audioFileInput.files && audioFileInput.files[0]) {
        const audioFile = audioFileInput.files[0];
        const audioReader = new FileReader();
        audioReader.onload = (e) => {
          const audioData = e.target.result;
          sherlyConfig.song.audioSrc = audioData;
          try {
            localStorage.setItem("sherly_custom_audio", audioData);
          } catch (err) {
            console.warn("Audio file too large for localStorage, playable this session", err);
          }
          const audioEl = document.getElementById("audioPlayer");
          if (audioEl) audioEl.src = audioData;
        };
        audioReader.readAsDataURL(audioFile);
      }

      sfx.playChime();
      fireConfetti();
      settingsModal.close();
      initCountdown();
    });
  }

  // Copy / Export Edits to Clipboard
  const exportEditsBtn = document.getElementById("exportEditsBtn");
  if (exportEditsBtn) {
    exportEditsBtn.addEventListener("click", () => {
      const payload = {
        name: sherlyConfig.name,
        birthdayDate: sherlyConfig.birthdayDate,
        passcode: sherlyConfig.passcode,
        passcodeHint: sherlyConfig.passcodeHint,
        song: {
          title: sherlyConfig.song.title,
          artist: sherlyConfig.song.artist,
          spotifyUrl: sherlyConfig.song.spotifyUrl
        },
        photosCount: sherlyConfig.memories.photos.length
      };
      const text = JSON.stringify(payload, null, 2);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          alert("✨ Edits copied to clipboard! ♡\n\nYou can now paste it into our chat so I can save it permanently for all devices!");
        }).catch(() => {
          prompt("Copy your configuration below and paste it into chat:", text);
        });
      } else {
        prompt("Copy your configuration below and paste it into chat:", text);
      }
    });
  }
}

// --- 12. VIP PASSCODE LOCK SCREEN (Option 2) ---
function initLockScreen() {
  const lockScreen = document.getElementById("lockScreen");
  const dots = document.querySelectorAll(".pin-dot");
  const dotsContainer = document.getElementById("pinDots");
  const statusMsg = document.getElementById("lockStatusMessage");
  const hintBtn = document.getElementById("lockHintBtn");
  const hintText = document.getElementById("lockHintText");
  const lockAppBtn = document.getElementById("lockAppBtn");
  const toggleModeBtn = document.getElementById("togglePasscodeModeBtn");
  const pinModeContainer = document.getElementById("pinModeContainer");
  const wordModeContainer = document.getElementById("wordModeContainer");
  const wordInput = document.getElementById("wordPasscodeInput");
  const wordSubmitBtn = document.getElementById("wordPasscodeSubmitBtn");

  if (!lockScreen) return;

  let enteredPin = "";
  let isWordMode = false;

  // If passcode has non-numeric characters, default to word mode
  if (/[^0-9]/.test(sherlyConfig.passcode)) {
    isWordMode = true;
    if (pinModeContainer) pinModeContainer.style.display = "none";
    if (wordModeContainer) wordModeContainer.style.display = "flex";
    if (toggleModeBtn) toggleModeBtn.textContent = "🔢 Use numeric keypad";
  }

  // Toggle between PIN keypad and Word password input
  if (toggleModeBtn) {
    toggleModeBtn.addEventListener("click", () => {
      isWordMode = !isWordMode;
      if (isWordMode) {
        if (pinModeContainer) pinModeContainer.style.display = "none";
        if (wordModeContainer) wordModeContainer.style.display = "flex";
        toggleModeBtn.textContent = "🔢 Use numeric keypad";
        if (wordInput) wordInput.focus();
      } else {
        if (pinModeContainer) pinModeContainer.style.display = "block";
        if (wordModeContainer) wordModeContainer.style.display = "none";
        toggleModeBtn.textContent = "⌨️ Use word password";
      }
      if (statusMsg) statusMsg.textContent = "";
    });
  }

  // Check if previously unlocked in this session
  if (sessionStorage.getItem("sherly_unlocked") === "true") {
    lockScreen.classList.add("unlocked");
  }

  function updateDots() {
    dots.forEach((dot, idx) => {
      dot.classList.toggle("filled", idx < enteredPin.length);
    });
  }

  function checkPasscode(entered) {
    const cleanEntered = entered.trim().toLowerCase();
    const cleanTarget = sherlyConfig.passcode.trim().toLowerCase();

    if (cleanEntered === cleanTarget) {
      if (statusMsg) {
        statusMsg.style.color = "#10b981";
        statusMsg.textContent = "Passcode accepted! Welcome Sherly ♡";
      }
      sfx.playChime();
      fireConfetti();
      setTimeout(fireConfetti, 350);

      sessionStorage.setItem("sherly_unlocked", "true");
      setTimeout(() => {
        lockScreen.classList.add("unlocked");
      }, 450);
    } else {
      if (statusMsg) {
        statusMsg.style.color = "#f43f5e";
        statusMsg.textContent = "Oops! Try again, Sherly ♡";
      }
      if (dotsContainer) dotsContainer.classList.add("shake");
      if (wordInput) wordInput.style.borderColor = "#f43f5e";

      setTimeout(() => {
        if (dotsContainer) dotsContainer.classList.remove("shake");
        if (wordInput) wordInput.style.borderColor = "#e9d5ff";
        enteredPin = "";
        updateDots();
      }, 500);
    }
  }

  // Word Passcode Submit
  if (wordSubmitBtn && wordInput) {
    wordSubmitBtn.addEventListener("click", () => {
      if (wordInput.value) checkPasscode(wordInput.value);
    });
    wordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && wordInput.value) checkPasscode(wordInput.value);
    });
  }

  // Numeric Keypad Click Listeners
  document.querySelectorAll(".pin-key[data-key]").forEach(key => {
    key.addEventListener("click", () => {
      if (enteredPin.length < 4) {
        enteredPin += key.dataset.key;
        sfx.init();
        updateDots();
        if (enteredPin.length === 4) {
          setTimeout(() => checkPasscode(enteredPin), 150);
        }
      }
    });
  });

  const clearBtn = document.getElementById("keyClear");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      enteredPin = "";
      updateDots();
      if (statusMsg) statusMsg.textContent = "";
    });
  }

  const heartKey = document.getElementById("keyHeart");
  if (heartKey) {
    heartKey.addEventListener("click", () => {
      sfx.playChime();
      fireConfetti();
    });
  }

  if (hintBtn && hintText) {
    hintText.textContent = sherlyConfig.passcodeHint || "Hint: Sherly's birthday month & day (MMDD) ♡";
    hintBtn.addEventListener("click", () => {
      hintText.textContent = sherlyConfig.passcodeHint || "Hint: Sherly's birthday month & day (MMDD) ♡";
      hintText.style.display = hintText.style.display === "none" ? "block" : "none";
    });
  }

  // Lock App button in side drawer
  if (lockAppBtn) {
    lockAppBtn.addEventListener("click", () => {
      closeDrawer();
      sessionStorage.removeItem("sherly_unlocked");
      enteredPin = "";
      updateDots();
      if (wordInput) wordInput.value = "";
      if (statusMsg) statusMsg.textContent = "";
      lockScreen.classList.remove("unlocked");
    });
  }
}