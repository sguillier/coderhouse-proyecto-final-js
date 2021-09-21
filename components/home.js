
// ============================================================================== //
//     PAGINA HOME    //

const Home = () => {
    // Seleccionamos el elemento ancla en el HTML, donde cargamos todo.
    const main = document.getElementById('main')
    
    // Incertamos
    main.innerHTML = `
        <h1>Portal Test</h1>
        <h3>Home</h3>
        <br>
        <p> Haz Click a continuacion para realizar Test</p>
        <p> Ten presente que solo tendrás 3 minutos para resolver. </p>
        <p> <input type="Button" class="boton-2" value="Iniciar" onclick="Test()"> </p>
        `
}



