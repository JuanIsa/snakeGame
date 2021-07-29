window.addEventListener("load", function(){
    const cuadrados = document.querySelectorAll('.grilla div');
    const puntajeDisplay = document.querySelector('span');
    const botonComienzo = document.querySelector('.inicio');
  
    const width = 10;
    let indiceActual = 0; 
    let indiceObjetivo = 0; 
    let vivorita = [2,1,0]; 
    let direccion = 1;
    let puntaje = 0;
    let velocidad = 0.95;
    let intervaloTiempo = 0;
    let intervalo = 0;
  
  
    
    function comienzo() {
      vivorita.forEach(index => cuadrados[index].classList.remove('vivora'));
      cuadrados[indiceObjetivo].classList.remove('objetivo');
      clearInterval(intervalo);
      puntaje = 0;
      objetivoAleatorio();
      direccion = 1;
      puntajeDisplay.innerText = puntaje;
      intervaloTiempo = 1000;
      vivorita = [2,1,0];
      indiceActual = 0;
      vivorita.forEach(index => cuadrados[index].classList.add('vivora'));
      intervalo = setInterval(moveOutcomes, intervaloTiempo);
    }
  
  
    
    function moveOutcomes() {
  
      
      if (
        (vivorita[0] + width >= (width * width) && direccion === width ) || 
        (vivorita[0] % width === width -1 && direccion === 1) || 
        (vivorita[0] % width === 0 && direccion === -1) || 
        (vivorita[0] - width < 0 && direccion === -width) ||  
        cuadrados[vivorita[0] + direccion].classList.contains('vivora') 
      ) {
        window.alert("Perdiste :V");
        return clearInterval(intervalo);
      }
  
      const cola = vivorita.pop(); 
      cuadrados[cola].classList.remove('vivora');  
      vivorita.unshift(vivorita[0] + direccion); 
  
      
      if(cuadrados[vivorita[0]].classList.contains('objetivo')) {
        cuadrados[vivorita[0]].classList.remove('objetivo');
        cuadrados[cola].classList.add('vivora');
        vivorita.push(cola);
        objetivoAleatorio();
        puntaje++;
        puntajeDisplay.textContent = puntaje;
        clearInterval(intervalo);
        intervaloTiempo = intervaloTiempo * velocidad;
        intervalo = setInterval(moveOutcomes, intervaloTiempo);
      }
      cuadrados[vivorita[0]].classList.add('vivora');
    }
  
  
    
    function objetivoAleatorio() {
      do{
        indiceObjetivo = Math.floor(Math.random() * cuadrados.length);
      } while(cuadrados[indiceObjetivo].classList.contains('vivora')) 
      cuadrados[indiceObjetivo].classList.add('objetivo');
    }
  
  
    
    function control(e) {
      cuadrados[indiceActual].classList.remove('vivora');
  
      if(e.keyCode === 39) {
        direccion = 1 
      } else if (e.keyCode === 38) {
        direccion = -width 
      } else if (e.keyCode === 37) {
        direccion = -1 
      } else if (e.keyCode === 40) {
        direccion = +width 
      }
    }
  
    document.addEventListener('keyup', control);
    botonComienzo.addEventListener('click', comienzo);
});