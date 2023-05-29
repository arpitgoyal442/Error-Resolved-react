// const URL="https://errorresolved.herokuapp.com";
const URL=    (window.location.hostname==="localhost")? "http://localhost:9000":"http://65.1.94.228"
const front_URL= (window.location.hostname==="localhost")? "http://localhost:3000":"https://error-resolved1.netlify.app/"

// const front_URL="https://errorresolved.netlify.app";


// https://git.heroku.com/errorresolved.git
export {URL,front_URL};