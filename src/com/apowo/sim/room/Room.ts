module sim.room {

    import Avatar = sim.displayObject.Avatar;
    import MapData = sim.model.MapData;
    // import Grid = libra.aStar.Grid;
    // import NodePoint = libra.aStar.NodePoint;
    // import AStar2 = libra.aStar.AStar2;


    export class Room extends libra.displayObject.JSprite {

        public static CELL_WIDTH: number = 40;

        /**
         * 地图数据
         */
        protected _mapData: MapData;

        /**
         * 寻路数据
         */
        protected _mapGrid: libra.aStar.Grid;

        /**
         * 地板
         */
        protected _floor: Floor;

        protected _me: Avatar;

        public constructor() {
            super();

            libra.utils.ISOUtil.setContentSize(Room.CELL_WIDTH, Room.CELL_WIDTH >> 1);
            libra.utils.ISOUtil.setTopPoint(libra.display.cx(), 120);

            // 初始化地图数据
            var mapData: MapData = new MapData();
            mapData.type = 1;
            var mapGrid: libra.aStar.Grid = new libra.aStar.Grid(mapData.rows, mapData.cols, Room.CELL_WIDTH);
            for (var row: number = 0; row < mapData.rows; row++) {
                for (var col: number = 0; col < mapData.cols; col++) {
                    mapGrid.setWalkable(row, col, mapData.mapArr[row][col] > 0);
                }
            }
            this._mapData = mapData;
            this._mapGrid = mapGrid;

            // 加载地板资源然后显示
            RES.getResAsync("tile_json", function () {
                this.drawFloor();
                this.drawMe();
            }, this);
            var g:egret.Graphics = this.graphics;
            g.beginFill(0xff0000, 0);
            g.drawRect(0, 0, libra.display.stageWidth(), libra.display.stageHeight());
            g.endFill();
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
            var me = new Avatar();
            me.setRowAndCol(0, 0);
            this.addChild(me);
            libra.tick.Tick.getInstance().addItem(me);
            this._me = me;
        }

        protected onTap(evt: egret.TouchEvent): void {
            var p: egret.Point = libra.utils.ISOUtil.getItemIndex(new egret.Point(evt.stageX, evt.stageY));
            if(p.x < 0 || p.x >= this._mapData.cols || p.y < 0 || p.y >= this._mapData.rows){
                return;
            }
            this._mapGrid.setStartNode(this._me.getRow(), this._me.getCol());
            this._mapGrid.setEndNode(p.y, p.x)
            
            var astar: libra.aStar.AStar2 = new libra.aStar.AStar2();
            if (astar.findPath(this._mapGrid)) {
                //得到平滑路径
                // astar.floyd();
                //在路径中去掉起点节点，避免玩家对象走回头路
                // astar.floydPath.shift();
                astar.path.shift();
                this._me.startMove(astar.path);
            }
        }
    }
}