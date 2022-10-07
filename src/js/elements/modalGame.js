const img = color => {
  const svgIndicator = `
    <?xml version="1.0" encoding="UTF-8"?>
    <svg width="30px" height="40px" viewBox="0 0 30 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: sketchtool 60.1 (101010) - https://sketch.com -->
        <title>7E46A51C-D83E-4886-B302-50737214F92F</title>
        <desc>Created with sketchtool.</desc>
        <g id="App-Mockups" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="S---Widget_1---3---Spinning-state" transform="translate(-173.000000, -316.000000)" fill=${color}>
                <g id="spinning-wheel" transform="translate(24.000000, 300.000000)">
                    <path d="M151.310469,22.4575246 L161.736808,16.5287497 C162.34601,16.1823363 163.035534,16.0020559 163.736329,16.0059619 L164.289161,16.0090432 C164.973804,16.0128592 165.646009,16.1923441 166.241429,16.5303172 L176.796943,22.5218486 C178.607082,23.5493211 179.326751,25.7932721 178.451844,27.6818796 L165.613561,55.3950894 C165.442688,55.763942 165.073176,56 164.666667,56 C164.257798,56 163.883722,55.7699151 163.699305,55.4049985 L149.717687,27.7388468 C148.755694,25.8353014 149.456436,23.5117913 151.310469,22.4575246 Z" id="indicator"></path>
                </g>
            </g>
        </g>
    </svg>
  `;

  return { svgIndicator };
}

const modalGame = data => {
   // Game
  const { game_style: { color_scheme } } = data.params;
  const game = data.game;

  const ptwModalRootGame = document.createElement('div');
  ptwModalRootGame.className = 'PtwModalRootGame';
  
  // const ptwModalRootGameIndicator = document.createElement('div');
  // const { svgIndicator } = img(color_scheme.bg_indicator_button);
  // ptwModalRootGameIndicator.className = 'PtwModalRootGame__indicator';
  // ptwModalRootGameIndicator.innerHTML = svgIndicator;
  // ptwModalRootGame.appendChild(ptwModalRootGameIndicator);

  const ptwModalRootGameCurrent = document.createElement('div');
  ptwModalRootGameCurrent.className = `PtwModalRootGame__current`;
  ptwModalRootGameCurrent.classList.add(`PtwModalRootGame__current_${game}`);

  ptwModalRootGame.appendChild(ptwModalRootGameCurrent);

  return {
    ptwModalRootGame,
    // ptwModalRootGameIndicator,
    ptwModalRootGameCurrent,
  }
}

export default modalGame;
