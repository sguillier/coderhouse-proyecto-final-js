

// ============================================================================== //
//     PAGINA DE RANKING    //

const Ranking = () => {
    entradaTransicion()

    const resultadosHistoricos = []
    fs.collection("Usuarios")
        .get()
        .then((snapshot) => {
            snapshot.forEach((usuario) => {
                const resultadosLocal = usuario.data().resultados
                resultadosLocal.forEach((e) => {
                    resultadosHistoricos.push({...{ idUsuario: usuario.id, nombre: usuario.data().nombre}, ...e})
                });
            });

            console.log("resultadosHistoricos")
            console.log(resultadosHistoricos)
            
            //Previniendo que no haya internet
            if(resultadosHistoricos.length != 0){
                printRanking(resultadosHistoricos)    
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


const printRanking = (resultadosHistoricos) => {
    resultadosHistoricos = jerarquizaResultados(resultadosHistoricos)
    
    //Aqui generamos la tabla
    let salida = `
    <h3>Ranking</h3>
    <br>
    <div class="container-ranking">
        <div class="cabeza-tabla" style="display: none;"></div>
        <table class="tabla-ranking" style="display: none;">
            <tr>
                <th class="col-1">Nombre</th>
                <th colspan="2">Puntos</th>
                <th colspan="2">Tiempo</th>
            </tr>
            `

    for (const usuario of resultadosHistoricos) {
        salida += `
            <tr>
                <td class="col-1 user-${usuario.idUsuario}"> ${usuario.nombre} </td>
                <td class="col-2"> ${usuario.puntos} </td>
                <td class="col-3"> 
                    <div class="marcaR" style="
                        display: none;
                        height: 10px;
                        width: ${usuario.puntos * 20 + 10}px;
                    "></div> 
                </td>
                <td class="col-4"> ${usuario.tiempo} </td>
                <td class="col-5"> 
                    <div class="marcaAm" style="
                        display: none;
                        height: 10px;
                        width: ${Math.round(usuario.tiempo / 2 + 10)}px;
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

    // const idUsuario = localStorage.getItem('idUsuario')
    const idUsuario = auth.currentUser.uid
    const claseUsuario = $(`.user-${idUsuario}`)
    claseUsuario.addClass("formato-usuario-ranking-local")

    $('.cabeza-tabla')
        .slideDown(600)
        
    $('.tabla-ranking').slideDown(1200, () => {
        $('.marcaAm').toggle(600)
        $('.marcaR').toggle(600)
    })

    
}


