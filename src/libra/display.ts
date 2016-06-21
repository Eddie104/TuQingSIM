module libra.display {

    export function createBitmap(resName: string): egret.Bitmap {
        return new egret.Bitmap(RES.getRes(resName));
    }
    
    export function getMain():egret.MainContext{
        return egret.MainContext.instance;
    }
    
    export function stageWidth():number{
        return getMain().stage.stageWidth;
    }
    
    export function stageHeight():number{
        return getMain().stage.stageHeight;
    }
    
    export function cx():number{
        return stageWidth() >> 1;
    }
    
    export function cy():number{
        return stageHeight() >> 1;
    }
}
