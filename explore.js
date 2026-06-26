const TRENDING = [
  { id:1, name:'Sari Dewi', username:'@saridewi', avatar:'https://i.pravatar.cc/44?img=5', time:'1 jam', content:'Thread tentang pentingnya design system dalam tim besar. 🧵 #desainui', image:null, likes:412, comments:67 },
  { id:2, name:'Budi Santoso', username:'@budisantoso', avatar:'https://i.pravatar.cc/44?img=8', time:'3 jam', content:'Open source project baru kami sudah live! Cek GitHub kami. 🚀 #opensource', image:'https://picsum.photos/seed/code/600/280', likes:889, comments:134 },
  { id:3, name:'Rina Kusuma', username:'@rinakusuma', avatar:'https://i.pravatar.cc/44?img=12', time:'6 jam', content:'Cara menjaga produktivitas saat WFH. Tips dari 3 tahun pengalaman. ✅ #produktivitas', image:null, likes:567, comments:91 },
];

const USERS = [
  { id:1, name:'Maya Lestari', username:'@mayalestari', avatar:'https://i.pravatar.cc/80?img=20', bio:'Fotografer & content creator 📸', followers:'12K' },
  { id:2, name:'Dani Wahyu', username:'@daniwahyu', avatar:'https://i.pravatar.cc/80?img=25', bio:'Full-stack developer. Kopi addict ☕', followers:'8.4K' },
  { id:3, name:'Putri Ayu', username:'@putriayu', avatar:'https://i.pravatar.cc/80?img=30', bio:'UI/UX designer & illustrator 🎨', followers:'21K' },
  { id:4, name:'Fajar Nugroho', username:'@fajarnugroho', avatar:'https://i.pravatar.cc/80?img=45', bio:'Open source contributor 💻', followers:'5.1K' },
  { id:5, name:'Citra Nanda', username:'@citrananda', avatar:'https://i.pravatar.cc/80?img=40', bio:'Data scientist | Python lover 🐍', followers:'9.7K' },
  { id:6, name:'Hendra Wijaya', username:'@hendrawijaya', avatar:'https://i.pravatar.cc/80?img=33', bio:'Travel blogger | 40 negara 🌍', followers:'34K' },
];

const HASHTAGS = [
  { tag:'#produktivitas', count:'2.1K' }, { tag:'#desainui', count:'1.4K' },
  { tag:'#teknologi', count:'980' }, { tag:'#indonesia', count:'750' },
  { tag:'#opensource', count:'620' }, { tag:'#programming', count:'540' },
  { tag:'#travel', count:'480' }, { tag:'#startup', count:'390' },
];

const following = new Set();
let searchTimeout;

function formatCount(n) { return n >= 1000 ? (n/1000).toFixed(1).replace('.0','')+'K' : n; }

function createPostCard(p) {
  const el = document.createElement('article');
  el.className = 'post-card';
  el.innerHTML = `
    <div class="post-header">
      <img src="${p.avatar}" class="post-avatar"/>
      <div><div class="post-name">${p.name}</div><div style="display:flex;gap:6px"><span class="post-username">${p.username}</span><span class="post-time">· ${p.time}</span></div></div>
    </div>
    <div class="post-body"><p>${p.content}</p>${p.image?`<img src="${p.image}" class="post-image" loading="lazy"/>`:''}</div>
    <div class="post-footer">
      <button class="btn-like">❤️ <span>${p.likes}</span></button>
      <button class="btn-comment">💬 <span>${p.comments}</span></button>
      <button class="btn-share">↗️</button>
    </div>`;
  return el;
}

function renderTrending() {
  const el = document.getElementById('trendingFeed');
  el.innerHTML = '';
  TRENDING.forEach(p => el.appendChild(createPostCard(p)));
}

function renderUsers() {
  const el = document.getElementById('userGrid');
  el.innerHTML = USERS.map(u => `
    <div class="user-card">
      <img src="${u.avatar}" alt="${u.name}"/>
      <div class="user-card-name">${u.name}</div>
      <div class="user-card-username">${u.username}</div>
      <div class="user-card-bio">${u.bio}</div>
      <small style="color:var(--muted)">${u.followers} pengikut</small>
      <button class="btn-follow ${following.has(u.id)?'following':''}" onclick="toggleFollow(${u.id},this)">
        ${following.has(u.id)?'Mengikuti':'Ikuti'}
      </button>
    </div>`).join('');
}

function renderHashtags() {
  const el = document.getElementById('hashtagList');
  el.innerHTML = HASHTAGS.map((h,i) => `
    <div class="hashtag-item">
      <div><span class="hashtag-name">${h.tag}</span><div style="font-size:12px;color:var(--muted);margin-top:2px">Trending #${i+1}</div></div>
      <span class="hashtag-count">${h.count} postingan</span>
    </div>`).join('');
}

function toggleFollow(id, btn) {
  if (following.has(id)) { following.delete(id); btn.textContent='Ikuti'; btn.classList.remove('following'); }
  else { following.add(id); btn.textContent='Mengikuti'; btn.classList.add('following'); }
}

function switchTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  ['trending','users','hashtags'].forEach(t => {
    document.getElementById('tab-'+t).classList.add('hidden');
  });
  document.getElementById('tab-'+tab).classList.remove('hidden');
  document.getElementById('searchResults').classList.add('hidden');
}

function handleSearch(q) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    if (!q.trim()) {
      document.getElementById('searchResults').classList.add('hidden');
      document.getElementById('tab-trending').classList.remove('hidden');
      return;
    }
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    const results = [...TRENDING, ...USERS.map(u => ({...u, content:u.bio, time:'', likes:0, comments:0}))].filter(p =>
      (p.content||'').toLowerCase().includes(q.toLowerCase()) ||
      (p.name||'').toLowerCase().includes(q.toLowerCase()) ||
      (p.username||'').toLowerCase().includes(q.toLowerCase())
    );
    document.getElementById('searchQuery').textContent = q;
    const feed = document.getElementById('searchFeed');
    feed.innerHTML = '';
    if (!results.length) { feed.innerHTML='<p style="color:var(--muted);text-align:center;padding:32px">Tidak ada hasil.</p>'; }
    else results.forEach(p => feed.appendChild(createPostCard(p)));
    document.getElementById('searchResults').classList.remove('hidden');
  }, 350);
}

renderTrending();
renderUsers();
renderHashtags();
