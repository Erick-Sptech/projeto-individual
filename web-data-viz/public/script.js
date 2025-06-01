// declaração das variáveis
var player = document.getElementById('player_image')
var arrow = document.getElementById('quadro-arrow')
var output = document.getElementById('output')
var popup = document.getElementById('popup')
var popup_image = document.getElementById('popup_image')
var escurece = document.getElementById('inative-game')
var cards = {};
var playerSprites = [
    'assets/player_sprites/sprite1.png',
    'assets/player_sprites/sprite2.png',
    'assets/player_sprites/sprite3.png',
    'assets/player_sprites/sprite1_inverso.png',
    'assets/player_sprites/sprite2_inverso.png',
    'assets/player_sprites/sprite3_inverso.png'    
]

var arrowHitbox = []

var playerX = 1
var playerY = 406
var playerWidth = 50
var playerHeigth = 100
var playerSpeed = 2
var cardX = 160
var cardY = 80
var cardGap = 30
var cardWidth = 190
var cardHeigth = 240
var gamePause = false
var esquerda = false
var direita = false
var cardAtual = 0
var quadroAtual = 0
var cardStartPosition = 90
var QTD_CARDS = 0
var dadosCarregados = []
const FACULDADE = true

var playerFrame = 0;
var frameSpeed = 9; // menor = mais rápido
var frameTick = 0;

async function carregarQuadros() {
  try {
    const resposta = await fetch('/quadros/listar');
    if (!resposta.ok) throw new Error('Erro ao buscar quadros');

    dadosCarregados = await resposta.json(); // DADOS DOS QUADRO AQUI
    console.log('Dados carregados:', dadosCarregados);

    iniciarJogo();
  } catch (erro) {
    console.error("Erro ao buscar quadros:", erro);
  }
}

function iniciarJogo() {
    QTD_CARDS = dadosCarregados.length
    console.log("QTD DE CARDS: ", QTD_CARDS);


    // configuração do canvas
    var galeria = document.getElementById('galeria')
    var ctx = galeria.getContext('2d');

    if (FACULDADE) {
        galeria.style.zoom = 1.1
        playerWidth = 75
        playerHeigth = 150
        playerY = 545
        frameSpeed = 17

        cardY = 140
    }

    for(var i = 1; i <= QTD_CARDS; i++) {
        itens_galeria.innerHTML += `<img src="" id="card${i}">`
        cards[i] = document.getElementById(`card${i}`)
    }
    console.log(cards)

    galeria.width = window.innerWidth
    galeria.height = window.innerHeight * (80/100)

    for(let i = 0; i < QTD_CARDS; i++) {
        arrowHitbox.push([(cardStartPosition + 20), (cardStartPosition + 130)])
        cardStartPosition += 220
    }

    console.log(arrowHitbox[3])

    window.onload = main();

    // verifica se usuario apertou direcional direito/esquerdo
    document.addEventListener('keydown', function(event) {
        console.log('Tecla pressionada:', event.key);
        if (event.key == 'ArrowLeft') {
            esquerda = true
        }
        if (event.key == 'ArrowRight') {
            direita = true
        }
        if (event.key == 'Enter') {
            printarPopup()
        }
        if (event.key == 'Escape') {
            window.location.href = 'index.html'
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
        if (!gamePause) {
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
            console.log(cardAtual)
            printarCanvas()
            requestAnimationFrame(gameLoop)
            printarArrow(playerX)
            output.innerHTML = playerX
        }
    }
    // requestAnimationFrame executa o jogo em 60 fps
    requestAnimationFrame(gameLoop)

    function main() {
        ctx.clearRect(0, 0, 100, 100)
        ctx.drawImage(player, playerX , playerY, 70, 140)

    }

    function log() {
        console.log(playerX)
    }

    // função que printa o canvas atualizado
    function printarCanvas() {
        ctx.clearRect(0, 0, galeria.width, galeria.height)
        ctx.drawImage(player, playerX, playerY, playerWidth, playerHeigth);
        printarCards()
    }

    function printarCards() {
        console.log('A')
        for (var i = 1; i <= QTD_CARDS; i++) {
            cards[i].src = dadosCarregados[i-1].caminhoImagemQuadro
            ctx.drawImage(cards[i], cardX + (i - 1) * (cardWidth + cardGap), cardY, cardWidth, cardHeigth);
        }
    }

    function printarArrow(playerPosition) {
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
        for(var i = 0; i < QTD_CARDS; i ++) {
            if (playerPosition - 73 >= arrowHitbox[i][0] && playerPosition - 73 <= arrowHitbox[i][1]) {
                ctx.drawImage(arrow, playerX + 5, playerY - 45, 40, 40)
                cardAtual = i
                break
            }
            else{
                cardAtual = -1
            }
        }
    }

    async function printarPopup() {
        comentarios_container.innerHTML = ''
        if (cardAtual >= 0) {
            try {
                console.log("O card clicado foi: ", cardAtual)
                const dados = await buscarComentarios()

                    dados.forEach(comentario => {
                        comentarios_container.innerHTML += `
                            <div class="comentarios-item">
                                <p>${comentario.nome}</p>
                                <p>${comentario.conteudo}</p>
                                <p>${comentario.data_comentario}</p>
                            </div>
                        `
                    });
                
                if (gamePause) {
                    gamePause = false
                    gameLoop()
                    popup.style.display = 'none'
                    escurece.style.display = 'none'
                }
                else {
                    gamePause = true
                    popup_image.innerHTML = `<img src="${dadosCarregados[cardAtual].caminhoImagem}" style="width: 100%; height: 100%">`
                    popup.style.display = 'flex'
                    escurece.style.display = 'flex'
                }
                console.log(gamePause)
            }
            catch (erro) {
                console.log("ERRO :", erro);
                
            }
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
}


async function enviarComentario() {
    var comentarioDigitado = ipt_comentario.value

    try {
        await fetch("/quadros/enviarComentario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                conteudoServer: comentarioDigitado,
                id_quadroServer: cardAtual + 1,
                id_usuarioServer: localStorage.getItem('id')
            })
        }).then(function() {
            comentarios_container.innerHTML = ''

            buscarComentarios().then(function(resposta){
                resposta.forEach(comentario => {
                    comentarios_container.innerHTML += `
                        <div class="comentarios-item">
                        <p>${comentario.nome}</p>
                        <p>${comentario.conteudo}</p>
                        <p>${comentario.data_comentario}</p>
                        </div>
                    `
                });
            })
        })
    }
    catch (erro) {
        console.error("Error: ", erro);
    }
}

function enviarAvaliacao(avaliacao) {
    fetch("/quadros/enviarAvaliacao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avaliacaoServer: avaliacao,
            id_quadroServer: cardAtual + 1,
            id_usuarioServer: localStorage.getItem('id')
        })
    })
}

function buscarComentarios() {
    return fetch("/quadros/buscarComentarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_quadroServer: cardAtual + 1
        })
    }).then(function(resposta) {
        return resposta.json()
    }).then(function(dados) {
        return dados
    }).catch(function(erro) {
        console.error("ERRO: ", erro)
        throw erro
    })
}

carregarQuadros()

// fetch("/quadros/listar", {
//     method: "GET"
// }).then(function(resposta) {
//     if (resposta.ok) {
//         return resposta.json()
//     }
//     else {
//         console.log("ERRO AO BUSCAR QUADROS")
//     }
// }).then(function (dados) {
//     console.log("Quadro: ", dados);
    
//     dados.forEach(quadro => {
//         console.log('Id: ', quadro.idquadro, ' Nome: ', quadro.nome)
//     })

    
