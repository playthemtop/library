import { Steps } from 'components';
import elements from 'elements';
import hexToRgb from 'helpers/hexToRgb';

import API from 'config/api';
import svgWheelContainer from 'utils/gameRoulette/svgWheelContainer';
import WHEEL_DATA from 'utils/gameRoulette/wheelData';
import 'utils/gameRoulette/ThrowPropsPlugin.min.js';
import 'utils/gameRoulette/TweenMax.min.js';
import 'utils/gameRoulette/style.scss';

import ptwScratchImages from 'utils/gameScratch/ptwScratchImages';

class InitGames {
  constructor(activeGameData, isPreview) {
    this.activeGameData = activeGameData;
    this.elements = elements(this.activeGameData);
    this.wheelData = WHEEL_DATA;
    this.isPreview = isPreview;
  }

  view = () => {
    const { ptwModalDialogInner, ptwModalFormWrap, ptwModalRootGame } = this.elements;
    ptwModalDialogInner.appendChild(ptwModalFormWrap);
    ptwModalDialogInner.appendChild(ptwModalRootGame);

    return this.elements;
  };

  couponCodeResultForRouletteGame = e => {
    const { ptwModalButtonStart, ptwModalRootGame } = this.elements;

    if (e.msg) {
      setTimeout(() => {
        ptwModalRootGame.classList.add('PtwModalRootGame_hide');
        ptwModalButtonStart.classList.add('PtwModalRoot__button_hide');
      }, 1000);
  
      setTimeout(() => {
        const step = new Steps(this.elements, this.activeGameData);
        step.win({ name: e.userData.value, code: e.msg }, this.isPreview);
      }, 1500);
    }
  }

  roulette = () => {
    const { ptwModalRootGameCurrent } = this.elements;
    const { params } = this.activeGameData;
    const bgWheel = params.game_style.color_scheme.bg_wheel;

    ptwModalRootGameCurrent.innerHTML = svgWheelContainer;

    this.wheelData.segmentValuesArray = params.behavior.coupons;
    this.wheelData.colorArray[0] = bgWheel;
    this.wheelData.wheelTextColor = params.game_style.color_scheme.text_wheel;

    if (bgWheel.includes('#')) {
      const { r, g, b } = hexToRgb(bgWheel);
      this.wheelData.wheelStrokeColor = `rgba(${r}, ${g}, ${b}, .2)`;
    }

    const script = document.createElement('script');
    script.src = `${API.baseUrl}${API.game.spin}`;
    script.id = 'PtwScriptSpin2WinWheel';

    script.onload = () => {
      const mySpinBtn = document.querySelector('.PtwModalRoot__button');
      let spinWinWheel = new Spin2WinWheel();

      spinWinWheel.init({
        data: this.wheelData,
        onResult: this.couponCodeResultForRouletteGame,
        // onGameEnd: e => console.log('onGameEnd', e),
        // onError:  e => console.log('onError', e),
        spinTrigger: mySpinBtn,
      });

      const pegEl = document.querySelector('.peg');
      pegEl.style.fill = params.game_style.color_scheme.bg_indicator_button;
    };

    setTimeout(() => {
      const PtwScriptSpin2WinWheel = document.getElementById('PtwScriptSpin2WinWheel');
      if (PtwScriptSpin2WinWheel) PtwScriptSpin2WinWheel.remove();

      document.body.appendChild(script);
    }, 10);
  }

  // scratch the game
  scratch = () => {
    const { coupons } = this.activeGameData.params.behavior;
    const { bg_wheel: bgWheel} = this.activeGameData.params.game_style.color_scheme;

    function shuffle(arr){
      var j, temp;
      for(var i = arr.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    }

    shuffle(coupons);

    const ptwScratchContent = document.createElement('div');
    ptwScratchContent.className = 'PtwScratchContent';

    coupons.forEach(item => {
      const ptwScratchContainer = document.createElement('div');
      ptwScratchContainer.className = 'PtwScratchContainer';

      const ptwCanvasInit = document.createElement('canvas');
      ptwCanvasInit.className = 'canvas';
      ptwCanvasInit.id = `js-canvas_${item.id}`;
      ptwCanvasInit.width = 196;
      ptwCanvasInit.height = 82;

      const ptwScratchCoupon = document.createElement('h3');
      ptwScratchCoupon.className = 'PtwCouponCodeWithScratch';
      ptwScratchCoupon.innerText = item.value;

      ptwScratchContainer.appendChild(ptwCanvasInit);
      ptwScratchContainer.appendChild(ptwScratchCoupon);
      ptwScratchContent.appendChild(ptwScratchContainer);
    });

    const getPtwRootCurrentGame = document.querySelector('.PtwModalRootGame__current');
    getPtwRootCurrentGame.appendChild(ptwScratchContent);

    const getPtwScratchItems = document.querySelectorAll('.PtwScratchContainer > .canvas');

    getPtwScratchItems.forEach((canvasItem) => {
      const { ptwScratchImageBrush } = ptwScratchImages();

      let isDrawing,
        lastPoint,
        canvas = canvasItem,
        ctx = canvas.getContext('2d', { willReadFrequently: true }),
        canvasWidth = canvas.width,
        canvasHeight = canvas.height,
        image = new Image(),
        brush = new Image();

        let dataImages = {
          'rgba(78, 145, 217, 1)': `${API.baseUrl}/uploads/games/scratch/blue.jpg`,
          'rgba(78, 217, 140, 1)': `${API.baseUrl}/uploads/games/scratch/green.jpg`,
          'rgba(217, 78, 78, 1)': `${API.baseUrl}/uploads/games/scratch/red.jpg`,
          'rgba(255, 217, 72, 1)': `${API.baseUrl}/uploads/games/scratch/yellow.jpg`,
        };

      // base64 Workaround because Same-Origin-Policy
      image.src = dataImages[bgWheel];
      image.setAttribute('crossOrigin', 'Anonymous');
      image.onload = function() {
              // get the scale
          let scale = Math.max(canvas.width / image.width, canvas.height / image.height);
          // get the top left position of the image
          let x = (canvas.width / 2) - (image.width / 2) * scale;
          let y = (canvas.height / 2) - (image.height / 2) * scale;
        ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
        // Show the form when Image is loaded.
        // document.querySelectorAll('.form')[0].style.visibility = 'visible';
      };

      brush.src = ptwScratchImageBrush;

      let data = {
        elements: this.elements,
        activeGameData: this.activeGameData,
        isPreview: this.isPreview,
      };

      canvas.addEventListener('mousedown', handleMouseDown, false);
      canvas.addEventListener('touchstart', handleMouseDown, false);
      canvas.addEventListener('mousemove', handleMouseMove(getPtwScratchItems, data), false);
      canvas.addEventListener('touchmove', handleMouseMove(getPtwScratchItems, data), false);
      canvas.addEventListener('mouseup', handleMouseUp, false);
      canvas.addEventListener('touchend', handleMouseUp, false);

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
        for(let i = count = 0; i < l; i += stride) {
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

        if (filledInPixels >= 50) {
          canvas.parentNode?.removeChild(canvas);
        }
      }

      function handleMouseDown(e) {
        isDrawing = true;
        lastPoint = getMouse(e, canvas);
      }
    
      function handleMouseMove(canvasList, data) {;
        return function(e) {
          if (!isDrawing) { return; }
          e.preventDefault();
  
          let currentPoint = getMouse(e, canvas),
              dist = distanceBetween(lastPoint, currentPoint),
              angle = angleBetween(lastPoint, currentPoint),
              x, y;
  
          for (let i = 0; i < dist; i++) {
            x = lastPoint.x + (Math.sin(angle) * i) - 25;
            y = lastPoint.y + (Math.cos(angle) * i) - 25;
            ctx.globalCompositeOperation = 'destination-out';
            ctx.drawImage(brush, x, y);
          }
          lastPoint = currentPoint;

          canvasList.forEach(itemNotSelected => {
            if(itemNotSelected.id !== canvas.id) {
              itemNotSelected.parentElement.classList.add('PtwScratchContainer_disabled');
            }
          });

          let getFilledInPx = getFilledInPixels(20);

          const winner = () => {
            if (getFilledInPx >= 50) {
              const { ptwModalRootGame } = data.elements;
              let couponItem = coupons.find(item => item.id === canvas.id.substring(10));
  
              setTimeout(() => {
                ptwModalRootGame.classList.add('PtwModalRootGame_hide');
              }, 1200);
  
              setTimeout(() => {
                const step = new Steps(data.elements, data.activeGameData);
                step.win({
                  name: couponItem ? couponItem.value : '',
                  code: couponItem ? couponItem.resultText : ''
                }, data.isPreview, couponItem);
              }, 1600);
            }

            handlePercentage(getFilledInPixels(20));
          }

          winner();

          setTimeout(() => {
            if (getFilledInPx === 0) {
              getFilledInPx = 50;
              winner();
            }
          }, 3000);
        }
      }

      function handleMouseUp(e) {
        isDrawing = false;
      }
    });
  }

  remember = () => {
    const { ptwModalRootGameCurrent, ptwModalRootGame, ptwModalButtonStart } = this.elements;
    const { params } = this.activeGameData;

    const data = {
      elements: this.elements,
      activeGameData: this.activeGameData,
      isPreview: this.isPreview,
    };

    const template = `
    <div class="ptwWrap">
      <div class="ptwGame"></div>
    </div>
    `;

    ptwModalRootGameCurrent.insertAdjacentHTML('beforeend', template);

    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
    script.id = 'PTWJQueryScript';
    document.head.prepend(script);

    let count = 0;

    let Memory = {
      init: function(cards){
        this.$game = $(".ptwGame");
        this.$modal = $(".ptw-modal");
        this.$overlay = $(".ptw-modal-overlay");
        this.$restartButton = $("button.restart");
        this.cardsArray = $.merge(cards, cards);
        this.shuffleCards(this.cardsArray);
        this.setup();
      },

      shuffleCards: function(cardsArray){
        this.$cards = $(this.shuffle(this.cardsArray));
      },

      setup: function(){
        this.html = this.buildHTML();
        this.$game.html(this.html);
        this.$memoryCards = $(".ptwCard");
        this.paused = false;
        this.guess = null;
        this.binding();
      },
  
      binding: function() {
        this.$memoryCards.on("click", this.cardClicked);
        this.$restartButton.on("click", $.proxy(this.reset, this));
      },

      // kinda messy but hey
      cardClicked: function() {
        let _ = Memory;
        let $card = $(this);

        if(!_.paused && !$card.find(".ptwInside").hasClass("matched") && !$card.find(".ptwInside").hasClass("picked")){
          $card.find(".ptwInside").addClass("picked");
          count += 1;

          if(!_.guess) {
            _.guess = $(this).attr("data-id");
          } else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
            $(".picked").addClass("matched");
            _.guess = null;
          } else {
            _.guess = null;
            _.paused = true;
            setTimeout(function(){
              $(".picked").removeClass("picked");
              Memory.paused = false;
            }, 600);
          }

          if($(".matched").length === 2) {
            _.win();
          } else if (!$(".matched").length && count >= 10) {
            Memory.gameOver();
          }
        }
      },

      gameOver: function() {
        const wrapEl = document.querySelector('.ptwWrap');
        let timer2 = 3;

        this.paused = true;
        count = 0;

        const gameOverTpl = `
          <div class="pwtRememberGameOver">
            <h3>Game over!</h3>
          </div>
        `;

        setTimeout(function() {
          Memory.showModal();
          Memory.$game.fadeOut();
          wrapEl.insertAdjacentHTML('beforeend', gameOverTpl);
        }, 500);

        setTimeout(function() {
          const step = new Steps(data.elements, data.activeGameData);
          step.start();
        }, 1500);

        setTimeout(function() {
          document.querySelector('.pwtRememberGameOver').remove();
          Memory.reset();
        }, 2000);
      },

      win: function(){
        this.paused = true;
        setTimeout(function() {
          Memory.showModal();
          Memory.$game.fadeOut();

          ptwModalRootGame.classList.add('PtwModalRootGame_hide');
          ptwModalButtonStart.classList.add('PtwModalRoot__button_hide');
        }, 1000);

        setTimeout(() => {
          const getIdCard = document.querySelectorAll(".matched")[0].parentElement.dataset.id;
          const couponSelected = this.cardsArray.find(item => item.id === getIdCard);
          const step = new Steps(data.elements, data.activeGameData);

          step.win({
            name: couponSelected.value,
            code: couponSelected.resultText,
          }, data.isPreview);

          Memory.reset();
        }, 1500);
      },
  
      showModal: function(){
        this.$overlay.show();
        this.$modal.fadeIn("slow");
      },
  
      hideModal: function(){
        this.$overlay.hide();
        this.$modal.hide();
      },

      reset: function(){
        this.hideModal();
        this.shuffleCards(this.cardsArray);
        this.setup();
        this.$game.show("slow");
      },

      // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
      shuffle: function(array){
        let counter = array.length, temp, index;
          // While there are elements in the array
          while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
          }
          return array;
      },
  
      buildHTML: function() {
        let frag = '';
        this.$cards.each(function(k, v){
          frag += `<div class="ptwCard" data-id="${v.id}"><div class="ptwInside">
            <div class="ptwFront">${v.value}</div>
              <div class="ptwBack" style="background-color: ${params.game_style.color_scheme.bg_wheel}"></div>
            </div>
          </div>`;
        });
        return frag;
      }
    };

    // console.log('params2', params);

    if (params) {
      script.onload = () => {
        let coupons = [];
        coupons = [...params.behavior.coupons];

        Memory.init(coupons);
      };
    }
  }
}

export default InitGames;
