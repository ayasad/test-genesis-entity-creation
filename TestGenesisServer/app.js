const express = require("express");
const bodyParser = require("body-parser");
const checkAuth = require("./middleware/check-auth");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const { default: axios } = require("axios");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://test.gnzs.ru",
    changeOrigin: true,
  })
);

app.post("/", (req, res) => {
  console.log(req.body);
  const product = req.body.type;
  console.log(product);
  fetch("https://test.gnzs.ru/oauth/get-token.php", {
    headers: {
      "X-Client-Id": req.body.client,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      req.body.access_token = data.access_token;
      req.body.base_domain = data.base_domain;
    })
    .then(() => {
      let url = "https://"+req.body.base_domain+"/api/v4/" + product ;
        console.log(url)
      return fetch(url, {
        method: "POST",
        body:JSON.stringify({
            data:{name:'test',}
        }),
        headers: {
          "Authorization": "Bearer " + req.body.access_token,
          "Content-Type": "application/json",
        },
      });
    })
    .then((resu) => resu.json())
    .then((resu) => {
      console.log(resu);
      console.log(resu._embedded[product]);

      res.status(201).json({
        messege: "Entity from " + product + " created successfully!",
        createdProduct: {
          type: product,
          id: resu._embedded[product][0].id,
        },
        status:"OK",
      });
    })
    .catch((err) => 
    res.status(err.status).json({
        error: err.messege
    }));

});

module.exports = app;
