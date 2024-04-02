
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const secretKey = "poms-nic";

function encrypt(text) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

function decrypt(ciphertext, key = secretKey) {
  let bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const isLoggedIn = () => {
  const encryptUserTK = Cookies.get('_TK');
  const encryptUserUR = Cookies.get('_UR');
  const encryptUserST = Cookies.get('_ST');

  if (encryptUserTK && encryptUserUR && encryptUserST) {
    const decryptedTK = encryptUserTK ? decrypt(encryptUserTK) : null;
    console.log(isValidToken(decryptedTK));
    return true
  }
  else{
    const cookieKeys=Object.keys(Cookies.get());
        cookieKeys.forEach(key=>{
            Cookies.remove(key);
        })
    return false
  }
};

const isValidToken = (token) => {
  if (!token) { 
    return false;
  }
  const tokenData = JSON.parse(token);
  return tokenData.expiry > Date.now();
};

export { encrypt, decrypt, isLoggedIn };
