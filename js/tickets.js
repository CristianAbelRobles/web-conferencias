let formulario = document.getElementById("formulario");
let inputs = document.querySelectorAll("#formulario input");
let btnComprar = document.getElementById("btn-buy");
let btnBorrar = document.getElementById("btn-clear");
let boxTotal = document.querySelector("#total-box");
let buyName = document.querySelector("#nombre");
let buyLastName = document.querySelector("#apellido");
let buyEmail = document.querySelector("#buy-email");
let buyAmount = document.querySelector("#amount");
let buyCategory = document.querySelector("#buy-category");
let totalCost = 0;
let spinner = document.getElementById("spinner");

// EXPRESIONES REGULARES PARA VALIDAR LOS INPUTS
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = { 
	nombre: false,
	apellido: false,
	correo: false,
    cantidad: false
}

// VALIDAMOS LOS INPUTS
const validarFormulario = (e) => {
    switch (e.target.name){
        case "buy-name":
            validarCampo(expresiones.nombre, e.target, "nombre");
        break;
        case "buy-lastname":
            validarCampo(expresiones.apellido, e.target, "apellido");
        break;
        case "buy-email":
            validarCampo(expresiones.correo, e.target, "correo");
        break;
        case "buy-amount":
            validarCantidad();
            mostrarTotal();
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.querySelector(`#${campo}`).classList.add("is-valid");
        document.querySelector(`#${campo}`).classList.remove("is-invalid");
        document.querySelector(`#grupo__${campo} .msjError`).classList.add("d-none");
        campos[campo] = true ;
    } else {
        document.querySelector(`#${campo}`).classList.add("is-invalid");
        document.querySelector(`#${campo}`).classList.remove("is-valid");
        document.querySelector(`#grupo__${campo} .msjError`).classList.remove("d-none");
        campos[campo] = false ;
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
        document.querySelector("#grupo__amount .msjError").classList.add("d-none");
        campos["cantidad"] = true;
    } else {
        buyAmount.classList.add("is-invalid");
        buyAmount.classList.remove("is-valid");
        document.querySelector("#grupo__amount .msjError").classList.remove("d-none");
        campos["cantidad"] = false;
    }
}

const mostrarTotal = () => {
    switch (buyCategory.value) {
        case "General":
            //general 200 sin descuento
            totalCost = buyAmount.value*200
            break;
        case "Estudiante":
            //2 Estudiante 80% descuento
            totalCost = buyAmount.value*40  // es lo que vale la entrada luego de hacer el descuento 
            break;
        case "Trainee":
            //3 Trainee 50% descuento
            totalCost = buyAmount.value*100  // es lo que vale la entrada luego de hacer el descuento
            break;
        case "Junior":
            //4 Junior 15% descuento
            totalCost = buyAmount.value*170  // es lo que vale la entrada luego de hacer el descuento
            break;
        default:
          //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
            break;
    }
    boxTotal.innerHTML = `<table class="alert alert-info table">
                            <thead>
                            <tr>
                                <th scope="col">Cant.</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th>${buyAmount.value}</th>
                                <td><i class="bi bi-ticket-perforated"></i> Entradas ${buyCategory.value}</td>
                                <td>$ ${totalCost}</td>
                            </tbody>
                        </table>
                        `;
    totalCost = 0;  //reseteamos el costo total para que no influya en una nueva compra
}

// FUNCION PARA RESETEAR LOS CAMPOS LUEGO DE HACER UNA RESERVA
const resetCampos = () => {
    campos.nombre = false;
    campos.apellido = false;
    campos.correo = false;
    campos.cantidad = false;
}

// FUNCION PARA RESETEAR LOS MENSAJES DE ERROR
const resetMensajes = () => {
    document.querySelectorAll(".msjError").forEach((icono)=>{
        icono.classList.add("d-none");
    });
}

// FUNCION PARA EL BOTON COMPRAR
btnComprar.addEventListener("click", function(e){
    e.preventDefault();
    
    if ( campos.nombre && campos.apellido && campos.correo && campos.cantidad ){
        formulario.reset();
        
        // MUESTRO SPINNER PARA SIMULAR PROCESOS DEL BACK
        spinner.classList.remove("d-none");

        setTimeout(() => {
            // LUEGO DE 2 SEGUNDOS DESACTIVO EL SPINNER Y MUESTRO MSJ DE EXITO
            spinner.classList.add("d-none");
            document.getElementById("msj__box-valid").classList.remove("d-none");
        }, "2000");

        // LUEGO DE 5 SEGUNDOS QUITO EL MENSAJE DE COMPRA
        setTimeout(() => {
            document.getElementById("msj__box-valid").classList.add("d-none");
        }, "5000");

        // DESACTIVO TODOS LOS ICONOS DE LAS VALIDACIONES
        document.querySelectorAll(".is-valid").forEach((icono)=>{
            icono.classList.remove("is-valid");
        });

        // VACIO LA CAJA DONDE SE MUESTRA EL TOTAL Y LA DESCRIPCION DE LA COMPRA
        boxTotal.innerHTML = "";

        // RESETEO TODOS LOS CAMPOS PARA QUE NO SE PUEDAN SEGUIR ENVIANDO PETICIONES LUEGO DE ENVIAR UNA Y TODOS LOS CAMPOS SEAN VALIDOS
        resetCampos();
    } else {
        document.getElementById("msj__box-error").classList.remove("d-none");

        // LUEGO DE 5 SEGUNDOS QUITO EL MENSAJE DE ERROR
        setTimeout(() => {
            document.getElementById("msj__box-error").classList.add("d-none");
        }, "5000");
    }
});

btnBorrar.addEventListener("click", function(e){
    e.preventDefault();
    formulario.reset();

    // DESACTIVO TODOS LOS ICONOS DE LAS VALIDACIONES
    document.querySelectorAll(".is-valid").forEach((icono)=>{
        icono.classList.remove("is-valid");
    });
    document.querySelectorAll(".is-invalid").forEach((icono)=>{
        icono.classList.remove("is-invalid");
    });

    // ELIMINO LOS MSJ DE VALIDACION SI QUEDO ALGUNO ACTIVO
    resetMensajes();

    // RESETEO LA CAJA DONDE MUESTRO EL TOTAL 
    boxTotal.innerHTML = "";
});
