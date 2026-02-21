//External Module
const express = require("express");
const fs = require('fs');

const {URLSearchParams} = require('url');

const app = express();

//First Middleware
app.use((req, res, next) => {
  console.log("Request Received", req.url, req.method);
  next();
});

//Second Middleware
app.get("/", (req, res, next) => {
  res.send(`

     <!DOCTYPE html>
    <html lang="en">
    <head>
     <title>Myntra</title>
    </head>
    <body>
    <h1>Welcome to First Server</h1>
    <form action="/buy-product" method="POST">
      <input type="text" placeholder="Enter the product that you want" name="product">
      <br />
     <input type="text" placeholder="Enter the your budget" name="budget">
    <input type="submit">
    </form>
</body>
</html>
`);

  console.log("Second Middleware", req.url, req.method);
  ("<h1>Complete Coding</h1>");
});

app.post("/buy-product", (req, res, next) => {
  console.log(JSON.stringify(req.body));

    fs.writeFileSync('buy.json', JSON.stringify(req.body)); 
    // (err) 
    // => {
    res.statusCode = 302;
    res.setHeader('Location', '/products');
    res.end();
});
// });
 

app.get("/products", (req, res, next) => {
  res.send(`
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
});

app.use((req, res, next) => {
    res.statusCode = 404;
    res.write
  (`
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
  res.end();
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running at : http://localhost:${PORT}`);
});


