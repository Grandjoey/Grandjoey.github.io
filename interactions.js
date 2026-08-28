  // general //
  const prevlink = document.getElementById('back_arrow');
  const walkaudio = document.getElementById('walkback');
  var firstDoorStep = false
  firstDoorStep = sessionStorage.getItem('firstDoorStep') === 'true';

  prevlink.addEventListener('click', function (e) {
    e.preventDefault();
    walkaudio.currentTime = 0;
    walkaudio.play().catch(() => {
      // Fallback: navigate immediately if audio fails
      window.location.href = prevlink.href;
    });

    walkaudio.addEventListener('ended', () => {
      window.location.href = prevlink.href;
    }, { once: true });

  });
  // mail section //
  const mbutton = document.getElementById('mailbutton')
  const mailimg = document.getElementById('mailbuttonpic');
  const mailglower = document.getElementById('mailglower');
  var signal = document.getElementById('signal')
  var mailbuttonnoise = document.getElementById('radbuttionnoise')
if (mbutton) {
  mbutton.addEventListener('click', function() {
     mailbuttonnoise.play()
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
}
  // door section //
  let buttonnoise = document.getElementById('radbuttionnoise')
  let knobjiggle = document.getElementById('doorknobnoise')
  let button1 = document.getElementById('button1');
  let button2 = document.getElementById('button2');
  let button3 = document.getElementById('button3');

  let inputnumbers = [];
  const  correctnumbers = [3];

if (button1) {
  if (firstDoorStep) {
    document.getElementById('button1pic').style.filter = 'hue-rotate(140deg)';
    document.getElementById('button2pic').style.filter = 'hue-rotate(170deg)';
    document.getElementById('button3pic').style.filter = 'hue-rotate(-80deg)';
  };
  console.log("Bool is ", firstDoorStep);
  button1.addEventListener('click', function() {
    buttonnoise.play()
    inputnumbers.push(1);
    console.log("input password is ", inputnumbers);
  });
  button2.addEventListener('click', function() {
    buttonnoise.play()
    inputnumbers.push(2);
    console.log("input password is ", inputnumbers);
  });
  button3.addEventListener('click', function() {
    buttonnoise.play()
    inputnumbers.push(3);
    console.log("input password is ", inputnumbers);
  });
  function arraysAreEqual(arr1, arr2) {
      // Check if lengths are different
      if (arr1.length !== arr2.length) return false;
      
      // Check each item in the array
      for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) return false;
      }
      return true;
  };
  document.getElementById('doorknob').addEventListener('click', function() {
      if (arraysAreEqual(inputnumbers, correctnumbers)) {
          buttonnoise.play()
          document.getElementById('button1pic').style.filter = 'hue-rotate(140deg)';
          document.getElementById('button2pic').style.filter = 'hue-rotate(170deg)';
          document.getElementById('button3pic').style.filter = 'hue-rotate(-80deg)';
          sessionStorage.setItem('firstDoorStep', true);
          console.log("CORRECT! Bool is ", sessionStorage.getItem('firstDoorStep'));
      } else {
          document.getElementById('d1_knob').classList.remove('doorknob_jigglin');
          knobjiggle.play()
          knobjiggle.onplay = () => {
              document.getElementById('d1_knob').classList.add('doorknob_jigglin');
          }
          inputnumbers.length = 0;
          document.getElementById('button1pic').style.filter = 'hue-rotate(0deg)';
          document.getElementById('button2pic').style.filter = 'hue-rotate(0deg)';
          document.getElementById('button3pic').style.filter = 'hue-rotate(0deg)';
          sessionStorage.setItem('firstDoorStep', false);
          console.log(inputnumbers);
          console.log("RESET! Bool is ", sessionStorage.getItem('firstDoorStep'));
          knobjiggle.onpause = () => {
              document.getElementById('d1_knob').classList.remove('doorknob_jigglin');
          }
          // setTimeout(() => {
              // document.getElementById('d1_knob').classList.remove('doorknob_jigglin');
          // }, 1000);
      }
  });
}
