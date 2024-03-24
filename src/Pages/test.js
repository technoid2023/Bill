// useEffect(() => {
  //   const fetchData = async () => {
  //     let encryptToken = Cookies.get('_TK');
  //     let Token;
  //     if (encryptToken === undefined) {
  //       return;
  //     } else {
  //       Token = decrypt(encryptToken);
  //       Token = JSON.parse(Token);
  //     }

  //     try {
  //       const response = await axios.get('https://edu-tech-bwe5.onrender.com/v1/item', {
  //         headers: {
  //           'token': Token
  //         }
  //       });

  //       if (response.data.Success === true) {
  //         setData(response.data.Data);
  //         setRecords(response.data.Data); // Ensure records are initialized with data
  //       } else {
  //         toast.error(response.data.Message);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       toast.error('Failed to fetch data');
  //     }
  //   };

  //   fetchData();
  // }, []);
