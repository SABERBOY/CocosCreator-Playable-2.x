export interface IPlatform {
    isReady(): boolean

    openStoreUrl(): void

    getAudioVolume(): number

    isViewable(): boolean

    getScreenSize(): { width: number, height: number }

    addEventListener(name: string, callback: Function): void

    removeEventListener(name: string, callback: Function): void

    gameEnd?();

    gameRetry?();

    gameStart?();

    gameClose?();
}

export enum EPlatform {
    None = 1,
    Dapi = 2,
    Mraid = 3,
    Mindworks = 4,
    Pangle = 5
}

export enum EAndroidOriOS {
    Android = 1,
    iOS = 2,
}
