  // HeLlswIg //
  const link = document.getElementById('back_arrow');
  const audio = document.getElementById('walkback');

  link.addEventListener('click', function (e) {
    e.preventDefault();
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Fallback: navigate immediately if audio fails
      window.location.href = link.href;
    });

    audio.addEventListener('ended', () => {
      window.location.href = link.href;
    }, { once: true });

  });
  const mbutton = document.getElementById('mailbutton')
  const mailimg = document.getElementById('mailbuttonpic');
  const mailglower = document.getElementById('mailglower');
  var signal = document.getElementById('signal')
  var buttonnoise = document.getElementById('radbuttionnoise')
  mbutton.addEventListener('click', function() {
     buttonnoise.play()
    if (signal.paused) {
      signal.play();
      mailimg.style.opacity = "1";
      mailglower.classList = 'mailbox_on';
    } else {
      signal.pause();
      mailimg.style.opacity = "0";
      mailglower.classList = 'mailbox_off';
    }
  });

