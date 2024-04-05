
/**
 * This script handles the functionality of displaying and filtering products on the list-product page.
 */

// Define variables
let products; // Array to store the products
const searchButton = $("#search-button"); // Search button element
searchButton.prop("disabled", true); // Disable the button
searchButton.click(() => showProductsBySearch($("#search-input").val()));
const searchInput = $("#search-input");// Search input element
searchInput.keypress((e) => {
    if (e.which === 13) {
        showProductsBySearch($("#search-input").val());
    }
});
searchInput.on("input", () => {
    searchButton.prop("disabled", searchInput.val().length === 0);
    searchInput.val().length === 0 ? searchButton.css("cursor", "not-allowed") : searchButton.css("cursor", "pointer");
});
let categoryList = $("#category"); // Category list element
const productList = $("#product-list"); // Product list element
const resetButton = $("#reset-filter").click(() => {
    productList.empty();
    showSkeleton();
    setTimeout(() => {
        hideSkeleton();
        setCategoryTitle("All");
        showProducts(products);
    }, 600);

});
const skeletonCard = $("<div>")
    .addClass("card-cont skeleton")
    .append($("<div>").addClass("card__skeleton card__image"))
    .append($("<div>").addClass("card__skeleton card__text text__title"))
    .append($("<div>").addClass("card__skeleton card__text"))
    .append($("<div>").addClass("card__skeleton card__text"));

// Product categories
const category = [
    {
        id: 1,
        name: "Hoodie & Sweater",
        image: "../asset/cat-hoodie-sweater.jpg",
    },
    {
        id: 2,
        name: "Flannel & Shirt",
        image: "../asset/cat-flannel-shirt.jpg",
    },
    {
        id: 3,
        name: "T-Shirt & Polo Shirt",
        image: "../asset/cat-tshirt-polo.jpg",
    },
    {
        id: 4,
        name: "Trousers & Pants",
        image: "../asset/cat-trousers-pants.jpg",
    },
    {
        id: 5,
        name: "Jacket & Vest",
        image: "../asset/cat-jacket-vest.jpg",
    },
    {
        id: 6,
        name: "Others",
        image: "../asset/cat-others.jpg",
    },
];

setCategoryTitle = (title) => {
    $("#category-title").text(`Collection / ${title}`);
};

// Create category items and attach event listeners
category.forEach((cat) => {
    const categoryItem = $(`<div id="category-${cat.id}">`)
        .css("background-image", `url(${cat.image})`)
        .addClass("category-item")
        .click(() => {
            setCategoryTitle(cat.name);
            showProductsByCategory(cat.name);
        })
        .append($("<div>").addClass("overlay").append($("<h4>").text(cat.name)))
        .appendTo(categoryList);
});

// Define functions

/**
 * Display skeleton cards to indicate loading state.
 */
const showSkeleton = () => {
    for (let i = 0; i < 6; i++) {
        productList.append(skeletonCard.clone());
    }
};

/**
 * Remove skeleton cards to hide loading state.
 */
const hideSkeleton = () => {
    $(".skeleton").remove();
};

/**
 * Display products on the page.
 * @param {Array} products - The array of products to display.
 */
const showProducts = (products) => {
    if (products.length === 0) {
        productList.append($("<p>").text("Produk Tidak Ditemukan."));
    } else {
        products.forEach((item) => {
            const productCard = $(`<div id="${item.id}">`).addClass("product-card")
                .append($("<img>").attr("src", item.image[0]).attr("alt", "image"))
                .append($("<div>").addClass("product-info")
                    .append($("<p>").addClass("product-title").text(item.name))
                    .append($("<p>").addClass("product-category").text(item.category))
                    .append($("<p>").addClass("product-price").text(`Rp ${item.price.toLocaleString('id-ID')}`))).click(
                        () => {
                            window.location.href = `./Detail_Produk.html?id=${item.id}`;
                        }
                    );

            productList.append(productCard);
        });
    }
};

/**
 * Display products filtered by category.
 * @param {string} category - The category to filter by.
 */
const showProductsByCategory = (category) => {
    setCategoryTitle(category);
    productList.empty();
    const filteredProducts = products.filter((item) => item.category === category);
    showSkeleton();
    setTimeout(() => {
        hideSkeleton();
        showProducts(filteredProducts);
    }, 650);
};

/**
 * Display products filtered by search keyword.
 * @param {string} keyword - The search keyword.
 */
const showProductsBySearch = (keyword) => {
    setCategoryTitle(keyword);
    productList.empty();
    const filteredProducts = products.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));
    showSkeleton();
    setTimeout(() => {
        hideSkeleton();
        showProducts(filteredProducts);
    }, 650);
};

/**
 * Get the value of a query parameter from the URL.
 * @param {string} name - The name of the query parameter.
 * @returns {string|null} - The value of the query parameter, or null if not found.
 */
const getQueryParam = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

// Fetch products from API
$.ajax({
    url: "https://65fe2e83b2a18489b385d31c.mockapi.io/api/products",
    method: "GET",
    beforeSend: function () {
        showSkeleton();
    },
    success: function (response) {
        products = response;
        if (getQueryParam("category")) {
            showProductsByCategory(getQueryParam("category"));
        } else {
            showProducts(products);
        }
    },
    complete: function () {
        hideSkeleton();
    },
    error: function (_, _, error) {
        console.info(error);
        alert("An error occurred. Please try again later.");
    },
});
