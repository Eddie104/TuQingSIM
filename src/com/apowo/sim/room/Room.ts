module com.apowo.sim.room {

    export class Room extends libra.displayObject.JSprite {

        private _map = [
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        private _floor: Floor;

        public constructor() {
            super();
            
            libra.utils.ISOUtil.setContentSize(40, 20);
            libra.utils.ISOUtil.setTopPoint(libra.display.cx(), libra.display.cy());

            RES.getResAsync("tile_json", function () {
                this.drawFloor();
            }, this);
        }

        private drawFloor() {
            var floor: Floor = new Floor();
            this.addChild(floor);
            floor.draw(this._map);
            this._floor = floor;
        }
    }
}