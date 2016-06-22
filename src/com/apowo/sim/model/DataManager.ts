module sim.model {

    export class DataManager<T extends Data> {

        protected _dataList: Array<T> = new Array<T>();

        public constructor() {

        }

        public addData(data: T): void {
            this._dataList.push(data);
        }

        public remoeDataByID(id: number): T {
            var dataList: Array<T> = this._dataList;
            for (var index = 0; index < dataList.length; index++) {
                var element: T = dataList[index];
                if (element.id == id) {
                    return dataList.splice(index, 1)[0];
                }
            }
        }

        public getDataByID(id: number): T {
            var dataList: Array<T> = this._dataList;
            for (var index = 0; index < dataList.length; index++) {
                var element: T = dataList[index];
                if (element.id == id) {
                    return element;
                }
            }
        }

    }
}