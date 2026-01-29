const {ValidationError}=require("./errors");

/*
Tarkastaa onko task kirjoitettu oikein, muuten antaa validationError
*/
function validateTask(task){
    //yrittää lukea titlen JOS task on olemassa
    const title=task?.title;

    //jos title ei ole string, on tyhjä tulee error viesti
    if (typeof title !== "string" || title.trim().length===0){
        throw new ValidationError("Task title must be non-empty string");
    }
}

module.exports={validateTask};