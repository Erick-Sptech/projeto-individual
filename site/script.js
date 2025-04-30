// declaração das variáveis
var player = document.getElementById('player_image')
var popup = document.getElementById('quadro-popup')
var output = document.getElementById('output')
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
    'assets/player_sprites/sprite3.png',
    'assets/player_sprites/sprite1_inverso.png',
    'assets/player_sprites/sprite2_inverso.png',
    'assets/player_sprites/sprite3_inverso.png'    
]

var popupHitbox = []

var playerX = 1
var playerY = 370
var playerSpeed = 2
var cardX = 160
var cardY = 80
var cardGap = 30
var cardWidth = 190
var cardHeigth = 240
var esquerda = false
var direita = false
var quadroAtual = 0
var cardStartPosition = 90
const QTD_CARDS = 5

var playerFrame = 0;
var frameSpeed = 10; // menor = mais rápido
var frameTick = 0;

// configuração do canvas
var galeria = document.getElementById('galeria')
var ctx = galeria.getContext('2d');

galeria.width = window.innerWidth
galeria.height = window.innerHeight * (80/100)

for(let i = 0; i < QTD_CARDS; i++) {
    popupHitbox.push([(cardStartPosition + 20), (cardStartPosition + 130)])
    cardStartPosition += 220
}

console.log(popupHitbox[3])

window.onload = main();

// verifica se usuario apertou direcional direito/esquerdo
document.addEventListener('keydown', function(event) {
    // console.log('Tecla pressionada:', event.key);
    // console.log('Código da tecla:', event.code); // Mais específico, como "KeyA", "Enter", etc.
    // console.log('Chave específica:', event.keyCode); // Código numérico (obsoleto, use event.code)
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
        animacaoAndar(-playerSpeed)
        andar(-playerSpeed)
    }
    if(direita) {
        animacaoAndar(playerSpeed)
        andar(playerSpeed)
    }
    if(!direita && !esquerda) {
        animacaoAndar(0)
    }

    console.log(playerFrame)
    console.log(playerSprites[playerFrame])
    printarCanvas()
    requestAnimationFrame(gameLoop)
    printarPopUp(playerX)
    output.innerHTML = playerX
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

function printarPopUp(playerPosition) {
    // if (playerPosition >= 110 && playerPosition <= 220) {
    //     ctx.drawImage(popup, playerX + 78, playerY, 40, 40)
    // }
    // if (playerPosition >= 310 && playerPosition <= 440) {
    //     ctx.drawImage(popup, playerX + 78, playerY, 40, 40)
    // }
    // if (playerPosition >= 530 && playerPosition <= 660) {
    //     ctx.drawImage(popup, playerX + 78, playerY, 40, 40)
    // }
    // if (playerPosition >= 770 && playerPosition <= 880) {
    //     ctx.drawImage(popup, playerX + 78, playerY, 40, 40)
    // }
    // if (playerPosition >= 990 && playerPosition <= 1100) {
    //     ctx.drawImage(popup, playerX + 78, playerY, 40, 40)
    // }

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

function animacaoAndar(sentido) {
    if (sentido > 0) {
        frameTick++;
        if (frameTick % frameSpeed == 0) {
            playerFrame = (playerFrame + 1) % (playerSprites.length - 3);
            player.src = playerSprites[playerFrame]
        }
    }
    else if (sentido < 0) {
        frameTick++;
        if (frameTick % frameSpeed == 0) {
            playerFrame = (playerFrame + 1) % (playerSprites.length - 3);
            playerFrame += 3
            player.src = playerSprites[playerFrame]
        }
    }

    //esquerda
    if (sentido == 0 && playerFrame >= 3) {
        player.src = playerSprites[4]
        playerFrame = 3
    }

    //direita
    if (sentido == 0 && playerFrame < 3) {
        player.src = playerSprites[1]
        playerFrame = 1
    }
    
    if (playerX <= 0){
        player.src = playerSprites[4]
    }
    else if (playerX >= window.innerWidth - 100) {
        player.src = playerSprites[1]
    }
}