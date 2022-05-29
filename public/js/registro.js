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

    
    formulario.addEventListener('submit', function(e){

            campoName.classList.remove('is-invalid');
            nameError.innerHTML = "";
            campoApellido.classList.remove('is-invalid');
            apellidoError.innerHTML = "";
            campoEmail.classList.remove('is-invalid');
            emailError.innerHTML = "";
            campoContrasena.classList.remove('is-invalid');
            contrasenaError.innerHTML = "";
            imgError.innerHTML = "";
            termsError.innerHTML = "";

        if(campoName.value == ""){
            e.preventDefault();
            let nameError = document.querySelector("#nameError")
            campoName.classList.add('is-invalid');
            nameError.innerHTML = "* Debes completar tu nombre (Frontend)";
        }    
        if(campoApellido.value == ""){
            e.preventDefault();
            let apellidoError = document.querySelector("#apellidoError")
            campoApellido.classList.add('is-invalid');
            apellidoError.innerHTML = "* Debes completar tu apellido (Frontend)";
        }
        if(!emailRegex.test(campoEmail.value)) {
            e.preventDefault();
            let emailError = document.querySelector("#emailError")
            campoEmail.classList.add('is-invalid');
            emailError.innerHTML = "* Por favor ingresa un email válido (Frontend)";
        }
        if(campoContrasena.value.length < 10){
            e.preventDefault();
            let contrasenaError = document.querySelector("#contrasenaError")
            campoContrasena.classList.add('is-invalid');
            contrasenaError.innerHTML = "* La contraseña debe tener al menos 10 caracteres (Frontend)";
        }
        if(campoImg.value == ""){
            e.preventDefault();
            let imgError = document.querySelector("#imgError")
            imgError.innerHTML = "* Debes elegir una foto de perfil (Frontend)";            
        }
        if (campoTerms.checked == false){
            e.preventDefault();
            let termsError = document.querySelector("#termsError")
            termsError.innerHTML = "* Debes aceptar los términos y condiciones para continuar (Frontend)";
        }
    })


});
