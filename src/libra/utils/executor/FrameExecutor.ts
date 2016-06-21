module libra.utils.executor {
	/**
	 * 分帧处理
	 * @author 
	 *
	 */
    export class FrameExecutor implements IExecutor {

        private _delayFrame: number;
        private _functions: Array<Array<any>>;
        private _frameDelay: FrameDelay;

        /**
         * 构造函数
         * @param delayFrame 延迟的帧数
         */
        public constructor(delayFrame: number) {
            this._delayFrame = delayFrame;
            this._frameDelay = new FrameDelay();
            this._functions = new Array();
        }

        /**
         * 注册要分帧处理的函数
         * @param $func 函数
         * @param $thisObj 函数所属对象
         */
        public regist(func: Function, thisObj: any): void {
            this._functions.push([func, thisObj]);
        }

        /**
         * 执行
         */
        public execute(): void {
            if(this._functions.length) {
                var arr: Array<any> = this._functions.shift();
                arr[0].call(arr[1]);
                this._frameDelay.delayCall(this._delayFrame, this.execute, this);
                libra.tick.Tick.getInstance().addItem(this._frameDelay);
            } else {
                libra.tick.Tick.getInstance().removeItem(this._frameDelay);
            }
        }
    }

    class FrameDelay implements libra.tick.ITickable {

        private _func: Function;

        private _thisObj: any;

        private _delayFrame: number;

        private _curFrame: number;

        public constructor() {

        }
        
        /**
         * 每帧调用该方法
         * @param	interval 距离上一次被调用该方法的时间间隔，单位毫秒
         */
        public tick(dt: number): void {
            if(this._curFrame++ >= this._delayFrame) {
                this._func.call(this._thisObj);
            }
        }

        public isTickable(): boolean {
            return true;
        }

        /**
         * 延迟处理
         * @param delayFrame 延迟帧数
         * @param func 延迟执行的函数
         * @param thisObj 延迟执行的函数的所属对象
         */
        public delayCall(delayFrame: number, func: Function, thisObj: any): void {
            this._delayFrame = delayFrame;
            this._func = func;
            this._thisObj = thisObj;
            this._curFrame = 0;
        }
    }
}
