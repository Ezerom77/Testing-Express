window.addEventListener('load', () => {

    let loginForm = document.querySelector('form');
    let email = document.querySelector("#email")
    let password = document.querySelector("#password")
    let emailError = document.querySelector("#emailError")
    let passError = document.querySelector("#passError")

    loginForm.addEventListener("submit", (e) => {

            email.classList.remove('is-invalid');
            emailError.innerHTML = "";
            password.classList.remove('is-invalid');
            passError.innerHTML = "";
        
        if (email.value == "") {
            e.preventDefault();
            email.classList.add('is-invalid');
            emailError.innerHTML = "* Debes completar el email de usuario para ingresar (Frontend)";
        }
        if (password.value == "") {
            e.preventDefault();
            password.classList.add('is-invalid');
            passError.innerHTML = "* No has ingresado una contraseña (Frontend)";
        }  
    })

})