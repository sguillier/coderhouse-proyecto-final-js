
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
        Despedida()
    });
})





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
        editaNavbar()
        Bienvenida()
    }
});

