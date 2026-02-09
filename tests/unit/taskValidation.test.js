//muuttuja, joka lloadaa moduulin
const {validateTask} = require("../../src/tasks/taskService");

/*
Testit, joissa testataan onko title sopiva. Title ei voi puuttua, yllä tyhjä,
olla vain whitespace. Oikealle titlelle ei tule virhettä
*/
describe("validateTask", ()=>{
    test("throws if title is missing", () =>{
        expect(()=> validateTask({})).toThrow(/title/i);
    });

    test("throws if title is empty string", () =>{
        expect(()=> validateTask({title: ""})).toThrow(/title/i);
    });

    test("throws if title is only whitespace", ()=> {
        expect(()=>validateTask({title:"   "})).toThrow(/title/i);
    });

    test("does not throw for a valid title", () =>{
        expect(()=> validateTask({title:"Buy Milk"})).not.toThrow();
    });
});
test("CI break demo - this should fail", () => {
  expect(true).toBe(false);
});
