window.addEventListener('load', () => {

    let loginForm = document.querySelector('form');

    loginForm.addEventListener("submit", (e) => {
        let email = document.querySelector("#email")
        let password = document.querySelector("#password")
        
        if (email.value == "") {
            e.preventDefault();
            let emailError = document.querySelector("#emailError")
            emailError.innerHTML = "* Debes completar el email de usuario para ingresar";
            
        }
        else if (password.value == "") {
            e.preventDefault();
            let passError = document.querySelector("#passError")
            passError.innerHTML = "* No has ingresado una contraseña";
        }  
    })


})