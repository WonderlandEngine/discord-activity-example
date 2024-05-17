import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

import httpProxy from 'http-proxy';
const proxy = httpProxy.createProxyServer({
    target: {
        host: 'localhost',
        port: process.env.EDITOR_PORT ?? 8080,
    },
});

const app = express();
const port = 5173;

// Allow express to parse JSON bodies
app.use(express.json());

app.post('/api/token', async (req, res) => {
    console.log('Token requested');
    // Exchange the code for an access_token
    const response = await fetch(`https://discord.com/api/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: req.body.code,
        }),
    });

    // Retrieve the access_token from the response
    const {access_token} = await response.json();

    // Return the access_token to our client as { access_token: "..."}
    res.send({access_token});
    console.log('Sent a token');
});

if (process.env.NODE_ENV === 'production') {
    /* During production, serve the Wonderland Engine project build statically.
     * This can also be achieved by serving through nginx and setting up a reverse proxy
     * for this node/express server. */
    app.use(express.static('./deploy/'));
} else {
    /* During development, reverse proxy Wonderland Editor's local webserver so
     * that all requests can be served through the cloudflare tunnel. */
    app.use('/', async (req, res) => {
        proxy.web(req, res, {
            /* Internal traffic can be unencrypted */
            secure: false,
            xfwd: true,
            /* Also proxy editor websockets for hot reloading */
            ws: true,
        });
    });
}

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
