const cartItemsDiv = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
  cartItemsDiv.innerHTML = "<p>Keranjang Anda kosong.</p>";
  document.getElementById("checkout-button").textContent = "Belanja Sekarang";
  document.getElementById("checkout-button").onclick = () => window.location.href = "index.html";
} else {
  let total = 0;
  cartItemsDiv.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.quantity;
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>Jumlah: ${item.quantity}</p>
          <p>Harga: Rp ${item.price * item.quantity}</p>
        </div>
      </div>
    `;
  });

  cartTotal.textContent = `Total Belanja: Rp ${total}`;
  document.getElementById("checkout-button").textContent = "Checkout";

  document.getElementById("checkout-button").onclick = () => {
    const payment = document.getElementById("payment-method").value;
    const shipping = document.getElementById("shipping-method").value;

    Swal.fire({
      icon: "success",
      title: "Checkout Berhasil!",
      html: `
        <b>Metode Pembayaran:</b> ${payment}<br>
        <b>Pengiriman:</b> ${shipping}<br>
        <b>Total:</b> Rp ${total}<br><br>
        Silakan tunggu konfirmasi pengiriman. 📦
      `,
      confirmButtonText: "OK"
    }).then(() => {    
      const boughtNames = cart.map(item => item.name).join(", ");
      localStorage.setItem("recentPurchase", boughtNames);
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    });

    localStorage.removeItem("cart");
  };
}

