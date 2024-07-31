import moment from 'moment';

import { Actions } from 'components';

class Modal {
  constructor(accessKey, elements, isPreview, activeGameData, handleChange, PTW_STORAGE) {
    this.initGame = elements[activeGameData.game];
    this.elements = elements.view();
    this.isPreview = isPreview;
    this.activeGameData = activeGameData;
    this.accessKey = accessKey;
    this.handleChange = handleChange;
    this.PTW_STORAGE = PTW_STORAGE;

    this.handleModalClose();
    this.handleModalOpen();
  }

  showWith_onEnter = () => {
    console.log('-on-enter');
    this.show();
  }

  showWith_scroll = num => {
    console.log('-on-scroll');
    window.addEventListener('scroll', () => {
      const body = document.body, html = document.documentElement;
      let documentHeight = Math.max(
        body.scrollHeight, html.scrollHeight, body.offsetHeight, html.offsetHeight, body.clientHeight, html.clientHeight,
      );

      documentHeight = documentHeight - document.body.clientHeight;
      const positionTop = documentHeight * (Number(num) / 100);
      let scrollTop = html.scrollTop || body && body.scrollTop || 0;
      scrollTop -= html.clientTop;

      const condition = scrollTop >= Number(positionTop.toFixed()) && scrollTop <= Number(positionTop.toFixed()) + 10;

      if (condition) {
        this.show();
      }
    });
  }

  showWith_time = (timeout) => {
    console.log('-on-time');
    setTimeout(() => {
      this.show();
    }, Number(timeout) * 1000);
  }

  show = async isHandleModalOpen => {
    console.log('-on-show');
    const { behavior: { general_settings: generalSettings } } = this.activeGameData.params;
    const { ptwModalRoot, ptwWidget } = this.elements;
    const currentDate = Date.parse(new Date) / 1000;

    // Frequency of displaying a widget without a purchase by clicking on the TRIGGER button
    const intervalStorage = await this.PTW_STORAGE.getItem('PTW_INTERVAL');

    console.log('modal:intervalStorage', intervalStorage);
    console.log('modal:intervalStorage-typeof', typeof intervalStorage);

    if (intervalStorage === null || (isHandleModalOpen || currentDate >= intervalStorage)) {
      document.body.style.overflow = 'hidden';
      document.body.appendChild(ptwModalRoot);

      // MuiDialogContainer use in constructor admin panel
      const MuiDialogContainer = document.querySelector('.MuiDialog-container');
      if (MuiDialogContainer) MuiDialogContainer.removeAttribute('tabindex');

      const displayIntervalWhenTesting = (intervalValue, intervalUnit) => {
        if (!this.isPreview) {
          return { intervalValue, intervalUnit };
        } else {
          return { intervalValue: 10, intervalUnit: 'seconds' }; // intervalValue - this value can also be changed here
        }
      }

      const { interval, interval_unit } = generalSettings;
      const { intervalValue, intervalUnit } = displayIntervalWhenTesting(interval, interval_unit);

      if (!this.isPreview) {
        new Actions.impr(this.accessKey);
        const nextDate = moment().add(intervalValue, intervalUnit).unix();
        await this.PTW_STORAGE.setItem('PTW_INTERVAL', nextDate);
      }

      this.initGame();
      this.isOpenWidget();
    }
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
        if (generalSettings.trigger_button) {
          document.body.appendChild(ptwWidget);
        }

        document.body.style.removeProperty('overflow');
        ptwModalContainer.classList.remove('PtwModalRoot__container_hide');
        ptwModalForm.classList.remove('PtwModalRootForm_hide');
        ptwModalRoot.remove();
      }, 300);

      const PTWJQueryScriptEl = document.querySelector('#PTWJQueryScript');
      if (PTWJQueryScriptEl) PTWJQueryScriptEl.remove();
    }
  }

  handleModalClose = () => {
    const { ptwModalCloseButton, ptwModalRootWinButton } = this.elements;
    document.addEventListener('keydown', e => {
      let keyCode = e.keyCode;
      if (keyCode === 27) {
        this.hide();
      }
    });

    ptwModalCloseButton.addEventListener('click', () => {
      this.hide();
    });

    ptwModalRootWinButton.addEventListener('click', event => {
      const currentEl = event.target;
      const parentEl = currentEl.closest('.PtwModalRootWin');
      const couponCodeEl = parentEl.querySelector('.PtwModalRootWinCoupon__code');

      window.navigator.clipboard.writeText(couponCodeEl?.textContent || '');

      this.hide();
    });
  }

  handleModalOpen = () => {
    const { ptwWidgetButton } = this.elements;
    ptwWidgetButton.addEventListener('click', () => {
      this.show('handleModalOpen');
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
        const PTWJQueryScriptEl = document.querySelector('#PTWJQueryScript');
        if (PTWJQueryScriptEl) PTWJQueryScriptEl.remove();
        break;
    }
  }
}

export default Modal;
