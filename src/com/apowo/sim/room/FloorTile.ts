module com.apowo.sim.room {

    export class FloorTile extends egret.Bitmap {

        public constructor(resName: string) {
            super(RES.getRes(resName));
            
            this.smoothing = false;
        }
    }
}