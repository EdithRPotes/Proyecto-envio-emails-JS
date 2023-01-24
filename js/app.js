document.addEventListener('DOMContentLoaded',function(){

    //CREANDO OBJETO PRINCIPAL PARA  VALIDAR Y SINCRONIZAR DATOS 
    const email ={
        email:'',
        asunto:'',
        mensaje: '',

    }

    // console.log(email)
  
    // SELECCIONAR LOS ELEMENTOS DE LA INTERFAZ
    const inputEmail = document.querySelector('#email');
    const inputEmailCopia = document.querySelector('#CC');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type = "submit"]');
    const btnReset = document.querySelector('#formulario button[type = "reset"]');
    const spinner = document.querySelector('#spinner');

    // console.log(inputMensaje)

    // ASIGNAR EVENTOS 
    inputEmail.addEventListener('input',validar); // blur  dice cuando se sale de un input, input da una experiencia mas real
    inputAsunto.addEventListener('input',validar); 
    inputMensaje.addEventListener('input',validar); 
    inputEmailCopia.addEventListener('input',validarCopia);
     formulario.addEventListener('submit',enviarEmail)

    //resetear formulario
    btnReset.addEventListener('click',function(e){
        e.preventDefault();
        //REINICIAR EL OBJETO FORMULARIO
        resetFormulario();
       
    })

    //FUNCIONES 
    function enviarEmail(e){
        e.preventDefault();
        // console.log('enviando...');

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            //REINICIAR EL OBJETO FORMULARIO
            resetFormulario();

            // crear una alerta para simular el mensaje enviado
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10',
            'font-bold', 'text-sm','uppercase');
            alertaExito.textContent = 'Mensaje Enviado Correctamente';
            //agregando al formulario
            formulario.appendChild(alertaExito);

            setTimeout(()=>{
                alertaExito.remove();
            },3000)
        }, 3000 );
    }


    function validar(e){
        // console.log(e.target.value);

        //trim elimina los espacios en un formulario
        if(e.target.value.trim() === ''){ //Validacion de que los campos no esten vacios
            // console.log('ESTA VACIO');
            mostrarAlerta( `El campo ${e.target.id} es obligatorio`, e.target.parentElement); // e.target.parentElement muestra alerta junto a sus campos 
            email[e.target.name]=''; //se reinicia cuando la validacion falla 
            comprobarEmail();
            return;
        }
        
        //validacion email 
        if(e.target.id==='email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement)
            email[e.target.name]=''; //se reinicia cuando la validacion falla 
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //  asignar los valores  al objeto email
        email[e.target.name]= e.target.value.trim().toLowerCase();//toLowerCase() pone todo en minisculas 
        // console.log(email);

        //Comprobar el objeto  de email 
        comprobarEmail();
    }

    //CREANDO ALERTA DE ERROR EN LA VALIDACION 
    function mostrarAlerta(mensaje,referencia){
      
        limpiarAlerta(referencia); // PREVIENE QUE SE GENEREN MULTIPLES ALERTAS 

        // GENERAR ALERTA EN HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        // INSERTAR EL ERROR AL FORMULARIO 
        referencia.appendChild(error); // muestra e inserta alertas juntos asus campos 
    }

    // FUNCION PARA LIMPIAR LA ALERTA 
    function limpiarAlerta(referencia){
        // console.log('desde limpiar alerta')
         //COMPRUEBA SI YA EXISTE UNA ALERTA Y PREVIENE QUE SE GENEREN MULTIPLES ALERTAS 
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    //VALIDAR EMAIL CON EXPRESIÓN REGULAR 
     function validarEmail(email){
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const resultado = regex.test(email)
        // console.log(resultado);
        return resultado;
     }

     //COMPROBANDO EMAIL Y ACTIVANDO Y DESACTIVANDO BOTON ENVIAR
     function comprobarEmail(){
        // console.log(email);
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        
     }

     function resetFormulario(){
        //REINICIAR EL OBJETO FORMULARIO
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
     }

     function validarCopia(e){
        // email[e.target.name]=e.target.value.trim().toLowerCase();

        //validacion email 
        if(e.target.id==='CC' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement)
            email[e.target.name]=''; //se reinicia cuando la validacion falla 
            comprobarEmail();
            return;
        }else{
            limpiarAlerta(e.target.parentElement);

        //  asignar los valores  al objeto email
        email[e.target.name]= e.target.value.trim().toLowerCase();//toLowerCase() pone todo en minisculas 
        // console.log(email);

        //Comprobar el objeto  de email 
        comprobarEmail();
        }
     }
});