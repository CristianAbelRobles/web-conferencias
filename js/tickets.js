let formulario = document.getElementById("formulario");
let inputs = document.querySelectorAll("#formulario input");

let btnResumen = document.querySelector("#btn-resumen");
let boxTotal = document.querySelector("#total-box");
let buyName = document.querySelector("#buy-name");
let buyLastName = document.querySelector("#buy-lastname");
let buyEmail = document.querySelector("#buy-email");
let buyAmount = document.querySelector("#buy-amount");
let buyCategory = document.querySelector("#buy-category");
let totalCost = 0;

// EXPRESIONES REGULARES
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

// VALIDAMOS LOS INPUTS
const validarFormulario = (e) => {
    switch (e.target.name){
        case "buy-name":
            validarCampo(expresiones.nombre, e.target, "buy-name");
        break;
        case "buy-lastname":
            validarCampo(expresiones.apellido, e.target, "buy-lastname");
        break;
        case "buy-email":
            validarCampo(expresiones.correo, e.target, "buy-email");
        break;
        case "buy-amount":
            validarCantidad();
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.querySelector(`#${campo}`).classList.add("is-valid");
        document.querySelector(`#${campo}`).classList.remove("is-invalid");
        document.querySelector(`#grupo__${campo} .msjError`).classList.add("d-none");
    } else {
        document.querySelector(`#${campo}`).classList.add("is-invalid");
        document.querySelector(`#${campo}`).classList.remove("is-valid");
        document.querySelector(`#grupo__${campo} .msjError`).classList.remove("d-none");
    }
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario); // EVENTO QUE SE EJECUTA LUEGO DE PRESIONAR UNA TECLA
	input.addEventListener('blur', validarFormulario); // EVENTO QUE SE EJECUTA CUANDO HAGO CLICK FUERA DEL INPUT
});

// FUNCION PARA VALIDAR EL INPUT DE CANTIDAD
const validarCantidad = () =>  {
    if (buyAmount.value >= 1) {
        buyAmount.classList.add("is-valid");
        buyAmount.classList.remove("is-invalid");
        document.querySelector("#grupo__buy-amount .msjError").classList.add("d-none");
    } else {
        buyAmount.classList.add("is-invalid");
        buyAmount.classList.remove("is-valid");
        document.querySelector("#grupo__buy-amount .msjError").classList.remove("d-none");
    }
}

// FUNCION PARA RESETEAR LOS CAMPOS LUEGO DE HACER UNA RESERVA
const resetCampos = () => {
    campos.nombre = false;
    campos.apellido = false;
    campos.correo = false;
    campos.cantidad = false;
}

// FUNCION PARA CALCULAR EL DESCUENTO
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
});
