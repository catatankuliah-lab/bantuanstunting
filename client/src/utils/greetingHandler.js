// greetingHandler.js

const getGreetingMessage = () => {
    const pathname = window.location.href;
    const pathnameSegments = pathname.split('/');
    let greeting;
    let depan;
    let belakang;
    if (pathnameSegments[4] == null) {
        if (pathnameSegments[3] == "") {
            greeting = "Dashboard";
        } else {
            greeting = "Data " + pathnameSegments[3].charAt(0).toUpperCase() + pathnameSegments[3].slice(1);
        }
    } else {
        if (pathnameSegments[4] == "add") {
            depan = "Tambah ";
        } else if (pathnameSegments[4] == "detail") {
            depan = "Detail ";
        }
        belakang = pathnameSegments[3].charAt(0).toUpperCase() + pathnameSegments[3].slice(1);
        greeting = depan + "Data " + belakang;
    }
    return greeting;
    // return `👋 Hello ${name}, ${greeting}!`;
};

export default getGreetingMessage;
