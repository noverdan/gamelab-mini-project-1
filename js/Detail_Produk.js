document.addEventListener("DOMContentLoaded", function () {
  var iditem;
  var mySwiper;
  let splide = new Splide(".splide");

  const getQueryParam = (id) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(id);
  };

  const productId = getQueryParam("id");

  if (productId) {
    // Fetch DPs from API
    $.ajax({
      url: `https://65fe2e83b2a18489b385d31c.mockapi.io/api/products?id=${productId}`,
      method: "GET",
      success: function (response) {
        console.log(response);
        const DP = response[0];
        iditem = DP.id;
        document.getElementById("namaproduk").textContent = DP.name;
        document.getElementById("size").textContent = DP.size;
        document.getElementById("harga").textContent = `Rp. ${DP.price}`;
        document.getElementById("kategori").textContent = DP.category;
        document.getElementById("deskripsi").innerHTML = DP.description;

        let carouselList = document.querySelector(".splide__list");
        DP.image.map((image) => {
          carouselList.innerHTML += /*html*/ `
          <li class="splide__slide">
            <img
              src="${image}"
              alt="image-${DP.name}"
            />
          </li>
          `;
        });
        splide.mount();
      },
      error: function (_, _, error) {
        console.info(error);
        alert("An error occurred. Please try again later.");
      },
    });
  } else {
    console.error("Product ID is missing in URL.");
  }

  $('#buyButton').click(function () {
    window.location.href = (`transaksi.html?id=${iditem}`);
  });

});
