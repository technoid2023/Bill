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
import Error from "../Pages/Error";

const secretKey = "poms-nic";

function encrypt(text) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

function decrypt(ciphertext, key = secretKey) {
  let bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
const accessCheck=()=>{
  const ur=Cookies.get('_UR')
    const st=Cookies.get('_ST')
    const tk=Cookies.get('_TK')
    if(!ur || !st || !tk){
    return <Error/>
    }
}
const isLoggedIn = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const encryptUserTK = Cookies.get('_TK');
      const encryptUserUR = Cookies.get('_UR');
      const encryptUserST = Cookies.get('_ST');
      
      if (encryptUserTK && encryptUserUR && encryptUserST) {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 2000); // Wait for 2 seconds before resolving the promise
  });
};

const isValidToken = (token) => {
  if (!token) {
    return false;
  }
  const tokenData = JSON.parse(token);
  return tokenData.expiry > Date.now();
};

export { encrypt, decrypt, isLoggedIn ,accessCheck};
