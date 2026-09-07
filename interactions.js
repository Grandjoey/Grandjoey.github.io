  // general //
  const prevlink = document.getElementById('back_arrow');
  const walkaudio = document.getElementById('walkback');
  var firstDoorStep = false
  // sessionStorage.setItem('firstDoorStep', false);
  firstDoorStep = sessionStorage.getItem('firstDoorStep') === 'true';

  var has_key = false
  // sessionStorage.setItem('has_key', false);
  has_key = sessionStorage.getItem('has_key') === 'true';

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
  const mailbuttonimg = document.getElementById('mailbuttonpic');
  const mailglower = document.getElementById('mailglower');
  var signal = document.getElementById('signal')
  var mailbuttonnoise = document.getElementById('radbuttionnoise')
if (mbutton) {
  if (firstDoorStep) {
    const ticketbutton = document.createElement('button');
    var ticketpicko = document.getElementById('ticketpic')
    var papernoise = document.getElementById('cardgrab')
    if (has_key) {
      mbutton.disabled = true;
    } else {
      mailbuttonimg.style.opacity = "1";
      console.log("Key Bool is ", has_key);
      ticketbutton.addEventListener('click', function() {
        papernoise.play()
        mailbuttonimg.style.opacity = "0";
        ticketpicko.src = 'images/bxofnothing.png';
        // mbutton.disabled = false;
        ticketbutton.remove();
        sessionStorage.setItem('has_key', true);
        has_key = true;
        console.log("collected ticket bool is ", has_key);
      });
      mbutton.addEventListener('click', function() {
        mailbuttonnoise.play()
        mailbuttonimg.style.opacity = "0";
        console.log("Made button");
        ticketbutton.className = 'btn-mticket';
        document.body.appendChild(ticketbutton);
        ticketpicko.src = 'images/mailbox_ticket.gif';
        mbutton.disabled = true;
      });
    };
  } else {
    mbutton.addEventListener('click', function() {
      mailbuttonnoise.play()
      if (signal.paused) {
        signal.play();
        mailbuttonimg.style.opacity = "1";
        mailglower.classList = 'mailbox_on';
      } else {
        signal.pause();
        mailbuttonimg.style.opacity = "0";
        mailglower.classList = 'mailbox_off';
      }
    });
  }
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
  console.log("Bool is ", firstDoorStep);
  if (firstDoorStep) {
    document.getElementById('button1pic').style.filter = 'hue-rotate(140deg)';
    document.getElementById('button2pic').style.filter = 'hue-rotate(170deg)';
    document.getElementById('button3pic').style.filter = 'hue-rotate(-80deg)';
    button1.classList.remove('buttonopic');
    button2.classList.remove('buttonopic');
    button3.classList.remove('buttonopic');
  } else {
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
        knobjiggle.play()
        document.getElementById('button1pic').style.filter = 'hue-rotate(140deg)';
        document.getElementById('button2pic').style.filter = 'hue-rotate(170deg)';
        document.getElementById('button3pic').style.filter = 'hue-rotate(-80deg)';
        button1.classList.remove('buttonopic');
        button2.classList.remove('buttonopic');
        button3.classList.remove('buttonopic');
        sessionStorage.setItem('firstDoorStep', true);
        firstDoorStep = true;
        console.log("CORRECT! Bool is ", sessionStorage.getItem('firstDoorStep'));
        button1.disabled = true;
        button2.disabled = true;
        button3.disabled = true;
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
      }
    });
  }
}
