import API from 'config/api';

class Actions {
  static request = async data => {
    const { path, body, method = 'POST' } = data;
    const reg = /^w{3}\.(?=[^.]+\.)/;

    return await fetch(`${API.baseUrl}/api/statistic/${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain: window.location.hostname.replace(reg, ''),
        ...body,
      }),
    }).then(res => res.json());
  }

  static init = async (accessKey, isPreview) => {
    if (!isPreview) {
      const data = { path: 'init', body: { accessKey } };
      const res = await new this.request(data);

      if (res.error) {
        // console.log(`error: ${res.error.msg}`);
        return 'error';
      }

      const activeGame = {
        params: res.game_active.params,
        game: res.game_active.game,
      };

      return activeGame;
    }
  }

  static impr = async (accessKey) => {
    const data = { path: 'impression', body: { accessKey, impression: 1 } };
    await this.request(data);
  }

  static hit = async (accessKey, formData) => {
    const data = { path: 'hit', body: { accessKey, ...formData } };
    const result = await this.request(data);
    return result;
  }
}

export default Actions;