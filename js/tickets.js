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

let ticketsCart = [
    { categoria: "General", cantidad: 0, subTotal: 0 },
    { categoria: "Estudiante", cantidad: 0, subTotal: 0 },
    { categoria: "Trainee", cantidad: 0, subTotal: 0 },
    { categoria: "Junior", cantidad: 0, subTotal: 0 }
]

let addTicket = document.getElementById("add-ticket");
let objTickets = {};
let listaCompras = JSON.parse(localStorage.getItem("listaCompras")) || [];

const mostrarBoton = () => {
    buyAmount.value >= 1 ?
        addTicket.disabled = false 
        :
        addTicket.disabled = true 
}

const renderCart = () =>{

    boxTotal.innerHTML = `<table class="alert alert-info table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Cant.</th>
                            <th scope="col">Descripcion</th>
                            
                            <th scope="col" class="text-end">Costo</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                    </tbody>

                </table>
                `
    ;

    ticketsCart.forEach(ticket => {
        if ( ticket.cantidad > 0 ) {
            document.getElementById("tableBody").innerHTML+= `
                <tr>
                    <th><!--  <button class="rounded-1 p-2 mb-1 text-bg-danger text-decoration-none" id=""><i class="bi bi-trash"></i>--></button></th>
                    <td>${ticket.cantidad}</td>
                    <td><i class="bi bi-ticket-perforated"></i> ${ticket.categoria}</td>
                    <td class="text-end">SubTotal: $${ticket.subTotal}</td>
                    
                </tr>
            `
        } 
    });

    if (totalCost > 0) {
        document.getElementById("tableBody").innerHTML+= `
                <tr>
                    
                    <th class="text-end fs-5 fw-bold" colspan=4 >Total: $ ${totalCost}</th>
                    
                </tr>
            `
    }
}

const reservar = (e) => {
    e.preventDefault();

    switch (buyCategory.value) {
        case "General":
            ticketsCart[0].cantidad = ticketsCart[0].cantidad + parseInt(buyAmount.value); 
            ticketsCart[0].subTotal = ticketsCart[0].subTotal + parseInt(buyAmount.value)*200;
            break;
        case "Estudiante":
            ticketsCart[1].cantidad = ticketsCart[1].cantidad + parseInt(buyAmount.value);
            ticketsCart[1].subTotal = ticketsCart[1].subTotal + parseInt(buyAmount.value)*40;
            break;
        case "Trainee":
            ticketsCart[2].cantidad = ticketsCart[2].cantidad + parseInt(buyAmount.value);
            ticketsCart[2].subTotal = ticketsCart[2].subTotal + parseInt(buyAmount.value)*100;
            break;
        case "Junior":
            ticketsCart[3].cantidad = ticketsCart[3].cantidad + parseInt(buyAmount.value);
            ticketsCart[3].subTotal = ticketsCart[3].subTotal + parseInt(buyAmount.value)*170;
            break;
    }

    // ACTIVO EL BOTON COMPRAR
    btnComprar.disabled = false ;

    // DESACTIVO EL BOTON ADDTICKET
    addTicket.disabled = true ;

    // QUITO LA CLASE DE VALIDACION DEL INPUT CANTIDAD
    buyAmount.classList.remove("is-valid");

    // RESETEO EL VALOR DEL INPUT CANTIDAD
    buyAmount.value = "";

    // INICIO UN ACUMULADOR PARA SUMAR LOS SUBTOTALES
    let acumulador = 0;

    // SUMO LOS SUBTOTALES DE TODAS LAS CATEGORIAS
    ticketsCart.forEach(element => {
        acumulador = element.subTotal + acumulador;
    });

    // INTRODUZCO EN EL TOTAL TODOS LOS SUBTOTALES ACUMULADOS
    totalCost = acumulador;

    renderCart();

}

// FUNCION PARA QUE NO DEJE INGRESAR MAS DE 10 TICKETS EN LA CANTIDAD DE ENTRADAS A COMPRAR
const controlarCantidad = () => {
    if (buyAmount.value > 10 || buyAmount.value < 0 ) {
        buyAmount.value = "";
    }
}

// LISTENER PARA MONITOREAR CUANDO EL USUARIO INGRESA UNA CANTIDAD INVALIDA DE TICKETS
buyAmount.addEventListener("keyup", controlarCantidad)

buyAmount.addEventListener("change", mostrarBoton);

addTicket.addEventListener("click", reservar);

class Compra{
    constructor(nombre, apellido, correo, tickets){
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.tickets = tickets;
    }
}

const guardarCompra = () => {
        let nombre = document.querySelector("#nombre").value;
        let apellido = document.querySelector("#apellido").value;
        let correo = document.querySelector("#correo").value;
        let tickets = objTickets;
        let compraNueva = new Compra (nombre, apellido, correo, tickets );
        listaCompras.push(compraNueva);
        localStorage.setItem("listaCompras", JSON.stringify(listaCompras));
        console.log(listaCompras)
}

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
            mostrarBoton();
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
        // GUARDAMOS LOS DATOS DE LA COMPRA EN NUESTRO ARRAY
        guardarCompra();

        // RESETEAMOS LOS CAMPOS DEL FORMULARIO
        formulario.reset();

        addTicket.disabled = true ;
        
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
