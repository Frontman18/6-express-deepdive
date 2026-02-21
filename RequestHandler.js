const http = require('http');
const fs = require('fs');
console.log('I was here');

const requestHandler = (req, res) => {
   
    if (req.url === "/") {
    res.write();
    res.end();
    } else if (req.url === '/buy-product'){
        console.log ("Form data received.");
        const buffer = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            buffer.push(chunk);
        })
        req.on('end', () => {
            const body = Buffer.concat(buffer).toString();
            const  urlParams = new URLSearchParams(body);
            const bodyJson = {};
             for (const [key, value] of urlParams.entries()) {
                bodyJson[key] = value;
            }
            fs.writeFileSync('buy.txt', JSON.stringify(bodyJson));
        });
        
        res.statusCode = 302;
        res.setHeader('Location', '/products'); 
        console.log('Sending Response');

    } else if (req.url === "/products") {
        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Product</title>
        </head>
        <body>
            <h1>Product list will appear here.</h1>
        </body>
        </html>
        `);
        
    } else {
        res.statusCode = 404;
        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Page Not Found</title>
        </head>
        <body>
            <h1>404 page not found</h1>
        </body>
        </html>
        `);
    }
    res.end();
}
 
exports.handler = requestHandler;

const server = http.createServer(requestHandler);
const PORT = 30032;
server.listen(PORT, () => {
    console.log(`Server running at : http://localhost:${PORT}`);
});


