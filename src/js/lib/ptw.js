import {
  ValidateAccessKey, Actions, InitGames, Modal, Steps,
} from 'components';
import { FormSchema } from 'helpers/validation';

import 'styles/main.scss';

window.ptwIsProgress = false;

class PTW {
  constructor({ accessKey, data, isPreview }) {
    // get init params
    this.accessKey = accessKey;
    this.isPreview = isPreview;
    this.data = data;

    // modal window elements
    this.elements = {};
    this.formData = {};
    this.isValidateForm = false;

    // isValidate userId and domain name
    this.accessKeyDecode = new ValidateAccessKey(accessKey, isPreview);
    this.activeGameData = {};
    this.init();
  };

  init = async () => {
    const activeGameData = await new Actions.init(this.accessKey, this.isPreview);
    if (activeGameData === 'error') return;

    // console.log('---this.isPreview', this.isPreview);
    // console.log('---this.data', this.data);
    // console.log('---this.data', this.data);
    // console.log('---activeGameData', activeGameData);

    this.activeGameData = {
      params: (this.isPreview && (this.data && this.data.params)) || activeGameData.params,
      game: (this.isPreview && (this.data && this.data.game)) || activeGameData.game,
    };

    this.elements = new InitGames(this.activeGameData, this.isPreview);

    this.modal = new Modal(
      this.accessKey,
      this.elements,
      this.isPreview,
      this.activeGameData,
    );

    this.modalShowWithGeneralSettings();
  };

  handleChange = () => {
    const getPtwModalFormInputs = document.querySelectorAll('.PtwModalRootForm__input');
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
    const { display_game } = params.behavior.general_settings;
    const showModal = display_game.find(item => item.checked);
    if (this.isPreview) {
      this.modal.show();
    } else {
      this.modal[`showWith_${showModal.name}`](showModal.value);
      new Actions.impr(this.accessKey);
    }
    this.handleChange();
    this.handleStartGame();
  }

  nextStep = () => {
    this.isValidateForm = true;
    const step = new Steps(this.elements.elements, this.activeGameData, this.isPreview);
    step.progress();
    this.isValidateForm = false;
    this.formData = {};
  }
};

export default PTW;
