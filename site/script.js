document.addEventListener('keydown', function(event) {
    console.log('Tecla pressionada:', event.key);
    console.log('Código da tecla:', event.code); // Mais específico, como "KeyA", "Enter", etc.
    console.log('Chave específica:', event.keyCode); // Código numérico (obsoleto, use event.code)
});

var canvas = document.getElementById('main-canvas')

var player = '<div style="width: 80px; height: 80px; background-color: red;"></div>'
var contexto = canvas.getContext('2d')
