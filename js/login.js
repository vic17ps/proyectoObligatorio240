function login(){
    let user = document.getElementById('username').value
    let contra = document.getElementById('pass').value

    if (user==="" || contra==="" || (!user.includes("@") || !user.includes(".com"))) {
        showAlertError();
    } else {
        showAlertSuccess(location.href="index.html");
        localStorage.setItem("correo", user);
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById("inicio").addEventListener("click",()=>{
        login();
    })
})

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}