module libra.utils.arrayUtil {
    
    /**
     * 在指定索引位置插入项
     * @param tarArray
     * @param items
     * @param index
     * @returns {boolean}
     *
     *    <code>
     *        var alphabet:Array<any> = ["a", "d", "e"];
     *        var parts:Array<any>    = ["b", "c"];
     *
     *        lcp.ArrayUtil.addItemsAt(alphabet, parts, 1);
     *        console.log(alphabet); // 输出 a,b,c,d,e
     *    </code>
     *
     */
    export function insertAt(tarArray: Array<any>, items: Array<any>, index: number = 0x7FFFFFFF): boolean {
        if(items.length == 0) return false;
        var args: Array<any> = items.concat();
        args.splice(0, 0, index, 0);
        tarArray.splice.apply(tarArray, args);
        return true;
    };
    
    /**
     * 删除数组中某一项
     * @param tarArray
     * @param item
     * @returns {number} 返回删除项个数
     *
     *    <code>
     *        var numberArray:Array<any> = [1, 2, 3, 7, 7, 7, 4, 5];
     *        console.log("删除 " + lcp.ArrayUtil.removeItem(numberArray, 7) + " 项."); // 输出 3
     *        console.log(numberArray);//输出 1,2,3,4,5
     *    </code>
     *
     */
    export function removeItem(tarArray: Array<any>, item: any): number {
        var i: number = tarArray.indexOf(item);
        var f: number = 0;
        while(i != -1) {
            tarArray.splice(i, 1);
            i = tarArray.indexOf(item, i);
            f++;
        }
        return f;
    };

    /**
     * 删除数组中的多项
     * @param tarArray
     * @param items
     * @returns {boolean}
     *
     * <code>
     *     var numberArray:Array<any> = [1, 2, 3, 7, 7, 7, 4, 5];
     *     lcp.ArrayUtil.removeItems(numberArray, [1, 3, 7, 5]);
     *     console.log(numberArray);//输出 2,4
     * </code>
     *
     */
    export function removeItems(tarArray: Array<any>, items: Array<any>): boolean {
        var removed: boolean = false;
        var l: number = tarArray.length;
        while(l--) {
            if(items.indexOf(tarArray[l]) > -1) {
                tarArray.splice(l, 1);
                removed = true;
            }
        }
        return removed;
    };

    /**
     * 只保留数组中指定的项目
     * @param tarArray
     * @param items
     * @returns {boolean}
     *
     * <code>
     *     var numberArray:Array<any> = [1, 2, 3, 7, 7, 7, 4, 5];
     *     lcp.ArrayUtil.removeItems(numberArray, [2, 4]);
     *     console.log(numberArray);//输出 2,4
     * </code>
     *
     */
    export function retainItems(tarArray: Array<any>, items: Array<any>): boolean {
        var removed: boolean = false;
        var l: number = tarArray.length;
        while(l--) {
            if(items.indexOf(tarArray[l]) == -1) {
                tarArray.splice(l, 1);
                removed = true;
            }
        }
        return removed;
    };
    
    /**
     * 查找数组中包含项的个数
     * @param inArray
     * @param item
     * @returns {number}
     *
     *    <code>
     *        var numberArray:Array<any> = [1, 2, 3, 7, 7, 7, 4, 5];
     *        console.log("数组包含 " + lcp.ArrayUtil.contains(numberArray, 7) + " 个7.");//输出 3
     *    </code>
     *
     */
    export function contains(inArray: Array<any>, item: any): number {
        var i: number = inArray.indexOf(item, 0);
        var t: number = 0;
        while(i != -1) {
            i = inArray.indexOf(item, i + 1);
            t++;
        }
        return t;
    };

    /**
     * 数组是否包含所有指定项
     * @param inArray
     * @param items
     * @returns {boolean}
     *
     *    <code>
     *        var numberArray:Array<any> = [1, 2, 3, 4, 5];
     *        console.log(lcp.ArrayUtil.containsAll(numberArray, [1, 3, 5]));//输出 true
     *    </code>
     *
     */
    export function containsAll(inArray: Array<any>, items: Array<any>): boolean {
        var l: number = items.length;

        while(l--)
            if(inArray.indexOf(items[l]) == -1)
                return false;

        return true;
    };

    /**
     * 数组中是否包含指定项中任何一个元素
     * @param inArray
     * @param items
     * @returns {boolean}
     *
     *    <code>
     *        var numberArray:Array<any> = [1, 2, 3, 4, 5];
     *        console.log(lcp.ArrayUtil.containsAny(numberArray, [9, 3, 6]));//输出 true
     *    </code>
     *
     */
    export function containsAny(inArray: Array<any>, items: Array<any>): boolean {
        var l: number = items.length;
        while(l--)
            if(inArray.indexOf(items[l]) > -1)
                return true;

        return false;
    };
    
    export function rotate(ary: Array<any>): Array<any> {
        var m: number = ary.length;
        if(m > 0) {
            var n: number = ary[0].length;
            var result: Array<any> = [];
            for(i = 0;i < n;i += 1) {
                result[i] = [];
                for(j = 0;j < m;j += 1) {
                    result[i][j] = 0;
                }
            }
            for(var i: number = 0;i < m;i += 1) {
                for(var j: number = 0;j < n;j += 1) {
                    //result[j][m - i - 1] = ary[i][j];
                    result[j][i] = ary[i][j];
                }
            }
            return result;
        }
        return null;
    }
		
}
