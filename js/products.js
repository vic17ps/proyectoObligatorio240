let autosArray = [];
//donde se cargan los datos recibidos

function listaAutos(array){ //funcion que recibe autosArray con sus datos y los muestra
    let htmlContentToAppend = "";

    for (let i = 0; i < array.products.length; i++){ //for que recorre el array con los datos json, voy llamando elementos que necesite 
        let autos = array.products[i];
        htmlContentToAppend +=
        `<div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + autos.image + `" alt="product image" class="img-thumbnail"></img>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ autos.name + " " + "-" + " " + autos.currency + " " + autos.cost +`</h4> 
                        <p>` + autos.description + `</p> 
                        </div>
                        <small class="text-muted">` + autos.soldCount + ` vendidos</small> 
                    </div>
                </div>
            </div>
        </div>`
        
        document.getElementById("autos-container").innerHTML = htmlContentToAppend; 
        // agarro a traves de id el container que cree en el html para mostrar el contenido
    }
}

//cuando carga la pagina, se llama a getJSONData para obtener el json que tengo linkeado
document.addEventListener("DOMContentLoaded", function() { 
    getJSONData(CARS_URL).then(function(resultObj){ //se checkea que este todo bien, y si lo esta, se cargan los datos en autosArray
        if (resultObj.status === "ok")
        {
            autosArray = resultObj.data;
            listaAutos(autosArray);
        }
    });
});