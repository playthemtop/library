import { ValidateAccessKey, Actions, InitGames, Modal, Steps } from 'components';
import { FormSchema } from 'helpers/validation';

import 'styles/main.scss';

window.ptwIsProgress = false;
window.emailToGlobal = '';
window.accessKeyGlobal = '';

class PTW {
  constructor({ accessKey, data, isPreview, isTrigger }) {
    // get init params
    this.accessKey = accessKey;
    this.isPreview = isPreview;
    this.isTrigger = isTrigger;
    this.data = data;

    // modal window elements
    this.elements = {};
    this.formData = {};
    this.isValidateForm = false;

    // isValidate userId and domain name
    this.accessKeyDecode = new ValidateAccessKey(accessKey, isPreview);
    this.activeGameData = {};
    this.init();

    window.accessKeyGlobal = this.accessKey;
  };

  init = async () => {
    const activeGameData = await new Actions.init(this.accessKey, this.isPreview);
    if (activeGameData === 'error') return;

    this.activeGameData = {
      params: (this.isPreview && (this.data && this.data.params)) || activeGameData.params,
      game: (this.isPreview && (this.data && this.data.game)) || activeGameData.game,
    };

    this.elements = new InitGames(this.activeGameData, this.isPreview);

    this.modal = new Modal(
      this.accessKey,
      this.elements,
      this.isPreview,
      this.isTrigger,
      this.activeGameData,
    );

    this.modalShowWithGeneralSettings();
  };

  handleChange = () => {
    const { ptwModalForm } = this.elements.elements;
    const getPtwModalFormInputs = ptwModalForm.querySelectorAll('.PtwModalRootForm__input');

    getPtwModalFormInputs.forEach(input => {
      input.addEventListener('input', event => {
        const { name, value } = event.target;
        const getPtwModalFormSpanError = document.querySelector(`.PtwModalRootForm__error_${name}`);

        Object.assign(this.formData, { [name]: value });
        const { errors } = FormSchema(this.formData);
        this.isValidateForm = Object.keys(errors).length === 0;

        input.value = value;
        getPtwModalFormSpanError.innerText = errors[name] || '';
      });
    });
  }

  handleStartGame = () => {
    const { ptwModalButtonStart, ptwModalForm } = this.elements.elements;

    ptwModalButtonStart.addEventListener('click', async (e) => {
      e.preventDefault();
      ptwModalForm.classList.remove('PtwModalRootForm_start');

      if (!this.isPreview && this.isValidateForm) {
        const activeGameData = await new Actions.hit(this.accessKey, this.formData);
        if (activeGameData.error || activeGameData.errors) {
          this.isValidateForm = false;
          const getPtwModalFormSpanErrorEmail = document.querySelector('.PtwModalRootForm__error_email');
          const errorResult = (activeGameData.error && activeGameData.error.msg)
            || (activeGameData.errors && activeGameData.errors[0].msg);
          getPtwModalFormSpanErrorEmail.innerText = errorResult || '';
        } else this.nextStep();
      } else if (this.isPreview && this.isValidateForm) this.nextStep();
      else {
        ptwModalForm.classList.add('PtwModalRootForm_error');
        setTimeout(() => {
          ptwModalForm.classList.remove('PtwModalRootForm_error');
        }, 800);
      }
    });
  }

  modalShowWithGeneralSettings = () => {
    const { params } = this.activeGameData;
    const { ptwWidget } = this.elements.elements;
    const { display_game, trigger_button } = params.behavior.general_settings;
    const showModal = display_game.find(item => item.checked);

    if (this.isPreview) {
      this.modal.show();
    } else {
      this.modal[`showWith_${showModal.name}`](showModal.value);
    }

    this.handleStartGame();
    this.handleChange();

    // Show trigger button after first show, if "trigger_button" is trues
    if (localStorage.getItem('PTW_INTERVAL') && this.isTrigger && trigger_button) {
      document.body.appendChild(ptwWidget);
    }
  }

  nextStep = () => {
    const step = new Steps(this.elements.elements, this.activeGameData, this.isPreview);
    this.isValidateForm = true;

    step.progress();
    this.isValidateForm = false;
    // this.formData = {};
  }
};

export default PTW;
