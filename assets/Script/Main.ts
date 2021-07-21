const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    @property({type: cc.Node})
    private upNode: cc.Node = null
    @property({type: cc.Node})
    private leftNode: cc.Node = null
    private screenSize = null;
    private _designResolution: cc.Size;

    start() {
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, this.gotoStore, this);
    }

    onReadyCallback() {
        //无需再监听此事件
        dapi.removeEventListener("ready", this.onReadyCallback);
        let isAudioEnabled = !!dapi.getAudioVolume();
        // console.log("isViewable:" + dapi.isViewable())
        // console.log("getAudioVolume:" + dapi.getAudioVolume())
        if (dapi.isViewable()) {
            this.adVisibleCallback({isViewable: true});
        }
        dapi.addEventListener("viewableChange", this.adVisibleCallback.bind(this));
        dapi.addEventListener("adResized", this.adResizeCallback.bind(this));
        dapi.addEventListener("audioVolumeChange", this.audioVolumeChangeCallback.bind(this));
    }

    adVisibleCallback(event) {
        console.log("isViewable " + event.isViewable);
        if (event.isViewable) {
            this.screenSize = dapi.getScreenSize();
            //启动或恢复广告
        } else {
            //暂停广告并静音
        }
    }

    adResizeCallback(event) {
        // this.screenSize = event;
        console.log("ad was resized width " + event.width + " height " + event.height);
        // this.resizeCallback();
    }

    //当用户点击下载按钮时 - 使用 openStoreUrl 函数
    userClickedDownloadButton(event) {
        dapi.openStoreUrl();
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
        console.log("gotoStore:", event)
        const gpurl = "https://play.google.com/store/apps/details?id=com.pirates.lucky.gp"
        const appstoreurl = "https://apps.apple.com/app/id1565477225"
        this.userClickedDownloadButton(event)
    }

    resize() {
        const frameSize = cc.view.getFrameSize();
        cc.log(frameSize);
        const ResolutionPolicy = cc.ResolutionPolicy;

        const designRes = this._designResolution;
        if (CC_EDITOR) {
            // cc.view.setDesignResolutionSize(designRes.width, designRes.height);
        } else {
            if (frameSize.width > frameSize.height) {
                cc.view.setDesignResolutionSize(designRes.height, designRes.width, ResolutionPolicy.SHOW_ALL);
                this.upNode.active = false
                this.leftNode.active = true
            } else {
                cc.view.setDesignResolutionSize(designRes.width, designRes.height, ResolutionPolicy.SHOW_ALL);
                this.upNode.active = true
                this.leftNode.active = false
            }
        }
        this.node.setContentSize(cc.view.getDesignResolutionSize());
    }

    protected onLoad() {
        if (window.hasOwnProperty("dapi")) {
            console.log("isReady:", dapi.isReady())
            if (dapi.isReady()) {
                dapi.addEventListener("ready", this.onReadyCallback.bind(this))
                this.onReadyCallback()
            }
        }
        // this.resizeCallback();
        /*cc.view.setResizeCallback((): void => {
            console.log("setResizeCallback:"+cc.view.getFrameSize().toString())
        });*/
        cc.view.on("canvas-resize", this.resize, this);
        this._designResolution = cc.view.getDesignResolutionSize();
        this.resize();
    }

    protected resizeCallback() {
        let frameSize = cc.view.getFrameSize()
        const height = frameSize.height;
        const width = frameSize.width;
        let isH = false;
        if (height / width <= 1.65) {//H
            isH = true
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE)
            cc.view.setFrameSize(width, height)
            cc.Canvas.instance.designResolution = cc.size(1136, 640)
        } else {//V
            isH = false
            cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT)
            cc.view.setFrameSize(height, width)
            cc.Canvas.instance.designResolution = cc.size(640, 1136)
        }
    }

}
