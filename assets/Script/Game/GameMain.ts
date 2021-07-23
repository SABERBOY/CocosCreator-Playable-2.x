import Vec2 = cc.Vec2;
import GameItem from "./GameItem";
import {randomRangeInt} from "../Utils/XMUtils";
import Main from "../Main";

const {ccclass, property} = cc._decorator;

const config: { gameLists: { data: number[][] }[] } = {
    gameLists: [
        {
            data: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//0
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//1
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//2
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//3
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//4
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//5
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//6
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//7
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//8
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] //9
                //0  1  2  3  4  5  6  7  8  9
            ]
        }
    ]
}

/**
 *
 * GameMain
 * @export
 * @class GameMain
 * @extends {cc.Component}
 */
@ccclass
export default class GameMain extends cc.Component {

    @property({type: [cc.SpriteFrame]})
    private borderSpriteFrame: cc.SpriteFrame[] = []
    @property({type: [cc.SpriteFrame]})
    private headSpriteFrame: cc.SpriteFrame[] = []
    @property({type: [cc.SpriteFrame]})
    private faceSpriteFrame: cc.SpriteFrame[] = []
    @property({type: cc.Node})
    private borderPanelNode: cc.Node = null
    @property({type: cc.Node})
    private gamePanelNode: cc.Node = null

    @property({type: cc.Prefab})
    private gameItem: cc.Prefab = null
    @property({type: cc.Prefab})
    private borderItem: cc.Prefab = null

    private itemList: Array<Array<cc.Node>> = new Array<Array<cc.Node>>(10)

    /**
     * start
     *
     * @protected
     * @memberof GameMain
     */
    protected start(): void {
// log.debug
        for (let i = 0; i < this.itemList.length; i++) {
            this.itemList[i] = new Array<cc.Node>(10);
        }
        console.log("itemList:", this.itemList)
        this.gameStart();

        function findAdjacent(matrix) {
            var x = 0, y = 0; //starting point
            return check(x, y, matrix);
        }

        function check(x, y, matrix) {//where the recursive magic happens
            if (matrix[x][y] == 1) {
                checked[x][y] = 1;
                if (x - 1 >= 0 && matrix[x - 1][y] == 1 && checked[x - 1][y] != 1) {
                    check(x - 1, y, matrix);
                }
                if (y - 1 >= 0 && matrix[x][y - 1] == 1 && checked[x][y - 1] != 1) {
                    check(x, y - 1, matrix);
                }
                if (x + 1 < matrix.length && matrix[x + 1][y] == 1 && checked[x + 1][y] != 1) {
                    check(x + 1, y, matrix);
                }
                if (y + 1 < matrix.length && matrix[x][y + 1] == 1 && checked[x][y + 1] != 1) {
                    check(x, y + 1, matrix);
                }
            }
            return checked;
        }

        var startingMatrix = [];
        startingMatrix[0] = [1, 2, 3, 4, 5, 6, 7, 1];
        startingMatrix[1] = [1, 1, 3, 4, 1, 6, 1, 1];
        startingMatrix[2] = [1, 1, 1, 1, 1, 1, 7, 1];
        startingMatrix[3] = [5, 1, 1, 1, 5, 1, 7, 1];
        startingMatrix[4] = [5, 2, 3, 4, 1, 1, 7, 1];
        startingMatrix[5] = [1, 2, 1, 4, 5, 1, 1, 1];
        startingMatrix[6] = [1, 1, 1, 1, 1, 1, 0, 1];
        startingMatrix[7] = [1, 1, 3, 4, 4, 1, 3, 1];

        var checked = []; //empty matrix for marking up checked files
        checked[0] = [0, 0, 0, 0, 0, 0, 0, 0];
        checked[1] = [0, 0, 0, 0, 0, 0, 0, 0];
        checked[2] = [0, 0, 0, 0, 0, 0, 0, 0];
        checked[3] = [0, 0, 0, 0, 0, 0, 0, 0];
        checked[4] = [0, 0, 0, 0, 0, 0, 0, 0];
        checked[5] = [0, 0, 0, 0, 0, 0, 0, 0];
        checked[6] = [0, 0, 0, 0, 0, 0, 0, 0];
        checked[7] = [0, 0, 0, 0, 0, 0, 0, 0];
        findAdjacent(startingMatrix);
        console.log("check:", checked)
    }

    /**
     * onLoad
     *
     * @protected
     * @memberof GameMain
     */
    protected onLoad(): void {
// log.debug
    }

    private gameStart() {
        Main.instance.gameEnd = false;
        const borderSize: cc.Size = this.borderPanelNode.getContentSize()
        const gameItemSize: cc.Size = this.gamePanelNode.getContentSize()
        const originSize: number = 60;
        const startPosition: Vec2 = new Vec2(-(borderSize.width / 2), borderSize.height / 2)
        config.gameLists[0].data.forEach(((value, verticalIndex) => {
            value.forEach(((value1, horizontalIndex) => {
                this.generateBorder(startPosition, verticalIndex, originSize, horizontalIndex);
                this.generateItem(startPosition, verticalIndex, originSize, horizontalIndex);
            }))
        }))
        this.scheduleOnce((): void => {
            console.log(this.itemList)
            this.gamePanelNode.once(cc.Node.EventType.TOUCH_START, (touches: cc.Event.EventTouch): void => {
                console.log(touches)
            })
        }, 0.5)
    }

    /**
     *
     * @param startPosition
     * @param verticalIndex
     * @param originSize
     * @param horizontalIndex
     * @private
     */
    private generateBorder(startPosition: cc.Vec2, verticalIndex: number, originSize: number, horizontalIndex: number) {
        const borderItem: cc.Node = cc.instantiate(this.borderItem);
        const sprite: cc.Sprite = borderItem.getComponent<cc.Sprite>(cc.Sprite)
        if (verticalIndex === 0 && horizontalIndex === 0) {
            sprite.spriteFrame = this.borderSpriteFrame[0]
        }
        if (verticalIndex !== 0 && verticalIndex !== 9 && horizontalIndex === 0) {
            sprite.spriteFrame = this.borderSpriteFrame[1]
        }
        if (horizontalIndex === 0 && verticalIndex === 9) {
            sprite.spriteFrame = this.borderSpriteFrame[2]
        }

        if (horizontalIndex !== 0 && horizontalIndex !== 9 && verticalIndex === 0) {
            sprite.spriteFrame = this.borderSpriteFrame[3]
        }
        // sprite.spriteFrame = this.borderSpriteFrame[4] //normal
        if (horizontalIndex !== 0 && horizontalIndex !== 9 && verticalIndex === 9) {
            sprite.spriteFrame = this.borderSpriteFrame[5]
        }
        if (verticalIndex === 0 && horizontalIndex === 9) {
            sprite.spriteFrame = this.borderSpriteFrame[6]
        }
        if (verticalIndex !== 0 && verticalIndex !== 9 && horizontalIndex === 9) {
            sprite.spriteFrame = this.borderSpriteFrame[7]
        }
        if (verticalIndex === 9 && horizontalIndex === 9) {
            sprite.spriteFrame = this.borderSpriteFrame[8]
        }
        this.borderPanelNode.addChild(borderItem);
        borderItem.setPosition(new Vec2(startPosition.x + verticalIndex * originSize, startPosition.y - horizontalIndex * originSize))
        borderItem.active = true
    }

    /**
     *
     * @param startPosition
     * @param verticalIndex
     * @param originSize
     * @param horizontalIndex
     * @private
     */
    private generateItem(startPosition: cc.Vec2, verticalIndex: number, originSize: number, horizontalIndex: number) {
        const gameItem: cc.Node = cc.instantiate(this.gameItem);
        const gameItemConfig: GameItem = gameItem.getComponent<GameItem>(GameItem);
        const fsf: cc.SpriteFrame[] = this.faceSpriteFrame
        if (gameItemConfig) {
            const randomIndex = (verticalIndex >= 3 && verticalIndex <= 6) && (horizontalIndex >= 3 && horizontalIndex <= 6) ? 4 : randomRangeInt(0, fsf.length)
            if (this.headSpriteFrame[randomIndex]) {
                gameItemConfig.head.spriteFrame = this.headSpriteFrame[randomIndex];
            }
            if (this.faceSpriteFrame[randomIndex]) {
                gameItemConfig.face.spriteFrame = this.faceSpriteFrame[randomIndex];
            }
        }
        this.gamePanelNode.addChild(gameItem);
        gameItem.setPosition(new Vec2(startPosition.x + verticalIndex * originSize, startPosition.y - horizontalIndex * originSize))
        gameItem.active = true
        gameItem.name = `${verticalIndex}|${horizontalIndex}`
        this.itemList[verticalIndex][horizontalIndex] = gameItem;
    }

     check(x, y, matrix:Array<Array<number>>,checked:Array<Array<number>>) {
        //where the recursive magic happens
        if (matrix[x][y] == 1) {
            checked[x][y] = 1;
            if (x - 1 >= 0 && matrix[x - 1][y] == 1 && checked[x - 1][y] != 1) {
                this.check(x - 1, y, matrix,checked);
            }
            if (y - 1 >= 0 && matrix[x][y - 1] == 1 && checked[x][y - 1] != 1) {
                this.check(x, y - 1, matrix,checked);
            }
            if (x + 1 < matrix.length && matrix[x + 1][y] == 1 && checked[x + 1][y] != 1) {
                this.check(x + 1, y, matrix,checked);
            }
            if (y + 1 < matrix.length && matrix[x][y + 1] == 1 && checked[x][y + 1] != 1) {
                this.check(x, y + 1, matrix,checked);
            }
        }
        return checked;
    }
}
