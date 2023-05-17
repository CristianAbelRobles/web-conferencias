let btnResumen = document.querySelector("#btn-resumen");
let boxTotal = document.querySelector("#total-box");
let buyName = document.querySelector("#buy-name");
let buyLastName = document.querySelector("#buy-lastname");
let buyEmail = document.querySelector("#buy-email");
let buyAmount = document.querySelector("#buy-amount");
let buyCategory = document.querySelector("#buy-category");
let totalCost = 0;

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = { 
	nombre: false,
	apellido: false,
	correo: false,
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario); // EVENTO QUE SE EJECUTA LUEGO DE PRESIONAR UNA TECLA
	input.addEventListener('blur', validarFormulario); // EVENTO QUE SE EJECUTA CUANDO HAGO CLICK FUERA DEL INPUT
});

// FUNCION PARA RESETEAR LOS CAMPOS LUEGO DE HACER UNA RESERVA
const resetCampos = () => {
    campos.nombre = false;
    campos.apellido = false;
    campos.correo = false;
}

btnResumen.addEventListener("click", function(e){
    e.preventDefault();
    switch (buyCategory.value) {
        case "1":
            //general 200 sin descuento
            totalCost = buyAmount.value*200
            break;
        case "2":
            //2 Estudiante 80% descuento
            totalCost = buyAmount.value*40  // es lo que vale la entrada luego de hacer el descuento 
            break;
        case "3":
            //3 Trainee 50% descuento
            totalCost = buyAmount.value*100  // es lo que vale la entrada luego de hacer el descuento
            break;
        case "4":
            //4 Junior 15% descuento
            totalCost = buyAmount.value*170  // es lo que vale la entrada luego de hacer el descuento
            break;
        default:
          //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
            break;
    }
    boxTotal.innerHTML += `precio total es ${totalCost} el select es ${buyAmount.value}`;
    totalCost = 0;  //reseteamos el costo total para que no influya en una nueva compra
})

window.addEventListener('load', function(){
    
})