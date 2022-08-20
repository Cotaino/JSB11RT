// Funcion que genera un nuevo error
function generateError(message, code) {
    const error = new Error(message);
    error.httpStatus = code;
    return error;
}

module.exports = {
    generateError,
};
