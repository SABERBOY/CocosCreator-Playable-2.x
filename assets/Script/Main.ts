import GamePlatform from "./GamePlatform";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    /**@private*/
    private static _ins: Main = null;
    @property({type: cc.Node})
    private upNode: cc.Node = null
    @property({type: cc.Node})
    private leftNode: cc.Node = null
    @property({type: cc.Widget})
    private gameWidget: cc.Widget = null
    @property({type: cc.Node})
    private bgNode: cc.Node = null
    private screenSize = null;
    private _designResolution: cc.Size;

    public static get instance(): Main {
        return Main._ins;
    }

    private _gameEnd: boolean = false

    /**
     * 游戏是否结束
     * @param value
     */
    set gameEnd(value: boolean) {
        this._gameEnd = value;
    }

    start() {
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, this.gotoStore, this);
    }

    onReadyCallback() {
        //无需再监听此事件
        GamePlatform.instance.platformSdk.removeEventListener("ready", this.onReadyCallback);
        let isAudioEnabled: boolean = !!GamePlatform.instance.platformSdk.getAudioVolume();
        if (GamePlatform.instance.platformSdk.isViewable()) {
            this.adVisibleCallback({isViewable: true});
        }
        GamePlatform.instance.platformSdk.addEventListener("viewableChange", this.adVisibleCallback.bind(this));
        GamePlatform.instance.platformSdk.addEventListener("adResized", this.adResizeCallback.bind(this));
        GamePlatform.instance.platformSdk.addEventListener("audioVolumeChange", this.audioVolumeChangeCallback.bind(this));
    }

    adVisibleCallback(event) {
        console.log("isViewable " + event.isViewable);
        if (event.isViewable) {
            this.screenSize = GamePlatform.instance.platformSdk.getScreenSize();
            //启动或恢复广告
        } else {
            //暂停广告并静音
        }
    }

    adResizeCallback(event) {
        console.log("ad was resized width " + event.width + " height " + event.height);
    }

    //当用户点击下载按钮时 - 使用 openStoreUrl 函数
    userClickedDownloadButton(event) {
        GamePlatform.instance.platformSdk.openStoreUrl();
    }

    audioVolumeChangeCallback(volume) {
        let isAudioEnabled = !!volume;
        if (isAudioEnabled) {
            //打开声音
        } else {
            //关闭声音
        }
    }

    gotoStore(event) {
        if (this._gameEnd) {
            console.log("gotoStore:", event);
            this.userClickedDownloadButton(event)
        }
    }

    resize() {
        const frameSize = cc.view.getFrameSize();
        // cc.log(frameSize);
        // cc.log(this._designResolution);
        const ResolutionPolicy = cc.ResolutionPolicy;
        const designRes = this._designResolution;
        if (CC_EDITOR) {
            // cc.view.setDesignResolutionSize(designRes.width, designRes.height);
        } else {
            if (frameSize.width > frameSize.height) {
                cc.view.setDesignResolutionSize(designRes.height, designRes.width, ResolutionPolicy.FIXED_HEIGHT);
                this.upNode.active = false
                this.leftNode.active = true
                this.gameWidget.left = 0.4;
                this.gameWidget.updateAlignment()
                this.scheduleOnce((): void => {
                    const size: cc.Size = this.gameWidget.node.getContentSize();
                    let scaleX = size.height / this.bgNode.getContentSize().height;
                    let scaleY = size.width / this.bgNode.getContentSize().width;
                    this.bgNode.setScale(scaleX >= scaleY ? scaleX : scaleY)
                    // console.log("PS1",this.gameWidget.node.getContentSize())
                })
            } else {
                cc.view.setDesignResolutionSize(designRes.width, designRes.height, ResolutionPolicy.FIXED_WIDTH);
                this.upNode.active = true
                this.leftNode.active = false
                this.gameWidget.left = 0;
                this.gameWidget.updateAlignment()
                this.scheduleOnce((): void => {
                    const size: cc.Size = this.gameWidget.node.getContentSize();
                    let scaleX = size.height / this.bgNode.getContentSize().height;
                    let scaleY = size.width / this.bgNode.getContentSize().width;
                    this.bgNode.setScale(scaleX >= scaleY ? scaleX : scaleY)
                    // console.log("PS2",this.gameWidget.node.getContentSize())
                })
            }

        }
        this.node.setContentSize(cc.view.getDesignResolutionSize());
    }

    protected onLoad() {
        Main._ins = this
        console.log("isReady:", GamePlatform.instance.platformSdk.isReady())
        if (GamePlatform.instance.platformSdk.isReady()) {
            this.onReadyCallback()
        } else {
            GamePlatform.instance.platformSdk.addEventListener("ready", this.onReadyCallback.bind(this))
        }
        cc.view.on("canvas-resize", this.resize, this);
        this._designResolution = cc.view.getDesignResolutionSize();
        this.resize();
        console.log('window:', window)
        GamePlatform.instance.appleStore = "https://apps.apple.com/app/id1565477225"
        GamePlatform.instance.googlePlayStore = "https://play.google.com/store/apps/details?id=com.pirates.lucky.gp"
    }
}
