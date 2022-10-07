import ptwScratchImages from 'utils/gameScratch/ptwScratchImages';

(function() {
  'use strict';

  const { ptwScratchImageBg, ptwScratchImageBrush } = ptwScratchImages();

  let isDrawing, lastPoint,
  // var container    = document.getElementById('js-container'),
      // canvas       = document.getElementById('js-canvas'),
      canvasWidth  = 368,
      canvasHeight = 148,
      ctx          = windows.canvas.getContext('2d', { willReadFrequently: true }),
      image        = new Image(),
      brush        = new Image();

  // base64 Workaround because Same-Origin-Policy
  // image.src = ptwScratchImageBg;
  image.onload = function() { 
    ctx.drawImage(image, 0, 0);
    // Show the form when Image is loaded.
    // document.querySelectorAll('.form')[0].style.visibility = 'visible';
  };

  brush.src = ptwScratchImageBrush;
  
  window.canvas.addEventListener('mousedown', handleMouseDown, false);
  window.canvas.addEventListener('touchstart', handleMouseDown, false);
  window.canvas.addEventListener('mousemove', handleMouseMove, false);
  window.canvas.addEventListener('touchmove', handleMouseMove, false);
  window.canvas.addEventListener('mouseup', handleMouseUp, false);
  window.canvas.addEventListener('touchend', handleMouseUp, false);
  
  function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }
  
  function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
  }
  
  // Only test every `stride` pixel. `stride`x faster,
  // but might lead to inaccuracy
  function getFilledInPixels(stride) {
    if (!stride || stride < 1) { stride = 1; }
    
    let pixels   = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
        pdata    = pixels.data,
        l        = pdata.length,
        total    = (l / stride),
        count    = 0;
    
    // Iterate over all pixels
    for(var i = count = 0; i < l; i += stride) {
      if (parseInt(pdata[i]) === 0) {
        count++;
      }
    }
    
    return Math.round((count / total) * 100);
  }
  
  function getMouse(e, canvas) {
    var offsetX = 0, offsetY = 0, mx, my;

    if (canvas.offsetParent !== undefined) {
      do {
        offsetX += canvas.offsetLeft;
        offsetY += canvas.offsetTop;
      } while ((canvas = canvas.offsetParent));
    }

    mx = (e.pageX || e.touches[0].clientX) - offsetX;
    my = (e.pageY || e.touches[0].clientY) - offsetY;

    return {x: mx, y: my};
  }
  
  function handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;
    console.log(filledInPixels + '%');
    if (filledInPixels > 50) {
      canvas.parentNode.removeChild(window.canvas);
    }
  }
  
  function handleMouseDown(e) {
    isDrawing = true;
    lastPoint = getMouse(e, window.canvas);
  }

  function handleMouseMove(e) {
    if (!isDrawing) { return; }
    
    e.preventDefault();

    var currentPoint = getMouse(e, canvas),
        dist = distanceBetween(lastPoint, currentPoint),
        angle = angleBetween(lastPoint, currentPoint),
        x, y;
    
    for (var i = 0; i < dist; i++) {
      x = lastPoint.x + (Math.sin(angle) * i) - 25;
      y = lastPoint.y + (Math.cos(angle) * i) - 25;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(brush, x, y);
    }
    
    lastPoint = currentPoint;
    handlePercentage(getFilledInPixels(32));
  }

  function handleMouseUp(e) {
    isDrawing = false;
  }
  
})();