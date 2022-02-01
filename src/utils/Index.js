export const parseErrorMessage = (errorMessage) => {
    let messageToReturn = "";
    const { errorFields } = errorMessage;
    errorFields.forEach((fields)=>{
        messageToReturn += `${fields.errors[0]} \n`;
    })

    return messageToReturn;

}