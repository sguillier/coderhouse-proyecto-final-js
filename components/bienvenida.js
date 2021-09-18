// ============================================================================== //
//     PAGINA DE BIENVENIDA    //

const Bienvenida = () => {
    // Seleccionamos el elemento ancla en el HTML, donde cargamos todo.
    const main = document.getElementById('main')

    // Incertamos
    main.innerHTML = `
        <h3>Bienvenidos!!</h3>
        <br>
        <p>Esta es una plataforma de tests en donde podras probar tus aptitudes en matemáticas. Pero para continuar es necesario que inicies sesion o te registres</p>
        <button id='bienvenida-inicio' class='boton-2'> Inicio Sesión </button>
        <button id='bienvenida-registro' class='boton-1'> Registro </button>
        `
    // const boton = document.createElement("button");
    // boton.className = 'boton-2'
    // boton.innerText = 'Registro'
    // main.appendChild(boton)

    const botonRegistro = document.getElementById('bienvenida-registro')
    botonRegistro.addEventListener('click', () => { Registro() })

    const botonInicio = document.getElementById('bienvenida-inicio')
    botonInicio.addEventListener('click', () => { Inicio() })


}
