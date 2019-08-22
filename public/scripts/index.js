$(document).ready(function() {

    getCategories();
    $("#productCard").hide();


    function getCategories() {
        $.getJSON('api/categories/', (categories) => {
            console.log(categories)
            $.each(categories, (index, category) => {
                $("#categoryList").append($("<a />")
                    .text(category.Category)
                    .attr("class", "dropdown-item")
                    .attr("href", "#")
                    .on("click", (e) => {
                        e.preventDefault();
                        $("#categoryName").text(category.Category);
                        getProducts(category.Value);
                    })
                )
            });

        });

    }

    function getProducts(category) {
        $.getJSON(`api/products/bycategory/${category}`, (products) => {

            $("#productsList").html('');
            $("#productCard").hide();

            $.each(products, (index, product) => {
                $("#productsList").append($("<a />")
                    .text(product.ProductName)
                    .attr("class", "dropdown-item")
                    .attr("href", "#")
                    .on("click", (e) => {
                        e.preventDefault();
                        getProduct(product.ProductID);
                    })
                )
            });
        });
    }

    function getProduct(productId) {

        $.getJSON(`api/products/${productId}`, (product) => {
            $("#cardTitle").html("Product ID:" + product.ProductID);
            $("#cardText1").html("Product Name:" + product.ProductName);
            $("#cardText2").html("Unit Price:" + Number(product.UnitPrice).toFixed(2));

            $("#productCard").show();
        })

    }
})