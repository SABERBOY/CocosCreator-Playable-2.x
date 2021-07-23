const {ccclass, property} = cc._decorator;
/**
 *
 * GameItem
 * @export
 * @class GameItem
 * @extends {cc.Component}
 */
@ccclass
export default class GameItem extends cc.Component {
    @property({type: cc.Sprite, visible: true})
    private _head: cc.Sprite = null

    get head(): cc.Sprite {
        return this._head;
    }

    @property({type: cc.Sprite, visible: true})
    private _face: cc.Sprite = null

    get face(): cc.Sprite {
        return this._face;
    }

    private _type: number = 0;

    get type(): number {
        return this._type;
    }

    set type(value: number) {
        this._type = value;
    }
}
