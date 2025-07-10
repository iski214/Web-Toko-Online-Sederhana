function addToCart(button) {
  const product = button.parentElement;
  const id = product.dataset.id;
  const name = product.dataset.name;
  const price = product.dataset.price;
  const img = product.dataset.img;

  const item = { id, name, price, img, quantity: 1 };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const index = cart.findIndex(p => p.id === id);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  Swal.fire({
  icon: 'success',
  title: '🛒 Produk ditambahkan!',
  text: `${name} berhasil masuk keranjang.`,
  timer: 2000,
  showConfirmButton: false,
  toast: true,
  position: 'top-end'
  });
}

function searchProducts() {
  const input = document.getElementById("search").value.toLowerCase();
  const products = document.querySelectorAll(".product");
  const notFoundMsg = document.getElementById("not-found");

  let matchCount = 0;

  products.forEach(product => {
    const name = product.dataset.name.toLowerCase();
    if (name.includes(input)) {
      product.style.display = "inline-block";
      matchCount++;
    } else {
      product.style.display = "none";
    }
  });

  if (input !== "" && matchCount === 0) {
    notFoundMsg.style.display = "block";

    products.forEach(product => {
      product.style.display = "inline-block";
    });
  } else {
    notFoundMsg.style.display = "none";
  }
}




