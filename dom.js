

// ============================================================================== //
//     CONTROLES DEL NAVBAR    //

const linkRegistro = document.getElementById('nav-registro')
linkRegistro.addEventListener('click', () => {
    Registro()
})

const linkInicio = document.getElementById('nav-inicio')
linkInicio.addEventListener('click', () => {
    Inicio()
})

const linkRanking = document.getElementById('nav-ranking')
linkRanking.addEventListener('click', () => {
    Ranking()
})

const linkSalida = document.getElementById('nav-salida')
linkSalida.addEventListener('click', () => {
    localStorage.clear()
    const navUser = document.getElementById('nav-user')
    navUser.innerText = ''
    document.getElementById('nav-registro').classList.toggle("oculta-nav-item")
    document.getElementById('nav-inicio').classList.toggle("oculta-nav-item")
    document.getElementById('nav-ranking').classList.toggle("oculta-nav-item")
    document.getElementById('nav-salida').classList.toggle("oculta-nav-item")
    Despedida()
})







// ============================================================================== //
//     PAGINA DE BIENVENIDA    //

const Bienvenida = () => {
    // Seleccionamos el elemento ancla en el HTML, donde cargamos todo.
    const main = document.getElementById('main')

    // Incertamos
    main.innerHTML = `
        <h3>Bienvenidos!!</h3>    
        <p>Esta es una plataforma de tests en donde podras probar tus aptitudes en matematica y en lenguaje. Pero para continuar es necesario que te registres en el siguiente link</p>
        `
    const boton = document.createElement("button");
    boton.className = 'boton-2'
    boton.innerText = 'Registro'
    main.appendChild(boton)

    boton.addEventListener('click', () => { Registro() })


}

// Ejecutamos la funcion Bienbenida que es la pagina de entrada al portal
Bienvenida()












// ============================================================================== //
//     PAGINA DE DESPEDIDA    //

const Despedida = () => {
    // Seleccionamos el elemento ancla en el HTML, donde cargamos todo.
    const main = document.getElementById('main')

    // Incertamos
    main.innerHTML = `
        <h3> Adios!!</h3>    
        <p> Te estaremos esperando para cuando quieras regresar.</p>
        <p> Si deseas volver a entrar pudes acceder por medio de registro </p>
        `
}








// ============================================================================== //
//     PAGINA DE INICIO    //

const Inicio = () => {
    // Seleccionamos el elemento ancla en el HTML, donde cargamos todo.
    const main = document.getElementById('main')
    // Incertamos
    main.innerHTML = `
        <h3>Pagina de Inicio</h3>
        <br>
        <p>Haz Click a continuacion para realizar Test</p>
        <input type="Button" class="boton-2" value="Iniciar" onclick="Test()">

        `
}








// ============================================================================== //
//     PAGINA DE RANKING    //

const Ranking = () => {
    console.log(resultadosHistoricos)

    resultadosHistoricos = jerarquizaResultados(resultadosHistoricos)
    console.log("jerarquizados")
    console.log(resultadosHistoricos)

    const formatoUsuarioRanking = (idUsuario, nombreUsuario) => {
        console.log(localStorage.getItem('idUsuario'))
        console.log(idUsuario)
        console.log(nombreUsuario)
        if (idUsuario == localStorage.getItem('idUsuario')) {
            return `<div class="formato-usuario-ranking">${nombreUsuario}</div>`
        } else {
            console.log("Estoy aqui")
            return nombreUsuario
        }
    }

    //Aqui generamos la tabla
    let salida = `
    <h3>Ranking</h3>
    <br>
    <div class="container-ranking">
        <div class="cabeza-tabla"></div>
        <table class="tabla-ranking">
            <tr>
                <th class="col-1">Nombre</th>
                <th colspan="2">Puntos</th>
                <th colspan="2">Tiempo</th>
            </tr>
            `

    for (const usuario of resultadosHistoricos) {
        salida += `
            <tr>
                <td class="col-1"> ${formatoUsuarioRanking(usuario.idUsuario, usuario.nombre)} </td>
                <td class="col-2"> ${usuario.puntos} </td>
                <td class="col-3"> 
                    <div class="marcaR" style="
                        display: inline-block;
                        height: 10px;
                        width: ${usuario.puntos * 10 + 3}px;
                    "></div> 
                </td>
                <td class="col-4"> ${usuario.tiempo} </td>
                <td class="col-5"> 
                    <div class="marcaAm" style="
                        display: inline-block;
                        height: 10px;
                        width: ${Math.round(usuario.tiempo / 4 + 3)}px;
                    "></div> 
                </td>
            </tr>
            `

    }
    salida += `</table>`
    salida += `</div>`

    // Seleccionamos el elemento ancla en el HTML, donde cargamos todo.
    const main = document.getElementById('main')
    main.innerHTML = salida
}











// ============================================================================== //
//     MODAL REGISTRO    //
const Registro = () => {
    const main = document.getElementById('main')
    const divContainer = document.createElement("div");
    divContainer.className = "modal-container"

    divContainer.innerHTML = `
        <div class="modal-content">
            <h3>Registro</h3> 
            <br> <hr> <br> 
            <p>A continuacion ingresa tu nombre</p>
            <p id="modal-p-mensaje"></p>
            <form id="modal-form">
                <input id="modal-input" class="input" type="text">
                <button class="boton-2" type="submit">Aceptar</button>
            </form>
            <hr>
            <button id="modal-cancelar" class="boton-1">Cancelar</button>
        </div>
    `

    //Lanzamos a pantalla el modal (primero invisible, 100% opaco)
    divContainer.style.opacity = 0
    main.appendChild(divContainer)

    //Desopacamos lentamente para visualizar el modal
    let fin, i = 0
    const progreso = () => {
        divContainer.style.opacity = i / 100
        i++
        if (i == 100) { clearInterval(fin) }
    }
    fin = setInterval(progreso, deltaTiempo / 100)



    // Tomamos algunos elementos del DOM ya desplegado
    const formulario = document.getElementById('modal-form')
    const pMensaje = document.getElementById('modal-p-mensaje')
    const entrada = document.getElementById('modal-input')
    const botonCancelar = document.getElementById('modal-cancelar')



    //Funcion que Procesa el submit del formulario
    const procesaFormulario = (e) => {
        e.preventDefault()
        const nombreUsuario = (entrada.value).trim()

        if (nombreUsuario.length < 4) {
            pMensaje.innerHTML = `<br> Tu nombre debe tener mínimo 4 caracteres`
            pMensaje.className = "modal-msg"
            entrada.classList.add("input-marco-rojo")
            return
        }

        //Cargamos datos del usuario en el Storage y limpiamos input (esto ultimo solo es estetico)
        localStorage.setItem('nombreUsuario', nombreUsuario);
        localStorage.setItem('idUsuario', resultadosHistoricos.length);
        entrada.value = ''


        //Editamos el nav-bar
        const navUser = document.getElementById('nav-user')
        navUser.innerText = nombreUsuario
        document.getElementById('nav-registro').classList.toggle("oculta-nav-item")
        document.getElementById('nav-inicio').classList.toggle("oculta-nav-item")
        document.getElementById('nav-ranking').classList.toggle("oculta-nav-item")
        document.getElementById('nav-salida').classList.toggle("oculta-nav-item")


        //Eliminamos lentamente el modal
        i = 100
        const bajada = () => {
            divContainer.style.opacity = i / 100
            i--
            if (i == 0) { clearInterval(fin) }
        }
        fin = setInterval(bajada, deltaTiempo / 100)

        // Lanza a pantalla pagina Inicio luego de deltaTiempo 
        setTimeout(Inicio, deltaTiempo)
    }



    //Funcion que Procesa el click al boton cancelar del formulario
    const procesaBotonCancelar = () => {

        //Eliminamos lentamente el modal
        i = 100
        const bajada = () => {
            divContainer.style.opacity = i / 100
            i--
            if (i == 0) { clearInterval(fin) }
        }
        fin = setInterval(bajada, deltaTiempo / 100)


        //Recargamos la pagina de bienbenida
        setTimeout(Bienvenida, deltaTiempo)
    }


    // Escuchamos los eventos (botones del formulario)
    formulario.addEventListener('submit', procesaFormulario)
    botonCancelar.addEventListener('click', procesaBotonCancelar)


}
















// ============================================================================== //
//     TEST    //
const Test = () => {
    entradaTransicion()

    const preguntas = []
    fs.collection("Preguntas")
        .get()
        .then((snapshot) => {
            snapshot.forEach((e) => {
                preguntas.push({ idPregunta: e.id, ...e.data() })
            });
            //Con los datos obtenidos imprimimos el Test en pantalla
            printTest(preguntas)
            salidaTransicion()
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}


const printTest = (preguntas) => {
    const alt = ["a", "b", "c", "d", "e"]
    //De aqui en adelante se contruyen el test
    let salida = `
    <h3>Test Matemática</h3>
    <br>
    <div class="test-container">
        <div id="test-resultados">
        </div>
        <form class="test" id="test-form">
            <div class="radio-caja">`
                for (let i = 0; i < preguntas.length; i++) {
                    const pregunta = preguntas[i]
                    salida += `<hr><br><b> Pregunta ${i + 1}.</b> ${pregunta.consigna} <br><br>`
                    for (const letra of alt) {
                        salida +=
                            `<div class="radio-elemento">
                                <input type="radio" name="var${i}" id="var${i}-${letra}" value="${letra}">
                                <label for="var${i}-${letra}" > <b> ${letra}. </b> ${pregunta.alternativas[letra]} </label>
                            </div>`
                    }
                    salida += `<br>`
                }
                salida +=
        `</div>
            <button id="boton-enviar-test" class="boton-2">Enviar</button>
        </form>
        <button id="cancela-test" class="boton-1">Cancelar</button>
    </div>`

    //Sacamos a Pantalla el Test
    const main = document.getElementById('main')
    main.innerHTML = salida
    

    //Guardamos el tiempo de inicio
    const tiempoInicio = (new Date()).getTime();

    
    //Procesa boton "cancelarTest"
    const cancelaTest = document.getElementById('cancela-test')
    cancelaTest.addEventListener('click', Inicio)


    //Procesa el submit del formulario Test
    const formulario = document.getElementById('test-form')
    formulario.addEventListener('submit', (e) => {
        e.preventDefault()

        //Calculamos el tiempo de duracion
        const tiempo = Math.round(((new Date()).getTime() - tiempoInicio) / 1000)

        
        for (let i = 0; i < preguntas.length; i++) {
            for (const letra of alt) {
                let id = `var${i}-${letra}`
                document.getElementById(id).setAttribute("disabled", "disabled");
            }
        }

        let puntos = 0
        for (let i = 0; i < preguntas.length; i++) {
            let letra = preguntas[i].correcta
            let id = `var${i}-${letra}`
            if (document.getElementById(id).checked) {
                document.getElementById(id).parentNode.classList.toggle("radio-correcto")
                puntos++;
            } else {
                document.getElementById(id).parentNode.classList.toggle("radio-error")
            }


        }

        //Eliminamos los botones que interactuan con el formulario
        document.getElementById('boton-enviar-test').remove()
        document.getElementById('cancela-test').remove()


        const muestraResultados = document.getElementById("test-resultados")
        muestraResultados.innerHTML = `
            <h3>Resulado de tu Test</h3>
            <br>
            <p>
            Puntos: ${puntos}
            <br><br>
            Tiempo: ${tiempo} seg
            </p>
            <input type="Button" class="boton-2" value="Ver Ranking" onclick="Ranking()">
            <input type="Button" class="boton-1" value="Salir" onclick="Inicio()">
        `
        muestraResultados.className = "test-resultados"

        window.scrollTo(0, -100000)


        const idUsuario = localStorage.getItem('idUsuario')
        const nombreUsuario = localStorage.getItem('nombreUsuario')
        resultadosHistoricos.push({ idUsuario: parseInt(idUsuario), nombre: nombreUsuario, area: "matematica", puntos: puntos, tiempo: tiempo })


    })
    

}






