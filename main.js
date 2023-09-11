class Figura {
    constructor(posX, posY, width, height, fill, context, estilo)
    {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.fill = fill; 
        this.ctx = context;
        this.estilo = estilo;
    }

    draw()
    {
    }

    moveTo(posX, posY)
    {
        this.posX = posX;
        this.posY = posY;
    }

    selected(estilo)
    {
        this.estilo = estilo;
    }
}

class Rect extends Figura {
    constructor(posX, posY, width, height, fill, context, estilo) 
    {
        super(posX, posY, width, height, fill, context, estilo);
    }

    draw()
    {
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.rect(this.posX, this.posY, this.width, this.height);
        this.ctx.fill();
    }
}

class Ellipse extends Figura {
    constructor(posX, posY, width, height, fill, context, estilo)
    {
        super(posX, posY, width, height, fill, context, estilo);
    }

    draw()
    {
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.ellipse(this.posX + this.width/2, this.posY + this.height/2, this.width / 2, this.height / 2, 0, 0, 2 * Math.PI);
        this.ctx.fill();
        if (this.estilo)
            this.ctx.stroke();        
    }
}

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let figuras = [];

const CANT_FIG = 20;

function main()
{
    crearFiguras();
    dibujar();
    figuras[5].selected(true);
    figuras[10].selected(true);
    figuras[10].selected(true);
    dibujar();
}


function crearFiguras()
{
    for (i = 0; i < CANT_FIG; i++)
    {
        addFigura(i < (CANT_FIG / 2));
    }
}

function dibujar()
{
    pintarCanvas();
    for (i = 0; i < CANT_FIG; i++)
    {
        figuras[i].draw();
    }
}

function pintarCanvas()
{
    let unColor = 'rgba(245, 245, 245, 255)';
    let rect = new Rect(0, 0, canvasWidth-1, canvasHeight-1, unColor , ctx, true);
    rect.draw();
}

function addFigura(estilo)
{
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();
    let figADibujar;

  if (estilo == true) {
        figADibujar = new Rect(posX, posY, Math.round(Math.random() * 50), Math.round(Math.random() * 50), color, ctx, false);
        figuras.push(figADibujar);
    }
    else
    {
        figADibujar = new Ellipse(posX, posY, Math.round(Math.random() * 50), Math.round(Math.random() * 50), color, ctx, false);
        figuras.push(figADibujar);

    }

    function drag(e){
        figADibujar.posX = e.offsetX;
        figADibujar.posY = e.offsetY;
        dibujar();
        }
    
    canvas.addEventListener('mousedown', function (e) {
        // Verificar si se hizo clic dentro del rectángulo
        if (e.offsetX >= figADibujar.posX && e.offsetX <= figADibujar.posX + figADibujar.width &&
            e.offsetY >= figADibujar.posY && e.offsetY <= figADibujar.posY + figADibujar.height){
            // Agregar event listener para el mouse move en el canvas
            canvas.addEventListener('mousemove',drag);
        }
    });
    
      canvas.addEventListener('mouseup', function (e) {
        // Eliminar el event listener para el mouse move
        canvas.removeEventListener('mousemove', drag);
      });

      function moverConTecla(x, y) {
        figADibujar.posX = x;
        figADibujar.posY = y;
        dibujar();
    }


    canvas.addEventListener("mousedown", function(e) {
        // Verifica si se hizo clic dentro de la figura
        if (
            e.offsetX >= figADibujar.posX &&
            e.offsetX <= figADibujar.posX + figADibujar.width &&
            e.offsetY >= figADibujar.posY &&
            e.offsetY <= figADibujar.posY + figADibujar.height
        ) {
            // Agregar event listener para el movimiento de mouse en el canvas
            canvas.addEventListener("mousemove", drag);
            figADibujar.selected(true);

            window.addEventListener("keydown", teclado);
      
        }
    });

    function teclado(e) {
        let tecla = e.key;
        switch (tecla) {
            case 'ArrowLeft':
                moverConTecla(figADibujar.posX - 10, figADibujar.posY);
                break;
            case 'ArrowDown':
                moverConTecla(figADibujar.posX, figADibujar.posY + 10);
                break;
            case 'ArrowRight':
                moverConTecla(figADibujar.posX + 10, figADibujar.posY);
                break;
            case 'ArrowUp':
                moverConTecla(figADibujar.posX, figADibujar.posY - 10);
                break;
        }
    }
}


function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}


 main();