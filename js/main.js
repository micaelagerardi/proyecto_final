//Muestro los productos modificando el DOM

const contenedorProductos = document.getElementById("contenedorProductos");

// construyo variable para guardar los elementos de json

const url = "../productos.json";

// Llamo a json para mostrar los productos

fetch(url)
  .then((response) => response.json())
  .then((data) => mostrarProductos(data));

// creo funcion para mostrar los productosS

function mostrarProductos(productos) {
  // foreach
  productos.forEach((producto) => {
    // creo las cards de los productos
    const divProducto = document.createElement("div");
    // tipo de card
    divProducto.classList.add("card", "col-xl-3", "col-md-6", "col-sm-12");
    // las agreggo al html
    divProducto.innerHTML = `
      <div class= "card-img">
        <img src="${producto.src}" class="card-img-top img-fluid py-3" height="80px">
        <div class="card-body">
          <h3 class="card-title">${producto.nombre}</h3>
          <p class="card-text">${producto.precio}</p>
          <button id="boton${producto.id}" class="btn btn-primary">Comprar</button>
        </div>
      </div>`;

    contenedorProductos.appendChild(divProducto);

    //Agregar un evento al boton Comprar:

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
}

//Creo el carrito de compras y una función que busque el producto por id y lo agregue al carrito.

const carrito = [];

// Agrego al carrito:

const agregarAlCarrito = (id) => {
  const producto = productos.find((producto) => producto.id === id);
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push(producto);
  }
  actualizarCarrito();
};

//Muestro el carrito de compras modificando el DOM.

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", actualizarCarrito);

function actualizarCarrito() {
  let aux = "";
  carrito.forEach((producto) => {
    aux += `
              <div class="card-products">
                  <img src="${producto.src}" class="card-img-top img-fluid py-3" height="80px" >
                  <div class="card-body">
                      <h3 class="card-title"> ${producto.nombre} </h3>
                      <p class="card-text"> ${producto.precio} </p>
                      <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary"> Eliminar del Carrito </button>
                  </div>
              </div>
              `;
  });

  contenedorCarrito.innerHTML = aux;
  calcularTotalCompra();
}

// función que elimina un producto del carrito:

const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  carrito.splice(carrito.indexOf(producto), 1);
  actualizarCarrito();
};

// funcion que vacia todo el carrito:

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
  carrito.splice(0, carrito.length);
  actualizarCarrito();
});

//Creo una función que me calcule el total del carrito:

const totalCompra = document.getElementById("totalCompra");

const calcularTotalCompra = () => {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
  });
  totalCompra.innerHTML = total;
};
