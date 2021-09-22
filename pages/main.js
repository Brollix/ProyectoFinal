//#region Variables & Constantes
let lista = [];
let subtotal;
let precio_final = 0;
const icon_img = '/img/icon.svg';

let url = 'https://api.bluelytics.com.ar/v2/latest';

let icon = document.createElement('link');
icon.rel = 'icon';
icon.type = 'img/svg';
icon.href = icon_img;

document.head.appendChild(icon);
//#endregion

//#region Llamado a funciones y/o metodos

let titulo = document.getElementById('titulo-pag');
titulo.addEventListener('click', function () {
	location.assign('../index.html');
});

//agrega propiedad 'ID' a productos 'valor=posicion en el array', comenzando en 1
for (i = 0; i < length; i++) {
	productos[i].id = i;
	//console.log(`Prod ${productos[i].id}`);
}

show_products(productos);

//#endregion

//#region Funciones

async function get_dolar(url, producto, precio) {
	const response = await fetch(url);
	const data = await response.json();
	blue = data.blue.value_sell;

	
}

function show_products(productos) {
	const lista_productos = document.getElementById('lista-productos');
	let counter = 1;
	productos.forEach((producto) => {

		let div_producto = document.createElement('tr');
		div_producto.className = 'producto';

		let number = document.createElement('th');
		number.scope = 'row';
		number.textContent = counter;

		let tipo = document.createElement('td');
		tipo.className = 'td__tipo';
		tipo.textContent = `${producto.Tipo}`;

		let marca = document.createElement('td');
		marca.className = 'td__marca';
		marca.textContent = `${producto.Marca} ${producto.Serie}`;

		let socket = document.createElement('td');
		socket.className = 'td__socket';
		socket.textContent += `${producto.Socket[0]} ${producto.Socket[1]}`;

		let imagen_div = document.createElement('td');
		let imagen = document.createElement('img');
		imagen_div.appendChild(imagen);
		imagen.src = '/img/' + producto.Imagen;
		imagen.className = 'td__imagen';

		let precio = document.createElement('td');
		precio.className = 'td__precio';
		precio.textContent = 'USD $' + producto.Precio;

		let boton = document.createElement('button');
		boton.innerHTML = 'Add';
		boton.className = 'btn td__add';

		boton.addEventListener('click', () => {
			add_to_selected(producto);
			filter_by_socket(productos, producto.Socket);
		});

		div_producto.appendChild(number);
		div_producto.appendChild(imagen_div);
		div_producto.appendChild(tipo);
		div_producto.appendChild(marca);
		div_producto.appendChild(socket);
		div_producto.appendChild(precio);
		precio.appendChild(boton);

		lista_productos.appendChild(div_producto);
		counter++;
	});
}

//#endregion

//funcion para filtrar items por socket

function filter_by_socket(array, socket) {
	let filtered_array = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i].Socket == socket) {
			filtered_array.push(array[i]);
		}
	}
	return filtered_array;
}

//funcion para agregar items al JSON Storage y array de items

function add_to_selected(item) {
	item = JSON.stringify(item);
	lista.push(item);
	localStorage.setItem('lista', lista);
}

//funcion para borrar items del JSON Storage y array de items

function remove_from_selected(item) {
	// contenedor_carrito.removeChild(document.getElementById(item.id));
	lista.splice(lista.indexOf(item));
	localStorage.setItem('lista', lista);
}
//#endregion
