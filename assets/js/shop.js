document.addEventListener("DOMContentLoaded", () => {
    let categoryArray = [];
    let productArray = [];
    let fetchesDone = 0;
    let fetchCount = 2;

    let urlParams = new URLSearchParams(window.location.search);
    let categorySort = urlParams.get("category");
    let priceSort = urlParams.get("price");
    let manufacturerSort = urlParams.get("manufacturer");

    let productlistElem = document.querySelector(".productlist");
    
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

        function checkFetches(){
            fetchesDone++
            if (fetchesDone == fetchCount){
                console.log(productArray);
                console.log(categoryArray);
                if(categorySort != null){
                    updateProducts(categorySort);
                }else if(manufacturerSort != null){
                    updateProducts(manufacturerSort);
                }else if (priceSort != null){
                    updateProducts(priceSort);
                }
            }
        }
        function updateProducts(sorting){
            console.log(sorting);
            productlistElem.innerHTML = "";
            productArray.forEach(product =>{
                if (product.categoryID == sorting){
                    console.log(product);
                    

                    productlistElem.innerHTML += product.name;
                }
            });
        }
});