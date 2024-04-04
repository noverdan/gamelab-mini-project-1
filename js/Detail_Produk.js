document.addEventListener("DOMContentLoaded", function () {
  var iditem;
  var mySwiper;
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

        const imageContainer = document.getElementById("gambarproduk");

        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        const productImage = document.createElement("img");
        productImage.src = DP.image[0];
        productImage.alt = DP.name;

        slide.appendChild(productImage);
        imageContainer.appendChild(slide);

        // Initialize Swiper after images are added
        mySwiper = new Swiper(imageContainer, {
          direction: "horizontal",
          loop: false,
          slidesPerView: 1,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          touchMoveStopPropagation: false,
        });
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
