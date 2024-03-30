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
        <div style="background-image: url(${cat.image});" class="category-item">
            <div class="overlay">
                <h4>${cat.name}</h4>
            </div>
        </div>
    `;
});

const productList = document.querySelector(".product-list");
const skelektorCard = /* html */`
    <div class="card-cont">
    <div class="card__skeleton card__image"></div>
    <div class="card__skeleton card__text text__title"></div>
    <div class="card__skeleton card__text"></div>
    <div class="card__skeleton card__text"></div>
    </div>
`;
for (let i = 0; i < 8; i++) {
    productList.innerHTML += skelektorCard;
}
