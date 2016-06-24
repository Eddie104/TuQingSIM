module sim.displayObject {

    export class Avatar extends sim.displayObject.CellSprite implements libra.tick.ITickable {

        private _isTickable: boolean = true;

        private _isMoving: boolean = false;

        private _movingPath: libra.aStar.NodePoint[];

        private _movingStep: number;

        public constructor() {
            super();
            var g: egret.Graphics = this.graphics;
            g.beginFill(0xff0000, 1);
            g.drawCircle(0, 0, 5);
            g.endFill();
        }

        public startMove(movingPath: libra.aStar.NodePoint[]): void {
            this._movingPath = movingPath;
            if (movingPath.length > 0) {
                this._movingStep = 0;
                this._isMoving = true;
            }
        }

        protected move(): void {
            if (this._isMoving) {
                var cellWidth: number = sim.room.Room.CELL_WIDTH;
                var cellHeight: number = cellWidth >> 1;
                var pathNode: libra.aStar.NodePoint = this._movingPath[this._movingStep];
                var targetX: number = pathNode.x * cellWidth + cellHeight;
                var targetY: number = pathNode.y * cellWidth + cellHeight;
                var dx: number = targetX - this.x;
                var dy: number = targetY - this.y;
                var dist: number = Math.sqrt(dx * dx + dy * dy);
                if (dist < 1) {
                    this._movingStep++;
                    if (this._movingStep >= this._movingPath.length) {
                        this.stopMove();
                    }
                } else {
                    this.x += dx * .5;
                    this.y += dy * .5;
                }
            }
        }

        protected stopMove(): void {
            this._isMoving = true;
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