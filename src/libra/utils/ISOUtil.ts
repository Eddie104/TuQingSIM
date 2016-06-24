module libra.utils {

    export class ISOUtil {

        private static _wh: number;

        private static _width: number;

        private static _height: number;

        private static _topPoint: egret.Point = new egret.Point();

        /**
         * 格子长宽比
         */
        public static get wh(): number {
            return ISOUtil._wh;
        }

        /**
         * 格子宽度
         */
        public static get width(): number {
            return ISOUtil._width;
        }

        /**
         * 格子高度
         */
        public static get height(): number {
            return ISOUtil._height;
        }

        public static setTopPoint(x: number, y: number): void {
            ISOUtil._topPoint.x = x;
            ISOUtil._topPoint.y = y;
        }

        public static getTopPoint(): egret.Point {
            return ISOUtil._topPoint;
        }

        /**
         * 设置单个格子的大小
         */
        public static setContentSize(w: number, h: number): void {
            ISOUtil._width = w;
            ISOUtil._height = h;
        }

        /**
          * 获得屏幕上点的方块索引坐标 
          * @param p
          * @return 
          */
        public static getItemPointAtPoint(p: egret.Point): egret.Point {
            p = ISOUtil.trans45To90(p);
            return new egret.Point(MathUtil.int(p.x / ISOUtil.width), MathUtil.int(p.y / ISOUtil.height));
        }

		/**
		 * 获得鼠标位置所在方块的索引值
		 * @param	mouseP
		 * @return
		 */
        public static getItemIndex(mouseP: egret.Point): egret.Point {
            mouseP = mouseP.subtract(ISOUtil._topPoint);
            var row: number = mouseP.y / ISOUtil.height - mouseP.x / ISOUtil.width;
            var col: number = mouseP.x / ISOUtil.width + mouseP.y / ISOUtil.height;
            row = row < 0 ? -1 : row;
            col = col < 0 ? -1 : col;
            //			row = row < 0 ? 0 : row;
            //			col = col < 0 ? 0 : col;
            return new egret.Point(MathUtil.int(col), MathUtil.int(row));
        }

		/**
		 * 根据方块的索引值获取方块的屏幕坐标
		 * @param	index
		 * @return
		 */
        public static getItemPos(row: number, col: number): egret.Point {
            return new egret.Point((col - row) * (ISOUtil.width * .5) + ISOUtil._topPoint.x, (col + row) * (ISOUtil.height * .5) + ISOUtil._topPoint.y);
        }

		/**
		 * 获得鼠标位置所在墙面方块的索引值
		 * @param	mouseP
		 * @return
		 */
        public static getItemIndexOnWall(mouseP: egret.Point, topPoint: egret.Point): egret.Point {
            mouseP = mouseP.subtract(topPoint);
            var col: number = mouseP.x / ISOUtil.height;
            var row: number = mouseP.y / ISOUtil.height - mouseP.x / ISOUtil.width;
            return new egret.Point(MathUtil.int(col), MathUtil.int(row));
        }

        public static getItemPosOnWall(row: number, col: number): egret.Point {
            return new egret.Point(ISOUtil.height * col, ISOUtil.height * row + ISOUtil.height * .5 * col);
        }

		/**
		 * 从45度显示坐标换算为90度数据坐标
		 * @param p
		 * @return 
		 */
        public static trans45To90(p: egret.Point): egret.Point {
            return new egret.Point(p.x + p.y * ISOUtil.wh, p.y - p.x / ISOUtil.wh);
        }

		/**
		 * 从90度数据坐标换算为45度显示坐标
		 * @param p
		 * @return 
		 * 
		 */
        public static trans90To45(p: egret.Point): egret.Point {
            return new egret.Point((p.x - p.y * ISOUtil.wh) * .5, (p.x / ISOUtil.wh + p.y) * .5);
        }
    }
}