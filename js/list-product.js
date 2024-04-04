let products;

// Product
const category = [
    {
        id: 1,
        name: "Hoodie & Sweater",
        image: "../asset/cat-hoodie-sweater.jpg"
    },
    {
        id: 2,
        name: "Flannel & Shirt",
        image: "../asset/cat-flannel-shirt.jpg"
    },
    {
        id: 3,
        name: "T-Shirt & Polo Shirt",
        image: "../asset/cat-tshirt-polo.jpg"
    },
    {
        id: 4,
        name: "Trousers & Pants",
        image: "../asset/cat-trousers-pants.jpg"
    },
    {
        id: 5,
        name: "Jacket & Vest",
        image: "../asset/cat-jacket-vest.jpg"
    },
    {
        id: 6,
        name: "Others",
        image: "../asset/cat-others.jpg"
    }
];

let categoryList = $("#category");
category.forEach((cat) => {
    const categoryItem = $("<div>").css("background-image", `url(${cat.image})`).addClass("category-item");
    const overlay = $("<div>").addClass("overlay");
    const categoryName = $("<h4>").text(cat.name);
    overlay.append(categoryName);
    categoryItem.append(overlay);
    categoryList.append(categoryItem);
});

const productList = $("#product-list");
const skeletonCard = $("<div>").addClass("card-cont skeleton");

const skeletonImage = $("<div>").addClass("card__skeleton card__image");
skeletonCard.append(skeletonImage);

const skeletonTitle = $("<div>").addClass("card__skeleton card__text text__title");
skeletonCard.append(skeletonTitle);

const skeletonText1 = $("<div>").addClass("card__skeleton card__text");
skeletonCard.append(skeletonText1);

const skeletonText2 = $("<div>").addClass("card__skeleton card__text");
skeletonCard.append(skeletonText2);

$.ajax({
    url: "https://65fe2e83b2a18489b385d31c.mockapi.io/api/products",
    method: "GET",
    beforeSend: function () {
        for (let i = 0; i < 8; i++) {
            productList.append(skeletonCard.clone());
        }
    },
    success: function (response) {
        console.log(response);
        products = response;
        products.forEach((item) => {
            const productCard = $("<div>").addClass("product-card");

            const productImage = $("<img>").attr("src", item.image[0]).attr("alt", "image");
            productCard.append(productImage);

            const productInfo = $("<div>").addClass("product-info");

            const productTitle = $("<p>").addClass("product-title").text(item.name);
            productInfo.append(productTitle);

            const productCategory = $("<p>").addClass("product-category").text(item.category);
            productInfo.append(productCategory);

            const productPrice = $("<p>").addClass("product-price").text(`Rp ${item.price.toLocaleString('id-ID')}`);
            productInfo.append(productPrice);

            productCard.append(productInfo);

            productList.append(productCard);
        });
    },
    error: function (_, _, error) {
        alert("An error occurred. Please try again later.");
    },
    complete: function () {
        $(".skeleton").remove();
    }
});
