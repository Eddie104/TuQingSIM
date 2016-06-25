module sim.displayObject {

    export class Avatar extends sim.displayObject.CellSprite implements libra.tick.ITickable {

        protected _isTickable: boolean = true;

        protected _isMoving: boolean = false;

        protected _movingPath: libra.aStar.NodePoint[];

        protected _movingStep: number;

        private _movingTotalStep: number;

        protected _movingSpeed: number = 1;

        private _isWillChangeMovingNodePoint: boolean;

        private _movingNodePoint: libra.aStar.NodePoint;

        private _movingTargetPoint: egret.Point;

        public constructor() {
            super();
            this.initAvatar();
        }

        protected initAvatar(): void {
            var g: egret.Graphics = this.graphics;
            g.beginFill(0xff0000, 1);
            g.drawCircle(0, 0, 5);
            g.endFill();

            this.anchorOffsetY = -libra.utils.ISOUtil.height >> 1;
        }

        public startMove(movingPath: libra.aStar.NodePoint[]): void {
            this._movingPath = movingPath;
            if (movingPath.length > 0) {
                this._movingTotalStep = movingPath.length - 1;
                this._isWillChangeMovingNodePoint = true;
                this._movingStep = 0;
                this._isMoving = true;
            }
        }

        protected move(): void {
            if (this._isMoving) {
                if (this._isWillChangeMovingNodePoint) {
                    // 走向的格子
                    this._movingNodePoint = this._movingPath[this._movingStep];
                    // 走向的坐标
                    this._movingTargetPoint = libra.utils.ISOUtil.getItemPos(this._movingNodePoint.x, this._movingNodePoint.y);
                    this._isWillChangeMovingNodePoint = false;
                }

                var dx: number = this._movingTargetPoint.x - this.x;
                var dy: number = this._movingTargetPoint.y - this.y;
                var speed: number = this._movingSpeed;
                if (libra.utils.MathUtil.abs(dx) < speed && libra.utils.MathUtil.abs(dy) < speed) {
                    // 走到目标点上了
                    if (this._movingStep >= this._movingTotalStep) {
                        this.stopMove();
                    } else {
                        this._movingStep++;
                        this.setRowAndCol(this._movingNodePoint.x, this._movingNodePoint.y);
                        this._isWillChangeMovingNodePoint = true;
                        this.move();
                    }
                } else {
                    if (dx < 0) {
                        this.x -= speed * 2;
                        if (dy < 0) {
                            // 左上 
                            this.y -= speed;
                        } else if (dy > 0) {
                            // 左下
                            this.y += speed;
                        } else {
                            // 左
                        }
                    } else if (dx > 0) {
                        this.x += speed * 2;
                        if (dy < 0) {
                            // 右上
                            this.y -= speed;
                        } else if (dy > 0) {
                            // 右下
                            this.y += speed;
                        } else {
                            // 右
                        }
                    } else {
                        if (dy < 0) {
                            // 上
                            this.y -= speed;
                        } else if (dy > 0) {
                            // 下
                            this.y += speed;
                        } else {
                            // 不动
                        }
                    }
                }
            }
        }

        protected stopMove(): void {
            this._isMoving = false;
            var node = this._movingPath[this._movingStep];
            this.setRowAndCol(node.x, node.y);
        }

        public tick(dt: number): void {
            this.move();
        }

        public isTickable(): boolean {
            return this._isTickable;
        }

        public setTickable(val: boolean): void {
            this._isTickable = val;
        }

        protected onAddedToStage(evt: egret.Event): void {
            super.onAddedToStage(evt);

        }

        protected onRemovedFromStage(evt: egret.Event): void {
            super.onRemovedFromStage(evt);
        }

    }
}