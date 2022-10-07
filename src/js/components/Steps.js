class Steps {
  constructor(elements, activeGameData, isPreview) {
    this.elements = elements;
    this.activeGameData = activeGameData;
    this.isPreview = isPreview;
    window.ptwIsProgress = false;
  }

  progressGame_roulette = () => {
    const { ptwModalCloseButton } = this.elements;
    window.ptwIsProgress = true;
    ptwModalCloseButton.setAttribute('disabled', 'disabled');

    setTimeout(() => {
      window.getTrigger()();
    }, 550);
  }

  progressGame_scratch = () => {
    // const { coupons } = this.activeGameData.params.behavior;
    const { ptwModalButtonStart, ptwModalCloseButton } = this.elements;
    ptwModalCloseButton.removeAttribute('disabled');
    ptwModalButtonStart.classList.add('PtwModalRoot__button_hide');
    window.ptwIsProgress = false;
  }

  progressGame_remember = () => {
    console.log('run remember!')
    // document.body.style.backgroundColor = 'blue';
  }

  progress = () => {
    const {
      ptwModalButtonStart, ptwModalTitle, ptwModalSubTitle, ptwModalForm, ptwModalCloseButton,
      ptwModalFormWrap,
    } = this.elements;
    const { content: { progress } } = this.activeGameData.params;
    const getPtwModalFormInputs = document.querySelectorAll('.PtwModalRootForm__input');
    const getPtwSpin2WheelPeg = document.querySelector('.peg');

    ptwModalForm.classList.add('PtwModalRootForm_hide');

    if (getPtwSpin2WheelPeg) setTimeout(() => getPtwSpin2WheelPeg.style.opacity = 1, 500);
    ptwModalButtonStart.setAttribute('disabled', 'disabled');

    setTimeout(() => {
      ptwModalFormWrap.style.zIndex = '-1';
      ptwModalTitle.innerText = progress.title;
      ptwModalSubTitle.innerText = progress.subtitle;

      getPtwModalFormInputs.forEach(input => {
        input.value = '';
      });
    }, 450);

    setTimeout(() => {
      this[`progressGame_${this.activeGameData.game}`]();
    }, 600);
  }

  win = (data, isPreview) => {
    const { content: { finish } } = this.activeGameData.params;
    const {
      ptwModalDialogInner, ptwModalTitle, ptwModalSubTitle, ptwModalIcon, ptwModalRootWin,
      ptwModalRootWinCouponTitle, ptwModalRootWinCouponCode, ptwModalCloseButton,
    } = this.elements;

    window.ptwIsProgress = false;
    ptwModalCloseButton.removeAttribute('disabled');

    ptwModalIcon.classList.add('jello-horizontal');
    ptwModalTitle.innerText = finish.title;
    ptwModalSubTitle.innerText = `${finish.subtitle}`;
    ptwModalRootWinCouponTitle.innerText = (isPreview ? '25% DISCOUNT!' : data.name);
    ptwModalRootWinCouponCode.innerText = (isPreview ? 'test_code' : data.code);
    ptwModalDialogInner.style.backgroundImage = 'url(https://i.gifer.com/6ob.gif)';
    ptwModalDialogInner.appendChild(ptwModalRootWin);
  }
}

export default Steps;
