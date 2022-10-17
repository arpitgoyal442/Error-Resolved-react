// const URL="https://errorresolved.herokuapp.com";
const URL=    (window.location.hostname==="localhost")? "http://localhost:9000":"https://errorresolved.herokuapp.com"
const front_URL= (window.location.hostname==="localhost")? "http://localhost:3000":"https://errorresolved.netlify.app"

// const front_URL="https://errorresolved.netlify.app";


// https://git.heroku.com/errorresolved.git
export {URL,front_URL};