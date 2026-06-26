function showSection(id, link) {
  document.querySelectorAll('.settings-section').forEach(s => s.classList.add('hidden'));
  document.querySelectorAll('.settings-link').forEach(l => l.classList.remove('active'));
  document.getElementById('section-' + id).classList.remove('hidden');
  if (link) link.classList.add('active');
  return false;
}

function saveSettings(section) {
  showToast(`✅ Pengaturan ${section} berhasil disimpan!`);
}

function applyTheme(theme) {
  document.documentElement.style.setProperty('--bg', theme === 'light' ? '#f4f4f8' : '#0f0f13');
  document.documentElement.style.setProperty('--surface', theme === 'light' ? '#ffffff' : '#1a1a23');
  document.documentElement.style.setProperty('--text', theme === 'light' ? '#111118' : '#e8e8f0');
  showToast(`Tema ${theme === 'light' ? 'Terang' : 'Gelap'} diterapkan.`);
}

function confirmDelete() {
  if (confirm('Apakah kamu yakin ingin menghapus akun? Tindakan ini tidak bisa dibatalkan.')) {
    alert('Akun berhasil dihapus. Kamu akan diarahkan ke halaman utama.');
    window.location.href = 'login.html';
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);
}

// Aktifkan section dari hash URL
const hash = window.location.hash.replace('#', '');
if (hash) {
  const link = document.querySelector(`.settings-link[href="#${hash}"]`);
  if (link) showSection(hash, link);
}
