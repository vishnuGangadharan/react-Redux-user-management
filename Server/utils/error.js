export const errorHandler = (statusCode,message)=>{
    const error = new Error()
    error.statusCode = statusCode;
    error.message = message;
    return error
}

export const isEmail = (email) => {
    try {
        if(!email || email=='') return false
        if (typeof email !== "string") return false;
        const isContain = email.includes("@" && ".com");
        if (!isContain) {
            return false
        } else {
            return true;
        }
    } catch (error) {
        console.log(error)
    }
}

export const isValidPhoneNumber = (phoneNumber) => {
    // Check if phoneNumber is a number or a string
    if (typeof phoneNumber !== "string" && typeof phoneNumber !== "number") return false;
    // Convert phoneNumber to a string for validation
    phoneNumber = phoneNumber.toString();
    // Remove all non-digit characters from phoneNumber
    const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '');
    if (sanitizedPhoneNumber.length !== 10) return false;
    if (parseInt(sanitizedPhoneNumber.charAt(0)) < 5) return false;
   
    return true;
};

export const isValidPassword = (password) => {
    if (typeof password !== "string") return false;
    if (password.length < 6) return false;
    const containsUppercase = /[A-Z]/.test(password);
    const containsSpecialCharacter = /[^A-Za-z0-9]/.test(password);
    return containsUppercase && containsSpecialCharacter;
};
