window.addEventListener('load', () => {

    let loginForm = document.querySelector('form');

    loginForm.addEventListener("submit", (e) => {
        let email = document.querySelector("#email")
        let password = document.querySelector("#password")
        
        if (email.value == "") {
            e.preventDefault();
            let emailError = document.querySelector("#emailError")
            email.classList.add('is-invalid');
            emailError.innerHTML = "* Debes completar el email de usuario para ingresar";
        }
        else if (password.value == "") {
            e.preventDefault();
            email.classList.remove('is-invalid');
            emailError.innerHTML = "";
            let passError = document.querySelector("#passError")
            password.classList.add('is-invalid');
            passError.innerHTML = "* No has ingresado una contraseña";
        }  
    })


})