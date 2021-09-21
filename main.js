//#region Variables & Constantes
let lista = [];
let subtotal;
let precio_final = 0;
const icon_img = '/img/icon.svg';

let icon = document.createElement('link');
icon.rel = 'icon';
icon.type = 'img/svg';
icon.href = icon_img;

let doc_title = document.createElement('title');
doc_title.textContent = title_text;

document.head.appendChild(icon);
document.head.appendChild(doc_title);
//#endregion

//#region Llamado a funciones y/o metodos

//agrega propiedad 'ID' a productos 'valor=posicion en el array', comenzando en 1
for (i = 0; i < length; i++) {
	productos[i].id = i;
	//console.log(`Prod ${productos[i].id}`);
}

show_products(productos);

//#endregion

//#region Funciones

function show_products(productos) {
	const lista_productos = document.getElementById('lista-productos');
	productos.forEach((producto) => {
		let div_producto = document.createElement('tr');
		div_producto.className = 'producto';

		let tipo = document.createElement('td');
		tipo.className = 'tipo';
		tipo.textContent = `${producto.Tipo}`;

		let marca = document.createElement('td');
		marca.className = 'marca';
		marca.textContent = `${producto.Marca} ${producto.Serie}`;

		let socket = document.createElement('td');
		socket.className = 'socket';
		socket.textContent += `${producto.Socket[0]} ${producto.Socket[1]}`;

		let imagen_div = document.createElement('td');
		let imagen = document.createElement('img');
		imagen_div.appendChild(imagen);
		imagen.src = '/img/' + producto.Imagen;
		imagen.className = 'imagen';

		let precio_div = document.createElement('div');
		let precio = document.createElement('td');
		precio_div.className = 'precio-div';
		precio_div.appendChild(precio);
		precio.className = 'precio';
		precio.textContent = '$' + producto.Precio;

		let boton_div = document.createElement('div')
		boton_div.className = 'boton-div'

		let boton = document.createElement('button');		
		boton.innerHTML = 'Add';
		boton.className = 'btn';

		boton.addEventListener('click', () => {
			add_to_selected(producto);
			filter_by_socket(productos, producto.Socket);
		});

		div_producto.appendChild(imagen_div);
		div_producto.appendChild(tipo);
		div_producto.appendChild(marca);
		div_producto.appendChild(socket);
		boton_div.appendChild(boton);
		precio_div.appendChild(boton_div);
		div_producto.appendChild(precio_div);

		lista_productos.appendChild(div_producto);
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
