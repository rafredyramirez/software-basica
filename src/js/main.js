// Variable to hold request
function actionOnClick () {
    var form = document.form;
    var nombreUsuario = form.nombre_usuario.value;
    var generoUsuario = form.radio_genero.value;

    sessionStorage.setItem("usuario", nombreUsuario);

    sessionStorage.setItem("genero", generoUsuario);

    location.href='main.html';
}

function registroPop () {
    var nameUser = document.getElementById('name_user');
    var imagenP = document.createElement('img');
    var tituloBienvenida = document.getElementById('modalBienvenidaLabel');
    var descripcionBienvenida = document.getElementById('modalDescripcion');

    var fileGenero;
    var letraGenero;

    var objEstudiante = {
        nombre: sessionStorage.getItem("usuario"),
        genero: sessionStorage.getItem("genero"),
        imagenGenero: function(){
            if (objEstudiante.genero === 'Niño') {
                fileGenero = './src/assets/images/boy.png';

            }else{
                fileGenero = './src/assets/images/girl.png';
            }
            return fileGenero;
        },
        bienvenida: function(){
            return `¡Hola! ${this.nombre}`;
        },
        descripcion: function(){
            (objEstudiante.genero === 'Niño') ? letraGenero='o' : letraGenero='a'
            
            return `Biendid${letraGenero} a <strong>Yo Cuido Mi Cuerpo</strong> en donde podrás aprender por medio de un material educativo temas sobre: <strong>Abuso Sexual</strong> y <strong>Salud Mental.</strong>`;
        },
    };
    nameUser.innerHTML = objEstudiante.nombre;
    imagenP.src = objEstudiante.imagenGenero();
    imagenP.style.width="50px";
    imagenP.style.height="50px";
    document.getElementById('contenedorImagen').appendChild(imagenP);
    tituloBienvenida.innerHTML = objEstudiante.bienvenida();
    descripcionBienvenida.innerHTML = objEstudiante.descripcion();
}