document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../index.html", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var parser = new DOMParser();
      var htmlDoc = parser.parseFromString(xhr.responseText, "text/html");
      var navbarContent = htmlDoc.querySelector("header");
      var footerContent = htmlDoc.querySelector("footer").innerHTML;

      var navbarPlaceholder = document.getElementById("navbar-placeholder");
      navbarPlaceholder.innerHTML = navbarContent.outerHTML;

      var footerPlaceholder = document.getElementById("footer-placeholder");
      footerPlaceholder.innerHTML = footerContent;

      var navbarStyles = htmlDoc.querySelector(
        "style[href='/style/index.css']"
      );
      var navbarStylesPlaceholder = document.getElementById("navbar-styles");
      navbarStylesPlaceholder.innerHTML = navbarStyles.innerHTML;

      document.addEventListener("DOMContentLoaded", function () {
        var mySwiper = new Swiper(".swiper-container", {
          direction: "horizontal",
          loop: false,
          slidesPerView: 1,
          navigation: {
            nextEl: " .swiper-button-next",
            prevEl: " .swiper-button-prev",
          },
          touchMoveStopPropagation: false,
        });
      });
    }
  };
  xhr.send();
});

var button = document.getElementById("buyButton");

button.addEventListener("click", function () {
  window.location.href = "/pages/transaksi.html";
  
});
