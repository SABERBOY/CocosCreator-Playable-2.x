declare class dapi {
    static isReady(): boolean

    static openStoreUrl(): void

    static getAudioVolume(): number

    static isViewable(): boolean

    static getScreenSize(): { width: 200, height: 400 }

    static addEventListener(name: string, callback: Function): void

    static removeEventListener(name: string, callback: Function): void
}
