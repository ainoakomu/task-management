/*
ValidationError on erityinen error, joka kertoo käyttäjän 
tai api-kutsun datan vääryyden
*/
class ValidationError extends Error {
    constructor(message){
        super(message);
        this.name="ValidationError"
    }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

module.exports={
    ValidationError,
    NotFoundError,
};
