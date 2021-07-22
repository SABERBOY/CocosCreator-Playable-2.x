import {EAndroidOriOS, EPlatform, IPlatform} from "../Interface/IPlatform";
import GamePlatform from "../GamePlatform";

export class Dapi implements IPlatform {
    addEventListener(name: string, callback: Function): void {
        if (GamePlatform.instance.getPlatform() == EPlatform.Dapi) {
            dapi.addEventListener(name, callback)
        }
    }

    getAudioVolume(): number {
        if (GamePlatform.instance.getPlatform() == EPlatform.Dapi) {
            return dapi.getAudioVolume()
        }
        return 0;
    }

    getScreenSize(): { width: number; height: number } {
        if (GamePlatform.instance.getPlatform() == EPlatform.Dapi) {
            return dapi.getScreenSize()
        }
        return {height: 0, width: 0};
    }

    isReady(): boolean {
        if (GamePlatform.instance.getPlatform() == EPlatform.Dapi) {
            return dapi.isReady()
        }
        return false;
    }

    isViewable(): boolean {
        if (GamePlatform.instance.getPlatform() == EPlatform.Dapi) {
            return dapi.isViewable()
        }
        return false;
    }

    openStoreUrl(): void {
        if (GamePlatform.instance.getPlatform() == EPlatform.Dapi) {
            window.location.href = GamePlatform.instance.getNativePlatform == EAndroidOriOS.iOS ? GamePlatform.instance.appleStore : GamePlatform.instance.googlePlayStore
            dapi.openStoreUrl()
        }
    }

    removeEventListener(name: string, callback: Function): void {
        if (GamePlatform.instance.getPlatform() == EPlatform.Dapi) {
            dapi.removeEventListener(name, callback)
        }
    }

}
