const modalWin = data => {
  const { company_logo, privacy } = data.params.content.finish;

  // Win page and coupon code
  const ptwModalRootWin = document.createElement('div');
  ptwModalRootWin.className = 'PtwModalRootWin';

  const ptwModalRootWinLogo = document.createElement('div');
  ptwModalRootWinLogo.className = 'PtwModalRootWin__logo';
  ptwModalRootWinLogo.setAttribute('style', `
    background-image: url("${company_logo}");
  `);

  // Coupon block
  const ptwModalRootWinCoupon = document.createElement('div');
  ptwModalRootWinCoupon.className = 'PtwModalRootWinCoupon';

  const ptwModalRootWinCouponTitle = document.createElement('h3');
  ptwModalRootWinCouponTitle.className = 'PtwModalRootWinCoupon__title';
  ptwModalRootWinCouponTitle.innerText = '25% Discount';
  ptwModalRootWinCoupon.appendChild(ptwModalRootWinCouponTitle);

  const ptwModalRootWinCouponSubTitle = document.createElement('p');
  ptwModalRootWinCouponSubTitle.className = 'PtwModalRootWinCoupon__subtitle';
  ptwModalRootWinCouponSubTitle.innerText = 'Your discount code:';
  ptwModalRootWinCoupon.appendChild(ptwModalRootWinCouponSubTitle);

  const ptwModalRootWinCouponCode = document.createElement('p');
  ptwModalRootWinCouponCode.className = 'PtwModalRootWinCoupon__code';
  ptwModalRootWinCouponCode.innerText = '10 cash';
  ptwModalRootWinCoupon.appendChild(ptwModalRootWinCouponCode);
  // End coupon block

  const ptwModalRootWinBtnWrap = document.createElement('div');
  ptwModalRootWinBtnWrap.className = 'PtwModalRootWin__wrap';

  const ptwModalRootWinButton = document.createElement('a');
  ptwModalRootWinButton.className = 'PtwModalRootWin__button';
  ptwModalRootWinButton.innerText = 'Copy coupon code & close widget';

  const ptwModalRootWinInfo = document.createElement('p');
  ptwModalRootWinInfo.className = 'PtwModalRootWin__info';
  ptwModalRootWinInfo.innerText = privacy;

  ptwModalRootWinBtnWrap.appendChild(ptwModalRootWinButton);
  ptwModalRootWinBtnWrap.appendChild(ptwModalRootWinInfo);

  ptwModalRootWin.appendChild(ptwModalRootWinLogo);
  ptwModalRootWin.appendChild(ptwModalRootWinCoupon);
  ptwModalRootWin.appendChild(ptwModalRootWinBtnWrap);

  return {
    ptwModalRootWinButton,
    ptwModalRootWin,
    ptwModalRootWinCouponTitle,
    ptwModalRootWinCouponCode,
  }
}

export default modalWin;
