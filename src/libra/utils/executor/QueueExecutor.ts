module libra.utils.executor {
	/**
	 * 队列执行
	 * @author 
	 *
	 */
    export class QueueExecutor implements IExecutor {

        private _callBack: Function;
        private _callBackTarget: any;
        private _functions: Array<Array<any>>;

        /**
         * 构造函数
         * @param callBack 此队列处理完成执行函数
         * @param callBackTarget 此队列处理完成执行函数所属对象
         */
        public constructor(callBack: Function = null, callBackTarget: any = null) {
            this._callBack = callBack;
            this._callBackTarget = callBackTarget;
            this._functions = new Array();
        }

        /**
         * 注册需要队列处理的函数
         * @param $func 函数
         * @param $thisObj 函数所属对象
         */
        public regist($func: Function, $thisObj: any): void {
            this._functions.push([$func, $thisObj]);
        }

        /**
         * 开始执行
         */
        public execute(): void {
            this.next();
        }

        /**
         * 执行下一个
         */
        private next(): void {
            if(this._functions.length) {
                var arr: Array<any> = this._functions.shift();
                arr[0].call(arr[1]);
                this.next();
            } else {
                if(this._callBack) {
                    this._callBack.call(this._callBackTarget);
                }
            }
        }
    }
}
