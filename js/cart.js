let cart = [];

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
          <td><input type="number" id="quantity"></td>
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
}}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function (resultObj) { 
        if (resultObj.status === "ok") {
            cart = resultObj.data;
            showCart(cart);
        }
        document.getElementById('quantity').addEventListener('change', ()=>{
            subtotalCart(cart);
    });
})
});