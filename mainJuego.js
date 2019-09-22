class Protagonista{
    constructor(domElement, attackSpeed, attackDuration){
        this.domElement = domElement;
        this.height = this.domElement.offsetHeight;
        this.velocidadY = 0;
        this.altura = 0;
        this.doubleJump = false;
        this.attacking = -10;
        this.attackSpeed = attackSpeed;
        this.attackDuration = attackDuration;
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
    getDomElement(){
        return this.domElement;
    }
    isAttacking(){
        return this.attacking > 0;
    }
    canAttack(){
        return this.attacking < -this.attackSpeed;
    }
    attack(){
        this.attacking = this.attackDuration;
    }
    update(){
        if(!this.isAttacking()){
            this.getDomElement().classList.remove("atacando");
        }
        if(this.getVelocidadY() > 0){
            this.getDomElement().classList.remove("corriendo");
            this.getDomElement().classList.remove("cayendo");
            this.getDomElement().classList.add("saltando");
        }
        else if(this.getVelocidadY() < 0){
            this.getDomElement().classList.remove("saltando");
            this.getDomElement().classList.add("cayendo");
        }
        else if(!this.getDomElement().classList.contains("corriendo") && main.isOnFloor()){
            this.getDomElement().classList.remove("cayendo");
            this.getDomElement().classList.add("corriendo");
        }
        if(this.isAttacking()){
            this.getDomElement().classList.remove("saltando");
            this.getDomElement().classList.remove("cayendo");
            this.getDomElement().classList.remove("corriendo");
            this.getDomElement().classList.add("atacando");
        }
        this.getDomElement().style.bottom = main.getAltura() + "px";
        this.calcularAltura();
        this.attacking--;
    }
    getHitbox(){
        return {x1 : 5,
                x2 : this.domElement.offsetWidth,
                y1 : this.altura,
                y2 : this.altura + this.height
        };
    }
}
class Proyectil{
    constructor(domElement, velocidadY, velocidadX){
        this.domElement = domElement;
        this.velocidadY = velocidadY;
        this.velocidadX = velocidadX;
        this.posX = 800;
        this.posY = 300;
    }
    update(){
        this.domElement.style.background = "red";
        this.posX -= this.velocidadX;
        this.posY -= this.velocidadY;
        this.domElement.style.left = this.posX + "px";
        this.domElement.style.bottom = this.posY + "px";
    }
    getHitbox(){
        return {
            x1 : this.posX,
            x2 : this.posX + 20,
            y1 : this.posY,
            y2 : this.posY + 20,
        }
    }
}
let test = document.querySelector("#protagonista");
console.log(test);

//parametros importantes
let saltoSpeed = 18;
let gravity = -1;
let attackSpeed = 20;
let attackDuration = 5;
let main = new Protagonista(test, attackSpeed, attackDuration);

let sprite = document.querySelector("#testSprite");
let downKey = false;
let upKey = false;
let spaceKey = false;
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
            case "Space":
                spaceKey = true;
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
let proyectil = new Proyectil(document.querySelector(".proyectil"), 3, 8);
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
    if(spaceKey){
        if(main.canAttack()){
            main.attack();
        }
    }
    main.update();
    proyectil.update();
    downKey = false;
    upKey = false;
    spaceKey = false;
    let hitBoxMain = main.getHitbox();
    let hitBoxTest = proyectil.getHitbox();
    if(areColliding(hitBoxMain, hitBoxTest)){
        if(main.isAttacking()){
            console.log("destroyed");
        }
        else{
            console.log("u ded");
        }
    }
    ;
}
function areColliding(hitBoxA, hitBoxB){
    return (!(hitBoxB.y1 > hitBoxA.y2) && !(hitBoxB.y2 < hitBoxA.y1) && !(hitBoxB.x1 > hitBoxA.x2) && !(hitBoxB.x2 < hitBoxA.x1));
    /*if(!(hitBoxB.y1 > hitBoxA.y2) && !(hitBoxB.y2 < hitBoxA.y1)){
        //console.log("collideY");
    }
    if(!(hitBoxB.x1 > hitBoxA.x2) && !(hitBoxB.x2 < hitBoxA.x1)){
        //console.log("collideX");
    }*/
}
setInterval(tick,25);






