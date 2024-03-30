// import Cookies from "js-cookie";
// import CryptoJS from "crypto-js";




// function encrypt(text ) {
//   return CryptoJS.AES.encrypt(text, "poms-nic").toString();
// }


// function decrypt(ciphertext, key = "poms-nic") {
//   let bytes = CryptoJS.AES.decrypt(ciphertext, key);
//   return bytes.toString(CryptoJS.enc.Utf8);
// }

// const isLoggedIn = () => {
//   const encryptUserTK = Cookies.get('_TK');

//   const encryptUserUR = Cookies.get('_UR');
//   console.log(encryptUserTK,encryptUserUR);
//   return encryptUserTK || encryptUserUR ? true : false;
// };

// export { encrypt,decrypt,isLoggedIn};


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

  if (encryptUserTK || encryptUserUR) {
    const decryptedTK = encryptUserTK ? decrypt(encryptUserTK) : null;
    const decryptedUR = encryptUserUR ? decrypt(encryptUserUR) : null;

    if (isValidToken(decryptedTK) || isValidToken(decryptedUR)) {
      return true;
    }
  }
  
  return false;
};

const isValidToken = (token) => {
  if (!token) {
    return false;
  }
  const tokenData = JSON.parse(token);
  return tokenData.expiry > Date.now();
};

export { encrypt, decrypt, isLoggedIn };
