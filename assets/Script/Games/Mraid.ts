import {EAndroidOriOS, EPlatform, IPlatform} from "../Interface/IPlatform";
import GamePlatform from "../GamePlatform";

export class Mraid implements IPlatform {
    addEventListener(name: string, callback: Function): void {
        if (GamePlatform.instance.getPlatform() == EPlatform.Mraid) {
            dapi.addEventListener(name, callback)
        }
    }

    getAudioVolume(): number {
        if (GamePlatform.instance.getPlatform() == EPlatform.Mraid) {
            return dapi.getAudioVolume()
        }
        return 0;
    }

    getScreenSize(): { width: number; height: number } {
        if (GamePlatform.instance.getPlatform() == EPlatform.Mraid) {
            return dapi.getScreenSize()
        }
        return {height: 0, width: 0};
    }

    isReady(): boolean {
        if (GamePlatform.instance.getPlatform() == EPlatform.Mraid) {
            return dapi.isReady()
        }
        return false;
    }

    isViewable(): boolean {
        if (GamePlatform.instance.getPlatform() == EPlatform.Mraid) {
            return mraid.isViewable()
        }
        return false;
    }

    openStoreUrl(): void {
        if (GamePlatform.instance.getPlatform() == EPlatform.Mraid) {
            mraid.open(GamePlatform.instance.getNativePlatform == EAndroidOriOS.iOS ? GamePlatform.instance.appleStore : GamePlatform.instance.googlePlayStore);
        }
    }

    removeEventListener(name: string, callback: Function): void {
        if (GamePlatform.instance.getPlatform() == EPlatform.Mraid) {
            dapi.removeEventListener(name, callback)
        }
    }

}
