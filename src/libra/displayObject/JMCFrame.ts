module libra.displayObject {
	/**
	 *
	 * @author 
	 *
	 */
    export class JMCFrame {

        private _funList: Array<FrameFun> = [];
    	
        /**
         * 构造函数
         */
        public constructor(private _index: number, private _texture: egret.Texture | egret.BitmapData, private _x: number = 0, private _y: number = 0, private _label: string = null) {

        }

        public get index(): number {
            return this._index;
        }

        public get texture(): egret.Texture | egret.BitmapData {
            return this._texture;
        }

        public get label(): string {
            return this._label;
        }

        public addFun(fun: Function, params?: Array<any>, thisObj?: any, disposeEnabled: Boolean = false): void {
            var frameFun: FrameFun = new FrameFun(fun, params, thisObj, disposeEnabled);
            if(this._funList.indexOf(frameFun) == -1)
                this._funList[this._funList.length] = frameFun;
        }

        public removeFun(fun: Function): void {
            var funList = this._funList;
            var l: number = funList.length;
            while(--l > -1) {
                if(funList[l].fun == fun) {
                    funList.splice(l, 1);
                    return;
                }
            }
        }

        public doFun(): void {
            var funList = this._funList;
            if(funList) {
                var list: Array<FrameFun> = funList.slice();
                var l: number = list.length;
                for(var i: number = 0;i < l;i += 1) {
                    list[i].doFun();
                    if(list[i].disposeEnabled) {
                        funList.splice(i, 1);
                    }
                }
            }
        }

        public get x(): number {
            return this._x;
        }

        public set x(val: number) {
            this._x = val;
        }

        public get y(): number {
            return this._y;
        }

        public set y(val: number) {
            this._y = val;
        }
    }
	
    class FrameFun {

        public constructor(private _fun: Function, private _params?: Array<any>, private _thisObj?:any, private _disposeEnabled: Boolean = false){
            
        }

        public get disposeEnabled(): Boolean {
            return this._disposeEnabled;
        }
        
        public get fun(): Function {
            return this._fun;
        }
    
        public doFun(): void {
            this._fun.apply(this._thisObj, this._params);
        }
    
//        public function dispose(): void {
//            this.fun = null;
//            this.params = null;
//        }
    }
}
