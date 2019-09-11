exports.getError = () => {
    const error = new Error("Incorrect email or password");
    error.name = "IncorrectCredentialsError";
    return error;
};

exports.notNullFieldsSignUp = (user) => {
    return (
        user &&
        user.name &&
        this.checkNumberOrWord(user.name) &&
        user.email &&
        user.password
    )
};

exports.checkNumberOrWord = (string) => {
    const regExp = new RegExp('^[а-яА-Яa-zA-Z0-9 ]*$');
    return regExp.test(string);
};