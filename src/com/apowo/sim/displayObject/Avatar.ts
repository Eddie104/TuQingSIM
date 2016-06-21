module com.apowo.sim.displayObject {

    export class Avatar extends com.apowo.sim.displayObject.CellSprite implements libra.tick.ITickable {

        private _isTickable: boolean = true;

        public constructor() {
            super();
            var g:egret.Graphics = this.graphics;
            g.beginFill(0xff0000, 1);
            g.drawCircle(0, 0, 5);
            g.endFill();
        }

        public tick(dt: number): void {
            
        }

        public isTickable(): boolean {
            return this._isTickable;
        }

        public setTickable(val: boolean): void {
            this._isTickable = val;
        }

        protected onAddedToStage(evt: egret.Event): void {
            super.onAddedToStage(evt);

        }

        protected onRemovedFromStage(evt: egret.Event): void {
            super.onRemovedFromStage(evt);
        }

    }
}