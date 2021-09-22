// let url = 'https://api.bluelytics.com.ar/v2/latest';

let icon = document.createElement('link');
const icon_img = '/img/icon.svg';
icon.rel = 'icon';
icon.type = '/img/svg';
icon.href = icon_img;
document.head.appendChild(icon);

let tipos = ['CPU', 'Motherboard', 'RAM'];

show_options(productos);

// funcion que muestra las opciones para agregar los componentes

function show_options() {
	const lista_opciones = document.getElementById('lista-opciones');
	tipos.forEach((tipo) => {
		//creo un array con la informacion del componente agregado al Local Storage de manera dinamica

		let seleccionado = JSON.parse(
			localStorage.getItem(`${tipo.toLowerCase()}`)
		);

		let div_opcion = document.createElement('tr');
		div_opcion.className = 'opcion';

		let opcion = document.createElement('td');
		opcion.className = 'td__opcion';
		opcion.textContent = tipo;

		let precio = document.createElement('td');
		precio.className = 'td__precio';

		let seleccion = document.createElement('td');
		let seleccion_img = document.createElement('img');
		let seleccion_txt = document.createElement('p');

		seleccion_img.className = 'td__seleccion-img';
		seleccion.className = 'td__seleccion';

		div_opcion.appendChild(opcion);
		seleccion.appendChild(seleccion_img);
		seleccion.appendChild(seleccion_txt);

		//chequeo si el Local Storage esta vacio o no, para asi mostrar las opciones correctas

		if (localStorage.getItem(`${tipo.toLowerCase()}`) == null) {
			//si esta vacio, creo un boton que redirecciona a otra pagina para elegir el componente

			let seleccion_btn = document.createElement('button');

			seleccion_btn.textContent = `Elegi tu ${tipo.toLowerCase()}`;
			seleccion_btn.className = 'btn';
			seleccion_btn.addEventListener('click', function () {
				location.assign(`${tipo}.html`);
			});

			seleccion.appendChild(seleccion_btn);

			console.log(`No ${tipo}`);
		} else if (localStorage.getItem(`${tipo.toLowerCase()}`) != null) {
			// si no esta vacio, muestro el componente elegido con su debida informacion relevante,  y la opcion de remover el item, con un boton

			// como la memoria ram tiene una propiedad que los demas productos no tienen, para evitar errores chequeo de forma dinamica si el item seleccionado tiene esa propiedad o no, asi puedo elegir mostrarla o no.

			if (seleccionado.Tamaño != null) {
				seleccion_txt.innerHTML = `
            ${seleccionado.Marca} 
            ${seleccionado.Serie}
            ${seleccionado.Tamaño}GB
            Socket ${seleccionado.Socket[1]}`;
			} else {
				seleccion_txt.innerHTML = `
            ${seleccionado.Marca} 
            ${seleccionado.Serie}
            Socket ${seleccionado.Socket[0]}`;
			}

			let deseleccion = document.createElement('button');
			deseleccion.className = 'btn';
			deseleccion.textContent = 'Remover';
			deseleccion.addEventListener('click', function () {
				remove_from_selected(tipo);
				location.reload();
			});

			if (tipo == 'RAM') {
				let seleccion_btn = document.createElement('button');

				seleccion_btn.textContent = `Agregar Mas`;
				seleccion_btn.className = 'btn';
				seleccion_btn.addEventListener('click', function () {
					location.assign(`${tipo}.html`);
				});

				seleccion.appendChild(deseleccion);
				seleccion.appendChild(seleccion_btn);
			}

			precio.textContent = `USD $${seleccionado.Precio}`;
			seleccion_img.src = `/img/${seleccionado.Imagen}`;

			console.log(seleccionado);
		}

		div_opcion.appendChild(seleccion);
		div_opcion.appendChild(precio);

		lista_opciones.appendChild(div_opcion);
	});
}

function remove_from_selected(tipo) {
	localStorage.removeItem(`${tipo.toLowerCase()}`);
}
