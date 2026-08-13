// ======================================
// PRODUCTOS
// ======================================

const productos = [

    {
        id: 1,
        nombre: "Manzana",
        categoria: "Frutas",
        precio: 5000,
        icono: "🍎"
    },

    {
        id: 2,
        nombre: "Banano",
        categoria: "Frutas",
        precio: 3500,
        icono: "🍌"
    },

    {
        id: 3,
        nombre: "Naranja",
        categoria: "Frutas",
        precio: 4000,
        icono: "🍊"
    },

    {
        id: 4,
        nombre: "Leche",
        categoria: "Lácteos",
        precio: 4500,
        icono: "🥛"
    },

    {
        id: 5,
        nombre: "Queso",
        categoria: "Lácteos",
        precio: 9000,
        icono: "🧀"
    },

    {
        id: 6,
        nombre: "Carne",
        categoria: "Carnes",
        precio: 18000,
        icono: "🥩"
    },

    {
        id: 7,
        nombre: "Pollo",
        categoria: "Carnes",
        precio: 12000,
        icono: "🍗"
    },

    {
        id: 8,
        nombre: "Gaseosa",
        categoria: "Bebidas",
        precio: 5000,
        icono: "🥤"
    },

    {
        id: 9,
        nombre: "Agua",
        categoria: "Bebidas",
        precio: 2500,
        icono: "💧"
    },

    {
        id: 10,
        nombre: "Galletas",
        categoria: "Snacks",
        precio: 3500,
        icono: "🍪"
    },

    {
        id: 11,
        nombre: "Papas",
        categoria: "Snacks",
        precio: 4000,
        icono: "🍟"
    },

    {
        id: 12,
        nombre: "Detergente",
        categoria: "Limpieza",
        precio: 8500,
        icono: "🧴"
    }

];


// ======================================
// CATEGORIAS
// ======================================

const categorias = [

    {
        nombre: "Todas",
        icono: "🛒"
    },

    {
        nombre: "Frutas",
        icono: "🍎"
    },

    {
        nombre: "Lácteos",
        icono: "🥛"
    },

    {
        nombre: "Carnes",
        icono: "🥩"
    },

    {
        nombre: "Bebidas",
        icono: "🥤"
    },

    {
        nombre: "Snacks",
        icono: "🍪"
    },

    {
        nombre: "Limpieza",
        icono: "🧴"
    }

];


// ======================================
// VARIABLES
// ======================================

let carrito = [];

let categoriaActual = "Todas";


// ======================================
// ELEMENTOS
// ======================================

const productosContainer =
    document.getElementById(
        "productos-container"
    );

const categoriasContainer =
    document.getElementById(
        "categorias-container"
    );

const carritoContainer =
    document.getElementById(
        "carrito-container"
    );

const contador =
    document.getElementById(
        "contador-carrito"
    );

const totalElemento =
    document.getElementById(
        "total"
    );

const buscador =
    document.getElementById(
        "buscador"
    );


// ======================================
// FORMATO DE DINERO
// ======================================

function dinero(valor) {

    return "$" +
        valor.toLocaleString("es-CO");

}


// ======================================
// MOSTRAR CATEGORIAS
// ======================================

function mostrarCategorias() {

    categoriasContainer.innerHTML = "";

    categorias.forEach(categoria => {

        const elemento =
            document.createElement("div");

        elemento.classList.add(
            "categoria"
        );


        if (
            categoria.nombre ===
            categoriaActual
        ) {

            elemento.classList.add(
                "activa"
            );

        }


        elemento.innerHTML = `

            <div class="categoria-icono">
                ${categoria.icono}
            </div>

            <h3>
                ${categoria.nombre}
            </h3>

        `;


        elemento.addEventListener(
            "click",
            () => {

                categoriaActual =
                    categoria.nombre;

                mostrarCategorias();

                filtrarProductos();

                irA("productos");

            }
        );


        categoriasContainer.appendChild(
            elemento
        );

    });

}


// ======================================
// MOSTRAR PRODUCTOS
// ======================================

function mostrarProductos(lista) {

    productosContainer.innerHTML = "";


    if (lista.length === 0) {

        productosContainer.innerHTML = `

            <p>
                No encontramos productos.
            </p>

        `;

        return;
    }


    lista.forEach(producto => {

        const tarjeta =
            document.createElement("article");

        tarjeta.classList.add(
            "producto"
        );


        tarjeta.innerHTML = `

            <div class="producto-imagen">
                ${producto.icono}
            </div>

            <div class="producto-info">

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    ${producto.categoria}
                </p>

                <div class="precio">
                    ${dinero(producto.precio)}
                </div>

                <button class="boton-agregar">
                    Agregar al carrito
                </button>

            </div>

        `;


        const boton =
            tarjeta.querySelector(
                ".boton-agregar"
            );


        boton.addEventListener(
            "click",
            () => {

                agregarCarrito(
                    producto.id
                );

            }
        );


        productosContainer.appendChild(
            tarjeta
        );

    });

}


// ======================================
// FILTRAR PRODUCTOS
// ======================================

function filtrarProductos() {

    const texto =
        buscador.value
            .toLowerCase()
            .trim();


    let resultado =
        productos.filter(producto => {

            const coincideCategoria =
                categoriaActual === "Todas" ||
                producto.categoria ===
                categoriaActual;


            const coincideBusqueda =
                producto.nombre
                    .toLowerCase()
                    .includes(texto);


            return (
                coincideCategoria &&
                coincideBusqueda
            );

        });


    mostrarProductos(resultado);

}


// ======================================
// AGREGAR AL CARRITO
// ======================================

function agregarCarrito(id) {

    const producto =
        productos.find(
            producto =>
                producto.id === id
        );


    const existente =
        carrito.find(
            item =>
                item.id === id
        );


    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({

            ...producto,

            cantidad: 1

        });

    }


    mostrarCarrito();

}


// ======================================
// MOSTRAR CARRITO
// ======================================

function mostrarCarrito() {

    carritoContainer.innerHTML = "";


    if (carrito.length === 0) {

        carritoContainer.innerHTML = `

            <p class="carrito-vacio">
                🛒 Tu carrito está vacío
            </p>

        `;

        contador.textContent = "0";

        totalElemento.textContent = "$0";

        return;
    }


    let total = 0;

    let cantidad = 0;


    carrito.forEach(item => {

        total +=
            item.precio *
            item.cantidad;


        cantidad +=
            item.cantidad;


        const elemento =
            document.createElement("div");

        elemento.classList.add(
            "item-carrito"
        );


        elemento.innerHTML = `

            <div>

                <h3>
                    ${item.icono}
                    ${item.nombre}
                </h3>

                <p>
                    ${dinero(item.precio)}
                    por unidad
                </p>

            </div>


            <div class="controles">

                <button class="btn-menos">
                    −
                </button>

                <strong>
                    ${item.cantidad}
                </strong>

                <button class="btn-mas">
                    +
                </button>

                <button class="eliminar">
                    🗑️
                </button>

            </div>

        `;


        elemento
            .querySelector(".btn-menos")
            .addEventListener(
                "click",
                () => cambiarCantidad(
                    item.id,
                    -1
                )
            );


        elemento
            .querySelector(".btn-mas")
            .addEventListener(
                "click",
                () => cambiarCantidad(
                    item.id,
                    1
                )
            );


        elemento
            .querySelector(".eliminar")
            .addEventListener(
                "click",
                () => eliminarProducto(
                    item.id
                )
            );


        carritoContainer.appendChild(
            elemento
        );

    });


    contador.textContent =
        cantidad;


    totalElemento.textContent =
        dinero(total);

}


// ======================================
// CAMBIAR CANTIDAD
// ======================================

function cambiarCantidad(
    id,
    cambio
) {

    const producto =
        carrito.find(
            item =>
                item.id === id
        );


    if (!producto) return;


    producto.cantidad += cambio;


    if (producto.cantidad <= 0) {

        eliminarProducto(id);

        return;
    }


    mostrarCarrito();

}


// ======================================
// ELIMINAR
// ======================================

function eliminarProducto(id) {

    carrito =
        carrito.filter(
            item =>
                item.id !== id
        );


    mostrarCarrito();

}


// ======================================
// BUSCADOR
// ======================================

buscador.addEventListener(
    "input",
    () => {

        filtrarProductos();

    }
);


// ======================================
// NAVEGACIÓN
// ======================================

function irA(id) {

    const elemento =
        document.getElementById(id);


    if (!elemento) return;


    elemento.scrollIntoView({
        behavior: "smooth"
    });

}


// ======================================
// BOTONES NAVBAR
// ======================================

document
    .querySelector(".boton-inicio")
    .addEventListener(
        "click",
        () => irA("inicio")
    );


document
    .querySelector(".boton-categorias")
    .addEventListener(
        "click",
        () => irA("categorias")
    );


document
    .querySelector(".boton-productos")
    .addEventListener(
        "click",
        () => irA("productos")
    );


document
    .querySelector(".boton-ofertas")
    .addEventListener(
        "click",
        () => irA("ofertas")
    );


document
    .querySelector(".boton-contacto")
    .addEventListener(
        "click",
        () => irA("contacto")
    );


// ======================================
// CARRITO NAVBAR
// ======================================

document
    .querySelector(".boton-carrito")
    .addEventListener(
        "click",
        () => irA("carrito")
    );


// ======================================
// COMPRAR AHORA
// ======================================

document
    .querySelector(".boton-comprar")
    .addEventListener(
        "click",
        () => irA("productos")
    );


// ======================================
// VER OFERTAS
// ======================================

document
    .querySelector(".boton-oferta")
    .addEventListener(
        "click",
        () => {

            categoriaActual =
                "Todas";

            mostrarCategorias();

            buscador.value = "";

            filtrarProductos();

            irA("productos");

        }
    );


// ======================================
// VACIAR CARRITO
// ======================================

document
    .getElementById("vaciar-carrito")
    .addEventListener(
        "click",
        () => {

            if (
                carrito.length === 0
            ) {

                alert(
                    "El carrito ya está vacío."
                );

                return;
            }


            const confirmar =
                confirm(
                    "¿Quieres vaciar el carrito?"
                );


            if (confirmar) {

                carrito = [];

                mostrarCarrito();

            }

        }
    );


// ======================================
// FINALIZAR COMPRA
// ======================================

document
    .getElementById("boton-comprar")
    .addEventListener(
        "click",
        () => {

            if (
                carrito.length === 0
            ) {

                alert(
                    "Primero agrega productos al carrito."
                );

                return;
            }


            let total = 0;


            carrito.forEach(item => {

                total +=
                    item.precio *
                    item.cantidad;

            });


            alert(
                "Compra realizada correctamente.\n\n" +
                "Total: " +
                dinero(total) +
                "\n\n¡Gracias por comprar!"
            );


            carrito = [];

            mostrarCarrito();

        }
    );


// ======================================
// MENU MOVIL
// ======================================

const botonMenu =
    document.querySelector(
        ".boton-menu"
    );


const nav =
    document.querySelector(".nav");


botonMenu.addEventListener(
    "click",
    () => {

        nav.classList.toggle(
            "activo"
        );

    }
);


// ======================================
// CERRAR MENU AL SELECCIONAR
// ======================================

document
    .querySelectorAll(".nav button")
    .forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                nav.classList.remove(
                    "activo"
                );

            }
        );

    });


// ======================================
// INICIAR PAGINA
// ======================================

mostrarCategorias();

mostrarProductos(productos);

mostrarCarrito();