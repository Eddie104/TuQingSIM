module sim.room {

    export class FloorTile extends sim.displayObject.CellBitmap {

        public constructor(resName: string) {
            super(RES.getRes(resName));
            this.anchorOffsetX = libra.utils.ISOUtil.height;
        }
    }
}