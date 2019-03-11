document.addEventListener("DOMContentLoaded", () => {
    let categoryArray = [];
    let productArray = [];
    let fetchesDone = 0;
    let fetchCount = 2;

    let urlParams = new URLSearchParams(window.location.search);
    let categorySort = urlParams.get("category");
    let priceSort = urlParams.get("price");
    let manufacturerSort = urlParams.get("manufacturer");

    let bodyElem = document.querySelector("body");
    let productlistElem = document.querySelector(".productlist");
    let categorylistElem = document.querySelector(".categorylist");
    let itemCountElem = document.querySelector(".sortingbar__itemsshown");
    let middleTitleElem = document.querySelector(".shop-middle__title");
    let breadcrumbsCurrentElem = document.querySelector(".breadcrumbs__currentplace");
    let loaderElem = document.querySelector(".loader");
    let LogoElem = document.querySelector(".loader__image");

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

    function checkFetches() {
        fetchesDone++
        if (fetchesDone == fetchCount) {
            console.log(categoryArray);
            updateCaregories();
            if (categorySort != null) {
                updateProducts(categorySort);
            } else if (manufacturerSort != null) {
                updateProducts(manufacturerSort);
            } else if (priceSort != null) {
                updateProducts(priceSort);
            }else{
                loaderHide();
                updateProducts(null);
            }
        }
    }
    function updateProducts(sorting) {
        console.log(sorting)
        productlistElem.innerHTML = "";

        let categoryItems = categorylistElem.querySelectorAll("li a");

        categoryArray.forEach(category => {
            if (category.id == sorting) {
                middleTitleElem.textContent = category.name;
                breadcrumbsCurrentElem.textContent = category.name;
                categoryItems.forEach(categoryItem => {
                    if(category.name == categoryItem.textContent){
                        categoryItem.classList.add("categoryactive");
                        console.log(category.name)
                    }
                });
            }
        });



        productArray.forEach(product => {
            if (product.categoryID == sorting || product.manufacturerID == sorting) {
                createProduct(product);
            } else if(sorting == null){
                createProduct(product);
            }
        });
        let items = document.querySelectorAll(".product");
        itemCountElem.textContent = `${items.length} Item(s)`
        if (items.length == 0) {
            console.log("Ingen items")
            productlistElem.innerHTML = `<h1>No results found</h1>`
        }
        loaderHide();
    };
    function createProduct(product){
        let productdiv = document.createElement("div");
        productdiv.classList.add("product")

        let productImageContainer = document.createElement("a");
        let productImage = document.createElement("img");
        productImage.src = product.picture;
        productImageContainer.classList.add("product__imagecontainer")
        productImageContainer.setAttribute("href", "#")
        productImageContainer.appendChild(productImage);

        let productName = document.createElement("a");
        productName.classList.add("product__name");
        let productNameText = document.createTextNode(product.name);
        productName.appendChild(productNameText);

        let productPricebox = document.createElement("div");
        let productPrice = document.createElement("p");

        if (product.saleprice == null) {
            let productPriceText = document.createTextNode(`£${product.price}`);
            productPrice.appendChild(productPriceText);
        } else {
            let productPriceText = document.createTextNode(`£${product.saleprice}`);
            productPrice.appendChild(productPriceText);

            let productOldprice = document.createElement("p");
            let productOldpriceText = document.createTextNode(`£${product.price}`);
            productOldprice.appendChild(productOldpriceText);
            productOldprice.classList.add("product__oldprice");
            productPricebox.appendChild(productOldprice);
        }
        productPrice.classList.add("product__price");
        productPricebox.classList.add("product__pricebox");
        productPricebox.appendChild(productPrice);

        productdiv.appendChild(productImageContainer)
        productdiv.appendChild(productName)
        productdiv.appendChild(productPricebox)
        productdiv.appendChild(productPricebox)

        if (product.stock > 0) {
            let productButton = document.createElement("button");
            let productButtonText = document.createTextNode("Add to cart");
            productButton.classList.add("btn--brownish","product__cartBtn");
            productButton.appendChild(productButtonText);
            productdiv.appendChild(productButton)
        }

        productlistElem.appendChild(productdiv)
    }
    function updateCaregories() {
        categorylistElem.innerHTML = "";
        categoryArray.forEach(category => {
            categorylistElem.innerHTML += `<li><a href="?category=${category.id}">${category.name}</a></li>`;
        })
    }

    loaderElem.addEventListener("animationend", () => {
        loaderElem.style.display = "none";
    });

    function loaderHide() {
        LogoElem.classList.remove("pulse");
        loaderElem.classList.add("loaderout");
        bodyElem.classList.remove("body--overflowhidden")
    }

});
