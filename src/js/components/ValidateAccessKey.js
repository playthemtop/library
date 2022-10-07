import JWT from "jsonwebtoken";

class ValidateAccessKey {
  constructor(accessKey, isPreview) {
    if (!accessKey) {
      // console.log('error: accessKey');
      return false;
    }

    const reg = /^w{3}\.(?=[^.]+\.)/;
    const accessKeyDecode = JWT.decode(accessKey);
    const isValidateDomain = accessKeyDecode.domain !== window.location.hostname.replace(reg, '') || window.location.hostname.replace(reg, '') === 'localhost';

    if (!accessKeyDecode || (!isPreview && isValidateDomain) ) {
      console.log('error: accessKeyDecode or hostname');
      return false;
    };

    return accessKeyDecode;
  }
}

export default ValidateAccessKey;
