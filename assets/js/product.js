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
    let searchFormElem = document.querySelector(".headertop__searchbox");

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
    searchFormElem.addEventListener('submit', (event) => {
        event.preventDefault();
        if(searchFormElem[0].value != ""){
            document.location = `shop.html?search=${searchFormElem[0].value}`
        }else{
            searchFormElem[0].style.borderColor = "red"
            searchFormElem[1].style.borderColor = "red"
        }
    });

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
                    productDescription.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis tortor ac diam lacinia, vitae imperdiet felis mattis. Suspendisse vel mi quis dui consectetur placerat. Aenean ipsum neque, tincidunt et libero quis, rutrum interdum lectus. Aliquam at urna diam.";
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
