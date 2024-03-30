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

      const productImages = product.image;

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("swiper-container", "product-images-swiper");

      const swiperWrapper = document.createElement("div");
      swiperWrapper.classList.add("swiper-wrapper");

      productImages.forEach((imageUrl, index) => {
        const swiperSlide = document.createElement("div");
        swiperSlide.classList.add("swiper-slide");

        const productImage = document.createElement("img");
        productImage.src = imageUrl;
        productImage.alt = product.title;
        productImage.style.display = index === 0 ? "block" : "none";

        swiperSlide.appendChild(productImage);
        swiperWrapper.appendChild(swiperSlide);
      });

      imageContainer.appendChild(swiperWrapper);

      const swiperButtonPrev = document.createElement("div");
      swiperButtonPrev.classList.add("swiper-button-prev");

      const swiperButtonNext = document.createElement("div");
      swiperButtonNext.classList.add("swiper-button-next");

      const productId = document.createElement("p");
      productId.textContent = `${product.id}`;

      const productPrice = document.createElement("p");
      productPrice.textContent = `Rp. ${product.price}`;

      const productDetails = document.createElement("div");
      productDetails.classList.add("product-details");
      productDetails.appendChild(productId);
      productDetails.appendChild(productPrice);

      const productDescription = document.createElement("p");
      productDescription.innerHTML = product.description;

      const buyButton = document.createElement('button');
      buyButton.textContent = 'Beli';
      buyButton.classList.add('buy-button');
      buyButton.addEventListener('click', () => {
          window.location.href = '../index.html';
      });

      productCard.appendChild(productName);
      productCard.appendChild(imageContainer);
      productCard.appendChild(productDetails);
      productCard.appendChild(productDescription);
      productCard.appendChild(swiperButtonPrev);
      productCard.appendChild(swiperButtonNext);
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
        touchMoveStopPropagation: false 
      });
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
