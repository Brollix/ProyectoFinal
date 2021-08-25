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
for (i = 0; i < productos.length; i++) {
	productos[i].id = i;
	//console.log(`Prod ${productos[i].id}`);
}

show_products(productos);

//#endregion

//#region Funciones

function show_products(productos) {
	productos.forEach((producto) => {
		let div_producto = document.createElement('div');
		div_producto.className = 'producto';

		let marca = document.createElement('h3');
		marca.className = 'marca';
		marca.textContent = `${producto.Marca} ${producto.Serie}`;

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
		});

		div_producto.appendChild(marca);
		div_producto.appendChild(stock);
		div_producto.appendChild(imagen);
		div_producto.appendChild(precio);
		div_producto.appendChild(boton);

		contenedor_productos.appendChild(div_producto);
	});
}

function add_to_cart(item) {
	subtotal = 0;
	carrito.push(item);

	if (item.Stock > 0) {
		item.Stock -= 1;

		const div_carrito = document.createElement('div');
		div_carrito.className = 'producto-carrito';
		div_carrito.id = item.id;

		let marca = document.createElement('h3');
		marca.className = 'marca';
		marca.textContent = `${item.Marca} ${item.Serie}`;

		let stock = document.createElement('h3');
		stock.className = 'stock';
		stock.textContent = item.Stock;

		let precio = document.createElement('h4');
		precio.className = 'precio';
		precio.textContent = '$' + item.Precio;

		let boton = document.createElement('button');
		boton.innerHTML = 'Eliminar del carrito';
		boton.className = 'btn';
		boton.addEventListener('click', () => {
			remove_from_cart(item);
		});

		div_carrito.appendChild(marca);
		div_carrito.appendChild(stock);
		div_carrito.appendChild(precio);
		div_carrito.appendChild(boton);

		contenedor_carrito.appendChild(div_carrito);

		check_compatible(carrito);

		subtotal = add_price(carrito);
		precio_final = calc_IVA(subtotal, impuesto);
		document.getElementById(
			'calculadora-precio'
		).innerHTML = `(IVA Incluido) Precio: $${precio_final}`;
	} else alert('No disponible. Stock: ' + item.Stock);
}

function remove_from_cart(item) {
	console.log(item);
	contenedor_carrito.removeChild(document.getElementById(item.id));
	carrito.splice(carrito.indexOf(item));
}

function add_price(array) {
	for (let i = 0; i < array.length; i++) {
		subtotal += array[i].Precio;
		console.log(subtotal);
	}
	return subtotal;
}

function calc_IVA(subtotal, impuesto) {
	return subtotal * impuesto;
}

function check_compatible(item) {
	let socket = item[0]['Socket'];
	let marca = item[0]['Marca'];
	let serie = item[0]['Serie'];
	let i = 0;
	let compatible = true;
	console.log(`Referencia 1er producto: ${marca} ${serie} Socket: ${socket}`);
	for (let productos of item) {
		if (socket != productos['Socket']) {
			compatible = false;
			i++;
			console.log(
				`Index ${i + 1}: ${productos['Marca']} ${
					productos['Serie']
				}, Socket: ${productos['Socket']}`
			);
			console.log(
				`${marca} ${serie} Socket ${socket} no es compatible con Socket: ${productos['Socket']}`
			);
			break;
		}
	}
	return compatible;
}

/* function sort_cart() {
	carrito.sort(function (a, b) {
		console.log('Ordenando el carrito');
		return a.precio - b.precio;
	});
} */
//#endregion
