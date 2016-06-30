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
            var subfaceRows: Array<Array<number>> = cfg.Subface;
            this._subfaceRows = subfaceRows.length;
            this._subfaceCols = this._subfaceRows > 0 ? subfaceRows[0].length : 0;
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