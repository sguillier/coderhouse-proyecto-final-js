

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

const linkHome = document.getElementById('nav-home')
linkHome.addEventListener('click', () => {
    Home()
})

const linkRanking = document.getElementById('nav-ranking')
linkRanking.addEventListener('click', () => {
    Ranking()
})

const linkSalida = document.getElementById('nav-salida')
linkSalida.addEventListener('click', () => {
    auth.signOut().then(() => {
        console.log("Usuario Deslogueado");
    });
    editaNavbar()
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
//     PAGINA HOME    //

const Home = () => {
    // Seleccionamos el elemento ancla en el HTML, donde cargamos todo.
    const main = document.getElementById('main')
    // Incertamos
    main.innerHTML = `
        <h3>Home</h3>
        <br>
        <p>Haz Click a continuacion para realizar Test</p>
        <input type="Button" class="boton-2" value="Iniciar" onclick="Test()">
        `
    console.log("Estado del usuario: ", auth.currentUser.uid )

}














// ============================================================================== //
//     MODAL REGISTRO    //
const Registro = () => {
    document.getElementById('alert').innerHTML = `
    <div id="modal-registro" class="modal-container" style="display:none">
        <div class="modal-content">
            <h3>Registro</h3> 
            <br> <hr> <br> 
            <form id="modal-registro-form">
                <table>
                    <tr> 
                        <td class="modal-labbel"> Nombre </td> <td>     <input id="modal-registro-nombre" class="modal-input" type="text"> <p id="modal-registro-mensaje-nombre" class="modal-msg"></p> </td>
                    </tr>
                    <tr>
                        <td class="modal-labbel"> Correo </td> <td>     <input id="modal-registro-correo" class="modal-input" type="text"> </td>
                    </tr>
                    <tr>
                        <td class="modal-labbel"> Contraseña </td> <td> <input id="modal-registro-password" class="modal-input" type="password"> <p id="modal-registro-mensaje-password" class="modal-msg"></p> </td>
                    </tr>
                </table>      
                <button class="boton-2" type="submit">Aceptar</button>
            </form>
            <hr>
            <button id="modal-registro-cancelar" class="boton-1">Cancelar</button>
        </div>
    </div>
    `
    $('#modal-registro').fadeIn(600)



    //Procesamos el submit del formulario
    const formulario = document.getElementById('modal-registro-form')
    formulario.addEventListener('submit', (e) => {
        e.preventDefault()
        

        const inputNombre = (document.getElementById('modal-registro-nombre').value).trim()
        if (inputNombre.length < 4) {
            document.getElementById('modal-registro-mensaje-nombre').innerText = `Tu nombre debe tener mínimo 6 caracteres`
            document.getElementById('modal-registro-nombre').classList.add("input-marco-rojo")
            return
        }else{
            document.getElementById('modal-registro-mensaje-nombre').innerText = ''
            document.getElementById('modal-registro-nombre').classList.remove("input-marco-rojo")
        }

        
        const inputPassword = (document.getElementById('modal-registro-password').value).trim()
        if (inputPassword.length < 6) {
            document.getElementById('modal-registro-mensaje-password').innerText = `Tu password debe tener mínimo 6 caracteres`
            document.getElementById('modal-registro-password').classList.add("input-marco-rojo")
            return
        }else{
            document.getElementById('modal-registro-mensaje-password').innerText = ''
            document.getElementById('modal-registro-password').classList.remove("input-marco-rojo")
        }

        
        const inputCorreo = (document.getElementById('modal-registro-correo').value).trim()
        
        auth
        .createUserWithEmailAndPassword(inputCorreo, inputPassword)
        .then((userCredential) => {
            //Vemos en consola algunos valores
            console.log('Usuario Registrado')
            console.log('Sus credenciales son: ',userCredential)

            
            // Guardamos el nombre del usuario en firebase
            userCredential.user.updateProfile({
                displayName: inputNombre,
                // photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
              

            // Creacion del usuario en la base de datos
            fs.collection("Usuarios").doc(userCredential.user.uid).set({
                nombre: inputNombre,
                resultados: []
            })
            .then(() => {
                console.log("Escritura en FireStore correcta!");
            })
            .catch((error) => {
                console.error("Error al escribir en FireStore: ", error);
            });
            
            
            //Editamos el nav-bar y sacamos el modal
            editaNavbar(inputNombre)
            Home()
            $('#modal-registro').fadeOut(600)
        })
        .catch((error) => {
            console.log("Error con el registro:", error)
            // An error occurred
        });
        
    })


    //Procesamos la cancelacion del formulario
    const botonCancelar = document.getElementById('modal-registro-cancelar')
    botonCancelar.addEventListener('click', () => {
        $('#modal-registro').fadeOut(600)
    })
    
}








 




// ============================================================================== //
//     MODAL INICIO SESION    //
const Inicio = () => {
    document.getElementById('alert').innerHTML = `
    <div id="modal-inicio" class="modal-container" style="display:none">
        <div class="modal-content">
            <h3>Inicio de Sesión</h3> 
            <br> <hr> <br> 
            <form id="modal-inicio-form">
                <table>
                    <tr>
                        <td class="modal-labbel"> Correo </td> <td>     <input id="modal-inicio-correo" class="modal-input" type="text"> </td>
                    </tr>
                    <tr>
                        <td class="modal-labbel"> Contraseña </td> <td> <input id="modal-inicio-password" class="modal-input" type="password"> </td>
                    </tr>
                </table>      
                <button class="boton-2" type="submit">Aceptar</button>
            </form>
            <hr>
            <button id="modal-inicio-cancelar" class="boton-1">Cancelar</button>
        </div>
    </div>
    `
    $('#modal-inicio').fadeIn(600)



    //Procesamos el submit del formulario
    const formulario = document.getElementById('modal-inicio-form')
    formulario.addEventListener('submit', (e) => {
        e.preventDefault()
        
        const inputPassword = (document.getElementById('modal-inicio-password').value).trim()
        const inputCorreo = (document.getElementById('modal-inicio-correo').value).trim()
        

        auth
        .signInWithEmailAndPassword(inputCorreo, inputPassword)
        .then((userCredential) => {
            console.log('Credenciales usuario logueado', userCredential)
            
            editaNavbar(userCredential.user.displayName)
            Home()
            $('#modal-inicio').fadeOut(600)
        });
        

        
    })


    //Procesamos la cancelacion del formulario
    const botonCancelar = document.getElementById('modal-inicio-cancelar')
    botonCancelar.addEventListener('click', () => {
        $('#modal-inicio').fadeOut(600)
    })
    
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






// ============================================================================== //
//     INICIALIZAMOS LA APP     //

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("Usuario Conectado ID: ", user.uid )
        editaNavbar(user.displayName)
        Home()
    } else {
        // User is signed out
        console.log("Usuario Desconectado")
        Bienvenida()
    }
});






