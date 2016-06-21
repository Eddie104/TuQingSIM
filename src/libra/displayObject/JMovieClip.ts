module libra.displayObject {
	/**
	 *
	 * @author 
	 *
	 */
    export class JMovieClip extends JSprite implements libra.tick.ITickable {

        private _tickable: boolean = true;

        private _frameList: Array<JMCFrame>;
		
        /**
         * 循环次数，默认是-1，无限循环
         */
        private _loops: number = -1;
		
        /**
         * 每帧需要的毫秒数，理论上的值
         */
        private _rateTimer: number = 0;
		
        /**
         * 在Tick方法中，frameTimer减去每帧间隔时间internal
         * 如果小于0,说明间隔时间大于每帧需要的时间,也就是需要渲染图片了.
         * 渲染完毕后，再加上理论上的每帧需要的毫秒数，如果还是小于0，说明还需要渲染一次
         */
        private _frameTimer: number = 0;
		
        /**
         * 当前播放到第几帧
         */
        private _curFrame: number = 0;
    		
        /**
         * 总共的帧数
         */
        private _numFrame: number = 0;
    		
        /**
         * 是否在播放中
         */
        private _isPlaying: boolean;
    		
        /**
         * 真正的Bitmap，存放BitmapData
         */
        private _baseBitmap: egret.Bitmap;

        public constructor(private _frameRate: number = 10) {
            super();
            this.frameRate = _frameRate;
            this._baseBitmap = new egret.Bitmap();
            this.addChild(this._baseBitmap);
        }

        public get frameRate(): number {
            return this._frameRate;
        }

        public set frameRate(val: number) {
            this._frameRate = val;
            this._rateTimer = 1000 / val;
        }
		
		/**
         * @language en_US
         * Specifies whether this object use precise hit testing by checking the alpha value of each pixel.If pixelHitTest
         * is set to true,the transparent area of the bitmap will be touched through.<br/>
         * Note:If the image is loaded from cross origin,that we can't access to the pixel data,so it might cause
         * the pixelHitTest property invalid.
         * @default false
         * @version Egret 2.4
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 是否开启精确像素碰撞。设置为true显示对象本身的透明区域将能够被穿透。<br/>
         * 注意：若图片资源是以跨域方式从外部服务器加载的，将无法访问图片的像素数据，而导致此属性失效。
         * @default false
         * @version Egret 2.4
         * @platform Web,Native
         */
        public get pixelHitTest(): boolean {
            return this._baseBitmap.pixelHitTest;
        }

        public set pixelHitTest(value: boolean) {
            this._baseBitmap.pixelHitTest = value;
        }

        public hitTestPoint(x: number, y: number, shapeFlag?: boolean): boolean {
            return this._baseBitmap.hitTestPoint(x, y, shapeFlag);
        }

        public gotoAndPlay(target: string | number): void {
            this.gotoFrame(target);
            this.play();
        }

        public play(): void {
            this._isPlaying = true;
        }

        public gotoAndStop(target: string | number): void {
            this.gotoFrame(target);
            this.stop();
        }

        public stop(): void {
            this.pause();
            this.curFrame = 0;
        }

        public pause(): void {
            this._frameTimer = 0;
            this._isPlaying = false;
        }

        public isPlaying(): Boolean {
            return this._isPlaying;
        }
        
        /**
		 * 添加一个函数到某帧执行，如果位于frame指定的帧上已经添加了fun指定的函数，即使参数不同，也不会重复添加，将返回flase
		 * @param	target 执行该函数的帧索引或者标签，索引时从0开始到(包含)numFrame - 1，如果是就标签必须存在
		 * @param	fun  目标函数,如果目标函数时控制语句: stop,play,gotoAndStop,gotoAndPlay 将被克隆函数copy.duplicate,clone等复制给新对象，其它函数一律不会复制到新对象
		 * @param	args  执行函数需要的参数
		 * @param   disposableEnable  该函数是否为一次性的，执行后就即刻自动删除
		 */
        public addFrameAction(target: number | string, fun: Function, args: Array<any> = null, thisObj?: any, disposableEnable: Boolean = false): void {
            var frame: number = this.getFrame(target);
            frame = libra.utils.mathUtil.MathUtil.max(0, libra.utils.mathUtil.MathUtil.min(frame, this._numFrame - 1));
            var mcFrame: JMCFrame = this._frameList[frame];
            mcFrame.addFun(fun, args, thisObj, disposableEnable);
        }
		
        /**
         * 移除已经添加到位于frame参数指定的帧上的fun函数
         * @param	frame  函数位于的帧
         * @param	fun  要删除的函数
         */
        public removeFrameAction(target: number | string, fun: Function): void {
            var frame: number = this.getFrame(target);
            frame = libra.utils.mathUtil.MathUtil.max(0, libra.utils.mathUtil.MathUtil.min(frame, this._numFrame - 1));
            var mcFrame: JMCFrame = this._frameList[frame];
            mcFrame.removeFun(fun);
        }

        public tick(dt: number): void {
            if(this._isPlaying) {
                if(this._numFrame > 0) {
                    if(this._loops == 0) return;
                    this._frameTimer -= dt;
                    while(this._frameTimer < 0) {
                        if(this._curFrame >= this._numFrame - 1) {
                            if(this._loops > 0) this._loops--;
                            if(this._loops == 0) {
                                this._frameTimer = 0;
                                //dispatchEvent(new Event(Event.COMPLETE));
                                return;
                            } else {
                                this.curFrame = 0;
                            }
                        } else {
                            this.curFrame = this.curFrame + 1;
                        }
                        this._frameTimer += this._rateTimer;
                    }
                }
            }
        }

        public isTickable(): boolean {
            return this._tickable;
        }

        public setTickable(val: boolean): void {
            this._tickable = !!val;
        }

        public set frameList(frameList: Array<JMCFrame>) {
            this._frameList = frameList;
            this._numFrame = this._frameList.length;
            if(this._numFrame > 0)
                this.curFrame = 0;
        }

        public set loops(val: number) {
            this._loops = val;
        }

        protected set curFrame(curFrame: number) {
            this._curFrame = libra.utils.mathUtil.MathUtil.max(0, libra.utils.mathUtil.MathUtil.min(this._curFrame, this._numFrame - 1));
            var frame: JMCFrame = this._frameList[this._curFrame];
            frame.doFun();

            var val: egret.BitmapData | egret.Texture = frame.texture;
            if(val instanceof egret.Texture) {
                this._baseBitmap.texture = <egret.Texture>val;
            } else {
                this._baseBitmap.bitmapData = <egret.BitmapData>val;
            }
            this._baseBitmap.x = frame.x;
            this._baseBitmap.y = frame.y;
        }
		
        /**
         * 跳转到某一帧
         * @param	target 只能是帧数，int类型或者帧标签，String类型
         */
        private gotoFrame(target: number | string): void {
            this.curFrame = this.getFrame(target);
        }

        private getFrame(target: any): number {
            var frame: number = -1;
            if(isNaN(target)) {
                var label: string = target;
                var l: number = this._frameList.length;
                for(var i: number = 0;i < l;i += 1) {
                    if(this._frameList[i].label == label) {
                        frame = i;
                        break;
                    }
                }
            } else {
                frame = <number>target;
            }
            if(frame == -1) {
                //throw new Error('target不能为-1或者不存在' + target + '帧标签');
                return - 1;
            }
            return frame;
        }
		
        protected onAddedToStage(evt: egret.Event): void {
            super.onAddedToStage(evt);
            libra.tick.Tick.getInstance().addItem(this);
        }

        protected onRemovedFromStage(evt: egret.Event): void {
            super.onRemovedFromStage(evt);
            libra.tick.Tick.getInstance().removeItem(this);
        }
		
    }
}
