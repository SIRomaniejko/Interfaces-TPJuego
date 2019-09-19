//parametros importantes
let saltoSpeed = 18;
let gravity = -1;

let sprite = document.querySelector("#testSprite");
let downKey = false;
let upKey = false;
document.addEventListener("keydown", event=>{
    if(!event.repeat){
        switch(event.code){
            case "ArrowDown":
                downKey = true;
                event.preventDefault();
                break;
            case "ArrowUp":
                upKey = true;
                event.preventDefault();
                break;
        }
    }
},{passive: false})
/*document.addEventListener("keyup", event=>{
    if(event.code == "ArrowDown"){
        downKey = false;
    }
    if(event.code == "ArrowUp"){
        upKey = false;
    }
})*/


let domMain = document.querySelector("#protagonista");
function tick(){
    if(!main.isOnFloor()){
        main.changeVelocidadY(gravity);
    }
    if(upKey && main.isOnFloor()){
        main.setVelocidadY(saltoSpeed);
        upKey = false;
        main.setDoubleJump(false);
    }
    if(upKey && !main.isDoubleJumping()){
        main.setVelocidadY(saltoSpeed);
        main.setDoubleJump(true);
    }
    if(main.getVelocidadY() > 0){
        domMain.classList.remove("corriendo");
        domMain.classList.remove("cayendo");
        domMain.classList.add("saltando");
    }
    else if(main.getVelocidadY() < 0){
        domMain.classList.remove("saltando");
        domMain.classList.add("cayendo");
    }
    else if(!domMain.classList.contains("corriendo") && main.isOnFloor()){
        domMain.classList.remove("cayendo");
        domMain.classList.add("corriendo");
    }
    domMain.style.bottom = main.getAltura() + "px";
    main.calcularAltura();
    downKey = false;
    upKey = false;
}

setInterval(tick,25);

class Protagonista{
    constructor(){
        this.velocidadY = 0;
        this.altura = 0;
        this.doubleJump = false;
    }
    isOnFloor(){
        return this.altura == 0;
    }
    changeVelocidadY(velocidad) {
        this.velocidadY += velocidad;
    }
    setVelocidadY(velocidad){
        this.velocidadY = velocidad;
    }
    getVelocidadY(){
        return this.velocidadY;
    }
    calcularAltura(){
        this.altura += this.velocidadY;
        if(this.altura <= 0){
            this.altura = 0;
            this.velocidadY = 0;
        }
    }
    getAltura(){
        return this.altura;
    }
    isDoubleJumping(){
        return this.doubleJump;
    }
    setDoubleJump(param){
        this.doubleJump = param;
    }
}

let main = new Protagonista();