// ============================================================================== //
//     PAGINA DE BIENVENIDA    //

const Bienvenida = () => {
    // Seleccionamos el elemento ancla en el HTML, donde cargamos todo.
    const main = document.getElementById('main')

    // Pintamos Pagina en Pantalla
    main.innerHTML = `
        <h1>Portal Test<div id="cursor">.</div> </h1>
        <h3>Bienvenidos!!</h3>
        <br>
        <p>Esta es una plataforma de tests en donde podras probar tus aptitudes en matemáticas. Pero para continuar es necesario que inicies sesion o te registres</p>
        <button id='bienvenida-inicio' class='boton-2'> Inicio Sesión </button>
        <button id='bienvenida-registro' class='boton-3'> Registro </button>
        `
    
    const botonRegistro = document.getElementById('bienvenida-registro')
    botonRegistro.addEventListener('click', () => { Registro() })

    const botonInicio = document.getElementById('bienvenida-inicio')
    botonInicio.addEventListener('click', () => { Inicio() })

    // document.getElementById('cursor').classList.toggle('cursor-rojo')

    const alternaCursor = () => {
        document.getElementById('cursor').classList.toggle('cursor-rojo')
        setTimeout(() => {alternaCursor()}, 1000)
    }
    alternaCursor()

}
