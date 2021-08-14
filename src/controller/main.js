"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const express = require("express");

const app = express.Router();

const FormData = require('form-data')
const fetch = require('node-fetch')
const config = require('../config.json')

app.get("/", async (req, res) => { res.render("index.ejs") });

app.get("/login", function (req, res) { 
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.id}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv1%2Fauth%2Flogin%2Fdiscord%2Fcallback&response_type=code&scope=identify%20email`)
 });

app.get("/api/v1/auth/login/discord/callback", async function (request, response) {
    const accessCode = request.query.code;

    if (!accessCode) return response.redirect("/");


    const data = new FormData();
    data.append("client_id", config.id);
    data.append("client_secret", config.client_secret);
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", config.redirect_uri);
    data.append("scope", "identify");
    data.append("code", accessCode);

    const json = await (await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        body: data
    })).json();
    const userJson = await (await fetch("https://discord.com/api/users/@me", {
        headers: {
            authorization: `${json.token_type} ${json.access_token}`,
        },
    })).json();

    request.session.user_info = userJson;
    request.session.bearer_token = json.access_token;

    response.redirect("/@me");
});


app.get("/@me", async function (req, res) {
    if(!req.session.bearer_token) {
        res.redirect("/login")
    } else {
        res.status(200).json({
            user: req.session.user_info
        });
    }

})

app.get("/logout", (request, response) => {
    if (!request.session.bearer_token) {
        response.redirect("/");
    } else {
        request.session.destroy();
        response.redirect("/");
    };
}); 


exports.default = app;
