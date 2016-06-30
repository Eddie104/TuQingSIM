
module sim.model {

    /**
     * name
     */
    export class Data {

        protected _type: number;

        protected _id: number;

        protected _name: string;

        protected _description: string;

        constructor() {

        }

        public get type(): number {
            return this._type;
        }

        public set type(val: number) {
            
            this._type = val;
        }

        public get id(): number {
            return this._id;
        }

        public set id(val: number) {
            this._id = val;
        }

        public get name(): string {
            return this._name;
        }

        public set name(val: string) {
            this._name = val;
        }

        public get description(): string {
            return this.description;
        }

        public set description(val: string) {
            this._description = val;
        }
    }

}