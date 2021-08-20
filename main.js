//#region Variables
let carrito = [];
let items_selected = [];
let subtotal = 0;
let precio_final = 0;
const impuesto = 1.65;

const contenedor = document.getElementById('contenedor-productos');
const items = document.getElementsByClassName('lista');

//#endregion

//#region Llamado a funciones y/o metodos

//agrega propiedad 'ID' a productos 'valor=posicion en el array', comenzando en 1
for (i = 0; i < productos.length; i++) {
	productos[i].id = i + 1;
	//console.log(`Prod ${productos[i].id}`);
}

for (let i = 0; i < productos.length; i++) {
	items_selected[i] = false;
}

for (const producto of productos) {
	const div = document.createElement('div');
	let size;
	switch (producto.Tipo) {
		case 'Procesador':
			size = 45;
			break;
		case 'Motherboard':
			size = 75;
			break;

		default:
			break;
	}
	div.className = 'producto';
	//Definimos el innerHTML del elemento con una plantilla de texto
	div.innerHTML = `
		<div class='card'>
			<h3>
	 			<br>Producto:</br> ${producto.Marca}
				${producto.Serie}
			</h3>
			<img src=${producto.Imagen}
				width="${size}%"
    			height="auto"/>
    		<h4>
				$${producto.Precio}
			</h4>
		</div>`;
	contenedor.appendChild(div);
}

/* if (Check_Compatible(carrito)) {
	precio_final = Calc_IVA(Add_Price(carrito), impuesto);
	console.log(`El precio final +IVA es $${precio_final}`);
	Sort_Cart();
	console.log(carrito);
} else {
	console.log(`Tenes incompatibilidades con tus productos en el carrito.`);
} */

//#endregion

//#region Funciones
function Add_to_Cart(item) {
	items_selected[item] = false;
}

function Remove_From_Cart(item) {
	items_selected[item] = false;
}

function Update_Carrito() {
	carrito.splice(0, carrito.length); //Vaciar carrito
	//Recorre items_Selected
	itemsSelec.forEach((element, index) => {
		if (element == true) {
			//si es TRUE -> agrega producto al carrito
			carrito.push(productos[index]);
		}
	});
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

function Check_Compatible(array) {
	let socket = array[0]['socket'];
	let marca = array[0]['marca'];
	let modelo = array[0]['modelo'];
	let i = 0;
	let compatible = true;
	console.log(
		`Referencia 1er producto: ${marca} ${modelo} Socket: ${socket}`
	);
	for (let productos of array) {
		if (socket != productos['socket']) {
			compatible = false;
			i++;
			console.log(
				`Index ${i + 1}: ${productos['marca']} ${
					productos['modelo']
				}, Socket: ${productos['socket']}`
			);
			console.log(
				`${marca} ${modelo} Socket ${socket} no es compatible con ${productos['socket']}`
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
