export const parseErrorMessage = (errorMessage) => {
    let messageToReturn = "";
    const { errorFields } = errorMessage;
    errorFields.forEach((fields)=>{
        messageToReturn += `${fields.errors[0]} \n`;
    })
    return messageToReturn;
}

export function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }