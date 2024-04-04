// transaksi.js
function pesanSekarang() {
    var customerName = document.getElementById('customer-name').value;
    var customerAddress = document.getElementById('customer-address').value;
    var customerEmail = document.getElementById('customer-email').value;
    var customerPhone = document.getElementById('customer-phone').value;
  
    // Validasi input
    if (!customerName || !customerAddress || !customerEmail || !customerPhone) {
      Swal.fire({
        icon: 'error',
        title: 'Input belum lengkap!',
        text: 'Mohon lengkapi semua kolom.',
        confirmButtonColor: '#FF5733'
      });
      return; // Hentikan eksekusi jika input belum lengkap
    }
    
    // Jika input sudah lengkap, tampilkan pesanan
    Swal.fire({
      icon: 'success',
      title: 'Pesanan berhasil!',
      html: `Terima kasih, ${customerName}!<br> Pesanan Anda akan dikirim ke alamat:<br> ${customerAddress}<br><br>Email: ${customerEmail}<br>Nomor Telepon: ${customerPhone}`,
      confirmButtonColor: '#4CAF50'
    });
  }
  