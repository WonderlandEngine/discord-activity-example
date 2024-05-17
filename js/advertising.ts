/** A user event that is allowed to trigger an ad */
export type UserGesture = MouseEvent | SubmitEvent | PointerEvent | TouchEvent;

export enum AdError {
    Unfilled = 'unfilled',
}

export interface RewardedAdProvider {
    name: string;
    /** Whether there is an ad to show */
    hasAd(): boolean;
    /** Launches a rewarded video ad.
     * Returned promise resolves if the user finished watching the ad
     * and rejects if an error ocurs, ad blocker is deteced or in any
     * other case. */
    showRewardedAd(userGesture: UserGesture): Promise<RewardedAdProvider>;
}

class Ads implements RewardedAdProvider {
    name = 'uber-ad-provider';

    providers: RewardedAdProvider[] = [];
    registerProvider(p: RewardedAdProvider) {
        this.providers.push(p);
    }

    hasAd(): boolean {
        for (const p of this.providers) {
            if (p.hasAd()) return true;
        }
        return false;
    }

    showRewardedAd(userGesture: UserGesture): Promise<RewardedAdProvider> {
        for (const p of this.providers) {
            if (p.hasAd()) return p.showRewardedAd(userGesture);
        }
        return Promise.reject({status: 'ads-unavailable', provider: this});
    }
}

export const ads = new Ads();
