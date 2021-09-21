



// ============================================================================== //
//     MODAL INICIO SESION    //
const Inicio = () => {
    //Pintamos en Pantalla el modal
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
                <p><button class="boton-2" type="submit">Aceptar</button></p>
            </form>
            <hr>
            <p> <button id="modal-inicio-cancelar" class="boton-1">Cancelar</button> </p>
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
        
        //Validamos con Auth de FireBase
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



