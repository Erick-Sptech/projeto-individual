document.addEventListener('keydown', function(event) {
    console.log('Tecla pressionada:', event.key);
    console.log('Código da tecla:', event.code); // Mais específico, como "KeyA", "Enter", etc.
    console.log('Chave específica:', event.keyCode); // Código numérico (obsoleto, use event.code)
    if (event.key == 'ArrowLeft') {
        ctx.clearRect(0, 0, galeria.width, galeria.height)
        andar(-2)
    }
    if (event.key == 'ArrowRight') {
        ctx.clearRect(0, 0, galeria.width, galeria.height)
        setInterval(andar(2), 300)
    }
});

var player = document.getElementById('player_image')
var card = document.getElementById('card')
var playerX = 1
var playerY = 130
var cardX = 20
var cardY = 50


var galeria = document.getElementById('galeria')
var ctx = galeria.getContext('2d');
card.src = 'assets/card_image.png'

console.log(card.src)

window.onload = main();
setInterval(log, 500)

function main() {
    ctx.clearRect(0, 0, 100, 100)
    ctx.drawImage(player, playerX , playerY, 20, 20)
    ctx.drawImage(card, cardX, cardY, 40, 70)

}

function log() {
    console.log(playerX)
}

function andar(sentido) {
    if (playerX < 280 && sentido == 2) {
        playerX += sentido
        console.log('<')
    }
    else if (playerX > 0 && sentido == -2){
        playerX += sentido
        console.log('>')
    }
    ctx.drawImage(player, playerX , playerY, 20, 20)
}

function andarSmooth() {
    
}