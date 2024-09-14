# Wonderland Engine - Discord Activity Example

[![Build & Test](https://github.com/WonderlandEngine/discord-activity-example/actions/workflows/npm-build.yml/badge.svg)](https://github.com/WonderlandEngine/discord-activity-example/actions/workflows/npm-build.yml)
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
