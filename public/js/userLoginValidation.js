window.addEventListener('load', () => {

    let loginForm = document.querySelector('form');
    let email = document.querySelector("#email")
    let password = document.querySelector("#password")
    let emailError = document.querySelector("#emailError")
    let passError = document.querySelector("#passError")

    email.addEventListener("focus", (e) => {
        email.classList.remove('is-invalid');
        emailError.innerHTML = "";
    });
    email.addEventListener("blur", (e) => {
        if(email.value == ""){
            email.classList.add('is-invalid');
            emailError.innerHTML = "El campo no puede estar vacio (Frontend)";
        }
    });
    password.addEventListener("focus", (e) => {
        password.classList.remove('is-invalid');
        passError.innerHTML = "";
    });
    password.addEventListener("blur", (e) => {
        if(password.value == ""){
            password.classList.add('is-invalid');
            passError.innerHTML = "El campo no puede estar vacio (Frontend)";
        }
    });


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