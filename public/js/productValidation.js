window.addEventListener('load', function() {
    let formulario = document.querySelector('form.productCreateForm') ;
    let productName = document.getElementById('productName');
    let productDescription = document.getElementById('productDescription');
    let categorias = document.getElementById('categorias'); 
    let talle = document.getElementById('talle'); 
    let color = document.getElementById('color');
    let productPrice = document.getElementById('productPrice'); 
    let productImage = document.getElementById('productImage'); 
    let botonSubmit = document.getElementById('submit'); 

    
    formulario.addEventListener('submit', function(e){
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        let errors = [];
        if(productName.value == "" || productName.value.length < 5){
            errors.push("Debes completar el nombre del producto y este debe tener más de 5 caracteres")
        }    
        if(productDescription.length < 20){
            errors.push("La descripción del producto debe tener más de 20 caracteres")
           
        }
        if(campoImg.value == null || !acceptedExtensions.includes(path.extname(file.originalname))){
            errors.push('Debes elegir una imagen de producto y esta tiene que ser formato jpg, jpeg, png o gif')
            
        }
        let ulErrores = document.querySelector('div.errorBox ul');
        if(errors.length > 0){
            e.preventDefault()
            for(let i = 0 ; i < errors.length ; i++){
                ulErrores.innerHTML += "<li>"+ errors[i] + "</li>"
            }
        } 

    })
});
