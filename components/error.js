



// ============================================================================== //
//     PANTALLA DE ERROR    //

const pantallaError = (mensaje)=>{
    const main = document.getElementById('main')
    main.innerHTML = `
        <h3 style="color:red">${mensaje}</h3>
        <br>
        <p>Dibujo de un robot desconectado u algo asi</p>
    `
}



