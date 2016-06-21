module com.apowo.sim.model.data {

    /**
     * FurnitureData
     */
    export class FurnitureData extends Data {
        
        constructor() {
            super();
        }

        public set type(val:number){
            this._type = val;
        }
    }
}