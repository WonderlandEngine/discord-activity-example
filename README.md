# Wonderland Engine - Discord Activity Example

[![Build & Test](https://github.com/WonderlandEngine/discord-activity-example/actions/workflows/github-pages.yml/badge.svg)](https://github.com/WonderlandEngine/discord-activity-example/actions/workflows/github-pages.yml)
[![Discord][discord]](https://discord.wonderlandengine.com)

Example of a Discord Activity built with the [fastest 3D engine for the web](https://wonderlandengine.com).

![demo-gif](https://github.com/WonderlandEngine/discord-activity-example/blob/main/images/wonderland-engine-discord-activity.gif)

## Setup

Retrieve a "Discord Client ID" and "Discord Client Secret" via the [Discord Developer Portal](https://discord.com/developers/docs/activities/overview),
by [creating a new app](https://discord.com/developers/docs/activities/building-an-activity#step-1-creating-a-new-app).

1. Copy the `example.env` as `.env`
2. Replace the `DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET` in the `.env` file with your app's.
3. `npm i` to install package dependencies

### Run

1. Run via `cd server && npm run dev` and `cd server && npm run tunnel`
2. Update URL mapping of your Discord app to map `/` to the URL provided by the cloudflare tunnel.
2. Open `DiscordActivityExample.wlp` in Wonderland Editor.
3. [Enable developer mode](https://discord.com/developers/docs/activities/building-an-activity#enable-developer-mode-in-your-client) on your Discord client.

The npm server run via `npm run dev` will reverse proxy Wonderland Editor's webserver and websockets
through the cloudflare tunnel.

[discord]: https://img.shields.io/discord/669166325456699392

## Production deployment via WonderlandCloud

1. In `src/index.js`, replace the `DISCORD_CLIENT_ID` with your app's ID.
2. Build your project via Wonderland Editor
3. Create a new Docker image of your server via `npm run build-server` (make sure to replace the image name to yours, example image tag would look like this:`alexkiriwle/discord-activity:v1`)
   > <svg class="octicon octicon-stop mr-2" style="color:red;" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>
   > Caution
   >
   > You should avoid using the :latest tag when deploying containers in production as it is harder to track which version of the image is running and more difficult to roll back properly.
4. Publish this image via `npm run push`
5. Create a new `Wonderland Apis deployment` via `npm run create-api` replace `ApiName` and `ImageTag` with your own values
6. Publish the Wonderland project as a `Wle Page` via `npm run create-activity-page` this will publish your Discord activity to the web
7. Now you need to connect the Discord Activity to your API deployment, this can be done by using the `npm run create-api-path`
   command just make sure that the values are updated with your actual values for `PageName` and `ApiName`

That's it! Now you can use the `projectDomain` of your deployed Wonderland Cloud Page as a target for your [URL mapping](https://discord.com/developers/docs/activities/development-guides#url-mapping)