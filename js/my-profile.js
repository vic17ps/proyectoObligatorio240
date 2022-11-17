
let mailCamp = document.getElementById('eMail');
mailCamp.value = localStorage.getItem("correo");


(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')

        }, false)
      })
  })()

  function saveInfo() {
  const userInfo = {};
  userInfo.firstname = document.getElementById('firstName').value;
  userInfo.midname = document.getElementById('midName').value;
  userInfo.firstlast = document.getElementById('firstLastName').value;
  userInfo.seclast = document.getElementById('secLastName').value;
  userInfo.phone = document.getElementById('phoneNum').value;

  window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  function showInfo() {
    let userInfo1 = JSON.parse(localStorage.getItem("userInfo"));
   document.getElementById('firstName').value = userInfo1.firstname;
   document.getElementById('midName').value = userInfo1.midname;
   document.getElementById('firstLastName').value = userInfo1.firstlast;
   document.getElementById('secLastName').value = userInfo1.seclast;
   document.getElementById('phoneNum').value = userInfo1.phone;

  }

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById("submitInfo").addEventListener("click",()=>{
        saveInfo();
    })
    showInfo();
})

