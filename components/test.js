




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
            
            //Previniendo que no haya internet
            if(preguntas.length != 0){
                printTest(preguntas)    
            }else{
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
        <p> <button id="boton-enviar-test" class="boton-2">Enviar</button> </p>
        </form>
        <p> <button id="cancela-test" class="boton-1">Cancelar</button> </p>
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
            <input type="Button" class="boton-1" value="Salir" onclick="Home()">
        `
        muestraResultados.className = "test-resultados"

        window.scrollTo(0, -100000)

        console.log(auth.currentUser.uid)
        const resultados = fs.collection("Usuarios").doc(auth.currentUser.uid);

        resultados.update({
            resultados: firebase.firestore.FieldValue.arrayUnion(
                {
                    puntos: puntos,
                    tiempo: tiempo
                }
            )
        });


    })
    

}


