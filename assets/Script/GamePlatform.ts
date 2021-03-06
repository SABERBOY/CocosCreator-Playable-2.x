import {EAndroidOriOS, EPlatform, IPlatform} from "./Interface/IPlatform";
import {Dapi} from "./GamesInterface/Dapi";
import {Mraid} from "./GamesInterface/Mraid";
import {Mindworks} from "./GamesInterface/Mindworks";
import {Dummy} from "./GamesInterface/Dummy";
import {Pangle} from "./GamesInterface/Pangle";

export default class GamePlatform {
    /**@private*/
    private static _ins: GamePlatform = null;
    private readonly _platformSdk: IPlatform = null;

    constructor() {
        console.log("GamePlatform:", this.getPlatform())
        if (this.getPlatform() == EPlatform.Dapi) {
            this._platformSdk = new Dapi();
        } else if (this.getPlatform() == EPlatform.Mraid) {
            this._platformSdk = new Mraid();
        } else if (this.getPlatform() == EPlatform.Mindworks) {
            this._platformSdk = new Mindworks()
        } else if (this.getPlatform() == EPlatform.Pangle) {
            this._platformSdk = new Pangle()
        } else {
            this._platformSdk = new Dummy();
        }

    }

    public static get instance(): GamePlatform {
        if (!GamePlatform._ins) {
            GamePlatform._ins = new GamePlatform()
        }
        return GamePlatform._ins;
    }

    private _googlePlayStore: string = ''

    get googlePlayStore(): string {
        return this._googlePlayStore;
    }

    set googlePlayStore(value: string) {
        this._googlePlayStore = value;
    }

    private _appleStore: string = ''

    get appleStore(): string {
        return this._appleStore;
    }

    set appleStore(value: string) {
        this._appleStore = value;
    }

    get platformSdk(): IPlatform {
        return this._platformSdk;
    }

    public get getNativePlatform(): EAndroidOriOS {
        const userAgent = navigator.userAgent || navigator.vendor;
        if (/android/i.test(userAgent)) {
            return EAndroidOriOS.Android
        }
        return EAndroidOriOS.iOS

    }

    public getPlatform(): EPlatform {
        if (window.hasOwnProperty("dapi")) {
            return EPlatform.Dapi
        }
        if (window.hasOwnProperty("mraid")) {
            return EPlatform.Mraid;
        }
        if (
            window.hasOwnProperty("gameReady") &&
            window.hasOwnProperty("gameEnd") &&
            window.hasOwnProperty("gameRetry") &&
            window.hasOwnProperty("install")) {
            return EPlatform.Mindworks
        }
        if (window.hasOwnProperty("openAppStore")) {
            return EPlatform.Pangle
        }
        return EPlatform.None;
    }
}



