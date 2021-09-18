
// ============================================================================== //
//     PAGINA HOME    //

const Home = () => {
    // Seleccionamos el elemento ancla en el HTML, donde cargamos todo.
    const main = document.getElementById('main')
    // Incertamos
    main.innerHTML = `
        <h3>Home</h3>
        <br>
        <p>Haz Click a continuacion para realizar Test</p>
        <p> <input type="Button" class="boton-2" value="Iniciar" onclick="Test()"> </p>
        `
    console.log("Estado del usuario: ", auth.currentUser.uid )

}
