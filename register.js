// ===========================
// ELEMEN
// ===========================
const namaInput            = document.getElementById('nama');
const usernameInput        = document.getElementById('username');
const emailInput           = document.getElementById('email');
const passwordInput        = document.getElementById('password');
const konfirmasiInput      = document.getElementById('konfirmasi-password');
const btnDaftar            = document.querySelector('.btn-primary');
const btnGoogle            = document.querySelector('.btn-google');

// ===========================
// HELPER: TAMPILKAN ERROR
// ===========================
function showError(input, message) {
  removeError(input);
  const group = input.closest('.form-group');
  const span = document.createElement('span');
  span.className = 'input-error';
  span.textContent = message;
  group.appendChild(span);
  input.classList.add('input-invalid');
}

function removeError(input) {
  const group = input.closest('.form-group');
  const existing = group.querySelector('.input-error');
  if (existing) existing.remove();
  input.classList.remove('input-invalid');
}

function showSuccess(input) {
  removeError(input);
  input.classList.add('input-valid');
}

function removeSuccess(input) {
  input.classList.remove('input-valid');
}

// ===========================
// ATURAN VALIDASI
// ===========================
function validateNama(value) {
  if (!value.trim())            return 'Nama tidak boleh kosong.';
  if (value.trim().length < 2)  return 'Nama minimal 2 karakter.';
  if (value.trim().length > 50) return 'Nama maksimal 50 karakter.';
  if (/[^a-zA-Z\s]/.test(value)) return 'Nama hanya boleh huruf dan spasi.';
  return null;
}

function validateUsername(value) {
  if (!value.trim())              return 'Username tidak boleh kosong.';
  if (value.length < 3)           return 'Username minimal 3 karakter.';
  if (value.length > 20)          return 'Username maksimal 20 karakter.';
  if (/\s/.test(value))           return 'Username tidak boleh mengandung spasi.';
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username hanya boleh huruf, angka, dan garis bawah (_).';
  return null;
}

function validateEmail(value) {
  if (!value.trim())              return 'Email tidak boleh kosong.';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value))         return 'Format email tidak valid.';
  return null;
}

function validatePassword(value) {
  if (!value)                     return 'Password tidak boleh kosong.';
  if (value.length < 6)           return 'Password minimal 6 karakter.';
  if (value.length > 64)          return 'Password maksimal 64 karakter.';
  if (!/[A-Z]/.test(value))       return 'Password harus mengandung minimal 1 huruf kapital.';
  if (!/[0-9]/.test(value))       return 'Password harus mengandung minimal 1 angka.';
  return null;
}

function validateKonfirmasi(value) {
  if (!value)                           return 'Konfirmasi password tidak boleh kosong.';
  if (value !== passwordInput.value)    return 'Password dan konfirmasi password tidak cocok.';
  return null;
}

// ===========================
// VALIDASI + UMPAN BALIK
// ===========================
function validate(input, ruleFn) {
  const err = ruleFn(input.value);
  if (err) {
    showError(input, err);
    removeSuccess(input);
  } else {
    showSuccess(input);
  }
  return !err;
}

// ===========================
// EVENT: REAL-TIME (blur)
// ===========================
namaInput.addEventListener('blur',       () => validate(namaInput,       validateNama));
usernameInput.addEventListener('blur',   () => validate(usernameInput,   validateUsername));
emailInput.addEventListener('blur',      () => validate(emailInput,      validateEmail));
passwordInput.addEventListener('blur',   () => validate(passwordInput,   validatePassword));
konfirmasiInput.addEventListener('blur', () => validate(konfirmasiInput, validateKonfirmasi));

// ===========================
// EVENT: HAPUS ERROR SAAT MENGETIK
// ===========================
[namaInput, usernameInput, emailInput, passwordInput, konfirmasiInput].forEach(input => {
  input.addEventListener('input', () => {
    removeError(input);
    removeSuccess(input);
  });
});

// Re-validasi konfirmasi jika password diubah setelah konfirmasi diisi
passwordInput.addEventListener('input', () => {
  if (konfirmasiInput.value) {
    const err = validateKonfirmasi(konfirmasiInput.value);
    if (err) {
      showError(konfirmasiInput, err);
      removeSuccess(konfirmasiInput);
    } else {
      showSuccess(konfirmasiInput);
    }
  }
});

// ===========================
// EVENT: TOMBOL DAFTAR
// ===========================
btnDaftar.addEventListener('click', () => {
  const results = [
    validate(namaInput,       validateNama),
    validate(usernameInput,   validateUsername),
    validate(emailInput,      validateEmail),
    validate(passwordInput,   validatePassword),
    validate(konfirmasiInput, validateKonfirmasi),
  ];

  const allValid = results.every(Boolean);
  if (!allValid) {
    // Scroll ke error pertama
    const firstError = document.querySelector('.input-invalid');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Simulasi loading
  btnDaftar.textContent = 'Mendaftarkan...';
  btnDaftar.disabled = true;

  setTimeout(() => {
    alert(`Akun berhasil dibuat! Selamat datang, ${namaInput.value.trim()} 🎉`);
    btnDaftar.textContent = 'Daftar';
    btnDaftar.disabled = false;
    // window.location.href = 'home.html'; // aktifkan jika ingin redirect
  }, 1500);
});

// ===========================
// EVENT: TOMBOL GOOGLE
// ===========================
btnGoogle.addEventListener('click', () => {
  alert('Daftar dengan Google belum tersedia.');
});
