document.addEventListener("DOMContentLoaded", function () {
  // -- Nodos Filtros --
  const minPrice = document.getElementById("range-value");
  const minRange = document.getElementById("min-range");
  const categoria = document.getElementById("categoria");
  const marca = document.getElementById("marca");
  // -- Botón --
  const btnFiltrar = document.getElementById("btn-filtrar");
  const btnCarrito = document.getElementById("btn-carrito");
  // -- Contenedor --
  const divProductos = document.getElementById("productos");
  minPrice.innerHTML = minRange.value + "€";
  // Actualizar precio texto range
  minRange.addEventListener("input", function () {
    minPrice.innerHTML = minRange.value + "€";
  });
  // Contador de elementos en el carrito
  const countCarrito = document.getElementById("count-carrito");
  let cantidadCarrito = 0;

  // API
  let url = "https://dummyjson.com/products";
  let productos = [];
  let carrito = [];

  async function obtenerProductos(url) {
    try {
      let respuesta = await fetch(url);
      if (!respuesta.ok) {
        throw new Error("Error:" + respuesta.status);
      }
      let json = await respuesta.json();
      //console.log(json);
      productos = json.products;
      //console.log(productos);

      opcionesFiltros(productos);
      mostrarProductos(productos, divProductos);
    } catch (error) {
      console.log("Error al obtener los productos: " + error);
    }

    function opcionesFiltros(productos) {
      // Array Categorías
      let listaCategorias = [
        '<option value="" selected>- Categoría -</option>',
      ];
      // Array Marcas
      let listaMarcas = ['   <option value="" selected>- Marca -</option>'];
      productos.forEach((producto) => {
        if (
          !listaCategorias.includes(
            `<option value="${producto.category}">${producto.category}</option>`
          )
        ) {
          listaCategorias.push(
            `<option value="${producto.category}">${producto.category}</option>`
          );
        }
        if (
          !listaMarcas.includes(
            `<option value="${producto.brand}">${producto.brand}</option>`
          )
        ) {
          listaMarcas.push(
            `<option value="${producto.brand}">${producto.brand}</option>`
          );
        }
      });

      categoria.innerHTML = listaCategorias.join("");
      marca.innerHTML = listaMarcas.join("");
    }

    // Función para crear la carta del producto
    function crearCard(
      imagen1,
      imagen2,
      imagen3,
      nombre,
      categoria,
      descripcion,
      precio,
      id
    ) {
      let carouselId = `carousel-${nombre.replace(/\s+/g, "-")}`; // Id único para cada producto, usando el nombre del producto y guiones (necesario para evitar errores en la creadión de los carouseles)

      let carouselHtml = "";

      if (imagen2 && imagen3) {
        // Si hay más de una imagen, crear el carousel
        carouselHtml = `
      <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${imagen1}" class="d-block w-100" alt="Imagen 1">
          </div>
          <div class="carousel-item">
            <img src="${imagen2}" class="d-block w-100" alt="Imagen 2">
          </div>
          <div class="carousel-item">
            <img src="${imagen3}" class="d-block w-100" alt="Imagen 3">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>
    `;
      } else {
        // Si solo hay una imagen, mostrarla sin carousel
        carouselHtml = `<img src="${imagen1}" class="d-block w-100" alt="Imagen única">`;
      }

      let card = `
  <div class="col">
    <div class="card h-100 d-flex flex-column" style="width: 18rem;">
      
      ${carouselHtml}

      <div class="card-body d-flex flex-column custom-card">
        <h5 class="card-title">${nombre}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${categoria}</h6>
        <p class="card-text">${descripcion}</p>
        <div class="d-flex justify-content-between align-items-center mt-auto">
          <h5 class="text-danger fw-bold mb-0">${precio}€</h5>
          <div class="d-flex align-items-center gap-2">
            <span class="fw-semibold">Cantidad:</span>
            <select class="form-select w-auto" id="cantidad-${id}" data-id="${id}">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
        <button class="btn btn-primary w-100 mt-2 button-card" id="btn-carrito" data-id="${id}">Añadir al Carrito</button>
      </div>

    </div>
  </div>
  `;
      return card;
    }

    function mostrarProductos(productos, divProductos) {
      let listaProductos = [];
      productos.forEach((producto) => {
        let cartaNueva = crearCard(
          producto.images[0],
          producto.images[1],
          producto.images[2],
          producto.title,
          producto.category,
          producto.description,
          producto.price,
          producto.id
        );
        listaProductos.push(cartaNueva);
      });
      //console.log(listaProductos);
      divProductos.innerHTML = listaProductos.join("");

      // Añadir al carrito
      const botonesCarrito = document.querySelectorAll("#btn-carrito");
      botonesCarrito.forEach((boton) => {
        boton.addEventListener("click", (event) => {
          const idProducto = event.target.getAttribute("data-id");
          const productoSeleccionado = productos.find(
            (producto) => producto.id == idProducto
          );

          // Cantidad
          const cantidadSelect = document.getElementById(
            `cantidad-${idProducto}`
          );
          const cantidadSeleccionada = cantidadSelect.value;

          if (productoSeleccionado) {
            cantidadCarrito += parseInt(cantidadSeleccionada);
            countCarrito.innerHTML = `(${cantidadCarrito})`;

            Swal.fire({
              title: "Añadido al Carrito",
              icon: "success",
            });

            const productoConCantidad = {
              ...productoSeleccionado,
              cantidad: cantidadSeleccionada,
            }; // Añadir propiedad de cantidad en un nuevo objeto, copiando las propiedades del anterior
            carrito.push(productoConCantidad);
            //console.log("Producto añadido: " + productoConCantidad);
            //console.log(carrito);

            localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar carrito para utilizar en su página
          }
        });
      });
    }

    function filtrarProductos() {
      let precioMin = parseFloat(minRange.value) || 0;
      let categoriaSeleccionada = categoria.value;
      let marcaSeleccionada = marca.value;

      let productosFiltrados = productos.filter((producto) => {
        return (
          producto.price >= precioMin &&
          (categoriaSeleccionada === "" ||
            producto.category === categoriaSeleccionada) &&
          (marcaSeleccionada === "" || producto.brand === marcaSeleccionada)
        );
      });

      mostrarProductos(productosFiltrados, divProductos);
    }
    btnFiltrar.addEventListener("click", filtrarProductos);
  }

  obtenerProductos(url);
});
