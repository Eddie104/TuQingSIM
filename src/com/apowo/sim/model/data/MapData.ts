module sim.model {

    /**
     * MapData
     */
    export class MapData extends Data {

        protected _mapArr:Array<Array<number>>;

        protected _rows:number;

        protected _cols:number;

        constructor() {
            super();
        }

        public set type(val: number) {
            this._type = val;
            var cfg = libra.utils.queryUtil.queryByType(sim.config.MAP, val);
            this._mapArr = cfg.mapArr;
            this._rows = this._mapArr.length;
            this._cols = this._mapArr[0].length;
        }

        public get mapArr():Array<Array<number>>{
            return this._mapArr;
        }

        public get rows():number{
            return this._rows;
        }

        public get cols():number{
            return this._cols;
        }
    }
}