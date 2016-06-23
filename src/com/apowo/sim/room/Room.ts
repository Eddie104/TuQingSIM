module sim.room {

    export class Room extends libra.displayObject.JSprite {
        
        /**
         * 地图数据
         */
        protected _mapData:sim.model.MapData;

        /**
         * 地板
         */
        protected _floor: Floor;

        protected _me: sim.displayObject.Avatar;

        public constructor() {
            super();

            libra.utils.ISOUtil.setContentSize(40, 20);
            libra.utils.ISOUtil.setTopPoint(libra.display.cx(), libra.display.cy());

            this._mapData = new sim.model.MapData();
            this._mapData.type = 1;

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
            floor.draw(this._mapData.mapArr);
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