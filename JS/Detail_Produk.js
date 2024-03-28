fetch("https://65ffbff5df565f1a614547df.mockapi.io/products")
  .then((response) => response.json())
  .then((data) => {
    const productContainer = document.getElementById("productContainer");

    data.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      const productName = document.createElement("h2");
      productName.textContent = product.title;
      productName.classList.add("product-name");
      productCard.appendChild(productName);

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("swiper-container", "product-images-swiper");
      const swiperWrapper = document.createElement("div");
      swiperWrapper.classList.add("swiper-wrapper");
      imageContainer.appendChild(swiperWrapper);

      const swiperButtonPrev = document.createElement("div");
      swiperButtonPrev.classList.add("swiper-button-prev");
      imageContainer.appendChild(swiperButtonPrev);

      const swiperButtonNext = document.createElement("div");
      swiperButtonNext.classList.add("swiper-button-next");
      imageContainer.appendChild(swiperButtonNext);

      productCard.appendChild(imageContainer);

      const productDetails = document.createElement("div");
      productDetails.classList.add("product-details");
      productDetails.innerHTML = `<p>${product.id}</p><p>Rp. ${product.price}</p>`;
      productCard.appendChild(productDetails);

      const productDescription = document.createElement("p");
      productDescription.innerHTML = product.description;
      productDescription.classList.add("product-description");
      productCard.appendChild(productDescription);

      const buyButton = document.createElement("button");
      buyButton.textContent = "Beli";
      buyButton.classList.add("buy-button");
      productCard.appendChild(buyButton);

      productContainer.appendChild(productCard);

      const swiper = new Swiper(imageContainer, {
        direction: "horizontal",
        loop: false,
        slidesPerView: 1,
        navigation: {
          nextEl: swiperButtonNext,
          prevEl: swiperButtonPrev,
        },
      });

      product.image.forEach((imageUrl) => {
        const swiperSlide = document.createElement("div");
        swiperSlide.classList.add("swiper-slide");

        const productImage = document.createElement("img");
        productImage.src = imageUrl;
        productImage.alt = product.title;

        swiperSlide.appendChild(productImage);
        swiperWrapper.appendChild(swiperSlide);
      });
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
