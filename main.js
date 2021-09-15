//#region Variables & Constantes
let lista = [];
let subtotal;
let precio_final = 0;
const title_text = 'BlackComponents | Build your PC';
const icon_img = '/img/icon.svg';

const impuesto = 1.21;

let title = document.getElementById('title-text');
title.innerHTML = title_text;

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
	const lista_productos = document.getElementById('lista-productos');
	productos.forEach((producto) => {
		let div_producto = document.createElement('tr');
		div_producto.className = 'producto';

		let marca = document.createElement('td');
		marca.className = 'marca';
		marca.textContent = `${producto.Marca} ${producto.Serie}`;

		let socket = document.createElement('td');
		socket.className = 'socket';
		socket.textContent = producto.Socket;

		let imagen_div = document.createElement('td');
		let imagen = document.createElement('img');
		imagen_div.appendChild(imagen);
		imagen.src = '/img/' + producto.Imagen;
		imagen.className = 'imagen';

		let precio = document.createElement('td');
		precio.className = 'precio';
		precio.textContent = '$' + producto.Precio;

		let boton_div = document.createElement('td');
		boton_div.className = 'boton-div';
		let boton = document.createElement('button');
		boton_div.appendChild(boton);
		boton.innerHTML = 'Add';
		boton.className = 'btn';
		boton.style.backgroundColor = 'rgb(255, 204, 108)';

		let selected = false;

		boton.addEventListener('click', () => {
			selected = !selected;
			if (selected == true) {
				add_to_selected(producto);
				boton.innerHTML = 'Remove';
				boton.style.backgroundColor = 'red';
			} else if (selected == false) {
				if (lista != null) {
					remove_from_selected(producto);
					boton.innerHTML = 'Add';
					boton.style.backgroundColor = 'rgb(255, 204, 108)';
				}
			}
		});

		div_producto.appendChild(imagen_div);
		div_producto.appendChild(marca);
		div_producto.appendChild(socket);
		div_producto.appendChild(precio);
		div_producto.appendChild(boton_div);

		lista_productos.appendChild(div_producto);
	});
}

//#endregion

//funcion para agregar items al JSON Storage y array de items

function add_to_selected(item) {
	item = JSON.stringify(item);
	lista.push(item);
	localStorage.setItem('lista', lista);
	console.log(localStorage.getItem('lista'));
}

//funcion para borrar items del JSON Storage y array de items

function remove_from_selected(item) {
	// contenedor_carrito.removeChild(document.getElementById(item.id));
	lista.splice(lista.indexOf(item));
	localStorage.setItem('lista', lista);
	console.log(localStorage.getItem('lista'));
}
//#endregion
