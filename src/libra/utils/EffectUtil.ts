module libra.utils.effectUtil {
    
    /**
     * 抖动对象特效，类似ios密码输入错误的特效
     */ 
    export function shakeObj(obj: egret.DisplayObject, time:number = 80): void {
        var oldX: number = obj.x;
        egret.Tween.get(obj).to({ x: obj.x - 10 }, time).call(() => {
            egret.Tween.get(obj).to({ x: obj.x + 20 }, time).call(()=>{
                egret.Tween.get(obj).to({ x: obj.x - 20 }, time).call(()=>{
                    egret.Tween.get(obj).to({ x: obj.x + 20 }, time).call(()=>{
                        egret.Tween.get(obj).to({ x: oldX }, time);            
                    }, this);
                }, this);    
            }, this);
        }, this);
    };

    /**
     * 震动对象特效
     */ 
    export function shockObj(obj: egret.DisplayObject, time: number = 40): void {
        var oldX: number = obj.x;
        var oldY: number = obj.y;
        egret.Tween.get(obj).to({ x: obj.x - 10, y: obj.y }, time).call(() => {
            egret.Tween.get(obj).to({ x: obj.x + 20, y: obj.y }, time).call(() => {
                egret.Tween.get(obj).to({ x: obj.x, y: obj.y + 15 }, time).call(() => {
                    egret.Tween.get(obj).to({ x: obj.x, y: obj.y - 20 }, time).call(() => {
                        egret.Tween.get(obj).to({ x: obj.x, y: obj.y + 10 }, time).call(() => {
                            egret.Tween.get(obj).to({ x: oldX, y: oldY }, time);
                        }, this);
                    }, this);
                }, this);
            }, this);
        }, this);
    };


    /**
     * 文字打字机效果
     */
    export function typerEffect(obj: { appendText: Function }, content: string, interval: number = 200): void {
        var strArr: Array<string> = content.split("");
        var len: number = strArr.length;
        for(var i = 0;i < len;i++) {
            egret.setTimeout(function() {
                obj.appendText(strArr[this]);
            }, i, interval * i);
        }
    };
}
