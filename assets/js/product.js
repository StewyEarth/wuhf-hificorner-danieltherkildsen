document.addEventListener("DOMContentLoaded", () => {
    let categoryArray = [];
    let productArray = [];
    let manufacturerArray = [];
    let fetchesDone = 0;
    let fetchCount = 3;

    let urlParams = new URLSearchParams(window.location.search);
    let productUrlID = urlParams.get("category");

    let bodyElem = document.querySelector("body");
    let productlistElem = document.querySelector(".productlist");
    let categorylistElem = document.querySelector(".categorylist");
    let manufacturerListElem = document.querySelector(".manufacturerlist");
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
        }
    }
});
