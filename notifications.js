const NOTIFICATIONS = [
  { id:1, type:'like', avatar:'https://i.pravatar.cc/44?img=5', text:'<strong>Sari Dewi</strong> menyukai postinganmu.', time:'2 menit lalu', unread:true },
  { id:2, type:'follow', avatar:'https://i.pravatar.cc/44?img=8', text:'<strong>Budi Santoso</strong> mulai mengikutimu.', time:'15 menit lalu', unread:true },
  { id:3, type:'comment', avatar:'https://i.pravatar.cc/44?img=12', text:'<strong>Rina Kusuma</strong> mengomentari postinganmu: "Sangat inspiratif!"', time:'1 jam lalu', unread:true },
  { id:4, type:'like', avatar:'https://i.pravatar.cc/44?img=20', text:'<strong>Maya Lestari</strong> menyukai postinganmu.', time:'2 jam lalu', unread:false },
  { id:5, type:'comment', avatar:'https://i.pravatar.cc/44?img=25', text:'<strong>Dani Wahyu</strong> membalas komentarmu.', time:'3 jam lalu', unread:false },
  { id:6, type:'follow', avatar:'https://i.pravatar.cc/44?img=30', text:'<strong>Putri Ayu</strong> mulai mengikutimu.', time:'5 jam lalu', unread:false },
  { id:7, type:'like', avatar:'https://i.pravatar.cc/44?img=33', text:'<strong>Hendra Wijaya</strong> menyukai foto profilmu.', time:'1 hari lalu', unread:false },
  { id:8, type:'comment', avatar:'https://i.pravatar.cc/44?img=40', text:'<strong>Citra Nanda</strong> mengomentari: "Setuju banget!"', time:'2 hari lalu', unread:false },
];

const ICONS = { like:'❤️', comment:'💬', follow:'👤' };

let activeFilter = 'all';

function renderNotifications() {
  const list = document.getElementById('notifList');
  const filtered = activeFilter === 'all' ? NOTIFICATIONS : NOTIFICATIONS.filter(n => n.type === activeFilter);

  if (!filtered.length) {
    list.innerHTML = '<p style="text-align:center;color:var(--muted);padding:40px">Tidak ada notifikasi.</p>';
    return;
  }

  list.innerHTML = filtered.map(n => `
    <div class="notif-item ${n.unread?'unread':''}" onclick="markRead(${n.id}, this)">
      <img src="${n.avatar}" class="notif-avatar" />
      <span class="notif-icon">${ICONS[n.type]}</span>
      <div class="notif-body">
        <div class="notif-text">${n.text}</div>
        <div class="notif-time">${n.time}</div>
      </div>
      ${n.unread ? '<div class="notif-unread-dot"></div>' : ''}
    </div>`).join('');
}

function markRead(id, el) {
  const notif = NOTIFICATIONS.find(n => n.id === id);
  if (notif) notif.unread = false;
  el.classList.remove('unread');
  const dot = el.querySelector('.notif-unread-dot');
  if (dot) dot.remove();
}

function markAllRead() {
  NOTIFICATIONS.forEach(n => n.unread = false);
  renderNotifications();
}

function filterNotif(type, btn) {
  activeFilter = type;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderNotifications();
}

renderNotifications();
