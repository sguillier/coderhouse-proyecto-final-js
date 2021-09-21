




// ============================================================================== //
//     TEST    //
const Test = () => {
    entradaTransicion()

    //Obteniedo los datos desde FireStore
    const preguntas = []
    fs.collection("Preguntas")
        .get()
        .then((snapshot) => {
            snapshot.forEach((e) => {
                preguntas.push({ idPregunta: e.id, ...e.data() })
            });
            
            //Previniendo que no haya internet
            if (preguntas.length != 0) {
                //Con los datos obtenidos imprimimos el Test en pantalla
                printTest(preguntas)
            } else {
                pantallaError("Lo sentimos, no es posible conectar con el servidor")
            }
            salidaTransicion()
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
            pantallaError("Lo sentimos, no es posible conectar con el servidor")
            salidaTransicion()
        });
}


const printTest = (preguntas) => {
    const alt = ["a", "b", "c", "d", "e"]
    //De aqui en adelante se contruyen el test
    let salida = `
    <div class="test-container">
        <div id="test-dialogo">
            <div id="test-barra-tiempo">
                <div id="test-barra-tempo"></div>
                <div id="test-reloj"></div>
            </div>
            <div id="test-barra-tiempo-falsa"></div>
        </div>
        
        <h3>Test</h3>
        <form class="test" id="test-form">
            <div class="radio-caja">`
    for (let i = 0; i < preguntas.length; i++) {
        const pregunta = preguntas[i]
        salida += `<hr><br><b> <div class="consigna"> Pregunta ${i + 1}.</b> ${pregunta.consigna} </div> <br><br>`
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
        <p> <button id="boton-enviar-test" class="boton-2">Enviar</button> </p>
        </form>
        <p> <button id="cancela-test" class="boton-1">Cancelar</button> </p>
    </div>`
    

    //Sacamos a Pantalla el Test
    const main = document.getElementById('main')
    main.innerHTML = salida

    //Damos formato a las formulas
    MathJax.typeset()

    // Barra De Tiempo
    const barraTempo = $('#test-barra-tempo')
    const reloj = $('#test-reloj')
    let seg = 0
    let escala = 0
    let tempo = 0
    const paso = () => {
        if (seg < 180) {
            // Antes Que Se Cumpla El Tiempo => Pintado de la Barra de Tiempo
            setTimeout(() => {paso()}, 1000)
            if(tempo === 10){
                barraTempo.append(`<div class="bloque-seg" id="bloque-seg-${escala}"> </div>`)
                escala ++
                tempo = 0
            }
            //
            if(seg%2 === 0){
                barraTempo.append(`<div class="bloque-seg-rojo" id="bloque-seg-${escala}"> </div>`)
            }else{
                $(`#bloque-seg-${escala}`).remove()
            }
            //
            reloj.html(`<p>${seg}</p>`)
            tempo++
            seg++
        }else{
            // Fin del Tiempo Forzamos el Procesamiento del Formulario
            if(seg === 180){ procesaFormulario() }
        }
    }
    paso()


    //Procesa boton "cancelarTest"
    const cancelaTest = document.getElementById('cancela-test')
    cancelaTest.addEventListener('click', () => {
        seg = 1000000 //Esto para forzar la salida del reloj
        Home()
    })


    //Submit del Formulario Test
    const formulario = document.getElementById('test-form')
    formulario.addEventListener('submit', (e) => {
        e.preventDefault()
        procesaFormulario()
    })
    
    
    //Funcion que Procesa el Formulario Test
    const procesaFormulario = () => {
        

        //Forzamos que los radios no se puedan volver a seleccionar
        for (let i = 0; i < preguntas.length; i++) {
            for (const letra of alt) {
                let id = `var${i}-${letra}`
                document.getElementById(id).setAttribute("disabled", "disabled");
            }
        }

        //Pintamos las Respuestas Correctas (Y las Contamos)
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


        //Mostramos cuadro de Dialogo con el resultado del Test
        const muestraResultados = document.getElementById("test-dialogo")
        muestraResultados.innerHTML = `
            <h3>Resulado de tu Test</h3>
            <br>
            <p>
            Puntos: ${puntos}
            <br><br>
            Tiempo: ${seg} seg
            </p>
            <button id="resultado-test-ranking" class="boton-2"> Ver Ranking </button>
            <button id="resultado-test-salir" class="boton-1"> Salir </button>
        `
        window.scrollTo(0, -100000)
        muestraResultados.className = "test-resultado"
        //
        const resultadoTestSalir = document.getElementById('resultado-test-salir')
        resultadoTestSalir.addEventListener('click', () => Home())
        //
        const resultadoTestRanking = document.getElementById('resultado-test-ranking')
        resultadoTestRanking.addEventListener('click', () => Ranking())
        
        
        //Escribimos los resultados en FireStore
        const resultados = fs.collection("Usuarios").doc(auth.currentUser.uid);
        resultados.update({
            resultados: firebase.firestore.FieldValue.arrayUnion(
                {
                    puntos: puntos,
                    tiempo: seg
                }
            )
        });

        seg = 1000000 //Esto para forzar la salida del reloj
    }


}


