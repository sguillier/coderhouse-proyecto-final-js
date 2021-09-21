
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



const editaNavbar = (nombre='') => {
    document.getElementById('nav-user').innerText = nombre
    
    if(nombre != ''){
        document.getElementById('nav-registro').classList.add("oculta-nav-item")
        document.getElementById('nav-inicio').classList.add("oculta-nav-item")
        document.getElementById('nav-home').classList.remove("oculta-nav-item")
        document.getElementById('nav-ranking').classList.remove("oculta-nav-item")
        document.getElementById('nav-salida').classList.remove("oculta-nav-item")
    }else{
        document.getElementById('nav-registro').classList.remove("oculta-nav-item")
        document.getElementById('nav-inicio').classList.remove("oculta-nav-item")
        document.getElementById('nav-home').classList.add("oculta-nav-item")
        document.getElementById('nav-ranking').classList.add("oculta-nav-item")
        document.getElementById('nav-salida').classList.add("oculta-nav-item")
    }

    
}




// //Lanzamos a pantalla el modal (primero invisible, 100% opaco)
    // divContainer.style.opacity = 0
    // main.appendChild(divContainer)

    // //Desopacamos lentamente para visualizar el modal
    // let fin, i = 0
    // const progreso = () => {
    //     divContainer.style.opacity = i / 100
    //     i++
    //     if (i == 100) { clearInterval(fin) }
    // }
    // fin = setInterval(progreso, deltaTiempo / 100)




        // //Eliminamos lentamente el modal
        // i = 100
        // const bajada = () => {
        //     divContainer.style.opacity = i / 100
        //     i--
        //     if (i == 0) { clearInterval(fin) }
        // }
        // fin = setInterval(bajada, deltaTiempo / 100)

        // // Lanza a pantalla pagina Inicio luego de deltaTiempo 
        // setTimeout(Inicio, deltaTiempo)



        
// ============================================================================== //
// RELOJ


