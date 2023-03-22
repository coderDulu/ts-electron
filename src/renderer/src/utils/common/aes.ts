import CryptoJS from 'crypto-js'; // 引用
const key = CryptoJS.enc.Utf8.parse('HXD_WE_CHART'); // 密钥
const iv = CryptoJS.enc.Utf8.parse('1212132405963233'); // 十六位十六进制数作为密钥偏移量


// 加密方法
const Encrypt = function (word: any) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString().toUpperCase();
};

// 解密方法
const Decrypt = function (word: any) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

export {
  Decrypt,
  Encrypt
};
