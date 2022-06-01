window.addEventListener('load', () => {

    let editForm = document.querySelector('form');
    let nombre = document.querySelector("#nombre");
    let nombreError = document.querySelector("#nombreError");
    let apellido = document.querySelector("#apellido");
    let apellidoError = document.querySelector("#apellidoError");
    let email = document.querySelector("#email");
    let emailError = document.querySelector("#emailError");

    editForm.addEventListener("submit", (e) => {

            nombre.classList.remove('is-invalid');
            nombreError.innerHTML = "";
            apellido.classList.remove('is-invalid');
            apellidoError.innerHTML = "";
            email.classList.remove('is-invalid');
            emailError.innerHTML = "";
        
        if (nombre.value == "") {
            e.preventDefault();
            nombre.classList.add('is-invalid');
            nombreError.innerHTML = "* Debes ingresar tu nombre para actualizarlo  (Frontend)";
        }
        if (apellido.value == "") {
            e.preventDefault();
            apellido.classList.add('is-invalid');
            apellidoError.innerHTML = "* Debes ingresar tu apellido para actualizarlo (Frontend)";
        }
        if (email.value == "") {
            e.preventDefault();
            email.classList.add('is-invalid');
            emailError.innerHTML = "* Debes ingresar tu e-mail para actualizarlo (Frontend)";
        }  
    })

})