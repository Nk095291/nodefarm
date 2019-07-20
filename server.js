const http = require('http');
const fs = require('fs');

const replace = require('./templates/replace');
const port = process.env.PORT||8000;

http.createServer(function (req, res) {
    let url = req.url.split('?');
    let path = url[0];
    let id = url[1];
    let cardPage =fs.readFileSync(__dirname+'/templates/card.html','utf8');
let overviewPage =fs.readFileSync(__dirname+'/templates/overview.html','utf8'); 
let productPage = fs.readFileSync(__dirname+'/templates/product.html','utf8');

    try {
        if (path === '/product') {
            res.writeHead(200, { 'Content-type': 'text/html' });
            id = id.split('=')[1];
            console.log(id);

            res.end(replace.getproduct(id,productPage));
        }
        else if (path === '/' || path === '/overview') {
            res.writeHead(200, { 'Content-type': 'text/html' });

            res.end(replace.getOverviewPage(overviewPage,cardPage));
        } else if (path === '/api') {
            res.writeHead(200, { 'Content-type': 'text/plain' });

            fs.readFile('./data/data.json', 'utf8', function (e, data) {
                if (e)
                    throw e;
                res.end(data);

            });
        }
        else {
            res.writeHead(404);

            res.end('404 page not found');
        }
    }
    catch (e) {
        console.log('something went wrong');
    }
}).listen(port);