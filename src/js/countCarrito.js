document.addEventListener("DOMContentLoaded", function () {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const countCarrito = document.querySelector(".count-carrito");
  let cantidadCarrito = carrito.reduce(
    (total, producto) => total + parseInt(producto.cantidad),
    0
  );

  countCarrito.innerHTML = `(${cantidadCarrito})`;
});
