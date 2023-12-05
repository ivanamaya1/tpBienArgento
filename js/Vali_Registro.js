function validarEnviar() {
    // Validar el campo de nombre
    if (document.fvalida.nombre.value.length < 4) {
        alert("Debes ingresar un NOMBRE válido.Minimo 4 letras y Maximo 20");
        document.fvalida.nombre.focus();
        return;
    }
    //validad contraseña//
    if (document.fvalida.psw.value.length <= 4) {
        alert("Debes ingresar una CONTRASEÑA válida.Minimo 4 letras y Maximo 20");
        document.fvalida.psw.focus();
        return;
    }
    //validar apellido//
    if ((document.fvalida.apellido.value.length < 4) || (document.fvalida.apellido.value.length > 20)) {
        alert("Debes ingresar un APELLIDO válido. Minimo 4 letras. Maximo 20");
        document.fvalida.apellido.focus();
        return false;
    }
    let longApe = document.fvalida.apellido.value.length
    for (let i = 0, n = longApe; i < n; ++i) {
        if (document.fvalida.apellido.value[i] !== ' ') {
            let esNro = isNaN(document.fvalida.apellido.value[i])
            if (!esNro) {
                alert("Debes ingresar un APELLIDO. No se aceptan Apellidos con números")
                document.grupo_formulario.Ape.focus();
                return false;
            }
        }
    }
    // --------------------------------------------------------
    // Validar DNI.
    // --------------------------------------------------------
    let dni = document.fvalida.dni.value;
    dni = validarEntero(dni);
    document.fvalida.dni.value = dni;
    if (dni == "") {
        alert("Ingrese 8 dígitos para el DNI.");
        document.fvalida.dni.focus();
        return;
    } else {
        if (dni < 1000000 || dni >99999999) {
            alert("El nro de DNI debe tener 8 digitos.");
            document.fvalida.dni.focus();
            return;
        }
    }    
    if (document.fvalida.email.value.length <= 5) {
        alert("Debes ingresar un CORREO válido");
        document.fvalida.email.focus();return false; }
    // --------------------------------------------------------
    // Validar el campo de interés
    // --------------------------------------------------------
    if (document.fvalida.provincia.selectedIndex == 0) {
        alert("Debe seleccionar una PROVINCIA de Residencia.");
        document.fvalida.provincia.focus();
        return;
    }

    // --------------------------------------------------------
    // Si todas las validaciones pasan, se envía el formulario.
    // --------------------------------------------------------
    alert("El formulario se ha enviado Exitosamente!!!");
    document.fvalida.submit();
}


// --------------------------------------------------------
// validarEntero toma un valor como argumento. Esta función
// intenta convertir el valor a un número entero usando 
// parseInt. Si la conversión tiene éxito, devuelve el valor
// como número; de lo contrario, devuelve una cadena vacía.
// --------------------------------------------------------
function validarEntero(valor) {
    // Intentar convertir a entero.
    // Si era un entero no le afecta, si no lo era, lo intenta convertir.
    valor = parseInt(valor);

    // Comprobar si es un valor numérico
    if (isNaN(valor)) {
        // En caso de no ser un número, devuelve una cadena vacía
        return "";
    } else {
        // En caso de ser un número, devuelve el valor
        return valor;
    }
}

function openpag(){
    window.open("./registro.html", "_self");
}

//function llamaBack() {
    console.log("llamo a back")
//    debugger
    const URL = "http://127.0.0.1:5000/"
// 

// Capturamos el evento de envío del formulario
document.getElementById('fvalida').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitamos que se envie el form 

    var valido = validarEnviar()
    if (!valido) {
        console.log("se va. no sigue")
        return
    }

    localStorage.ususave = document.getElementById('dni').value

    console.log("paso las validaciones")

    // Da de alta en tabla de usuarios
    var formData = new FormData();
    formData.append("documento", document.getElementById('dni').value);
    formData.append("password", document.getElementById('psw').value);

    //var formDatadet = new FormData();
    //formData.append("usudet_documento", document.getElementById('Usu').value);
    
            
    console.log("datos del form data")
    console.log(formData.get("documento"))
    console.log(formData.get("password"))


    fetch(URL + "usuariostp/", {
            method: "POST",
            body: formData // Aquí enviamos formData en lugar de JSON
    })
    .then(function (response) {
        if (response.ok) { return response.json(); }
    })
    .then(function (data) {
        //agregaUsudet();
        alert('Tu usuario creado correctamente!');
        // Limpiar el formulario para el proximo producto
        document.getElementById('dni').value = "";
        document.getElementById('psw').value = "";
        openpag();
    })
    .catch(function (error) {
        // Mostramos el error, y no limpiamos el form.
        alert('Error al crear el usuario');
    });


})
