import {Component, TextComponent} from '@wonderlandengine/api';
import {ImageTexture} from '@wonderlandengine/components';
import {user} from './user.js';

/**
 * welcome-message
 */
export class WelcomeMessage extends Component {
    static TypeName = 'welcome-message';

    /* Properties that are configurable in the editor */

    async start() {
        const t = this.object.getComponent(TextComponent)!;
        t.text = `Please accept permissions!`;

        const u = await user.requestLogin();
        t.text = `Welcome, ${u.name ?? '<name missing>'}!`;

        if (u.profilePictureUrl) {
            const it = this.object.getComponent(ImageTexture);
            it.url = u.profilePictureUrl;
            it.active = true;
        }
    }
}
