// declaração das variáveis
var player = document.getElementById('player_image')
var cards = {
    1: document.getElementById('card1'),
    2: document.getElementById('card2'),
    3: document.getElementById('card3'),
    4: document.getElementById('card4'),
    5: document.getElementById('card5')
};
var playerSprites = [
    'assets/player_sprites/sprite1.png',
    'assets/player_sprites/sprite2.png',
    'assets/player_sprites/sprite3.png'    
]

var playerX = 1
var playerY = 350
var cardX = 160
var cardY = 80
var cardGap = 30
var cardWidth = 190
var cardHeigth = 240
var esquerda = false
var direita = false
var quadroAtual = 0
const QTD_CARDS = 5

var playerFrame = 0;
var frameSpeed = 10; // menor = mais rápido
var frameTick = 0;

// configuração do canvas
var galeria = document.getElementById('galeria')
var ctx = galeria.getContext('2d');

galeria.width = window.innerWidth
galeria.height = window.innerHeight * (80/100)

window.onload = main();

// verifica se usuario apertou direcional direito/esquerdo
document.addEventListener('keydown', function(event) {
    console.log('Tecla pressionada:', event.key);
    console.log('Código da tecla:', event.code); // Mais específico, como "KeyA", "Enter", etc.
    console.log('Chave específica:', event.keyCode); // Código numérico (obsoleto, use event.code)
    if (event.key == 'ArrowLeft') {
        esquerda = true
    }
    if (event.key == 'ArrowRight') {
        direita = true
    }
});

document.addEventListener('keyup', function(event) {
        if(event.key == 'ArrowLeft') {
            esquerda = false
        }
        if (event.key == 'ArrowRight') {
            direita = false
        }
})

// Função principal do jogo
function gameLoop () {
    if(esquerda) {
        andar(-2)
    }
    if(direita) {
        andar(2)
    }

    frameTick++;
    if (frameTick % frameSpeed === 0) {
        playerFrame = (playerFrame + 1) % playerSprites.length;
        player.src = playerSprites[playerFrame]
    }
    console.log(playerFrame)
    console.log(playerSprites[playerFrame])
    printarCanvas()
    requestAnimationFrame(gameLoop)
}
// requestAnimationFrame executa continuamente de acordo com a taxa de atualizção (60 fps) substitui setInterval
requestAnimationFrame(gameLoop)

function main() {
    ctx.clearRect(0, 0, 100, 100)
    ctx.drawImage(player, playerX , playerY, 140, 140)

}

function log() {
    console.log(playerX)
}

// função que printa o canvas atualizado
function printarCanvas() {
    ctx.clearRect(0, 0, galeria.width, galeria.height)
    ctx.drawImage(player, playerX, playerY, 200, 200);
    printarCards()
}

function printarCards() {
    console.log('A')
    for (var i = 1; i <= QTD_CARDS; i++) {
        let card = cards[i];
        card.src = `assets/card_image1.png`
        ctx.drawImage(card, cardX + (i - 1) * (cardWidth + cardGap), cardY, cardWidth, cardHeigth);
    }
}
// função que movimenta o player
function andar(sentido) {
    // direita
    if (playerX < window.innerWidth - 100 && sentido > 0) {
        playerX += sentido
        console.log('<')
    }
    //esquerda
    else if (playerX > 0 && sentido < 0){
        playerX += sentido
        console.log('>')
    }

}