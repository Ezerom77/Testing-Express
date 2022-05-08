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
        let errors = [];
        if(campoName.value == ""){
            errors.push("Debes completar tu nombre")
            
        if(campoApellido.value == ""){
            errors.push("Debes completar tu apellido")
           
        }
        if(emailRegex.test(campoEmail.value)){
            
        } else {
            errors.push("Por favor ingresa un email válido")
            
        }
        if(campoContrasena.value.length < 10){
            errors.push("La contraseña debe tener al menos 10 caracteres")
            
        }
        if(campoImg.value == ""){
            errors.push("Debes elegir una foto de perfil")
            
        }
        if(!campoTerms.value.checked){
            errors.push("Debes aceptar los términos y condiciones para continuar")
            
        }
        let ulErrores = document.querySelector('div.errorBox');
        if(errors.length > 0){
            e.preventDefault()
            for(let i = 0 ; i<errors.length ; i++){
                ulErrores.innerHTML += "<p>"+errors[i] + "</p>"
            }
        } 

    }


    })

})