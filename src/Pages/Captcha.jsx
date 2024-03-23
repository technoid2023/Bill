// import React, { useState } from 'react';

// const generateRandomCode = () => {
//   let code = '';
//   for (let i = 0; i < 4; i++) {
//     code += Math.floor(Math.random() * 10); // Generate random digit (0-9)
//   }
//   console.log(code);
//   return code;
// };

// const Captcha = () => {
//   const [captchaCode, setCaptchaCode] = useState(generateRandomCode());
//   const [userInput, setUserInput] = useState('');
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const regenerateCaptcha = () => {
//     setUserInput('');
//     setCaptchaCode(generateRandomCode());
//     setIsCorrect(false);
//     setErrorMessage('');
//   };

//   const handleInputChange = (e) => {
//     const input = e.target.value;
//     setUserInput(input);
//     if (input === captchaCode) {
//       setIsCorrect(true);
//       setErrorMessage('');
//     } else {
//       setIsCorrect(false);
//       setErrorMessage('Error: Captcha is incorrect');
//     }
//   };

//   return (
//     <div>
     
//       <h3>{captchaCode}</h3>
//       <form>
//         <input
//           type="text"
         
//           onChange={handleInputChange}
//           placeholder="Enter Captcha"
//         />
//         <button type="button" onClick={regenerateCaptcha}>Refresh</button>
//       </form>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       {isCorrect && <p style={{ color: 'green' }}>Captcha is correct!</p>}
//     </div>
//   );
// };

// export default Captcha;
