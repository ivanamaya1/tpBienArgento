function openpag(){
    window.open("./registro.html", "_self");
}

function revisapass(passing, passtabla){
    if(passing==passtabla){
        localStorage.ususave=document.getElementById('dni').value;
        openpag();}
    else
        {alert('Contraseña incorrecta');}
}

//function llamaBack(){
    console.log("llamo a back de ingreso")
//   debugger
    const URL = "http://127.0.0.1:5000/"

//Capturamos el evento de envio del formulario
document.getElementById('fvalida').addEventListener('submit', function(event){
    event.preventDefault();//Evitamos que se envie el form

    var formData=new FormData();
    formData.append("documento", document.getElementById('dni').value);
    formData.append("password", document.getElementById('psw').value);

    console.log("datos del form data")
    console.log(formData.get("documento"))
    console.log(formData.get("password"))

    let passform=document.getElementById('psw').value
    let documento=document.getElementById('dni').value

    console.log("con esto busca")
    console.log(passform)
    console.log(documento)

    const mostrar=()=>{
        fetch(URL + "usuariostp/" + documento, {
        method: "GET"})
        .then(resultado=>resultado.json())
        .then(data=>{
            console.log("muestra datos consulta")
            console.log(data)
            console.log(data.documento);
            console.log(data.password);

            if(data.password===undefined){alert('Usuario incorrecto');}
            else{revisapass(passform, data.password);};
        })
        .catch(error => {
            //console.log(resultado.json());
            alert('Error al consultar el usuario')
        });
    }

    mostrar()
})




// //validad contraseña//
// if (document.fvalida.psw.value.length <= 4) {
//     alert("Debes ingresar una CONTRASEÑA válida.Minimo 10 letras y Maximo 20");
//     document.fvalida.psw.focus();
//     return;

//     // --------------------------------------------------------
//     // Validar DNI.
//     // --------------------------------------------------------
//     let dni = document.fvalida.dni.value;
//     dni = validarEntero(dni);
//     document.fvalida.dni.value = dni;
//     if (dni == "") {
//         alert("Ingrese 8 dígitos para el DNI.");
//         document.fvalida.dni.focus();
//         return;
//     } else {
//         if (dni < 1000000 || dni >99999999) {
//             alert("El nro de DNI debe tener 8 digitos.");
//             document.fvalida.dni.focus();
//             return;
//         }
//     }    
//     if (document.fvalida.email.value.length <= 5) {
//         alert("Debes ingresar un CORREO válido");
//         document.fvalida.email.focus();return false; }