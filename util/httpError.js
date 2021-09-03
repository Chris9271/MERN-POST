class httpError extends Error{
    constructor(errCode, errMsg){
        super(errMsg);
        this.errCode = errCode
    }
}

module.exports = httpError;