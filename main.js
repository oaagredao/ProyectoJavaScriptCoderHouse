
//Calculadora de calorias diarias gastadas

// Declaro TDEE
let TDEE;

//Defino las funciones

// funcion que calcula TDEE en reposo
function TdeeReposo(peso, estatura, edad, sexo) {
    if (sexo == "H") {
        TDEE = ((10 * peso) + (6.25 * estatura) - (5 * edad) + 5);
    } else if (sexo == "M") {
        TDEE = ((10 * peso) + (6.25 * estatura) - (5 * edad) - 161);
    } else {
        alert("Escriba correctamente las opciones de sexo porfavor");
    }
}

// funcion que calcula TDEE con ejercicio
function TdeeEjercicio(ejercicio) {
    if (ejercicio == "sedentario") {
        TDEE = TDEE * 1.2;
    }
    else if (ejercicio == "ligero") {
        TDEE = TDEE * 1.375;
    }
    else if (ejercicio == "moderado") {
        TDEE = TDEE * 1.55;
    }
    else if (ejercicio == "intenso") {
        TDEE = TDEE * 1.725;
    }
    else if (ejercicio == "muyintenso") {
        TDEE = TDEE * 1.9;
    }
    else {
        alert("Ingrese un valor de ejercicio que sea correcto porfavor");
    }
}
// Defino el constructor de objetos
class DatosPersona {
    constructor(nombre, edad, estatura, peso, sexo, ejercicio, TDEE) {
        this.nombre = nombre;
        this.edad = edad;
        this.estatura = estatura;
        this.peso = peso;
        this.sexo = sexo;
        this.ejercicio = ejercicio;
        this.TDEE = TDEE;
    }
}
// defino al vector de vectores que almacena los vectores con las variables de las personas
let vectorDatosPersonas = [];



// Funcion para mostrar el vector de objetos con los datos
//defino el vector de los nombres ingresados
let nombresIngresados = [];
// mostrar los nombres de las personas registradas
function mostrarNombresPersonasVectorDatos() {
    nombresIngresados = vectorDatosPersonas.map(item => item.nombre)
}


// Funcion para mostrar el vector de objetos con los datos
function mostrarObjetosRegistradosEnVectorDatos() {
    for (let i = 0; i < vectorDatosPersonas.length; i++) {
        alert(`El nombre de la persona ${i + 1} es: ${vectorDatosPersonas[i].nombre}, su edad es: ${vectorDatosPersonas[i].edad}`)
        alert(`Su estatura es de: ${vectorDatosPersonas[i].estatura}, su peso es de: ${vectorDatosPersonas[i].peso}`)
        alert(`Su sexo es de ${vectorDatosPersonas[i].sexo}, la intensidad del ejercicio que realiza es: ${vectorDatosPersonas[i].ejercicio}`)
        alert(`Y las calorias totales que gasta por día son: ${Math.round(vectorDatosPersonas[i].TDEE)}`)
    }
}

// Funcion para buscar con el metodo filter en un arreglo

// defino el vector que almacenará los datos del nombre buscado
let filtroNombre = [];
// defino una funcion para buscar en el vector de nombres
function filtroBuscarNombreEnVectorDatos(nombre) {
    // define el vector de datos 
    filtroNombre = vectorDatosPersonas.filter((item) => item.nombre.includes(nombre));
}

// Funcion que guarda el vector de Datos de personas en el local storage

function guardarVectorDatosPersonasLocalStorage() {
    localStorage.setItem("vectorDatosPersonas", JSON.stringify(vectorDatosPersonas));
}


// Funcion que toma el vector de datos personas desde el local storage

function traerVectorDatosPersonasLocalStorage() {
    // creo un vector auxiliar para guardar los datos que se traen desde el local storage
    // uso la clave que asignamos en la funcion guardar datos del local storage que es  "vectorDatosPersonas"
    let guardarDatos = localStorage.getItem("vectorDatosPersonas");

    // el vector tiene los datos en forma de string, hay que pasarlos a array y objetos
    // este if verifica que si guardar datos tiene datos, entonces estos son strings que no han sido pasados a array o objetos
    if (guardarDatos) {
        vectorDatosPersonas = JSON.parse(guardarDatos);
        // entonces lleno el vector datos personas con los datos traidos desde el local storage y los convierto en arrays y objetos
    }

}

//Calcular el gasto calorico promedio de varias personas

// agregaré la funcionalidad para la pagina de recoleccionDatos
if (document.title === "Recolección de Datos") {
    // Código específico para la página 1

    // lo primero es importar el formulario en una constante
    // se almacena en una constante con el metodo getElementById Y EL ID del formulario
    let formulario = document.getElementById('formulariodatos');

    // el boton submit hace que la pagina se recargue cuando se oprime
    // entonces cancelamos esa caracteristica con:
    // al cancelar la caracteristica, todo lo que se coloque dentro se va a ejecutar


    // debo agregar un if que valide primero si el elemento formulario existe:
    if (formulario) {
        formulario.addEventListener('submit', function (event) {
            // esto evita que el submit haga lo que hace default que es recargar
            event.preventDefault();

            // debo llamar los valores del formulario y colocarlos en variables
            // uso el metodo querySelector() para llamar el valor del elemento con un id especifico
            nombre = formulario.querySelector('#pregunta1').value;
            edad = parseInt(formulario.querySelector('#pregunta2').value);
            estatura = parseInt(formulario.querySelector('#pregunta3').value);
            peso = parseInt(formulario.querySelector('#pregunta4').value);
            sexo = formulario.querySelector('#pregunta5').value;
            ejercicio = formulario.querySelector('#pregunta6').value;

            // calculo del TDEE en reposo
            TdeeReposo(peso, estatura, edad, sexo);

            // calculo del TDEE con el ejercicio
            TdeeEjercicio(ejercicio);

            // creo el objeto que se irá llenando con los datos de las personas 
            let persona = new DatosPersona(nombre, edad, estatura, peso, sexo, ejercicio, TDEE)
            // en esta linea se usa el metodo push para incluir uno tras otro los objetos generados
            vectorDatosPersonas.push(persona)

            // alerta personalizada si no se ha ingresado ningun dato
            if (isNaN(TDEE)) {
                // hago un alert para decirle al usuario que se calculó incorrectamente su TDEE
                Swal.fire({
                    title: 'Error',
                    text: 'Ha habido un problema, por favor verifica los datos',
                    imageUrl: '../multimedia/imagenes/cara-triste.jpg',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Imagen de desaprovacion',
                })
            }
            else {
                // hago un alert para decirle al usuario que se calculó correctamente su TDEE
                Swal.fire({
                    title: 'Exito',
                    text: '¡Calculos exitosos!, tus datos han sido guardados',
                    imageUrl: '../multimedia/imagenes/pulgar-arriba.jpg',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Imagen de aprovacion',
                })
                // mostrar el TDEE calculado en el html
                // en resultado guardo el elemento del id gastocalorico, en este caso es un p
                let resultado = document.getElementById('gastocalorico');
                // con text.Content puedo modificar el valor de ese texto a en este caso el valor de TDEE
                resultado.textContent = TDEE

                // Hasta alli al hacer click en el boton se calcula el TDEE y se guarda el objeto en un vector, el vector datos persona
                //Ahora lo que quiero hacer es que el vector datos persona se guarde en el local storage y si alguien ya ha ingresado antes, pueda ver sus datos sin tener que volver a ingresar todo

                // llamo a la funcion que guarda el vector datos persona en el local storage
                guardarVectorDatosPersonasLocalStorage();
                
                // tengo un boton con la propiedad disabled debajo del calculo de calorias
                // activo el id de activarboton, que muestra el boton oculto debajo del calculo de calorias
                const activarBoton = document.getElementById('activarBoton');

                // quito la clase que vuelve oculto al boton que muestra los datos
                botonOculto.disabled = false;
                botonOculto.style.display = `inline`;
            }
        });
    }


}
// hasta aca funciona

// agrego la funcionalidad para la pagina que muestra los datos almacenados y calculados

else if (document.title === "leerDatosCalculados") {

    // llamamos a la funcion que llena el vector de datos personas con lo guardado en el localstorage
    traerVectorDatosPersonasLocalStorage();
    // con esto el vector de datos personas ahora está lleno con la informacion guardada en el local storage

    // linkear esto con la pagina y hacer que cuando escriban su nombre (con includes) puedan acceder a sus datos

    // debo traer el boton que está en la pagina donde se consultan los datos y luego le agrego un evento para leer los nombres y mostrar los datos del vector datos personas
    const botonConsultarDatos = document.getElementById("botonConsultarDatos");
    botonConsultarDatos.addEventListener(`click`, function (event) {
       
        // traigo al input de la pagina donde registran el nombre
        const nombreConsultarDatos = document.getElementById("ingresarNombre").value;
    
        // le paso el nombre traido de la pagina a la funcion para que esta tome los objetos que correspondan a ese nombre del vectorDatos personas y lo coloque en el vector filtroNombre[]
        filtroBuscarNombreEnVectorDatos(nombreConsultarDatos);
        // tengo un vector de datos con un objeto

        // si el vector contiene algo entonces se continua, sino, se muestra un error porque no se encontro datos
        if(nombreConsultarDatos){
            // se dede mostrar el html oculto de la pagina leerDatosCalculados
        // obtengo el div que estaba en modo oculto
        const divOcultoLeerDatosCalculados = document.getElementById("divOcultoleerDatosCalculados");

        // quito la clase que oculta el div, la clase es "oculto"
        divOcultoLeerDatosCalculados.classList.remove("oculto")
        // agrego la clase que da el estilo al div y lo muestra "partetituloDivOculto"
        divOcultoLeerDatosCalculados.classList.add("partetituloDivOculto")
        
        // debo traer todos los p que se acaban de mostrar en el div oculto y les asigno el valor del objeto correspondiente al nombre
        const pMostrarEdad = document.getElementById("mostrarDatoEdad");
        const pMostrarEstatura = document.getElementById("mostrarDatoEstatura");
        const pMostrarPeso = document.getElementById("mostrarDatoPeso");
        const pMostrarSexo = document.getElementById("mostrarDatoSexo");
        const pMostrarEjercicio = document.getElementById("mostrarDatoEjercicio");
        const pMostrarTdee = document.getElementById("mostrarDatoTdee");

        // ahora a esos p que he traido, les asigno el valor almacenado en el vector de datos
        pMostrarEdad.textContent = filtroNombre[0].edad
        pMostrarEstatura.textContent = filtroNombre[0].estatura
        pMostrarPeso.textContent = filtroNombre[0].peso
        pMostrarSexo.textContent = filtroNombre[0].sexo
        pMostrarEjercicio.textContent = filtroNombre[0].ejercicio
        pMostrarTdee.textContent = filtroNombre[0].TDEE
        }
        else{
            // una alerta que diga que no se encontró dicho nombre
            Swal.fire({
                title: 'Error',
                text: 'No se encontró tal nombre',
                imageUrl: '../multimedia/imagenes/cara-triste.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Imagen de desaprovacion',
            })
        }


        
    })




}








