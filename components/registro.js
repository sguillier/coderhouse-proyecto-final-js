


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
                <p> <button class="boton-2" type="submit">Aceptar</button> </p>
            </form>
            <hr>
            <p> <button id="modal-registro-cancelar" class="boton-3">Cancelar</button> </p>
        </div>
    </div>
    `
    $('#modal-registro').fadeIn(600)



    //Procesamos el submit del formulario
    const formulario = document.getElementById('modal-registro-form')
    formulario.addEventListener('submit', (e) => {
        e.preventDefault()
        

        //Validamos algo el nombre de usuario
        const inputNombre = (document.getElementById('modal-registro-nombre').value).trim()
        if (inputNombre.length < 4) {
            document.getElementById('modal-registro-mensaje-nombre').innerText = `Tu nombre debe tener mínimo 6 caracteres`
            document.getElementById('modal-registro-nombre').classList.add("input-marco-rojo")
            return
        }else{
            document.getElementById('modal-registro-mensaje-nombre').innerText = ''
            document.getElementById('modal-registro-nombre').classList.remove("input-marco-rojo")
        }

        
        //Validamos algo el password
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

            
            // Guardamos el nombre del usuario en Auth Firebase
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



