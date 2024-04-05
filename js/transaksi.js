document.addEventListener("DOMContentLoaded", function () {

  $('#backButton').click(function () {
    window.history.back();
  })

  const pesanSekarang = () => {
    var customerName = document.getElementById("customer-name").value;
    var customerAddress = document.getElementById("customer-address").value;
    var customerEmail = document.getElementById("customer-email").value;
    var customerPhone = document.getElementById("customer-phone").value;

    // Validasi input
    if (!customerName || !customerAddress || !customerEmail || !customerPhone) {
      Swal.fire({
        icon: "error",
        title: "Input belum lengkap!",
        text: "Mohon lengkapi semua kolom.",
        confirmButtonColor: "#FF5733",
      });
      return; // Hentikan eksekusi jika input belum lengkap
    }

    // Jika input sudah lengkap, tampilkan pesanan
    Swal.fire({
      icon: "success",
      title: "Pesanan berhasil!",
      html: `Terima kasih, ${customerName}!<br> Pesanan Anda akan dikirim ke alamat:<br> ${customerAddress}<br><br>Email: ${customerEmail}<br>Nomor Telepon: ${customerPhone}`,
      confirmButtonColor: "#4CAF50",
    }).then((result) => {
      if (result.isConfirmed) {
        let pesan = `Halo, saya ingin memesan produk ini: ${document.getElementById("namaproduk").textContent}. Total harga yang harus saya bayar adalah ${document.getElementById("hargatotal").textContent}.
        Nama: ${customerName}, Alamat: ${customerAddress}, Email: ${customerEmail}, Nomor Telepon: ${customerPhone}`;
        let pesanEncoded = encodeURIComponent(pesan);
        window.open(`https://api.whatsapp.com/send?phone=6285325995552&text=${pesanEncoded}`, '_blank');
        window.history.back();

      }
    });
  };

  const getQueryParam = (id) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(id);
  };

  const Id = getQueryParam("id");

  if (Id) {
    // Fetch data transaksi from API using productId
    $.ajax({
      url: `https://65fe2e83b2a18489b385d31c.mockapi.io/api/products?id=${Id}`,
      method: "GET",
      success: function (response) {
        console.log(response);
        const transactionData = response[0];
        document.getElementById("namaproduk").textContent = transactionData.name;
        document.getElementById("kategori").textContent = transactionData.category;
        document.getElementById("harga").textContent = `Rp. ${transactionData.price}`;
        document.getElementById("hargatotal").textContent = `Total : Rp. ${transactionData.price},`;
      },
      error: function (_, _, error) {
        console.info(error);
        alert("An error occurred. Please try again later.");
      },
    });
  } else {
    console.error("Product ID is missing in URL.");
  }

  const buyButton = document.getElementById('buyButton');
  if (buyButton) {
    buyButton.addEventListener('click', pesanSekarang);
  }
});
