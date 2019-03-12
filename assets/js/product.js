document.addEventListener("DOMContentLoaded", () => {
    let categoryArray = [];
    let productArray = [];
    let manufacturerArray = [];
    let fetchesDone = 0;
    let fetchCount = 3;

    let urlParams = new URLSearchParams(window.location.search);
    let productUrlID = urlParams.get("id");
    console.log(productUrlID);

    let breadcrumbsElem = document.querySelector(".breadcrumbs");
    let bigpictureElem = document.querySelector(".productgallery__bigpicture");
    let thumbnailGalleryElem = document.querySelector(".productgallery__thumbnails");
    let productNameElem = document.querySelector(".productinfo__productname");
    let productOldpriceElem = document.querySelector(".productinfo__oldprice");
    let productPriceElem = document.querySelector(".productinfo__price");
    let productDescription = document.querySelector(".productinfo__description");
    let productSeeotherElem = document.querySelector(".productinfo__seeother");

    fetch('assets/data/products.json')
        .then((response) => { return response.json() })
        .then((data) => {
            productArray = data;
            checkFetches();
        });

    fetch('assets/data/categories.json')
        .then((response) => { return response.json() })
        .then((data) => {
            categoryArray = data;
            checkFetches();
        });

    fetch('assets/data/manufacturers.json')
        .then((response) => { return response.json() })
        .then((data) => {
            manufacturerArray = data;
            checkFetches();
        });

    function checkFetches() {
        fetchesDone++
        if (fetchesDone == fetchCount) {
            console.log(productArray)
            console.log(categoryArray)
            console.log(manufacturerArray)
            updateProductInfo();
        }
    }

    function updateProductInfo(){
        productArray.forEach(product => {            
            if (productUrlID == product.id){
                bigpictureElem.src = product.picture
                productNameElem.textContent = product.name
                if(product.saleprice != null){
                    productOldpriceElem.textContent = "£" + product.price;
                    productPriceElem.textContent = "£" + product.saleprice;
                }
                else{
                    productOldpriceElem.remove();
                    productPriceElem.textContent = "£" + product.price;
                }
                if(product.description != null){
                    productDescription.textContent = product.description;
                }else{
                    productDescription.textContent = "";
                }
                //Breadcrumb change
                categoryArray.forEach(category =>{
                    if (product.categoryID == category.id){
                        breadcrumbsElem.innerHTML = `<a href="index.html">Home</a><a href="shop.html?category=${category.id}">${category.name}</a><p class="breadcrumbs__currentplace">${product.name}</p>`
                    }
                });

                manufacturerArray.forEach(manufacturer =>{
                    if (product.manufacturerID == manufacturer.id){
                        productSeeotherElem.textContent = `See other ${manufacturer.name} products`
                        productSeeotherElem.setAttribute("href", `shop.html?manufacturer=${manufacturer.id}`) = `See other ${manufacturer.name} products`;
                    }
                });

            }
        });
    };
});
