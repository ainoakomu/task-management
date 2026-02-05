// NOTE:
// This file should never be imported in tests.
// Tests should import the app directly to avoid starting a real server.

//import everything from app
const app=require("./app");

//fallback porttina 3000 jos port ei ole defined
const PORT=process.env.PORT || 3000;

//start server ja bindaa se porttiin
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});cd