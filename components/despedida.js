
// ============================================================================== //
//     PAGINA DE DESPEDIDA    //

const Despedida = () => {
    // Seleccionamos el elemento ancla en el HTML, donde cargamos todo.
    const main = document.getElementById('main')

    // Incertamos
    main.innerHTML = `
        <h1>Portal Test</h1>
        <h3> Adios!!</h3>    
        <p> Te estaremos esperando para cuando quieras regresar.</p>
        <p> Si deseas volver a entrar pudes acceder por medio de registro </p>
        `
}
