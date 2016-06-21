/**
 * Created by 鸿杰 on 2015/10/26.
 */
module libra.tick{
    
     export class Tick{

        private static _instance:Tick;

        /**
         * 是否暂停。默认不暂停。
         * @private
         * @default false
         */
        private _pause:boolean;

        /**
         * 需要注册EnterFrame事件的ITickable的集合
         * @private
         */
        private _tickabledList:ITickable[];

        /**
         * 速度系数
         * 可由此实现慢速播放
         * @private
         */
        //public var speed:Number = 1.0;
//        private _frameCounter: number = 0;

        public constructor(){
            this._tickabledList = [];
            this._pause = false;
            egret.Ticker.getInstance().register(this.advanceTime, this);
         }

        /**
         * 增加一个需要注册EnterFrame事件的ITickable
         * @param	r ITickable
         */
        public addItem(item:ITickable):boolean {
            if (this.hasItem(item)) return false;
            this._tickabledList[this._tickabledList.length] = item;
            return true;
        }

        /**
         * 移除一个需要注册EnterFrame事件的ITickable
         * @param	r ITickable
         */
        public removeItem(item:ITickable):boolean {
            var index:number = this._tickabledList.indexOf(item);
            if (index != -1) {
                this._tickabledList.splice(index, 1);
                return true;
            }
            return false;
        }

        /**
         * 清除对象
         */
        public clearItem():void {
            this._tickabledList.length = 0;
        }

        /**
         * 判断该ITickable是否已经存在
         * @param	i 被判断的ITickable
         * @return Boolean
         */
        public hasItem(i:ITickable):boolean {
            return this._tickabledList.indexOf(i) != -1;
        }
        
        /**
         * 获取是否暂停信息
         * @return
         */
        public get pause(): boolean {
            return this._pause;
        }

        /**
         * 设置是否暂停。true：暂停。false：不暂停
         * @param	v
         */
        public set pause(v:boolean) {
            if (this._pause != v) this._pause = v;
        }

        /**
         * EnterFrame事件循环
         * @private
         * @param	e
         */
        private advanceTime(timeStamp:number):void {
            if (!this.pause) {
                //dt *= speed;
                //const tmp:int = getTimer();
                var tickable: ITickable;
                var tickabledList = this._tickabledList; 
                var i: number = tickabledList.length;
                while(--i > -1){
                    tickable = tickabledList[i];
                    if(tickable.isTickable()) tickable.tick(timeStamp);
                }
            }
//            if(DEBUG){
//                console.log("当前是到第几帧了呢?", ++this._frameCounter);
//            }
         }
        
        /**
         * 获取当前实例
         */ 
        public static getInstance():Tick{
            if(!this._instance){
                this._instance = new Tick();
            }
            return this._instance;
        }

    }
}
