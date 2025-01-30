const DISCORD_CLIENT_ID = 'CHANGE_ME';
const isOnDiscord = TARGET === 'discord' || window.location.hostname.includes(discordAppId)

/**
 * Discord hides all resources behind a /.proxy/ url. To mitigate this als still be able to load
 * all the required resources correctly we need to add the code below at top level, so it will
 * be run first before loading anything.
 *
 * This code will automatically add a /.proxy/ before the actual resource and thus fix loading
 * via the Discord proxy system.
 */
if (isOnDiscord) {
    const addProxy = (url) => {
        if(url.startsWith('data')){
            return url;
        }
        const split = url.split('/');

        const proxyIndex = url.includes('://') ? 3 : split[0] !== '' ? 0 : 1;
        if (split.length <= proxyIndex) {
            return url;
        }
        if (split[proxyIndex] !== '.proxy' && split[proxyIndex] !== '') {
            split.splice(proxyIndex, 0, '.proxy');
            return split.join('/');
        }
        return url;
    };

    const originalFetch = window.fetch;
    const originalOpen = XMLHttpRequest.prototype.open;

    window.fetch = (param1, param2) => {
        if (typeof param1 === 'string') {
            return originalFetch(addProxy(param1), param2);
        }
        return originalFetch(param1, param2);
    };

    XMLHttpRequest.prototype.open = (method, url, async, username, password) => {
        return originalOpen(method, addProxy(url), async, username, password);
    }
}


/**
 * /!\ This file is auto-generated.
 *
 * This is the entry point of your standalone application.
 *
 * There are multiple tags used by the editor to inject code automatically:
 *     - `wle:auto-imports:start` and `wle:auto-imports:end`: The list of import statements
 *     - `wle:auto-register:start` and `wle:auto-register:end`: The list of component to register
 *     - `wle:auto-constants:start` and `wle:auto-constants:end`: The project's constants,
 *        such as the project's name, whether it should use the physx runtime, etc...
 *     - `wle:auto-benchmark:start` and `wle:auto-benchmark:end`: Append the benchmarking code
 */

/* wle:auto-imports:start */
import {ImageTexture} from '@wonderlandengine/components';
import {MouseLookComponent} from '@wonderlandengine/components';
import {WasdControlsComponent} from '@wonderlandengine/components';
import {WelcomeMessage} from './welcome-message.js';
/* wle:auto-imports:end */

import {loadRuntime} from '@wonderlandengine/api';
import {user} from './user.js';
import {DiscordActivityProvider} from './discord.js';

try {
    user.registerProvider(
        new DiscordActivityProvider({
            DISCORD_CLIENT_ID: DISCORD_CLIENT_ID,
            DISCORD_APPLICATION_ID: DISCORD_CLIENT_ID,
        })
    );
} catch (e) {
    /* Local debugging */
}

/* wle:auto-constants:start */
const Constants = {
    ProjectName: 'DiscordAcitivityExample',
    RuntimeBaseName: 'WonderlandRuntime',
    WebXRRequiredFeatures: ['local',],
    WebXROptionalFeatures: ['local','hand-tracking','hit-test',],
};
const RuntimeOptions = {
    physx: false,
    loader: false,
    xrFramebufferScaleFactor: 1,
    xrOfferSession: {
        mode: 'auto',
        features: Constants.WebXRRequiredFeatures,
        optionalFeatures: Constants.WebXROptionalFeatures,
    },
    canvas: 'canvas',
};
/* wle:auto-constants:end */

const engine = await loadRuntime(Constants.RuntimeBaseName, RuntimeOptions);
engine.onLoadingScreenEnd.once(() => {
    const el = document.getElementById('version');
    if (el) setTimeout(() => el.remove(), 2000);
});

/* WebXR setup. */

/* wle:auto-register:start */
engine.registerComponent(ImageTexture);
engine.registerComponent(MouseLookComponent);
engine.registerComponent(WasdControlsComponent);
engine.registerComponent(WelcomeMessage);
/* wle:auto-register:end */

try {
    await engine.loadMainScene(`${Constants.ProjectName}.bin`);
} catch (e) {
    console.error(e);
    window.alert(`Failed to load ${Constants.ProjectName}.bin:`, e);
}

/* wle:auto-benchmark:start */
/* wle:auto-benchmark:end */
