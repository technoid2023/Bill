import Cookies from "js-cookie";
import CryptoJS from "crypto-js";



function encrypt(text ) {
  return CryptoJS.AES.encrypt(text, "poms-nic").toString();
}


function decrypt(ciphertext, key = "poms-nic") {
  let bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const isLoggedIn = async () => {
  let encryptUser;
  while (!encryptUser) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
  }
  return encryptUser ? true : false;
};
export { encrypt,decrypt,isLoggedIn};