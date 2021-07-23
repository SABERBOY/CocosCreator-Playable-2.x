import {IPlatform} from "../Interface/IPlatform";

export class Pangle implements IPlatform {
    addEventListener(name: string, callback: Function): void {
    }

    getAudioVolume(): number {
        return 0;
    }

    getScreenSize(): { width: number; height: number } {
        return {height: 0, width: 0};
    }

    isReady(): boolean {
        return false;
    }

    isViewable(): boolean {
        return false;
    }

    openStoreUrl(): void {
        if (window.hasOwnProperty("openAppStore")) {
            window.openAppStore();
        }
    }

    removeEventListener(name: string, callback: Function): void {
    }

}
