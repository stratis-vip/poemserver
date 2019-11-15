exports.apiResponse = (status, datac, code = 200) => {
    // let obj = data[0]
  
    return {
      status: `${status}`,
      code: code,
      data: datac
    };
  };