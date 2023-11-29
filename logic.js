


function handleLogin() {
 

  // Retrieve the input field values
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  // Get the error message containers
  const usernameError = document.getElementById('usernameError');
  const passwordError = document.getElementById('passwordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  // Reset previous error messages and input borders
  usernameError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
  usernameInput.style.border = "";
  passwordInput.style.border = "";
  confirmPasswordInput.style.border = "";

  // Validate username (between 3 and 20 characters)
  if (usernameInput.value.length < 3 || usernameInput.value.length > 20) {
      usernameError.textContent = "Username must be between 3 and 20 characters.";
      usernameInput.style.border = "2px solid red";
      return false;
  }

  // Validate password (between 5 and 20 characters)
  if (passwordInput.value.length < 5 || passwordInput.value.length > 20) {
      passwordError.textContent = "Password must be between 5 and 20 characters.";
      passwordInput.style.border = "2px solid red";
      return false;
  }

  // Validate confirm password
  if (confirmPasswordInput.value !== passwordInput.value) {
      confirmPasswordError.textContent = "Passwords do not match.";
      confirmPasswordInput.style.border = "2px solid red";
      return false;
  }

  
  return true;
}
