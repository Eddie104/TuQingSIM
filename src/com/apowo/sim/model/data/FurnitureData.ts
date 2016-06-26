module sim.model {

    /**
     * FurnitureData
     */
    export class FurnitureData extends Data {

        private _asset: string;

        private _offsetX: number;

        private _offsetY: number;

        private _subface: Array<Array<number>>;

        private _subfaceRows: number = 0;

        private _subfaceCols: number = 0;

        constructor() {
            super();
        }

        public set type(val: number) {
            this._type = val;
            var cfg = libra.utils.queryUtil.queryByType(sim.config.FURNITURE, 2);
            // console.log(cfg);
            this._name = cfg.Name;
            this._description = cfg.Description;
            this._asset = cfg.Asset;
            this._offsetX = cfg.OffsetX;
            this._offsetY = cfg.OffsetY;

            var subface: Array<Array<number>> = new Array<Array<number>>();
            var subfaceRows: Array<string> = cfg.Subface.split('|');
            var rowArr: Array<string>;
            for (var row = 0, rows = subfaceRows.length; row < rows; row++) {
                subface[row] = new Array<number>();
                rowArr = subfaceRows[row].split('&');
                for (var col = 0, cols = rowArr.length; col < cols; col++) {
                    subface[row][col] = <number><any>rowArr[col];
                }
            }
            this._subfaceRows = rows;
            this._subfaceCols = cols;
            this._subface = subface;
        }

        public get offsetX(): number {
            return this._offsetX;
        }

        public get offsetY(): number {
            return this._offsetY;
        }

        public get subfaceRows(): number {
            return this._subfaceRows;
        }

        public get subfaceCols(): number {
            return this._subfaceCols;
        }

        public get subface(): Array<Array<number>> {
            return this._subface;
        }
    }
}