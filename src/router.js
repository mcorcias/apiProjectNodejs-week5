
const handlers = require('./handlers');
const { homeHandler,
    fetchNames,
    middlewareStaticFiles,
    notFoundPage } = require("./handlers")

//this module lets us construct the filepath
const path = require("path");

const router = (request, response) => {
    //console.log("this is a massage");
    const url = request.url;

    if (request.method === "GET") {
        if (url === "/") {
            homeHandler(request, response);
            response.setHeader("Location", user);
        } else if (url === '/fetchNames') {
            fetchNames(response);

        }
        else if (url.indexOf("/public/") !== -1) {
            middlewareStaticFiles(response, url);
        } else {
            notFoundPage(response);
        }
    }

};

module.exports = router;