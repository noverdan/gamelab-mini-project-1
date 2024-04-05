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
            <div 
            class="product-card" 
            onclick="window.location.href = '../pages/Detail_Produk.html?id=${item.id}'">
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

// Testimoni
const testimoni = [
    {
        nama: "Siti Rahma",
        kota: "Purwokerto",
        pesan: "Saya sangat senang dengan koleksi pakaian bekas yang disediakan oleh Armos Second. Kualitasnya bagus dan harganya terjangkau. Sangat direkomendasikan!",
        rating: 5,
        gambar: "https://source.unsplash.com/woman-in-white-and-blue-checked-dress-shirt-jzz_3jWMzHA"
    },
    {
        nama: "Ahmad Rifai",
        kota: "Purwokerto",
        pesan: "Armos Second adalah tempat favorit saya untuk berbelanja pakaian bekas. Selalu menemukan pilihan yang unik dan menarik di sini. Terima kasih!",
        rating: 4.5,
        gambar: "https://source.unsplash.com/man-in-black-button-up-shirt-ZHvM3XIOHoE"
    },
    {
        nama: "Dewi Lestari",
        kota: "Purwokerto",
        pesan: "Pelayanan dari tim Armos Second sangat ramah dan membantu. Saya merasa nyaman berbelanja di sini.",
        rating: 4.8,
        gambar: "https://source.unsplash.com/shallow-focus-photography-of-woman-outdoor-during-day-rDEOVtE7vOs"
    },
    {
        nama: "Budi Prasetyo",
        kota: "Purwokerto",
        pesan: "Saya suka dengan konsep thrifting yang diusung oleh Armos Second. Selain berbelanja dengan harga terjangkau, saya juga merasa turut berkontribusi dalam mengurangi limbah tekstil.",
        rating: 4.7,
        gambar: "https://source.unsplash.com/man-in-black-beanie-cap-kVg2DQTAK7c"
    },
    {
        nama: "Fitriani Hasanah",
        kota: "Purwokerto",
        pesan: "Koleksi pakaian bekas Armos Second selalu up-to-date dan trendy. Selalu ada sesuatu yang menarik setiap kali saya mengunjungi toko ini. Puas sekali!",
        rating: 4.9,
        gambar: "https://source.unsplash.com/woman-near-tree-5yENNRbbat4"
    },
    {
        nama: "Andi Wijaya",
        kota: "Purwokerto",
        pesan: "Armos Second adalah jawaban bagi saya yang mencari pakaian berkualitas dengan harga terjangkau. Tidak pernah kecewa dengan pembelian di sini. Barang dijual masih sangat bagus dan layak dipakai",
        rating: 5,
        gambar: "https://source.unsplash.com/man-in-black-jacket-wearing-black-helmet-WMlRkqt1vII"
    }
]
const testimoniWrapper = {
    column1: document.querySelector(".column-1"),
    column2: document.querySelector(".column-2"),
    column3: document.querySelector(".column-3")
};
const testimoniCard = (foto, nama, pesan) => {
    let card = /*html*/`
    <div class="testimoni-card">
        <div class="profile">
            <img
                src=${foto}
                alt="photo"
            />
        <h4>${nama}</h4>
        </div>
        <p class="komentar">${pesan}</p>
    </div>
    `
    return card
}
testimoni.map((item, index) => {
    let no = index + 1;
    let column = no % 3;
    if (column === 0) {
        testimoniWrapper.column3.innerHTML += testimoniCard(item.gambar, item.nama, item.pesan);
    } else if (column === 1) {
        testimoniWrapper.column1.innerHTML += testimoniCard(item.gambar, item.nama, item.pesan);;
    } else if (column === 2) {
        testimoniWrapper.column2.innerHTML += testimoniCard(item.gambar, item.nama, item.pesan);;
    }
})

