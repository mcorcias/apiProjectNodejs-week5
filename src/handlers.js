const fs = require('fs');
const req = require("request");
const path = require("path")

function homeHandler(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile(__dirname + '/../public/index.html', function (error, file) {
        if (error) {
            console.log(error);
            response.end();
        } else {
            response.write(file);
            response.end();
        }
    });
}

function fetchNames(response) {
    var options = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/players',
        qs: { page: '0', per_page: '100' },


        headers: {
            'x-rapidapi-host': 'free-nba.p.rapidapi.com',
            'x-rapidapi-key': 'd2f04481bfmsh7b77972de4ec2dfp1964bdjsn3338e26bee8f'
        }
    };

    req(options, function (error, res, body) {
        if (error) throw new Error(error);

        response.end(body);
    });
}

function middlewareStaticFiles(response, url) {
    const extension = url.split(".")[1];
    const extensionType = {
        html: "text/html",
        css: "text/css",
        js: "application/javascript",
        ico: "image/x-icon"
    };
    const filePath = path.join(__dirname, "..", url);
    fs.readFile(filePath, (error, file) => {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/html" });
            response.end("<h1>Sorry, we have had a problem with the server </h1>");
        } else {
            response.writeHead(200, { "Content-Type": extensionType[extension] });
            response.end(file);
        }
    });
}

function notFoundPage(response) {
    response.writeHead(404);
    response.end("<h1 style=color:red>404 not found</h1>");
}



module.exports = {
    homeHandler,
    fetchNames,
    middlewareStaticFiles,
    notFoundPage
}