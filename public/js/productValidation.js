const path = require("path");


window.addEventListener('load', ()  => {
    let productForm = document.querySelector('form');
    
    productForm.addEventListener('submit', (e) => {
        let productName = document.querySelector('#productName');
        let productDescription = document.querySelector('#productDescription');
        let productCategory = document.querySelector('#categorias');
        let productPrice = document.querySelector('#productPrice');
        let productImage = document.querySelector('#productImage');
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        if(productName.value == "" || productName.value.length < 5){
            e.preventDefault();
            let prodNameError = document.querySelector("#prodNameError")
            prodNameError.innerHTML = "* Debes completar el nombre del producto y este debe tener más de 5 caracteres";   
            }
        else if(productDescription.length < 20){
            e.preventDefault();
            let prodDescError = document.querySelector("#prodDescError")
            prodDescError.innerHTML = "* Debes completar la descripción del producto y este debe tener más de 20 caracteres";
            }
        else if(productCategory.value == ""){
            e.preventDefault();
            let prodCatError = document.querySelector("#prodCatError")
            prodCatError.innerHTML = "* Debes elegir AL MENOS UNA categoría para el producto";
            }
        else if(productImage.value == null || !acceptedExtensions.includes(path.extname(file.originalname))){
            e.preventDefault();
            let prodImgError = document.querySelector("#prodImgError")
            prodImgError.innerHTML = "* Debes subir al menos una imagen (maximo 4) con extensiones .jpg, .jpeg, .png, .gif";
            }
        else if(productPrice.value == ""){
            e.preventDefault();
            let prodPriceError = document.querySelector("#prodPriceError")
            prodPriceError.innerHTML = "* Debes ingresar el precio del producto";
            }
        })
    })



            

