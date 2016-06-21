module com.apowo.sim.room {

    export class Floor extends libra.displayObject.JSprite {

        //private _tileList: Array<FloorTile> = new Array<FloorTile>();

        public constructor() {
            super();
        }

        public draw(map: Array<Array<number>>): void {
            var rowLength: number = map.length;
            var colLength: number = map[0].length;
            var tile:FloorTile = null;
            for (var row = 0; row < rowLength; row++) {
                for (var col = 0; col < colLength; col++) {
                    if (map[row][col] == 1) {
                        tile = new FloorTile(this.createResName("tile0021", map, rowLength, colLength, row, col));
                        tile.setRowAndCol(row, col);
                        this.addChild(tile);
                    }
                }
            }
            this.cacheAsBitmap = true;
        }

        private createResName(prefix: string, map: Array<Array<number>>, rows: number, cols: number, row: number, col: number): string {
            if (row == 0 && col == 0) {
                return prefix + "-1";
            }else if (row == 0) {
                return prefix + "-3";
            } else if (col == 0) {
                return prefix + "-2";
            } else if (map[row][col - 1] == 0 && map[row - 1][col] == 0) {
                return prefix + "-1";
            } else if (map[row][col - 1] == 0) {
                return prefix + "-2";
            } else if (map[row - 1][col] == 0) {
                return prefix + "-3";
            } else if(map[row - 1][col] == 1 && map[row][col - 1] == 1 && map[row - 1][col - 1] == 0){
                return prefix + "-5";
            }
            return prefix + "-4";
        }
    }
}