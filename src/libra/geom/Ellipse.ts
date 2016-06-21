module libra.geom {
	/**
	 *
	 * @author 
	 *
	 */
	export class Ellipse {

        private _x: number;
        private _y: number;
        private _width: number;
        private _height: number;

        /**
         * 创建一个椭圆类
         * @param x
         * @param y
         * @param width
         * @param height
         */
        public constructor(x: number, y: number, width: number, height: number) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        /**
         * x坐标
         * @returns {number}
         */
        public get x(): number {
            return this._x;
        }

        public set x(xPos: number) {
            this._x = xPos;
        }

        /**
         * y坐标
         * @returns {number}
         */
        public get y(): number {
            return this._y;
        }

        public set y(yPos: number) {
            this._y = yPos;
        }

        /**
         * 宽度
         * @returns {number}
         */
        public get width(): number {
            return this._width;
        }

        public set width(width: number) {
            this._width = width;
        }

        /**
         * 高度
         * @returns {number}
         */
        public get height(): number {
            return this._height;
        }

        public set height(height: number) {
            this._height = height;
        }

        /**
         * 中心点
         * @returns {egret.Point}
         */
        public get center(): egret.Point {
            return new egret.Point(this.x + this.width * 0.5, this.y + this.height * 0.5);
        }

        public set center(c: egret.Point) {
            this.x = c.x - this.width * 0.5;
            this.y = c.y - this.height * 0.5;
        }

        /**
         * 大小
         * @returns {egret.Point}
         */
        public get size(): egret.Point {
            return new egret.Point(this.width, this.height);
        }

        /**
         * 周长
         * @returns {number}
         */
        public get perimeter(): number {
            return (Math.sqrt(0.5 * (Math.pow(this.width, 2) + Math.pow(this.height, 2))) * Math.PI * 2) * 0.5;
        }

        /**
         * 面积
         * @returns {number}
         */
        public get area(): number {
            return Math.PI * (this.width * 0.5) * (this.height * 0.5);
        }

        /**
         * 查找x,y位置沿周长的椭圆度
         * @param degree
         * @returns {egret.Point}
         */
        public getPointOfDegree(degree: number): egret.Point {
            var radian: number = (degree - 90) * (Math.PI / 180);
            var xRadius: number = this.width * 0.5;
            var yRadius: number = this.height * 0.5;

            return new egret.Point(this.x + xRadius + Math.cos(radian) * xRadius, this.y + yRadius + Math.sin(radian) * yRadius);
        }

        /**
         * 查找一个点是否包含在椭圆周长内
         * @param point
         * @returns {boolean}
         */
        public containsPoint(point: egret.Point): boolean {
            var xRadius: number = this.width * 0.5;
            var yRadius: number = this.height * 0.5;
            var xTar: number = point.x - this.x - xRadius;
            var yTar: number = point.y - this.y - yRadius;

            return Math.pow(xTar / xRadius, 2) + Math.pow(yTar / yRadius, 2) <= 1;
        }

        /**
         * 是否相等
         * @param ellipse
         * @returns {boolean}
         */
        public equals(ellipse: Ellipse): boolean {
            return this.x == ellipse.x && this.y == ellipse.y && this.width == ellipse.width && this.height == ellipse.height;
        }

        /**
         * 克隆副本
         * @returns {lcp.Ellipse}
         */
        public clone(): Ellipse {
            return new Ellipse(this.x, this.y, this.width, this.height);
        }
	}
}
