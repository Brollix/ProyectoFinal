let icon = document.createElement('link');
const icon_img = '/img/icon.svg';
icon.rel = 'icon';
icon.type = '/img/svg';
icon.href = icon_img;
document.head.appendChild(icon);

let tipos = ['CPU', 'Motherboard', 'RAM'];
item_select = localStorage.getItem('lista');

show_options(productos);

function show_options(productos) {
	const lista_opciones = document.getElementById('lista-opciones');
	tipos.forEach((tipo) => {
		let div_opcion = document.createElement('tr');
		div_opcion.className = 'opcion';

		let opcion = document.createElement('td');
		opcion.textContent = tipo;

		let precio = document.createElement('td');
		precio.textContent = 'null';

		div_opcion.appendChild(opcion);

        if (localStorage.getItem('lista') == null) {
			let seleccion = document.createElement('td');
			let seleccion_btn = document.createElement('button');
			seleccion_btn.textContent = 'Add';
			seleccion_btn.className = 'btn';

            seleccion.appendChild(seleccion_btn);
			div_opcion.appendChild(seleccion);
		} else console.log('local storage vacio');

		div_opcion.appendChild(precio);

		lista_opciones.appendChild(div_opcion);
	});
}
