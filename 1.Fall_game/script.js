//creando las variables
var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
//el contandor
var counter = 0;
var currentBlocks = [];

//left function move
function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    //aqui seleccion la velocidad de movimiento
    if(left>0){
        character.style.left = left - 2 + "px";
    }
}

//right function move
function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    //se le resta menos dos porque hara la accion de retrocerder a la izquierda
    if(left<380){
        character.style.left = left + 2 + "px";
    }
}

document.addEventListener("keydown", event  => {
    if (both==0) {
        both++;
        //creando los eventos del teclado derecha izquierda
        if (event.key === "ArrowLeft") {
            //si el intervalo se mueve un lado
            interval = setInterval(moveLeft, 1);

        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1);
        }

    }
});

document.addEventListener("keyup", event => {
    //para el movimiento
    clearInterval(interval);
    //both determina que empieza en la posicion 0 sin movimiento
    both = 0
});
//funcion de interval hacerla al final 
var blocks = setInterval(function(){
    //blockLast
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    //400 es solo para el cuadro de 400px que creamos 
    if(blockLastTop<400||counter==0){ 
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);
        //contamos que los espacios creados sean de 100px
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        //añadiendo posisiones random a las lineas heredadas de abajo
        var random = Math.floor(Math.random() * 360);
        //que el vacio blanco se vaya para la derecha
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        //push crea mas y mas 
        currentBlocks.push(counter);
        counter++;
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if(characterTop <= 0){
        alert("Game over. Score: "+(counter-9));
        //borramos el score y empezamos
        clearInterval(blocks);
        location.reload(); 
    }
    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";
        if(iblockTop < -20){
            //removiendo los elementos
             currentBlocks.shift();
             iblock.remove();
             ihole.remove();
        }
        if(iblockTop-20<characterTop && iblockTop>characterTop){
            drop++;
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                drop=0;
            }
        }
    }
    if(drop==0){
        if(characterTop < 480){

        
        character.style.top = characterTop + 2 + "px";
    }
    }else{
        character.style.top = characterTop - 0.5 + "px";
    }
}, 1); 
