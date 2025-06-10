// Nodos
const divCarrito = document.getElementById("carrito-contenedor");
const btnPedido = document.getElementById("btn-pedido");
const btnVaciar = document.getElementById("btn-vaciar");

// Recuperar contenido del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
console.log(carrito);

function mostrarCarrito() {
  if (carrito.length === 0) {
    divCarrito.innerHTML = `<h1>Carrito</h1><div class="alert alert-secondary animate__animated animate__fadeInRight" role="alert">
  El carrito está vacío.
</div>`;
    btnPedido.style.display = "none";
    btnVaciar.style.display = "none";
    return;
  } else {
    btnPedido.style.display = "block";
    btnVaciar.style.display = "block";
  }

  let tablaHTML = `
  <h1>Carrito</h1>
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Individual</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Recorrer el carrito y generar las filas de la tabla
  carrito.forEach((producto) => {
    let totalProducto = (producto.price * producto.cantidad).toFixed(2);
    tablaHTML += `
      <tr>
        <td>${producto.title}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.price}€</td>
        <td>${totalProducto}€</td>
      </tr>
    `;
  });

  // Calcular el total de la compra
  let totalCompra = carrito.reduce(
    (acc, producto) => acc + producto.price * producto.cantidad,
    0
  );

  // Total del carrito
  tablaHTML += `
      <tr class="table-warning">
  
        <td colspan="3" class="text-end fw-bold">Total a pagar (IVA incl.):</td>
        <td class="fw-bold">${totalCompra.toFixed(2)}€</td>
      </tr>
    </tbody>
  </table>
  `;

  // Insertar la tabla en el divCarrito
  divCarrito.innerHTML += tablaHTML;
}

btnPedido.addEventListener("click", (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;
  const calle = document.getElementById("calle").value;
  const numero = document.getElementById("numero").value;
  const ciudad = document.getElementById("ciudad").value;
  const codigoPostal = document.getElementById("postal").value;
  const provincia = document.getElementById("provincia").value;
  const metodoPago = document.querySelector(
    'input[name="metodo-pago"]:checked'
  );

  if (
    !nombre ||
    !apellidos ||
    !email ||
    !telefono ||
    !calle ||
    !numero ||
    !ciudad ||
    !codigoPostal ||
    !provincia ||
    !metodoPago
  ) {
    // Si el formulario no está relleno por completo, mostraremos un error
    Swal.fire({
      title: "Campos incompletos",
      text: "Por favor, completa todos los campos obligatorios.",
      icon: "warning",
      confirmButtonText: "Aceptar",
    });
  } else {
    Swal.fire({
      title: "Va a realizar un pedido.",
      text: "¿Está seguro? No podrá cancelarlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Aun no",
      confirmButtonText: "Aceptar y pagar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Pedido Aceptado",
          text: "Procesaremos su pedido en menos de 24 horas.",
          icon: "success",
        }).then(() => {
          localStorage.removeItem("carrito"); // Eliminamos el carrito, puesto que el pedido ha sido realizado
          window.location.href = "index.html"; // Redirigimos a la página de inicio
        });
      }
    });
  }
});

btnVaciar.addEventListener("click", () => {
  Swal.fire({
    title: "Va a vaciar el contenido del carrito.",
    text: "¿Está seguro? No podrá revertirlo.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Vaciar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Se ha vaciado el carrito",
        icon: "success",
      }).then(() => {
        localStorage.removeItem("carrito"); // Eliminamos el carrito, puesto que el pedido ha sido realizado
        window.location.href = "carrito.html"; // Redirigimos a la página de inicio
      });
    }
  });
});

mostrarCarrito();
