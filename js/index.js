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
            DISCORD_CLIENT_ID: '1240944918566932490',
            DISCORD_APPLICATION_ID: '1240944918566932490',
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
