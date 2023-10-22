/* validacion de formulario de contacto */

const formulario = document.getElementById("formulario");

const inputs = document.querySelectorAll("#formulario input");

const regexp = {
    nombres: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, //letras (con o sin acentos), espacios, 2 a 40 caracteres
    psws: /^.{8,16}$/, //8 a 16 caracteres
    correos: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.+[a-zA-Z0-9-.]$/, //
    telefonos: /^\d{6,20}$/ //6 a 20 dígitos
};

// const campos = {
//     nombre: false,
//     apellido: false,
//     correo: false,
//     fcnac: true,  //falta validacion
//     psw: false,
//     psw_bis: false,
//     tel: false,
//     pref: true,  //falta validacion
//     intol: true  //falta validacion
// }

const validar_form = (e) => {
    switch (e.target.name){
        case "nombre":
            validar_campo(regexp.nombres, e.target, e.target.name);
        break;
        case "apellido":
            validar_campo(regexp.nombres, e.target, e.target.name);
        break;
        case "correo":
            validar_campo(regexp.correos, e.target, e.target.name);
        break;
        case "fcnac":
            //validar_campo(e);
        break;
        case "psw":
            validar_campo(regexp.psws, e.target, e.target.name);
            verifica_psw();
        break;
        case "psw_bis":
            verifica_psw();
        break;
        case "tel":
            validar_campo(regexp.telefonos, e.target, e.target.name);
        break;
        case "pref":
            // const pref_todas = getElementById("pref_todas").checked;
            // const pref_veggie = getElementById("pref_veggie").checked;
            // const pref_vegan = getElementById("pref_vegan").checked;
            // if pref_todas{
                
            // }
        break;
        case "intol":
            // const intol_ninguna = getElementById("intol_ninguna").checked;
            // const intol_tacc = getElementById("intol_").checked;
            // const intol_leche = getElementById("intol_").checked;
            // const intol_mani = getElementById("intol_").checked;
            // const intol_nueces = getElementById("intol_").checked;
            // const intol_huevos = getElementById("intol_").checked;
            // const intol_pescados = getElementById("intol_").checked;
            // const intol_mariscos = getElementById("intol_").checked;
            // const intol_soja = getElementById("intol_").checked;
            // if intol_ninguna{

            // }
        break;
    }
}

const correcto = (campo) => {
    document.getElementById(`grupo_${campo}`).classList.remove("form_grupo_input_ko");
    document.getElementById(`grupo_${campo}`).classList.add("form_grupo_input_ok");
    document.querySelector(`#grupo_${campo} i`).classList.remove("fa-circle-xmark");
    document.querySelector(`#grupo_${campo} i`).classList.add("fa-circle-check");
    document.querySelector(`#grupo_${campo} .form_input_error`).classList.remove("form_input_error_activo");
    campos[campo] = true;
}

const incorrecto = (campo) => {
    document.getElementById(`grupo_${campo}`).classList.remove("form_grupo_input_ok");
    document.getElementById(`grupo_${campo}`).classList.add("form_grupo_input_ko");
    document.querySelector(`#grupo_${campo} i`).classList.remove("fa-circle-check");
    document.querySelector(`#grupo_${campo} i`).classList.add("fa-circle-xmark");
    document.querySelector(`#grupo_${campo} .form_input_error`).classList.add("form_input_error_activo")
    campos[campo] = false;
}

const validar_campo = (expresion, input, campo) => {
    if (expresion.test(input.value)){ //el campo cumple con la expresion regular?
        correcto(campo);
    }
    else {
        incorrecto(campo);
    }
}

const verifica_psw = () => {
    const psw1 = document.getElementById("psw");
    const psw2 = document.getElementById("psw_bis");
    if (psw1.value !== psw2.value){
        incorrecto("psw_bis");
    }
    else {
        correcto("psw_bis");
    }
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validar_form);
    input.addEventListener("blur", validar_form);
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (campos.nombre && campos.apellido && campos.correo && campos.fcnac && campos.psw && campos.psw_bis && campos.tel && campos.pref && campos.intol){
        formulario.reset();
        document.getElementById("form_mensaje_exito").classList.add("form_mensaje_exito_activo");
        setTimeout(() => {
            document.getElementById("form_mensaje_exito").classList.remove("form_mensaje_exito_activo");
        }, 5000);
        document.querySelectorAll(".form_grupo_input_ok").forEach((icono) => {
            icono.classList.remove("form_grupo_input_ok")
        })
    }
    else{
        document.getElementById("form_mensaje").classList.add("form_mensaje_activo")
    }
})

//resto
/*
let provincias=[
    {provincia: "Seleccione una opción", region: "", predeterminado: 1}, 
    {provincia: "CABA", region: "central", predeterminado: 0}, 
    {provincia: "Buenos Aires", region: "central", predeterminado: 0}, 
    {provincia: "Catamarca", region: "norte", predeterminado: 0}, 
    {provincia: "Chaco", region: "litoral", predeterminado: 0}, 
    {provincia: "Chubut", region: "patagonia", predeterminado: 0}, 
    {provincia: "Cordoba", region: "central", predeterminado: 0}, 
    {provincia: "Corrientes", region: "litoral", predeterminado: 0}, 
    {provincia: "Entre Ríos", region: "litoral", predeterminado: 0}, 
    {provincia: "Formosa", region: "litoral", predeterminado: 0}, 
    {provincia: "Jujuy", region: "norte", predeterminado: 0}, 
    {provincia: "La Pampa", region: "patagonia", predeterminado: 0}, 
    {provincia: "La Rioja", region: "norte", predeterminado: 0}, 
    {provincia: "Mendoza", region: "cuyo", predeterminado: 0}, 
    {provincia: "Misiones", region: "litoral", predeterminado: 0}, 
    {provincia: "Neuquén", region: "patagonia", predeterminado: 0}, 
    {provincia: "Río Negro", region: "patagonia", predeterminado: 0}, 
    {provincia: "Salta", region: "norte", predeterminado: 0}, 
    {provincia: "San Juan", region: "cuyo", predeterminado: 0}, 
    {provincia: "San Luis", region: "cuyo", predeterminado: 0}, 
    {provincia: "Santa Cruz", region: "patagonia", predeterminado: 0}, 
    {provincia: "Santa Fé", region: "central", predeterminado: 0}, 
    {provincia: "Santiago del Estero", region: "norte", predeterminado: 0}, 
    {provincia: "Tierra del Fuego, Antartida e islas del atlantico sur", region: "patagonia", predeterminado: 0}, 
    {provincia: "Tucumán", region: "norte", predeterminado: 0}
];

let l_provs = document.getElementsByClassName("provs");
console.log(l_provs);
l_provs.innerHTML = "<ul>";
for(i=0; i<provincias.length; i++){
    l_provs.innerHTML += "<li>" + provincias[i].provincia + "</li>";
}
l_provs.innerHTML += "</ul>";

let l_provs = document.querySelector("provs");
l_provs.innerHTML = "<ul>";
for(i=0; i<provincias.length; i++){
    document.write("<li>" + provincias[i].provincia + "</li>")
    l_provs.innerHTML += "<li>" + provincias[i].provincia + "</li>";
}
l_provs.innerHTML += "</ul>";



let preferencias=[
    {valor: "todas", texto: "Todas", predeterminado: 1}, 
    {valor: "veggie", texto: "Vegetarianas", predeterminado: 0}, 
    {valor: "vegan", texto: "Veganas", predeterminado: 0}
]

let intolerancias=[
    {valor: "ninguna", texto: "Ninguna", predeterminado: 1}, 
    {valor: "s_tacc", texto: "Celíaco (trigo, avena, cebada, centeno)", predeterminado: 0}, 
    {valor: "leche", texto: "Leche (lactosa)", predeterminado: 0}, 
    {valor: "mani", texto: "Maní", predeterminado: 0}, 
    {valor: "nueces", texto: "Nueces", predeterminado: 0}, 
    {valor: "huevos", texto: "Huevos", predeterminado: 0}, 
    {valor: "pescados", texto: "Pescados", predeterminado: 0}, 
    {valor: "mariscos", texto: "Mariscos", predeterminado: 0}, 
    {valor: "soja", texto: "Soja", predeterminado: 0}
]
*/