module com.apowo.sim.displayObject {

    export class CellSprite extends libra.displayObject.JSprite implements ICellDisplayObject {

        protected _row: number;

        protected _col: number;

        public constructor() {
            super();
        }

        public setRowAndCol(row: number, col: number): void {
            this._row = row;
            this._col = col;
            var topPoint:egret.Point = libra.utils.ISOUtil.getTopPoint();
            var p:egret.Point =  libra.utils.ISOUtil.getItemPos(row, col);
            this.x = p.x;
            this.y = p.y;
        }

        public getRow(): number {
            return this._row;
        }

        public getCol(): number {
            return this._col;
        }

    }
}