
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
    constructor(nombre, edad, estatura, peso, sexo, ejercicio,TDEE) {
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
const vectorDatosPersonas = [];


//Calcular el gasto calorico promedio de varias personas
alert("¿Desea calcular las calorias promedio de varias personas? S/N")
let respuesta = prompt("Ingrese su respuesta S/N")
if (respuesta == "S") {
    let numerodepersonas = parseInt(prompt("Ingresa el numero de personas a las que quieres calcular el promedio de su gasto calorico diario"))
    let contador = 0
    let promediocalorias = 0
    for (let i = 0; i < numerodepersonas; i++) {
        //Calcular las calorias gastadas en un dia en estado de reposo
        let nombre = prompt(`Ingresa el nombre de la persona  ${i + 1}`)
        alert(`Hola, vamos a calcular las calorias que gasta ${nombre} en un día.`);
        alert("Para esto necesitamos que nos suministres ciertos datos");
        let edad = parseInt(prompt(`La edad de ${nombre}`));
        let estatura = parseInt(prompt(`Ingresa la estatura de ${nombre} en centimetros, ejemplo:(175)`));
        let peso = parseInt(prompt(`Ingresa el peso de ${nombre} en kilogramos, ejemplo:(70)`));
        let sexo = prompt(`¿ ${nombre} es hombre o mujer?, ingresar (H para hombre, M para mujer)`);
        alert("Ya casi estamos, solo necesitamos que nos colabores con un ultimo dato");
        alert(`¿Que tanta actividad fisica realiza ${nombre} en la semana?`);
        let ejercicio = prompt("Ingresa uno de los siguientes valores: sedentario(Si hace poco o nada de ejercicio), ligero(Si hace ejercicio ligero de 1 a 3 dias a la semana, moderado(si hace ejercicio moderado de 3 a 5 dias a la semana, intenso (Si hace ejercicio intenso de 6 a 7 dias a a la semana, muyintenso (Si hace ejercicio intenso diario)) ))");


        // calculo del TDEE en reposo
        TdeeReposo(peso, estatura, edad, sexo);

        // calculo del TDEE con el ejercicio
        TdeeEjercicio(ejercicio);

        // creo el objeto que se irá llenando con los datos de las personas vuelta por vuelta
        const persona= new DatosPersona(nombre, edad, estatura, peso, sexo, ejercicio,TDEE)
        // en esta linea se usa el metodo push para incluir uno tras otro los objetos generados
        vectorDatosPersonas.push(persona)

        alert(`El gasto calorico total diario de ${nombre} es de ${TDEE} calorias`);
        promediocalorias = TDEE + promediocalorias;
        contador = contador + 1;
    }
    promediocalorias = (promediocalorias / contador)
    alert(`El promedio de calorias de las personas ingresadas es de ${promediocalorias}`);
}
else if (respuesta == "N") {
    alert("Vamos a calcular las calorias diarias gastadas solo de una persona")
    // Calculadora de calorias
    //Calcular las calorias gastadas en un dia en estado de reposo
    let nombre = prompt("Ingresa tu nombre")
    alert(`Hola ${nombre}, vamos a calcular las calorias que gastas en un día.`)
    alert("Para esto necesitamos que nos suministres ciertos datos")
    let edad = parseInt(prompt("Ingresa tu edad"))
    let estatura = parseInt(prompt("Ingresa tu estatura en centimetros, ejemplo:(175)"))
    let peso = parseInt(prompt("Ingresa tu peso en kilogramos, ejemplo:(70)"))
    let sexo = prompt("¿Eres hombre o mujer?, ingresar (H para hombre, M para mujer)")
    alert("Ya casi estamos, solo necesitamos que nos colabores con un ultimo dato")
    alert("¿Que tanta actividad fisica realizas en la semana?")
    let ejercicio = prompt("Ingresa uno de los siguientes valores: sedentario(Si haces poco o nada de ejercicio), ligero(Si haces ejercicio ligero de 1 a 3 dias a la semana, moderado(si haces ejercicio moderado de 3 a 5 dias a la semana, intenso (Si haces ejercicio intenso de 6 a 7 dias a a la semana, muyintenso (Si haces ejercicio intenso diario)) ))")



    // calculo del TDEE en reposo
    TdeeReposo(peso, estatura, edad, sexo);


    // calculo del TDEE con el ejercicio
    TdeeEjercicio(ejercicio);

    alert(`El gasto calorico total diario de ${nombre} es de ${TDEE} calorias`);
}
else {
    alert("Debe ingresar una respuesta valida");
}


// Seccion para mostrar el vector de objetos con los datos
alert("¿Te gustaría ver los datos registrados de las personas?")
let respuestavervector=prompt("Ingresa tu respuesta Si (S) o NO (N)")

if(respuestavervector==="S"){
    // mostrar los nombres de las personas registradas
    alert("Estas son las personas que registraron sus datos:")
    // uso el metodo map para sacar en otro vector llamado nombresIngresados los items.nombre
    const nombresIngresados=vectorDatosPersonas.map(item=>item.nombre)
    alert(nombresIngresados)

    // con esto muestro todos los datos de los vectores
    alert(`Este es el vector de datos registrados`)
    for (i=0;i<vectorDatosPersonas.length;i++){
        alert(`El nombre de la persona ${i+1} es: ${vectorDatosPersonas[i].nombre}, su edad es: ${vectorDatosPersonas[i].edad}`)
        alert(`Su estatura es de: ${vectorDatosPersonas[i].estatura}, su peso es de: ${vectorDatosPersonas[i].peso}`)
        alert(`Su sexo es de ${vectorDatosPersonas[i].sexo}, la intensidad del ejercicio que realiza es: ${vectorDatosPersonas[i].ejercicio}`)
        alert(`Y las calorias totales que gasta por día son: ${vectorDatosPersonas[i].TDEE}`)
    }
}
else if(respuestavervector==="N"){
    alert("Entendido")
}
else{
    alert("Escriba una opcion correcta")
}

