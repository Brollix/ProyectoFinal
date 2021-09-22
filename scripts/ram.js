//#region Variables & Constantes

let ram = [];
let _tipo = 'RAM';

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

// filtra los productos segun los agregados el Local Storage

if (
	localStorage.getItem('cpu') == null &&
	localStorage.getItem('motherboard') == null
) {
	show_products(filter_by_type(productos, _tipo));
} else if (localStorage.getItem('motherboard') != null) {
	motherboard = JSON.parse(localStorage.getItem('motherboard'));
	show_products(
		filter_by_socket(
			filter_by_type(productos, _tipo),
			motherboard.Socket[1]
		)
	);
} else if (localStorage.getItem('cpu') != null) {
	cpu = JSON.parse(localStorage.getItem('cpu'));
	show_products(
		filter_by_socket(filter_by_type(productos, _tipo), cpu.Socket[1])
	);
}

//#endregion

//#region Funciones

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

		let tamaño = document.createElement('td')
		tamaño.className = 'td__tamaño'
		tamaño.textContent = `${producto.Tamaño}GB`

		let socket = document.createElement('td');
		socket.className = 'td__socket';
		socket.textContent += `${producto.Socket[1]}`;

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
		boton.className = 'btn td__btn';

		boton.addEventListener('click', () => {
			add_to_selected(producto);
			location.assign('index.html');
		});

		div_producto.appendChild(number);
		div_producto.appendChild(imagen_div);
		div_producto.appendChild(tipo);
		div_producto.appendChild(marca);
		div_producto.appendChild(tamaño)
		div_producto.appendChild(socket);
		div_producto.appendChild(precio);
		precio.appendChild(boton);

		lista_productos.appendChild(div_producto);

		counter++;
	});
}

/* async function get_dolar(url) {
	const response = await fetch(url);
	const data = await response.json();
	blue = data.blue.value_sell;
} */

//funcion para filtrar items por tipo

function filter_by_type(array, tipo) {
	let filtered_array = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i].Tipo == tipo) {
			filtered_array.push(array[i]);
		}
	}
	return filtered_array;
}

//funcion para filtrar items por socket

function filter_by_socket(array, socket) {
	let filtered_array = [];

	for (let i = 0; i < array.length; i++) {
		if (array[i].Socket[0] == socket) {
			filtered_array.push(array[i]);
		} else if (array[i].Socket[1] == socket) {
			filtered_array.push(array[i]);
		}
	}
	return filtered_array;
}

//funcion para agregar items al JSON Storage y array de items
function add_to_selected(item) {
	item = JSON.stringify(item);
	ram.push(item);
	localStorage.setItem('ram', ram);
}

//#endregion
