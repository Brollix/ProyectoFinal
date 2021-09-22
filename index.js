let icon = document.createElement('link');
const icon_img = '/img/icon.svg';
icon.rel = 'icon';
icon.type = '/img/svg';
icon.href = icon_img;
document.head.appendChild(icon);

let tipos = ['CPU', 'Motherboard', 'RAM'];

show_options(productos);

function show_options(productos) {
	const lista_opciones = document.getElementById('lista-opciones');
	tipos.forEach((tipo) => {

        let seleccionado = JSON.parse(
			localStorage.getItem(`${tipo.toLowerCase()}`)
		);

		let div_opcion = document.createElement('tr');
		div_opcion.className = 'opcion';

		let opcion = document.createElement('td');
        opcion.className = 'td__opcion'
		opcion.textContent = tipo;

		let precio = document.createElement('td');
        precio.className = 'td__precio';

        let seleccion = document.createElement('td');
        let seleccion_img = document.createElement('img')
        let seleccion_txt = document.createElement('p')
        
        seleccion_img.className = 'td__seleccion-img'
        seleccion.className = 'td__seleccion'

        if (localStorage.getItem(`${tipo.toLowerCase()}`) == null) {
			let seleccion_btn = document.createElement('button');

			seleccion_btn.textContent = `Elegi tu ${tipo.toLowerCase()}`;
			seleccion_btn.className = 'btn';
            seleccion_btn.addEventListener('click', function(){
                location.assign(`${tipo}.html`)
            })

			seleccion.appendChild(seleccion_btn);
			

            console.log(`No ${tipo}`);
		} else if (localStorage.getItem(`${tipo.toLowerCase()}`) != null) {
			seleccion_txt.innerHTML = `${seleccionado.Marca} ${seleccionado.Serie}`;
            precio.textContent = `USD $${seleccionado.Precio}`;
            seleccion_img.src = `/img/${seleccionado.Imagen}`;
			console.log(seleccionado);
		};


        
        div_opcion.appendChild(opcion);
        seleccion.appendChild(seleccion_img)
        seleccion.appendChild(seleccion_txt)
        div_opcion.appendChild(seleccion);
		div_opcion.appendChild(precio);

		lista_opciones.appendChild(div_opcion);
	});
}
