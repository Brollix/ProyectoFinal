//#region Variables
let carrito = [];
let subtotal = 0;
let precio_final = 0;
const impuesto = 1.65;

const contenedor_productos = document.getElementById('contenedor-productos');
const contenedor_carrito = document.getElementById('contenedor-carrito');

const items = document.getElementsByClassName('lista');

//#endregion

//#region Llamado a funciones y/o metodos

//agrega propiedad 'ID' a productos 'valor=posicion en el array', comenzando en 1
for (i = 0; i < productos.length; i++) {
	productos[i].id = i + 1;
	//console.log(`Prod ${productos[i].id}`);
}

//#endregion

//#region Funciones

show_products(productos);

function show_products(productos) {
	for (producto of productos) {
		const div = document.createElement('div');
		div.className = 'producto';
		//Definimos el innerHTML del elemento con una plantilla de texto
		div.innerHTML = `
		<div class='card'>
			<h3>
				${producto.Marca}
				${producto.Serie}
			</h3>
			<img src=${producto.Imagen}
				width="150px"
    			height="150px"/>
    		<h4>
				$${producto.Precio}
			</h4>
			<h5>
				Stock: ${producto.Stock}
			</h5>
			<button class='btn' onclick='add_to_cart(producto)'>Añadir a Carrito</button>
			<br/>
			<br/>
			<hr></hr>
		</div>`;
		contenedor_productos.appendChild(div);
	}
}

function add_to_cart(item) {
	if (item.Stock > 0) {
		item.Stock -= 1;
		carrito.push(item);
		check_compatible(carrito);
		push_cart(item);
	} else {
		alert(`Stock: ${item.Stock}`);
	}
	debugger;
}

function push_cart(item) {
	const div = document.createElement('div');
	div.id = item.id;
	div.className = 'producto-carrito';
	//Definimos el innerHTML del elemento con una plantilla de texto
	div.innerHTML = `				
				<h3>
					${item.Marca} ${item.Serie} ${item.Socket}
				</h3>
				<img src=${item.Imagen}
				width="50px"
    			height="auto"/>
				<h4>
					$${item.Precio}					
				</h4>
				<h5>
					Stock: ${item.Stock}
				</h5>
				<button class='btn' onclick='Remove_From_Cart(${item.id})'>
					Eliminar del Carrito
				</button>
			`;
	contenedor_carrito.appendChild(div);
}
function Remove_From_Cart(item) {
	//carrito.filter( item );
	carrito.splice(carrito.indexOf(item));
	contenedor_carrito.removeChild(document.getElementById(item));
	console.clear();
}

function add_price(array) {
	for (let productos of array) {
		subtotal += productos['precio'];
	}
	return subtotal;
}

function calc_IVA(subtotal, impuesto) {
	console.log(`Subtotal: $${subtotal}`);
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
				`${marca} ${serie} Socket ${socket} no es compatible con ${productos['Socket']}`
			);
			break;
		}
	}
	return compatible;
}

function sort_cart() {
	carrito.sort(function (a, b) {
		console.log('Ordenando el carrito');
		return a.precio - b.precio;
	});
}
//#endregion
