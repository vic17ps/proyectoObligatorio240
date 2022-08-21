function login(){ //creo la funcion login, declarando elementos user y pass
    let user = document.getElementById('username').value
    let contra = document.getElementById('pass').value

    if (user==="" || contra==="" || (!user.includes("@") || !user.includes(".com"))) { //determino condiciones
        showAlertError(); //si no se cumplen sale alerta de error
    } else {
        showAlertSuccess(location.href="index.html"); //si esta todo bien, redirige al index y guarda el dato en localStorage
        localStorage.setItem("correo", user);
    }
}

document.addEventListener('DOMContentLoaded',()=>{ //listener que ejecuta funcion login al hacer click en boton ingresar
    document.getElementById("ingreso").addEventListener("click",()=>{
        login();
    })
})

function showAlertSuccess() { //funciones para mostrar alertas de error y exito
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}