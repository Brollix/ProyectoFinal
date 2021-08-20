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
			<button class='btn'onclick='Add_to_Cart(${JSON.stringify(
				producto
			)})'>Añadir a Carrito</button>
			<br/>
			<br/>
			<hr></hr>
		</div>`;
	contenedor_productos.appendChild(div);
}
//#endregion

//#region Funciones

function Add_to_Cart(item) {
	if (item.Stock > 0) {
		item.Stock -= 1;
		carrito.push(item);
		const div = document.createElement('div');
		div.id = item.id;
		div.className = 'producto-carrito';
		//Definimos el innerHTML del elemento con una plantilla de texto
		div.innerHTML = `
				<h3>
					Producto: ${item.Marca} ${item.Serie}
				</h3>
				<h4>
					$${item.Precio}
					Stock: ${item.Stock}
				</h4>
				<button class='btn' onclick='Remove_From_Cart(${item.id})'>
					Eliminar del Carrito
				</button>
			`;
		contenedor_carrito.appendChild(div);

		/* Check_Compatible(carrito);
		if (Check_Compatible(carrito)) {
			precio_final = Calc_IVA(Add_Price(carrito), impuesto);

			console.log(`El precio final +IVA es $${precio_final}`);
			Sort_Cart();
		}
		Add_Price(carrito); */
	}
}

function Remove_From_Cart(item) {
	//carrito.filter( item );
	carrito.splice(carrito.indexOf(item));
	contenedor_carrito.removeChild(document.getElementById(item));
	item.Stock += 1;
}

function Add_Price(array) {
	for (let productos of array) {
		subtotal += productos['precio'];
	}
	return subtotal;
}

function Calc_IVA(subtotal, impuesto) {
	console.log(`Subtotal: $${subtotal}`);
	return subtotal * impuesto;
}

function Check_Compatible(item) {
	let socket = item[0]['Socket'];
	let marca = item[0]['Marca'];
	let modelo = item[0]['Modelo'];
	let i = 0;
	let compatible = true;
	console.log(
		`Referencia 1er producto: ${marca} ${modelo} Socket: ${socket}`
	);
	for (let productos of item) {
		if (socket != productos['Socket']) {
			compatible = false;
			i++;
			console.log(
				`Index ${i + 1}: ${productos['Marca']} ${
					productos['Modelo']
				}, Socket: ${productos['Socket']}`
			);
			console.log(
				`${marca} ${modelo} Socket ${socket} no es compatible con ${productos['Socket']}`
			);
			break;
		}
	}
	return compatible;
}

function Sort_Cart() {
	carrito.sort(function (a, b) {
		console.log('Ordenando el carrito');
		return a.precio - b.precio;
	});
}

//#endregion
