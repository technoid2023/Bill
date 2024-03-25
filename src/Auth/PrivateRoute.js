import Cookies from "js-cookie";
import CryptoJS from "crypto-js";



function encrypt(text ) {
  return CryptoJS.AES.encrypt(text, "poms-nic").toString();
}


function decrypt(ciphertext, key = "poms-nic") {
  let bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const isLoggedIn = () => {
  const encryptUserTK = Cookies.get('_TK');
  const encryptUserUR = Cookies.get('_UR');
  return encryptUserTK || encryptUserUR ? true : false;
};

export { encrypt,decrypt,isLoggedIn};