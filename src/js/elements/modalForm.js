
const modalForm = data => {
  const { content: { start } } = data.params;
  // Form fields: (email, phone, name)

  const ptwModalFormWrap = document.createElement('div');
  ptwModalFormWrap.className = 'PtwModalFormWrap';
  
  const ptwModalForm = document.createElement('div');
  ptwModalForm.className = 'PtwModalRootForm';
  ptwModalForm.classList.add('PtwModalRootForm_start');

  start.form.filter(item => item.checked).forEach(item => {
    const ptwModalFormItem = document.createElement('div');
    ptwModalFormItem.className = 'PtwModalRootForm__item';

    const ptwModalFormSpanError = document.createElement('span');
    ptwModalFormSpanError.className = 'PtwModalRootForm__error';

    const ptwModalFormInput = document.createElement('input');
    ptwModalFormInput.className = 'PtwModalRootForm__input';

    Object.keys(item).map(attr => {
      ptwModalFormInput.setAttribute(attr, item[attr]);
      ptwModalFormInput.removeAttribute('checked');
      ptwModalFormInput.classList.add(`PtwModalRootForm__input_${item.name}`);
      ptwModalFormSpanError.classList.add(`PtwModalRootForm__error_${item.name}`);
    });
    
    ptwModalFormItem.appendChild(ptwModalFormInput);
    ptwModalFormItem.appendChild(ptwModalFormSpanError);
    ptwModalForm.appendChild(ptwModalFormItem);
  });

  ptwModalFormWrap.appendChild(ptwModalForm);

  return {
    ptwModalFormWrap,
    ptwModalForm,
  }
}

export default modalForm;
