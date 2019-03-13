document.addEventListener("DOMContentLoaded", () => {
    let categoryArray = [];
    let productArray = [];
    let manufacturerArray = [];
    let fetchesDone = 0;
    let fetchCount = 3;

    // Url params
    let urlParams = new URLSearchParams(window.location.search);
    let categorySort = urlParams.get("category");
    let priceSort = urlParams.get("price");
    let manufacturerSort = urlParams.get("manufacturer");
    let searchUrlTerm = urlParams.get("search");

    //Elements
    let bodyElem = document.querySelector("body");
    let productlistElem = document.querySelector(".productlist");
    let categorylistElem = document.querySelector(".categorylist");
    let manufacturerListElem = document.querySelector(".manufacturerlist");
    let itemCountElem = document.querySelector(".sortingbar__itemsshown");
    let middleTitleElem = document.querySelector(".shop-middle__title");
    let breadcrumbsCurrentElem = document.querySelector(".breadcrumbs__currentplace");
    let loaderElem = document.querySelector(".loader");
    let LogoElem = document.querySelector(".loader__image");
    let searchFormElem = document.querySelector(".headertop__searchbox");
    let searchResultListElem = document.querySelector(".searchresults");


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
            console.log(categoryArray);
            updateCaregoriesAndManufactures();
            if (categorySort != null) {
                updateProducts(categorySort);
            } else if (manufacturerSort != null) {
                updateProducts(manufacturerSort);
            } else if (priceSort != null) {
                updateProducts(priceSort);
            } else if (searchUrlTerm != null) {
                searchForProducts(searchUrlTerm);
            } else {
                middleTitleElem.textContent = "All items";
                breadcrumbsCurrentElem.textContent = "All items";
                loaderHide();
                updateProducts(null);
            }
        }
    }
    function updateProducts(sorting) {
        productlistElem.innerHTML = "";

        let categoryItems = categorylistElem.querySelectorAll("li a");

        categoryArray.forEach(category => {
            if (category.id == sorting) {
                middleTitleElem.textContent = category.name;
                breadcrumbsCurrentElem.textContent = category.name;
                categoryItems.forEach(categoryItem => {
                    if (category.name == categoryItem.textContent) {
                        categoryItem.classList.add("categoryactive");
                        console.log(category.name)
                    }
                });
            }
        });

        manufacturerArray.forEach(manufacturer => {
            if (manufacturer.id == sorting) {
                middleTitleElem.textContent = manufacturer.name;
                breadcrumbsCurrentElem.textContent = manufacturer.name;
            }
        });

        productArray.forEach(product => {
            if (product.categoryID == sorting || product.manufacturerID == sorting) {
                createProduct(product);
            } else if (sorting == null) {
                createProduct(product);
            }
        });
        updateItemAmount();
        loaderHide();
    };
    function updateItemAmount() {
        let items = document.querySelectorAll(".product");
        itemCountElem.textContent = `${items.length} Item(s)`
        if (items.length == 0) {
            console.log("Ingen items")
            productlistElem.innerHTML = `<h1>No results found</h1>`
        }
    }
    function createProduct(product) {
        let productdiv = document.createElement("div");
        productdiv.classList.add("product")

        let productImageContainer = document.createElement("a");
        let productImage = document.createElement("img");
        productImage.src = product.picture;
        productImageContainer.classList.add("product__imagecontainer")
        productImageContainer.setAttribute("href", `product.html?id=${product.id}`)
        productImageContainer.appendChild(productImage);

        let productName = document.createElement("a");
        productName.classList.add("product__name", "link--black");
        productName.setAttribute("href", `product.html?id=${product.id}`)
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
            productButton.classList.add("btn--brownish", "product__cartBtn");
            productButton.appendChild(productButtonText);
            productdiv.appendChild(productButton)
        }

        productlistElem.appendChild(productdiv)
    }
    function updateCaregoriesAndManufactures() {
        categorylistElem.innerHTML = "";
        categoryArray.forEach(category => {
            categorylistElem.innerHTML += `<li><a href="shop.html?category=${category.id}">${category.name}</a></li>`;
        })
        manufacturerListElem.innerHTML = "";
        manufacturerArray.forEach(manufacturer => {
            manufacturerListElem.innerHTML += `<li><a class="link--black" href="shop.html?manufacturer=${manufacturer.id}">${manufacturer.name}</a></li>`;
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

    searchFormElem.addEventListener('submit', (event) => {
        event.preventDefault();
        if (searchFormElem[0].value != "") {
            document.location = `shop.html?search=${searchFormElem[0].value}`
        } else {
            searchFormElem[0].style.borderColor = "red"
            searchFormElem[1].style.borderColor = "red"
        }
    });

    searchFormElem.addEventListener('keyup', (event) => {
        let productsToShow = [];
        searchResultListElem.innerHTML = "";
        let searchTerm = searchFormElem[0].value.toLowerCase();
        if (searchFormElem[0].value != "") {
            searchResultListElem.style.display = "block";
            productArray.forEach(product => {
                let productname = product.name.toLowerCase();
                if (productname.indexOf(searchTerm) !== -1) {
                    productsToShow.push(product);
                };
            });
            if (productsToShow.length != 0) {
                for (let counter = 0; counter < 5; counter++) {
                    searchResultListElem.innerHTML += `<li class="singleitem"><a href="product.html?id=${productsToShow[counter].id}"><img src="${productsToShow[counter].picture}" alt="product image"><div><p class="text--brownish searchitem__name">${productsToShow[counter].name}</p><p class="text--gray searchitem__price">£${productsToShow[counter].price}</p></div></a></li>`
                }
            }
            if (productsToShow.length > 5) {
                searchResultListElem.innerHTML += `<a href="shop.html?search=${searchFormElem[0].value}" class="link--brownish searchitem__showmore">Show more</a>`;
            }
        } else {
            searchResultListElem.style.display = "none";
        }
    });


    function searchForProducts(searchTerm) {
        productlistElem.innerHTML = "";
        breadcrumbsCurrentElem.textContent = `Search results for: "${searchTerm}"`;
        middleTitleElem.textContent = `Search results for: "${searchTerm}"`;
        productlistElem.classList.add("productlist-search");
        searchTerm = searchTerm.toLowerCase();

        productArray.forEach(product => {
            let productname = product.name.toLowerCase();
            if (productname.indexOf(searchTerm) !== -1) {
                createProduct(product)
            };
        });

        updateItemAmount();
        loaderHide();
    }
});