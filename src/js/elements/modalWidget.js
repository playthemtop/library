const ModalWidget = data => {
  const { behavior: { trigger_button }, game_style } = data.params;

  /** Widget **/
  const ptwWidget = document.createElement('div');
  ptwWidget.className = 'PtwWidget';

  // Widget button
  const ptwWidgetButton = document.createElement('button');
  ptwWidgetButton.className = 'PtwWidget__button';
  ptwWidget.appendChild(ptwWidgetButton);

  // Widget button inner
  const ptwWidgetButtonInner = document.createElement('div');
  ptwWidgetButtonInner.className = 'PtwWidget__inner';
  ptwWidgetButtonInner.innerText = trigger_button.title;
  ptwWidgetButtonInner.setAttribute('style', `
    background-color: ${trigger_button.bg_color};
    color: ${trigger_button.text_color};
  `);

  // Widget button > span icon
  const ptwWidgetButtonIcon = document.createElement('span');
  ptwWidgetButtonIcon.className = 'PtwWidget__icon';
  ptwWidgetButtonIcon.setAttribute('style', `
    background-image: url("${game_style.icon}");
  `);

  ptwWidgetButtonInner.appendChild(ptwWidgetButtonIcon);
  ptwWidgetButton.appendChild(ptwWidgetButtonInner);
  /** End Widget **/

  return {
    ptwWidget,
    ptwWidgetButton,
    ptwWidgetButtonInner,
  }
}

export default ModalWidget;
