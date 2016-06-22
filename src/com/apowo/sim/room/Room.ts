module sim.room {

    export class Room extends libra.displayObject.JSprite {

        protected _map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        /**
         * 地板
         */
        protected _floor: Floor;

        protected _me: sim.displayObject.Avatar;

        public constructor() {
            super();

            libra.utils.ISOUtil.setContentSize(40, 20);
            libra.utils.ISOUtil.setTopPoint(libra.display.cx(), libra.display.cy());

            RES.getResAsync("tile_json", function () {
                this.drawFloor();
                this.drawMe();
            }, this);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        }

        protected drawFloor(): void {
            var floor: Floor = new Floor();
            this.addChild(floor);
            floor.draw(this._map);
            this._floor = floor;
        }

        protected drawMe(): void {
            var me = new sim.displayObject.Avatar();
            me.setRowAndCol(0, 0);
            this.addChild(me);
            libra.tick.Tick.getInstance().addItem(me);
            this._me = me;
        }

        protected onTap(evt: egret.TouchEvent): void {
            var p:egret.Point = libra.utils.ISOUtil.getItemIndex(new egret.Point(evt.stageX, evt.stageY));
            console.log(p);
        }
    }
}