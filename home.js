// ===========================
// DATA DUMMY POSTINGAN
// ===========================

const DUMMY_POSTS = [
  {
    id: 1,
    name: 'Sari Dewi',
    username: '@saridewi',
    avatar: 'https://i.pravatar.cc/44?img=5',
    time: '2 jam lalu',
    content: 'Hari ini belajar hal baru tentang desain sistem. Ternyata konsistensi adalah kunci utama dalam membangun produk yang baik! 🎨',
    image: null,
    likes: 48,
    comments: 12,
  },
  {
    id: 2,
    name: 'Budi Santoso',
    username: '@budisantoso',
    avatar: 'https://i.pravatar.cc/44?img=8',
    time: '5 jam lalu',
    content: 'Pemandangan sore dari kantor baru kami. Tidak menyesal pindah ke sini! 🌇',
    image: 'https://picsum.photos/seed/office/600/300',
    likes: 134,
    comments: 27,
  },
  {
    id: 3,
    name: 'Rina Kusuma',
    username: '@rinakusuma',
    avatar: 'https://i.pravatar.cc/44?img=12',
    time: '1 hari lalu',
    content: 'Tips produktivitas: mulai hari dengan menulis 3 hal yang ingin kamu capai. Sederhana tapi efektif! ✅ #produktivitas #tips',
    image: null,
    likes: 89,
    comments: 9,
  },
  {
    id: 4,
    name: 'Dani Wahyu',
    username: '@daniwahyu',
    avatar: 'https://i.pravatar.cc/44?img=15',
    time: '1 hari lalu',
    content: 'Baru saja selesai marathon coding 6 jam. Hasilnya? Bug baru. 😅 #developer #coding',
    image: null,
    likes: 210,
    comments: 34,
  },
  {
    id: 5,
    name: 'Maya Lestari',
    username: '@mayalestari',
    avatar: 'https://i.pravatar.cc/44?img=20',
    time: '2 hari lalu',
    content: 'Rekomendasi buku bulan ini: "Atomic Habits" oleh James Clear. Wajib baca! 📚',
    image: 'https://picsum.photos/seed/book/600/300',
    likes: 302,
    comments: 45,
  },
  {
    id: 6,
    name: 'Arif Hidayat',
    username: '@arifhidayat',
    avatar: 'https://i.pravatar.cc/44?img=22',
    time: '2 hari lalu',
    content: 'Mencoba resep baru hari ini. Ternyata memasak itu menenangkan! 🍳 #cooking #life',
    image: 'https://picsum.photos/seed/food/600/300',
    likes: 76,
    comments: 8,
  },
  {
    id: 7,
    name: 'Putri Ayu',
    username: '@putriayu',
    avatar: 'https://i.pravatar.cc/44?img=30',
    time: '3 hari lalu',
    content: 'Jangan lupa istirahat. Produktivitas bukan tentang bekerja tanpa henti, tapi tentang bekerja dengan cerdas. 💡',
    image: null,
    likes: 445,
    comments: 61,
  },
  {
    id: 8,
    name: 'Hendra Wijaya',
    username: '@hendrawijaya',
    avatar: 'https://i.pravatar.cc/44?img=33',
    time: '3 hari lalu',
    content: 'Sunset di pantai selalu jadi mood booster terbaik. 🌅 #travel #pantai #indonesia',
    image: 'https://picsum.photos/seed/sunset/600/300',
    likes: 589,
    comments: 72,
  },
  {
    id: 9,
    name: 'Citra Nanda',
    username: '@citrananda',
    avatar: 'https://i.pravatar.cc/44?img=40',
    time: '4 hari lalu',
    content: 'Baru saja lulus sertifikasi UI/UX! Terima kasih semua yang sudah support 🙏 #milestone #design',
    image: null,
    likes: 712,
    comments: 98,
  },
  {
    id: 10,
    name: 'Fajar Nugroho',
    username: '@fajarnugroho',
    avatar: 'https://i.pravatar.cc/44?img=45',
    time: '5 hari lalu',
    content: 'Open source itu indah. Kode yang kamu tulis hari ini bisa membantu ribuan orang esok hari. 🌍 #opensource #programming',
    image: null,
    likes: 334,
    comments: 41,
  },
];

// ===========================
// STATE
// ===========================
const POSTS_PER_PAGE = 3;
let currentPage = 0;
let isLoading = false;
let allLoaded = false;
const likedPosts = new Set();

// ===========================
// HELPER: FORMAT ANGKA
// ===========================
function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
  return n.toString();
}

// ===========================
// RENDER: SATU POSTINGAN
// ===========================
function createPostCard(post) {
  const article = document.createElement('article');
  article.className = 'post-card';
  article.dataset.id = post.id;

  const liked = likedPosts.has(post.id);

  article.innerHTML = `
    <div class="post-header">
      <img src="${post.avatar}" alt="Avatar ${post.name}" class="post-avatar" />
      <div class="post-meta">
        <span class="post-name">${post.name}</span>
        <span class="post-username">${post.username}</span>
        <span class="post-time">· ${post.time}</span>
      </div>
    </div>
    <div class="post-body">
      <p>${post.content}</p>
      ${post.image ? `<img src="${post.image}" alt="Gambar postingan" class="post-image" loading="lazy" />` : ''}
    </div>
    <div class="post-footer">
      <button type="button" class="btn-like ${liked ? 'liked' : ''}" data-id="${post.id}">
        ❤️ <span>${formatCount(post.likes)}</span>
      </button>
      <button type="button" class="btn-comment" data-id="${post.id}">
        💬 <span>${formatCount(post.comments)}</span>
      </button>
      <button type="button" class="btn-share" data-id="${post.id}">
        ↗️ Bagikan
      </button>
    </div>
  `;

  // Event: Like
  article.querySelector('.btn-like').addEventListener('click', function () {
    handleLike(post, this);
  });

  // Event: Komentar
  article.querySelector('.btn-comment').addEventListener('click', function () {
    handleComment(post);
  });

  // Event: Share
  article.querySelector('.btn-share').addEventListener('click', function () {
    handleShare(post);
  });

  return article;
}

// ===========================
// ACTION: LIKE
// ===========================
function handleLike(post, btn) {
  const countEl = btn.querySelector('span');

  if (likedPosts.has(post.id)) {
    likedPosts.delete(post.id);
    post.likes -= 1;
    btn.classList.remove('liked');
  } else {
    likedPosts.add(post.id);
    post.likes += 1;
    btn.classList.add('liked');
  }

  countEl.textContent = formatCount(post.likes);
}

// ===========================
// ACTION: KOMENTAR
// ===========================
function handleComment(post) {
  alert(`Fitur komentar untuk postingan ${post.name} akan segera hadir!`);
}

// ===========================
// ACTION: SHARE
// ===========================
function handleShare(post) {
  if (navigator.share) {
    navigator.share({
      title: `Postingan ${post.name}`,
      text: post.content,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link berhasil disalin!');
    });
  }
}

// ===========================
// LOAD POSTINGAN (simulasi async)
// ===========================
function loadPosts() {
  if (isLoading || allLoaded) return;
  isLoading = true;

  showLoader(true);

  // Simulasi delay network
  setTimeout(() => {
    const start = currentPage * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const batch = DUMMY_POSTS.slice(start, end);

    if (batch.length === 0) {
      allLoaded = true;
      showLoader(false);
      showEndMessage();
      isLoading = false;
      return;
    }

    const feed = document.querySelector('.feed');
    batch.forEach(post => {
      feed.appendChild(createPostCard(post));
    });

    currentPage++;

    if (currentPage * POSTS_PER_PAGE >= DUMMY_POSTS.length) {
      allLoaded = true;
      showEndMessage();
    }

    showLoader(false);
    isLoading = false;
  }, 800);
}

// ===========================
// UI: LOADER
// ===========================
function showLoader(show) {
  let loader = document.getElementById('feed-loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'feed-loader';
    loader.className = 'feed-loader';
    loader.innerHTML = '<span class="loader-dot"></span><span class="loader-dot"></span><span class="loader-dot"></span>';
    document.querySelector('.feed').appendChild(loader);
  }
  loader.style.display = show ? 'flex' : 'none';
}

// ===========================
// UI: PESAN AKHIR FEED
// ===========================
function showEndMessage() {
  const feed = document.querySelector('.feed');
  const existing = document.getElementById('feed-end');
  if (existing) return;

  const msg = document.createElement('p');
  msg.id = 'feed-end';
  msg.className = 'feed-end';
  msg.textContent = 'Kamu sudah melihat semua postingan 🎉';
  feed.appendChild(msg);
}

// ===========================
// INFINITE SCROLL
// ===========================
function initInfiniteScroll() {
  const sentinel = document.createElement('div');
  sentinel.id = 'scroll-sentinel';
  document.querySelector('.feed').appendChild(sentinel);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) loadPosts();
    });
  }, { rootMargin: '200px' });

  observer.observe(sentinel);
}

// ===========================
// BUAT POSTINGAN BARU
// ===========================
function initCreatePost() {
  const btn = document.querySelector('.btn-post');
  const textarea = document.querySelector('.create-input');
  if (!btn || !textarea) return;

  btn.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (!text) {
      textarea.focus();
      return;
    }

    const newPost = {
      id: Date.now(),
      name: 'Andi Pratama',
      username: '@andipratama',
      avatar: 'https://i.pravatar.cc/44?img=1',
      time: 'Baru saja',
      content: text,
      image: null,
      likes: 0,
      comments: 0,
    };

    const feed = document.querySelector('.feed');
    const createBox = document.querySelector('.create-post');
    const card = createPostCard(newPost);
    feed.insertBefore(card, createBox.nextSibling);

    textarea.value = '';
  });

  // Auto-resize textarea
  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  });
}

// ===========================
// INIT
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  // Kosongkan postingan statis dari HTML (pakai JS saja)
  document.querySelectorAll('.post-card').forEach(el => el.remove());

  initCreatePost();
  initInfiniteScroll();
  loadPosts();
});
