let autosArray = [];

function listaAutos(array){
    let htmlContentToAppend = "";

    for (let i = 0; i < array.products.length; i++){ 
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
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(CARS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            autosArray = resultObj.data;
            listaAutos(autosArray);
        }
    });
});