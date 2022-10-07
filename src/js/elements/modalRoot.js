const modalRoot = data => {
  const { game_style, content } = data.params;

  // Modal root container
  const ptwModalRoot = document.createElement('div');
  ptwModalRoot.className = 'PtwModalRoot';

  // Modal wrap
  const ptwModalWrap = document.createElement('div');
  ptwModalWrap.className = 'PtwModalRoot__wrap';
  ptwModalRoot.appendChild(ptwModalWrap);

  // Modal container
  const ptwModalContainer = document.createElement('div');
  ptwModalContainer.className = 'PtwModalRoot__container';
  ptwModalContainer.style.background = `url(${game_style.popup_bg.bg_image}) no-repeat scroll center 0 / cover ${game_style.popup_bg.bg_overlay}`;
  ptwModalWrap.appendChild(ptwModalContainer);

  // Modal close IconButton
  const ptwModalCloseButton = document.createElement('button');
  ptwModalCloseButton.className = 'PtwModalRoot__close';
  ptwModalCloseButton.innerHTML = '<span>';
  ptwModalContainer.appendChild(ptwModalCloseButton);

  // Modal dialog
  const ptwModalDialog = document.createElement('div');
  ptwModalDialog.className = 'PtwModalRoot__dialog';
  ptwModalDialog.style.background = game_style.color_scheme.bg_window;
  ptwModalContainer.appendChild(ptwModalDialog);

  // Modal icon
  const ptwModalIcon = document.createElement('div');
  ptwModalIcon.className = 'PtwModalRoot__icon';
  ptwModalIcon.style.backgroundImage = `url("${game_style.icon}")`;
  ptwModalIcon.style.backgroundColor = game_style.color_scheme.bg_window;
  ptwModalDialog.appendChild(ptwModalIcon);

  // Modal inner
  const ptwModalDialogInner = document.createElement('div');
  ptwModalDialogInner.className = 'PtwModalRoot__inner';
  ptwModalDialog.appendChild(ptwModalDialogInner);

  // Title start page
  const ptwModalTitle = document.createElement('h2');
  ptwModalTitle.className = 'PtwModalRoot__title';
  ptwModalTitle.innerText = content.start.title;
  ptwModalTitle.setAttribute('style', `
    color: ${game_style.color_scheme.text_content};
  `);
  ptwModalDialogInner.appendChild(ptwModalTitle);

  // SubTitle start page
  const ptwModalSubTitle = document.createElement('h3');
  ptwModalSubTitle.className = 'PtwModalRoot__subtitle';
  ptwModalSubTitle.innerText = content.start.subtitle;
  ptwModalSubTitle.setAttribute('style', `
    color: ${game_style.color_scheme.text_content};
  `);
  ptwModalDialogInner.appendChild(ptwModalSubTitle);

  // Modal button start
  const ptwModalButtonStart = document.createElement('button');
  ptwModalButtonStart.className = 'PtwModalRoot__button';
  ptwModalButtonStart.classList.add(`PtwModalRoot__button_${data.game}`);
  ptwModalButtonStart.setAttribute('style', `
    background-color: ${game_style.color_scheme.bg_indicator_button};
    color: ${game_style.color_scheme.text_button};
  `);
  ptwModalButtonStart.innerHTML = `<span>${content.start.button}</span>`;
  ptwModalDialogInner.appendChild(ptwModalButtonStart);

  return {
    ptwModalRoot,
    ptwModalWrap,
    ptwModalContainer,
    ptwModalDialog,
    ptwModalIcon,
    ptwModalCloseButton,
    ptwModalDialogInner,
    ptwModalTitle,
    ptwModalSubTitle,
    ptwModalButtonStart,
  }
}

export default modalRoot;
