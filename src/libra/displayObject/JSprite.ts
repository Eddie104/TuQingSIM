module libra.displayObject {

    export class JSprite extends egret.Sprite {

        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this)
        }
        
        // public removeSelf(): void {
        //     if(this.parent) {
        //         this.parent.removeChild(this);
        //     }
        // }

        // public addTo(parent: egret.DisplayObjectContainer, zorder?: number): JSprite {
        //     if(zorder) {
        //         parent.addChildAt(this, zorder);
        //     } else {
        //         parent.addChild(this);
        //     }
        //     return this;
        // }

        protected onAddedToStage(evt: egret.Event): void {
            this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
        }

        protected onRemovedFromStage(evt: egret.Event): void {
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
        }

    }
}
