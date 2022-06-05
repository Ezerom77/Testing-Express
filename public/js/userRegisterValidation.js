window.addEventListener('load', function() {
    let formulario = document.querySelector('form.registerForm') ;
    let campoName = document.getElementById('nombre');
    let campoApellido = document.getElementById('apellido');
    let campoEmail = document.getElementById('email'); 
    let campoContrasena = document.getElementById('password'); 
    let campoImg = document.getElementById('profilePic');
    let campoTerms = document.getElementById('terminosCondiciones'); 
    let botonSubmit = document.getElementById('submit'); 
    let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ ;

    campoName.classList.remove('is-invalid');
    campoApellido.classList.remove('is-invalid');
    campoEmail.classList.remove('is-invalid');
    campoContrasena.classList.remove('is-invalid');
    campoImg.classList.remove('is-invalid');
    campoTerms.classList.remove('is-invalid');
    campoName.nextElementSibling.innerHTML = "";
    campoApellido.nextElementSibling.innerHTML = "";
    campoEmail.nextElementSibling.innerHTML = "";
    campoContrasena.nextElementSibling.innerHTML = "";
    campoImg.nextElementSibling.innerHTML = "";
    campoTerms.nextElementSibling.innerHTML = "";

    campoName.addEventListener("focus", (e) => {
        campoName.classList.remove('is-invalid');
        campoName.nextElementSibling.innerHTML = "";
    });
    campoApellido.addEventListener("focus", (e) => {
        campoApellido.classList.remove('is-invalid');
        campoApellido.nextElementSibling.innerHTML = "";
    });
    campoEmail.addEventListener("focus", (e) => {
        campoEmail.classList.remove('is-invalid');
        campoEmail.nextElementSibling.innerHTML = "";
    });
    campoContrasena.addEventListener("focus", (e) => {
        campoContrasena.classList.remove('is-invalid');
        campoContrasena.nextElementSibling.innerHTML = "";
    });
    campoImg.addEventListener("focus", (e) => {
        campoImg.classList.remove('is-invalid');
        campoImg.nextElementSibling.innerHTML = "";
    });
    campoTerms.addEventListener("focus", (e) => {
        campoTerms.classList.remove('is-invalid');
        campoTerms.nextElementSibling.innerHTML = "";
    });

    campoName.addEventListener("blur", (e) => {
        if(campoName.value == ""){
            campoName.classList.add('is-invalid');
            campoName.nextElementSibling.innerHTML = "El campo no puede estar vacio (Frontend)";
        }
    }
    );
    campoApellido.addEventListener("blur", (e) => {
        if(campoApellido.value == ""){
            campoApellido.classList.add('is-invalid');
            campoApellido.nextElementSibling.innerHTML = "El campo no puede estar vacio (Frontend)";
        }
    }
    );
    campoEmail.addEventListener("blur", (e) => {
        if(campoEmail.value == ""){
            campoEmail.classList.add('is-invalid');
            campoEmail.nextElementSibling.innerHTML = "El campo no puede estar vacio (Frontend)";
        }
        else if(!emailRegex.test(campoEmail.value)){
            campoEmail.classList.add('is-invalid');
            campoEmail.nextElementSibling.innerHTML = "El email no es valido (Frontend)";
        }
    }
    );
    campoContrasena.addEventListener("blur", (e) => {
        if(campoContrasena.value == ""){
            campoContrasena.classList.add('is-invalid');
            campoContrasena.nextElementSibling.innerHTML = "El campo no puede estar vacio (Frontend)";
        }
    }
    );
    campoImg.addEventListener("blur", (e) => {
        if(campoImg.value == ""){
            campoImg.classList.add('is-invalid');
            campoImg.nextElementSibling.innerHTML = "El campo no puede estar vacio (Frontend)";
        }
    }
    );
    campoTerms.addEventListener("blur", (e) => {
        if(!campoTerms.checked){
            campoTerms.classList.add('is-invalid');
            campoTerms.nextElementSibling.innerHTML = "Debe aceptar los terminos y condiciones (Frontend)";
        }
    }
    );

/*ESTO EVITA EL ENVIO DEL FORM. ESTA DESACTIVADO PARA PODER MOSTRAR LAS VALIDACIONES DE BACKEND
    formulario.addEventListener("submit", (e) => {
        if(campoName.value == ""
        || campoApellido.value == ""
        || campoEmail.value == ""
        || campoContrasena.value == ""
        || campoImg.value == ""
        || !campoTerms.checked){
            
            e.preventDefault();
            return this.alert("Debe completar todos los campos");
        }
        else if(!emailRegex.test(campoEmail.value)){
            e.preventDefault();
            return this.alert("El email no es valido");
        }
        else{
            e.submit()
        }
    }
    );
*/
}
);
