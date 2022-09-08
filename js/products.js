let productsArray = [];
//donde se cargan los datos recibidos

function showProductsList(array) { //funcion que recibe productsArray con sus datos y los muestra
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) { //for que recorre el array con los datos json, voy llamando elementos que necesite 
        let products = array[i];
        htmlContentToAppend +=
            `<div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="product image" class="img-thumbnail"></img>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ products.name + " " + "-" + " " + products.currency + " " + products.cost + `</h4> 
                        <p>` + products.description + `</p> 
                        </div>
                        <small class="text-muted">` + products.soldCount + ` vendidos</small> 
                    </div>
                </div>
            </div>
        </div>`

        document.getElementById("products-container").innerHTML = htmlContentToAppend;
        // agarro a traves de id el container que cree en el html para mostrar el contenido
    }
}

function filtrar(array) {
    let inicial = document.getElementById('minimo').value;
    let final = document.getElementById('maximo').value;
    let prodFiltro = array.filter(prod => prod.cost >= inicial && prod.cost <= final);

    showProductsList(prodFiltro);
}

function ordenoAsc(array) {
    array.sort((a, b) => {
        let aCost = parseInt(a.cost);
        let bCost = parseInt(b.cost);
        if (aCost < bCost) { return -1; }
        if (aCost > bCost) { return 1; }
        return 0;
    });
    showProductsList(array);
}

function ordenoDesc(array) {
    array.sort((a, b) => {
        let aCost = parseInt(a.cost);
        let bCost = parseInt(b.cost);
        if (aCost > bCost) { return -1; }
        if (aCost < bCost) { return 1; }
        return 0;
    });
    showProductsList(array);
}

function ordenoRel(array) {
    array.sort((a, b) => {
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);
        if (aCount > bCount) { return -1; }
        if (aCount < bCount) { return 1; }
        return 0;
    });
    showProductsList(array);
}

let catID = localStorage.getItem("catID")

//cuando carga la pagina, se llama a getJSONData para obtener el json que tengo linkeado
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCTS_URL + catID + EXT_TYPE).then(function (resultObj) { //se checkea que este todo bien, y si lo esta, se cargan los datos en autosArray
        if (resultObj.status === "ok") {
            productsArray = resultObj.data.products;
            showProductsList(productsArray);
        }
    });
    document.getElementById('filtro').addEventListener('click', () => {
        filtrar(productsArray);
    });
    document.getElementById('limpio').addEventListener('click', () => {
        document.getElementById('minimo').value = "";
        document.getElementById('maximo').value = "";
        showProductsList(productsArray);
    });
    document.getElementById('sortPrecioAsc').addEventListener('click', () => {
        ordenoAsc(productsArray);
    });
    document.getElementById('sortPrecioDesc').addEventListener('click', () => {
        ordenoDesc(productsArray);
    });
    document.getElementById('sortRel').addEventListener('click', () => {
        ordenoRel(productsArray);
    });
});
