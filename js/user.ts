export interface User {
    name: string;
    profilePictureUrl?: string;
}
export interface UserProvider {
    isLoggedIn: boolean;
    user: User | null;

    requestLogin(): Promise<User>;
}

class UserProviderManager implements UserProvider {
    name = 'uber-user-provider';

    providers: UserProvider[] = [];
    registerProvider(p: UserProvider) {
        this.providers.push(p);
    }

    get isLoggedIn() {
        for (let u of this.providers) if (u.isLoggedIn) return true;
        return false;
    }

    get user(): User | null {
        for (let u of this.providers) if (u.isLoggedIn) return u.user;
        return null;
    }

    requestLogin(): Promise<User> {
        for (let u of this.providers) if (!u.isLoggedIn) return u.requestLogin();
        return Promise.reject();
    }
}

export const user = new UserProviderManager();
