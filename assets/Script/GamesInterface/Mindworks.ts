import {IPlatform} from "../Interface/IPlatform";

export class Mindworks implements IPlatform {

    constructor() {
        if (!window.hasOwnProperty("gameStart")) {
            window["gameStart"] = this.gameStart
        }
        if (!window.hasOwnProperty("gameClose")) {
            window["gameClose"] = this.gameClose
        }
    }

    addEventListener(name: string, callback: Function): void {
    }

    getAudioVolume(): number {
        return 0;
    }

    getScreenSize(): { width: number; height: number } {
        return {height: 0, width: 0};
    }

    isReady(): boolean {
        if (window.hasOwnProperty("gameReady")) {
            window.gameReady && window.gameReady();
        }
        this.gameStart()
        return true;
    }

    isViewable(): boolean {
        return false;
    }

    openStoreUrl(): void {
        if (window.hasOwnProperty("install")) {
            window.install && window.install();
        }
        this.gameEnd()
        this.gameRetry()
    }

    removeEventListener(name: string, callback: Function): void {
    }

    gameEnd() {
        if (window.hasOwnProperty("gameEnd")) {
            window.gameEnd && window.gameEnd();
        }
    }

    gameRetry() {
        if (window.hasOwnProperty("gameRetry")) {
            window.gameRetry && window.gameRetry();
        }
    }

    gameClose() {
        console.log("gameClose")
    }

    gameStart() {
        console.log("gameStart")
    }

}
