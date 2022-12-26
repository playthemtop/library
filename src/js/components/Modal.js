import STORAGE from 'helpers/storage';

class Modal {
  constructor(accessKey, elements, isPreview, activeGameData, handleChange) {
    this.initGame = elements[activeGameData.game];
    this.elements = elements.view();
    this.isPreview = isPreview;
    this.activeGameData = activeGameData;
    this.accessKey = accessKey;
    this.handleChange = handleChange;

    this.handleModalClose();
    this.handleModalOpen();
    // this.showOnLeaving();
  }

  showWith_onEnter = () => {
    this.show();
  }

  showWith_scroll = num => {
    window.addEventListener('scroll', () => {
      const body = document.body, html = document.documentElement;
      let documentHeight = Math.max(
        body.scrollHeight, html.scrollHeight, body.offsetHeight, html.offsetHeight, body.clientHeight, html.clientHeight,
      );
      documentHeight = documentHeight - document.body.clientHeight;

      const positionTop = documentHeight * (Number(num) / 100);

      let scrollTop = html.scrollTop || body && body.scrollTop || 0;
      scrollTop -= html.clientTop;

      if (scrollTop >= Number(positionTop.toFixed())
        && scrollTop <= Number(positionTop.toFixed()) + 10) {
          console.log('')
          const getPTW_onscroll = STORAGE.getItem('PTW_onscroll');
          console.log('getPTW_onscroll', getPTW_onscroll);
          if (!getPTW_onscroll) {
            this.show();
            STORAGE.setItem('PTW_onscroll', true);
          }
      }
    });
  }

  showWith_time = (timeout) => {
    console.log(timeout)
    setTimeout(() => {
      this.show();
    }, Number(timeout) * 1000);
  }

  showOnLeaving = () => {
    const isPtwShowStorage = STORAGE.getItem('PTW_isShow');

    const { general_settings: generalSettings } = this.activeGameData.params.behavior;
    if (generalSettings.show_on_leaving && !isPtwShowStorage) {

      document.addEventListener('mouseleave', (e) => {
        e.preventDefault();
        if (e.clientY < 10) {
          this.show();
        }
      });
    }
  }

  show = () => {
    const { ptwModalRoot } = this.elements;
    document.body.style.overflow = 'hidden';
    document.body.appendChild(ptwModalRoot);

    // MuiDialogContainer use in constructor admin panel
    const MuiDialogContainer = document.querySelector('.MuiDialog-container');
    if (MuiDialogContainer) MuiDialogContainer.removeAttribute('tabindex');

    STORAGE.setItem('PTW_isShow', true);
    this.initGame();
    // this.handleChange();
  }

  hide = () => {
    const { ptwModalContainer, ptwModalForm, ptwWidget } = this.elements;
    const { behavior: { general_settings: generalSettings } } = this.activeGameData.params;
    const ptwModalRoot = document.querySelector('.PtwModalRoot');
    const getPtwModalFormInputs = document.querySelectorAll('.PtwModalRootForm__input');

    if (!window.ptwIsProgress && ptwModalRoot) {
      ptwModalContainer.classList.add('PtwModalRoot__container_hide');
      getPtwModalFormInputs.forEach(input => {
        input.value = '';
      });

      setTimeout(() => {
        this.reset();
      }, 250);

      setTimeout(() => {
        if (generalSettings.trigger_button && !this.isPreview) {
          document.body.appendChild(ptwWidget);
        }

        document.body.style.removeProperty('overflow');
        ptwModalContainer.classList.remove('PtwModalRoot__container_hide');
        ptwModalForm.classList.remove('PtwModalRootForm_hide');
        ptwModalRoot.remove();
      }, 300);

      STORAGE.setItem('PTW_onscroll', false);
      STORAGE.setItem('PTW_isShow', false);
    }
  }

  handleModalClose = () => {
    const { ptwModalCloseButton } = this.elements;
    document.addEventListener('keydown', e => {
      let keyCode = e.keyCode;
      if (keyCode === 27) {
        this.hide();
      }
    });

    ptwModalCloseButton.addEventListener('click', () => {
      this.hide();
    });
  }

  handleModalOpen = () => {
    const { ptwWidgetButton } = this.elements;
    ptwWidgetButton.addEventListener('click', () => {
      this.show();
      this.isOpenWidget();
    });
  }

  isOpenWidget = () => {
    const { ptwWidget, ptwWidgetButton } = this.elements;
      ptwWidgetButton.classList.add('PtwWidget__button_hide');
      setTimeout(() => {
        ptwWidgetButton.classList.remove('PtwWidget__button_hide');
        ptwWidget.remove();
      }, 200);
  }

  reset = () => {
    const {
      ptwModalDialogInner, ptwModalButtonStart, ptwModalTitle, ptwModalSubTitle, ptwModalForm,
      ptwModalRootGame, ptwModalIcon, ptwModalRootWin, ptwModalFormWrap,
    } = this.elements;
    const { content: { start } } = this.activeGameData.params;
    const getPtwModalFormInputs = document.querySelectorAll('.PtwModalRootForm__input');

    ptwModalFormWrap.style.zIndex = 2;
    ptwModalForm.classList.remove('PtwModalRootForm_hide');
    ptwModalRootGame.classList.remove('PtwModalRootGame_hide');
    ptwModalButtonStart.classList.remove('PtwModalRoot__button_hide');
    ptwModalButtonStart.removeAttribute('disabled');

    ptwModalIcon.classList.remove('jello-horizontal');
    ptwModalDialogInner.style.backgroundImage = '';
    ptwModalRootWin.remove();

    ptwModalTitle.innerText = start.title;
    ptwModalSubTitle.innerText = start.subtitle;

    getPtwModalFormInputs.forEach(input => {
      input.value = '';
    });

    switch(this.activeGameData.game) {
      case 'roulette':
        window.ptwSpin2WinWheelReset();
        break;
      case 'scratch':
        const getPtwScratchContent = document.querySelector('.PtwScratchContent');
        if (getPtwScratchContent) getPtwScratchContent.remove();
        break;
      case 'remember':
        console.log('remember reset');
        break;
    }
  }
}

export default Modal;
