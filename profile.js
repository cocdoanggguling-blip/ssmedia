const POSTS = [
  { id:1, name:'Andi Pratama', username:'@andipratama', avatar:'https://i.pravatar.cc/44?img=1', time:'1 jam lalu', content:'Desain yang baik adalah yang tidak terlihat — pengguna fokus pada tujuan, bukan pada antarmukanya. 🎨', image:null, likes:72, comments:14 },
  { id:2, name:'Andi Pratama', username:'@andipratama', avatar:'https://i.pravatar.cc/44?img=1', time:'2 hari lalu', content:'Update portofolio terbaru! Senang bisa berbagi karya dengan kalian. 🚀', image:'https://picsum.photos/seed/porto/600/300', likes:198, comments:31 },
  { id:3, name:'Andi Pratama', username:'@andipratama', avatar:'https://i.pravatar.cc/44?img=1', time:'5 hari lalu', content:'Konsistensi adalah senjata terkuat dalam desain. Gunakan sistem, bukan insting semata.', image:null, likes:143, comments:22 },
  { id:4, name:'Andi Pratama', username:'@andipratama', avatar:'https://i.pravatar.cc/44?img=1', time:'1 minggu lalu', content:'Eksplorasi palet warna terbaru untuk proyek klien. Warna gelap elegan tapi tetap aksesibel.', image:'https://picsum.photos/seed/palette/600/300', likes:89, comments:11 },
];

const liked = new Set();

function formatCount(n) { return n >= 1000 ? (n/1000).toFixed(1).replace('.0','')+'K' : n; }

function createCard(p) {
  const el = document.createElement('article');
  el.className = 'post-card';
  el.innerHTML = `
    <div class="post-header">
      <img src="${p.avatar}" class="post-avatar" />
      <div><div class="post-name">${p.name}</div><div style="display:flex;gap:6px"><span class="post-username">${p.username}</span><span class="post-time">· ${p.time}</span></div></div>
    </div>
    <div class="post-body"><p>${p.content}</p>${p.image?`<img src="${p.image}" class="post-image" loading="lazy"/>`:''}</div>
    <div class="post-footer">
      <button class="btn-like" data-id="${p.id}">❤️ <span>${formatCount(p.likes)}</span></button>
      <button class="btn-comment">💬 <span>${formatCount(p.comments)}</span></button>
      <button class="btn-share">↗️</button>
    </div>`;
  el.querySelector('.btn-like').onclick = function() {
    if (liked.has(p.id)) { liked.delete(p.id); p.likes--; this.classList.remove('liked'); }
    else { liked.add(p.id); p.likes++; this.classList.add('liked'); }
    this.querySelector('span').textContent = formatCount(p.likes);
  };
  return el;
}

function renderPosts() {
  const feed = document.getElementById('postFeed');
  feed.innerHTML = '';
  POSTS.forEach(p => feed.appendChild(createCard(p)));
  document.getElementById('postCount').textContent = POSTS.length;
}

function renderPhotos() {
  const grid = document.getElementById('photoGrid');
  const photos = POSTS.filter(p => p.image);
  grid.innerHTML = photos.map(p => `
    <div class="photo-item"><img src="${p.image}" loading="lazy" /></div>`).join('');
}

function switchTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
  document.getElementById('tab-' + tab).classList.remove('hidden');
}

function openEditModal() { document.getElementById('editModal').classList.remove('hidden'); }
function closeEditModal() { document.getElementById('editModal').classList.add('hidden'); }

function saveProfile() {
  const name = document.getElementById('editName').value.trim();
  const bio = document.getElementById('editBio').value.trim();
  if (name) document.querySelector('.profile-name').textContent = name;
  if (bio) document.querySelector('.profile-bio').textContent = bio;
  closeEditModal();
}

renderPosts();
renderPhotos();
