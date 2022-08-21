document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

document.addEventListener("DOMContentLoaded", () => { //listener que checkea al cargar la pagina si el usuario esta loggeado
    let user = localStorage.getItem("correo");   

    if (user == null) {  //si no lo esta, sale alerta y redirige a la pagina del login
        alert("Debe ingresar");
        location.href = "login.html"
    } else {
        document.getElementById("user").innerHTML = user
    }

});