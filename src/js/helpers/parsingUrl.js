const ParsingUrl = url => {
  const urlParsed = url
    .substring(url.indexOf('?') + 1)
    .split('&')
    .reduce((memo, param) => ({ ...memo, [param.split('=')[0]]: param.split('=')[1] }), {});

  return { urlParsed };
};

export default ParsingUrl;
