module sim.model {

    /**
     * MapData
     */
    export class MapData extends Data {

        private _mapArr:Array<Array<number>>;

        constructor() {
            super();
        }

        public set type(val: number) {
            this._type = val;
            var cfg = libra.utils.queryUtil.queryByType(sim.config.MAP, val);
            this._mapArr = cfg.mapArr;
        }

        public get mapArr():Array<Array<number>>{
            return this._mapArr;
        }
    }
}