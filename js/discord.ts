import {User, UserProvider} from './user.js';
import type {DiscordSDK} from '@discord/embedded-app-sdk';

export interface DiscordConfig {
    DISCORD_CLIENT_ID: string;
    DISCORD_APPLICATION_ID: string;
    tokenServer: string;
}

export class DiscordActivityProvider implements UserProvider {
    name = 'discord-activity';

    _user: User | null = null;

    discord?: DiscordSDK;

    config: DiscordConfig;

    onReady: Promise<void>;
    isReady = false;
    res!: () => void;
    rej!: (e: any) => void;

    constructor(config: DiscordConfig) {
        this.config = config;
        const self = this;
        this.onReady = new Promise((res, rej) => {
            self.res = res;
            self.rej = rej;
        });
        this.init();
    }

    async init() {
        const {DiscordSDK} = await import('@discord/embedded-app-sdk');
        this.discord = new DiscordSDK(this.config.DISCORD_CLIENT_ID);

        await this.discord.ready();
        const {code} = await this.discord.commands.authorize({
            client_id: this.config.DISCORD_CLIENT_ID,
            response_type: 'code',
            state: '',
            prompt: 'none',
            scope: ['identify', 'guilds'],
        });

        // Retrieve an access_token from your activity's server
        const response = await fetch('/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
            }),
        });
        const {access_token} = await response.json();

        // Authenticate with Discord client (using the access_token)
        const auth = await this.discord.commands.authenticate({
            access_token,
        });

        if (auth == null) {
            const e = new Error('Authenticate command failed');
            this.rej(e);
            throw e;
        }

        this._user = {
            name: auth.user.global_name ?? auth.user.username,
            profilePictureUrl: auth.user.avatar ?? undefined,
        };

        this.isReady = true;
        this.res();
    }

    get user() {
        return this._user;
    }

    /* User */
    requestLogin(): Promise<User> {
        return this.onReady.then(() => this._user!);
    }

    get isLoggedIn() {
        return this.isReady;
    }
}
