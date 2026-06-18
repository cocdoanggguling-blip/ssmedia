// ===========================
// VALIDASI FORM LOGIN
// ===========================

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnLogin = document.querySelector('.btn-primary');
const btnGoogle = document.querySelector('.btn-google');

// ===========================
// HELPER: Tampilkan error
// ===========================
function showError(input, message) {
  removeError(input);

  const group = input.closest('.form-group');
  const error = document.createElement('span');
  error.className = 'input-error';
  error.textContent = message;
  group.appendChild(error);
  input.classList.add('input-invalid');
}

function removeError(input) {
  const group = input.closest('.form-group');
  const existing = group.querySelector('.input-error');
  if (existing) existing.remove();
  input.classList.remove('input-invalid');
}

// ===========================
// VALIDASI EMAIL
// ===========================
function validateEmail(value) {
  if (!value.trim()) return 'Email tidak boleh kosong.';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value)) return 'Format email tidak valid.';
  return null;
}

// ===========================
// VALIDASI PASSWORD
// ===========================
function validatePassword(value) {
  if (!value) return 'Password tidak boleh kosong.';
  if (value.length < 6) return 'Password minimal 6 karakter.';
  return null;
}

// ===========================
// EVENT: Validasi real-time
// ===========================
emailInput.addEventListener('blur', () => {
  const err = validateEmail(emailInput.value);
  if (err) showError(emailInput, err);
  else removeError(emailInput);
});

passwordInput.addEventListener('blur', () => {
  const err = validatePassword(passwordInput.value);
  if (err) showError(passwordInput, err);
  else removeError(passwordInput);
});

emailInput.addEventListener('input', () => removeError(emailInput));
passwordInput.addEventListener('input', () => removeError(passwordInput));

// ===========================
// EVENT: Tombol Login
// ===========================
btnLogin.addEventListener('click', () => {
  const emailErr = validateEmail(emailInput.value);
  const passErr = validatePassword(passwordInput.value);

  if (emailErr) showError(emailInput, emailErr);
  if (passErr) showError(passwordInput, passErr);

  if (emailErr || passErr) return;

  // Simulasi loading
  btnLogin.textContent = 'Memproses...';
  btnLogin.disabled = true;

  setTimeout(() => {
    // Simulasi login berhasil → redirect ke beranda
    alert('Login berhasil! Selamat datang.');
    btnLogin.textContent = 'Masuk';
    btnLogin.disabled = false;
    // window.location.href = 'index.html'; // aktifkan jika ada halaman beranda
  }, 1500);
});

// ===========================
// EVENT: Tombol Google
// ===========================
btnGoogle.addEventListener('click', () => {
  alert('Login dengan Google belum tersedia.');
});
