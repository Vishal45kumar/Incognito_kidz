document.getElementById('loginBtn').addEventListener('click', function() {
  smoothRedirect('login.html');
});

document.getElementById('signupBtn').addEventListener('click', function() {
  smoothRedirect('signup.html');
});

function smoothRedirect(page) {
  document.body.classList.add('fade-out');
  setTimeout(function() {
      window.location.href = page;
  }, 500);
}
// This part is already included in the previous script.js
document.getElementById('signupBtn').addEventListener('click', function() {
    smoothRedirect('signup.html');
});

function smoothRedirect(page) {
    document.body.classList.add('fade-out');
    setTimeout(function() {
        window.location.href = page;
    }, 500);
}
document.getElementById('loginBtn').addEventListener('click', function() {
  smoothRedirect('login.html');
});

document.getElementById('signupBtn').addEventListener('click', function() {
  smoothRedirect('signup.html');
});

function smoothRedirect(page) {
  document.body.classList.add('fade-out');
  setTimeout(function() {
      window.location.href = page;
  }, 500);
}
document.getElementById('submit1').addEventListener('click', function() {
  smoothRedirect('post-login.html');
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.href = 'post-login.html';
});
