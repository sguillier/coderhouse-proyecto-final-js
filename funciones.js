
// Funcion para ordenar los resultados de mayor a menor
// ============================================================================== //
const jerarquizaResultados = (arrayRanking) => {
    let objetoA, objetoB, loop = true
    while (loop) {
        loop = false
        for (let i = 0; i < arrayRanking.length - 1; i++) {
            objetoA = arrayRanking[i]
            objetoB = arrayRanking[i + 1]
            if (objetoA.puntos < objetoB.puntos) {
                arrayRanking[i] = objetoB
                arrayRanking[i + 1] = objetoA
                loop = true
            }
            if (objetoA.puntos == objetoB.puntos && objetoA.tiempo > objetoB.tiempo) {
                arrayRanking[i] = objetoB
                arrayRanking[i + 1] = objetoA
                loop = true
            }
        }
    }
    return arrayRanking
}










// ============================================================================== //
// Delta de tiempo de las transiciones (en milisegundos)
const deltaTiempo = 250


const entradaTransicion = () => {
    const divContainer = document.createElement("div");
    divContainer.className = "pantalla-transicion"
    divContainer.id = "pantalla-transicion"
    divContainer.innerHTML = `
        <div class="preloader">
        </div>
    `
    //Lanzamos a pantalla el objeto de espera
    const main = document.getElementById('main')
    divContainer.style.opacity = 0
    document.body.appendChild(divContainer)

    //Desopacamos lentamente para visualizar el objeto
    let fin, i = 0
    const progreso = () => {
        divContainer.style.opacity = i / 100
        i++
        if (i == 100) { clearInterval(fin) }
    }
    fin = setInterval(progreso, deltaTiempo / 100)
}


const salidaTransicion = () => {
    const divContainer = document.getElementById("pantalla-transicion")
    
    let fin, i = 100
    const progreso = () => {
        divContainer.style.opacity = i / 100
        i--
        if (i == 0) { clearInterval(fin) }
    }
    fin = setInterval(progreso, deltaTiempo / 100)
    
    setTimeout(()=>{
        divContainer.remove()
    }, deltaTiempo)
    
}