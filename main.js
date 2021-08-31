//#region Variables

let carrito = [];
let subtotal;
let precio_final = 0;
const impuesto = 1.21;

const contenedor_productos = document.getElementById('contenedor-productos');
const contenedor_carrito = document.getElementById('contenedor-carrito');

//#endregion

//#region Llamado a funciones y/o metodos

//agrega propiedad 'ID' a productos 'valor=posicion en el array', comenzando en 1
for (i = 0; i < length; i++) {
	productos[i].id = i;
	//console.log(`Prod ${productos[i].id}`);
}

show_products(filter_by_socket(productos, 'AM4'));

//#endregion

//#region Funciones
function filter_by_socket(array, socket) {
	let filtered_array = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i].Socket == socket) {
			filtered_array.push(array[i]);
		}
	}
	console.log(filtered_array);
	return filtered_array;
}

function show_products(productos) {
	productos.forEach((producto) => {
		let div_producto = document.createElement('div');
		div_producto.className = 'producto';

		let marca = document.createElement('h3');
		marca.className = 'marca';
		marca.textContent = `${producto.Marca} ${producto.Serie}`;

		let socket = document.createElement('h3');
		socket.className = 'socket';
		socket.textContent = `Socket ${producto.Socket}`;

		let stock = document.createElement('h5');
		stock.className = 'stock';
		if (producto.Stock > 0) {
			stock.textContent = 'Stock: ' + producto.Stock;
		} else stock.textContent = 'No Disponible';

		let imagen = document.createElement('img');
		imagen.src = '../img/' + producto.Imagen;
		imagen.className = 'imagen';

		let precio = document.createElement('h4');
		precio.className = 'precio';
		precio.textContent = '$' + producto.Precio;

		let boton = document.createElement('button');
		boton.innerHTML = 'Añadir al carrito';
		boton.className = 'btn';
		boton.addEventListener('click', () => {
			add_to_cart(producto);
			boton.innerHTML = 'Agregado';
		});

		div_producto.appendChild(marca);
		div_producto.appendChild(socket);
		div_producto.appendChild(stock);
		div_producto.appendChild(imagen);
		div_producto.appendChild(precio);
		div_producto.appendChild(boton);

		contenedor_productos.appendChild(div_producto);
	});
}

function add_to_cart(item) {
	carrito.push(item);
	sort_cart(carrito);
}

/* function remove_from_cart(item) {
	contenedor_carrito.removeChild(document.getElementById(item.id));
	carrito.splice(carrito.indexOf(item));
} */

function add_price(array) {
	for (let i = 0; i < array.length; i++) {
		subtotal += array[i].Precio;
	}
	return subtotal;
}

/* function check_compatible(item) {
	if (item.length > 1) {
		let socket = item[0]['Socket'];
		let marca = item[0]['Marca'];
		let serie = item[0]['Serie'];
		let compatible = true;

		for (let productos of item) {
			if (socket != productos.Socket) {
				compatible = false;
				i++;
				console.log(`Incompatibilidad en carrito:`);
				console.log(
					`${marca} ${serie} Socket ${socket} no es compatible con Socket: ${productos.Socket}`
				);
				break;
			}
		}
		return console.log('Compatible:', compatible);
	}
} */

function sort_cart(array) {
	array.sort(function (a, b) {
		console.log('Ordenando el carrito por precio');
		return a.precio - b.precio;
	});
}
//#endregion
