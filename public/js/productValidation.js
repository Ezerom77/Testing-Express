
window.addEventListener('load', ()  => {
    let productForm = document.querySelector('form');
    let productName = document.getElementById('productName');
    let productDescription = document.getElementById('productDescription');
    let productCategory = document.getElementById('categorias');
    let productPrice = document.getElementById('productPrice');
    let productImage = document.getElementById('productImage');
    let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    productForm.addEventListener("submit", (e) => {
        productName.classList.remove('is-invalid');
        productDescription.classList.remove('is-invalid');
        productCategory.classList.remove('is-invalid');
        productPrice.classList.remove('is-invalid');
        productImage.classList.remove('is-invalid');
        productName.nextElementSibling.innerHTML = "";
        productDescription.nextElementSibling.innerHTML = "";
        productCategory.nextElementSibling.innerHTML = "";
        productPrice.nextElementSibling.innerHTML = "";
        productImage.nextElementSibling.innerHTML = "";
    
        if (productName.value == "" || productName.value.length < 5) {
            e.preventDefault();
            productName.classList.add('is-invalid');
            productName.nextElementSibling.innerHTML = "* Debes completar el nombre del producto y este tiene que tener más de 5 caracteres";
        }
        if (productDescription.value.length < 20) {
            e.preventDefault();
            productDescription.classList.add('is-invalid');
            productDescription.nextElementSibling.innerHTML = "* La descripción del producto debe tener al menos 20 caracteres";
        }
        if (productCategory.value == "") {
            e.preventDefault();
            productCategory.classList.add('is-invalid');
            productCategory.nextElementSibling.innerHTML = "* Debes seleccionar al menos una categoría";
        }
        if (productPrice.value == "") {
            e.preventDefault();
            productPrice.classList.add('is-invalid');
            productPrice.nextElementSibling.innerHTML = "* Debes ingresar el precio del producto";
        }
        if (productImage.value == "") {
            e.preventDefault();
            productImage.classList.add('is-invalid');
            productImage.nextElementSibling.innerHTML = "* Debes subir una imagen";
        }
         else {
            e.submit();
        }
    });
});   