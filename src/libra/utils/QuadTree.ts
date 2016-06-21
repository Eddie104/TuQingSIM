module libra.utils {
	/**
	 *
	 * @author 
	 *
	 */
    export class QuadTree {

        private _q1: QuadTree;

        private _q2: QuadTree;

        private _q3: QuadTree;

        private _q4: QuadTree;

        private _parent: QuadTree;

        private _root: QuadTree;

        private _rect: egret.Rectangle;

        private _data: Array<any> = [];

        public constructor(area: egret.Rectangle, deep: number = 6, myRoot: QuadTree = null) {
            this._rect = area;
            this._root = myRoot == null ? this : myRoot;

            this.createChildren(deep);
        }

        private createChildren(deep: number) {
            if(deep == 0) return;
        
            var hw: number = this._rect.width / 2;
            var hh: number = this._rect.height / 2;
            
            var rect: egret.Rectangle = this._rect;
            var root: QuadTree = this._root;
            this._q1 = new QuadTree(new egret.Rectangle(rect.x + hw, rect.y, hw, hh), deep - 1, root);
            this._q2 = new QuadTree(new egret.Rectangle(rect.x + hw, rect.y + hh, hw, hh), deep - 1, root);
            this._q3 = new QuadTree(new egret.Rectangle(rect.x, rect.y + hh, hw, hh), deep - 1, root);
            this._q4 = new QuadTree(new egret.Rectangle(rect.x, rect.y, hw, hh), deep - 1, root);
        
            this._q1._parent = this._q2._parent = this._q3._parent = this._q4._parent = this;
        }
        
        public get hasChildren():boolean {
            if(this._q1 == null) return false;
            if(this._q2 == null) return false;
            if(this._q3 == null) return false;
            if(this._q4 == null) return false;
            return true;
        }
        
        public add(v: any, x: number, y: number): QuadTree {
            if(!this.isIn(x, y))
                return null;
        
            if(this.hasChildren) {
                return this._q1.add(v, x, y) || this._q2.add(v, x, y) || this._q3.add(v, x, y) || this._q4.add(v, x, y);
            } else {
                this._data.push(v);
                return this;
            }
        }
        
        public isIn(x: number, y: number): boolean {
            var rect: egret.Rectangle = this._rect;
            var b: boolean = (isNaN(x) || x >= rect.x && x < rect.right);
            var b2: boolean = (isNaN(y) || y >= rect.y && y < rect.bottom);
            return (isNaN(x) || x >= rect.x && x < rect.right) && (isNaN(y) || y >= rect.y && y < rect.bottom);
        }
        
        public remove(v: any, x: number = NaN, y: number = NaN): QuadTree {
            if(!this.isIn(x, y))
                return null;
        
            if(this.hasChildren) {
                return this._q1.remove(v, x, y) || this._q2.remove(v, x, y) || this._q3.remove(v, x, y) || this._q4.remove(v, x, y);
            } else {
                var index: number = this._data.indexOf(v);
                if(index != -1) {
                    this._data.splice(index, 1);
                    return this;
                } else {
                    return null;
                }
            }
        }
        
        /**
         * 检测是否还在当前区间内，并返回新的区间
         */ 
        public reinsert(v: any, x: number, y: number): QuadTree {
            if(!this.isIn(x, y)) {
                var result: QuadTree = this._root.add(v, x, y);
                if(result) {
                    this.remove(v);
                    return result;
                }
            }
            return this;
        }
        
        /**
         * 获得一个范围内的所有数据
         */ 
        public getDataInRect(rect: egret.Rectangle): Array<any> {
            if(!this._rect.intersects(rect))
                return [];
            var result: Array<any> = this._data.concat();
            if(this.hasChildren) {
                result.push.apply(null, this._q1.getDataInRect(rect));
                result.push.apply(null, this._q2.getDataInRect(rect));
                result.push.apply(null, this._q3.getDataInRect(rect));
                result.push.apply(null, this._q4.getDataInRect(rect));
            }
            return result;
        }
    }
}
