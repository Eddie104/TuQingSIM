module sim.model {

    /**
     * FurnitureData
     */
    export class FurnitureData extends Data {

        constructor() {
            super();
        }

        public set type(val: number) {
            this._type = val;
            var cfg = libra.utils.queryUtil.queryByType(sim.config.FURNITURE, 2);
            console.log(cfg);
        }
    }
}