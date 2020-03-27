var state = { 
  window = 'terminal'
}

const windowTypes = {
  
}


(function() {
    var
    // Obtain a reference to the canvas element using its id.
    htmlCanvas = /** @type {HTMLCanvasElement} */ document.getElementById('c'),
    // Obtain a graphics context on the canvas element for drawing.
    context = htmlCanvas.getContext('2d');

   // Start listening to resize events and draw canvas.
   initialize();

   function initialize() {
       window.addEventListener('resize', resizeCanvas, false);
       resizeCanvas();
    }

    function redraw() {
       context.strokeStyle = 'red';
       context.lineWidth = '5';
       context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
       

       if (window === 'terminal')
       
    }

  
    function resizeCanvas() {
        htmlCanvas.width = window.innerWidth;
        htmlCanvas.height = window.innerHeight;
        redraw();
    }
})();

/* important! for alignment, you should make things
 * relative to the canvas' current width/height.
 */
function draw() {
   
  //...drawing code...
}