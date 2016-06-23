module sim.model {

    export class FurnitureManager extends DataManager<FurnitureData> {

        private static _instance:FurnitureManager;

        public constructor() {
            super();
        }

        public static get instance():FurnitureManager{
            if (!FurnitureManager._instance) {
                FurnitureManager._instance = new FurnitureManager();
            }
            return FurnitureManager._instance;
        }
    }
}