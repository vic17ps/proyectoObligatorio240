let cart = [];
let delivery = document.getElementsByName('publicationType');


function showCart(array) {
    let cartContentToAppend = "";

    for (let i = 0; i < array.articles.length; i++) { 
        let cartInfo = array.articles[i];
        cartContentToAppend +=
        `<table>
        <tr>
          <th width="20%"></th>
          <th>Nombre</th>
          <th>Costo</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
        </tr>
        <br>
        <tr>
          <td><img src="${cartInfo.image}" class="img-thumbnail" width="60%"></td>
          <td>${cartInfo.name}</td>
          <td>${cartInfo.currency} ${cartInfo.unitCost}</td>
          <td><input onchange='validateQAndDel()' type="number" id="quantity" class="form-control is-invalid w-50"></td>
          <td id="resTotal"></td>
        </tr>`
}
document.getElementById("cartCont").innerHTML = cartContentToAppend;
};

function subtotalCart(array) {
    for (let i = 0; i < array.articles.length; i++) { 
        let cartInfo = array.articles[i];
    let prodCost = parseInt(document.getElementById('quantity').value);
    document.getElementById('resTotal').innerHTML = `${cartInfo.currency}` + " " + (prodCost*(cartInfo.unitCost));
    document.getElementById('genSubtotal').innerHTML = `${cartInfo.currency}` + " " + (prodCost*(cartInfo.unitCost));
}
}

function deliveryCost() {
    let subtotal = parseInt(cart.articles[0].unitCost) * parseInt(document.getElementById("quantity").value);
    let delivery = document.getElementsByName('publicationType');

    delCost =0;
    for (let x=0; x< delivery.length; x++){
    if (delivery[x].checked){
        delCost = subtotal * (parseFloat(delivery[x].value));
    }}
    document.getElementById('delCost').innerHTML= parseFloat((delCost).toFixed(2));
    document.getElementById('finalTotal').innerHTML= parseFloat((subtotal).toFixed(2)) + parseFloat((delCost).toFixed(2));
    document.getElementById('currency1').innerHTML = (cart.articles[0].currency);
    document.getElementById('currency2').innerHTML = (cart.articles[0].currency);
    };

function disableCard() {
    let creditCard = document.getElementById('credit');
    let secNum = document.getElementById('sec');
    let expDate = document.getElementById('expi');
    let cardNum = document.getElementById('cNum');

    if (creditCard.checked) {
        secNum.removeAttribute('disabled');
        expDate.removeAttribute('disabled');
        cardNum.removeAttribute('disabled');
        document.getElementById('payMethod').innerHTML = `Tarjeta de Credito`
    }
}

function disableBank() {
    let bankTransfer = document.getElementById('bankT');
    let accNumber = document.getElementById('accNum');

    if (bankTransfer.checked) {
        accNumber.removeAttribute('disabled');
        document.getElementById('payMethod').innerHTML = `Transferencia bancaria`
    }
}

 function validateQAndDel() {
    let quant = document.getElementById('quantity');
    
    if (quant=="") {
        quant.classList.add('is-invalid');
    } else {
     (quant.classList.remove('is-invalid'));
    }
}
/* 
function validateBankInfo() {
    let accNumber = document.getElementById('accNum');

    if (bankTransfer.checked && accNumber=="") {
        accNumber.classList.add('is-invalid');
    } else {
        accNumber.classList.remove('is-invalid');
        document.getElementById('sec').classList.remove('is-invalid');
        document.getElementById('expi').classList.remove('is-invalid');
        document.getElementById('cNum').classList.remove('is-invalid');
    }
}
*/
function validateCCInfo() {
    let creditCard = document.getElementById('credit');
    let bankTransfer = document.getElementById('bankT');

    //let secNum = document.getElementById('sec');
    //let expDate = document.getElementById('expi');
    //let cardNum = document.getElementById('cNum');

    if (!creditCard.checked && !bankTransfer.checked) {
        document.getElementById("errorPayMethod").innerHTML = "Debe seleccionar metodo de pago"
    } else {
        document.getElementById("errorPayMethod").innerHTML = "";
    }
}

function showAlertSuccess() { //funciones para mostrar alertas de error y exito
    document.getElementById("alert-success").classList.add("show");
}

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
            validateCCInfo();
           // showAlertSuccess(); //como hago andar esto lmaooooooo
          }
  
          form.classList.add('was-validated')

        }, false)
      })
  })()

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function (resultObj) { 
        if (resultObj.status === "ok") {
            cart = resultObj.data;
            showCart(cart);
        }
        document.getElementById('quantity').addEventListener('change', ()=>{
            subtotalCart(cart);
    });

    disableCard();
    disableBank();
   
})
for (let i=0; i< delivery.length; i++){
    delivery[i].addEventListener('click',()=>{
        deliveryCost();
    })
};
});