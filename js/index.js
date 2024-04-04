// Sticky Navbar
window.addEventListener("scroll", function () {
    const header = document.querySelector(".navbar");
    header.classList.toggle("sticky", window.scrollY > 0);
    const logo = document.querySelector(".navbar img");
    if (window.scrollY > 0) {
        logo.src = "./asset/armos_logo.png";
    } else {
        logo.src = "./asset/armos_logo_white.png";
    }
});

// Separator Style
const separator = document.querySelectorAll(".separator");
separator.forEach((sep) => {

    for (let i = 0; i < 20; i++) {
        sep.innerHTML += /* html */`
            <h3>ARMOSSECOND.</h3>
        `;
    }
});

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
]

let categoryList = document.querySelector(".category");
category.forEach((cat) => {
    categoryList.innerHTML += /* html */`
        <div id=${"cat-" + cat.id} style="background-image: url(${cat.image});" class="category-item"
        onclick="window.location.href = '../pages/list-product.html?category=${encodeURIComponent(cat.name)}'">
            <div class="overlay">
                <h4>${cat.name}</h4>
            </div>
        </div>
    `;
});

const productList = document.querySelector(".product-list");
const skeletonCard = /* html */`
    <div class="card-cont skeleton">
        <div class="card__skeleton card__image"></div>
        <div class="card__skeleton card__text text__title"></div>
        <div class="card__skeleton card__text"></div>
        <div class="card__skeleton card__text"></div>
    </div>
`;

$.ajax({
    url: "https://65fe2e83b2a18489b385d31c.mockapi.io/api/products?page=1&limit=8",
    method: "GET",
    beforeSend: function () {
        for (let i = 0; i < 8; i++) {
            productList.innerHTML += skeletonCard;
        }
    },
    success: function (response) {
        console.log(response);
        let data = response;
        data.map((item) => {
            productList.innerHTML += /* html */`
            <div class="product-card">
                <img src=${item.image[0]} alt="image" />
                <div class="product-info">
                    <p class="product-title">${item.name}</p>
                    <p class="product-category">${item.category}</p>
                    <p class="product-price">Rp ${item.price.toLocaleString('id-ID')}</p>
                </div>
           </div>
            `;
        })
        $(".skeleton").remove();
    },
    error: function (xhr, status, error) {
        console.log(error)
    }
});
