module libra.utils.orderUtil {

    export enum OrderByType {
        /**
         * 不区分大小写的排序
         */
        CASEINSENSITIVE = 1,
        /**
         * 降序排序
         */
        DESCENDING = 2,
        /**
         * 唯一排序要求
         */
        UNIQUESORT = 4,
        /**
         * 指定排序返回的数组包含数组索引
         */
        RETURNINDEXEDARRAY = 8,
        /**
         * 数值（而不是字符串）排序
         */
        NUMERIC = 16
    }
    
    /**
     * 降序
     * @param a
     * @param b
     * @returns {number}
     */
    export function desc(a: Object, b: Object): number {
        if(a === b) {
            return 0;
        }
        if(typeof a === typeof b) {
            return a > b ? -1 : 1;
        }
        return typeof a > typeof b ? -1 : 1;
    }

    /**
     * 升序
     * @param a
     * @param b
     * @returns {number}
     */
    export function asc(a: Object, b: Object): number {
        if(a === b) {
            return 0;
        }
        if(typeof a === typeof b) {
            return a < b ? -1 : 1;
        }
        return typeof a < typeof b ? -1 : 1;
    }

    /**
     * 获取数组中选定值索引值
     * @param arr
     * @param val
     * @returns {number}
     */
    export function indexOf(arr: Array<any>, val: any): number {
        for(var i = 0;i < arr.length;i++) {
            if(arr[i] == val) return i;
        }
        return -1;
    }

    /**
     * 获取数组的索引值数组
     * @param arr
     * @returns {Array<any>}
     */
    export function index(arr: Array<any>): Array<any> {
        var temp_arr: Array<any> = [];
        for(var i = 0;i < arr.length;i++) {
            temp_arr[i] = i;
        }
        return temp_arr;
    }

    /**
     * 对数组中的元素进行排序
     * @param arr 待排序数组
     * @param orderBy 升序或降序,升序默认
     * @returns {Array<any>}
     */
    export function sort(arr: Array<any>, orderBy?: any): Array<any> {
        if(!arr) return;
        var temp_arr: Array<any> = arr;
        if(orderBy) {
            if(typeof orderBy === 'function') {
                temp_arr.sort(orderBy);
            } else {
                if(orderBy == OrderByType.DESCENDING) {
                    temp_arr.sort(desc);
                } else if(orderBy == OrderByType.RETURNINDEXEDARRAY) {
                    index(temp_arr);
                } else {
                    temp_arr.sort(asc);
                }
            }
        } else {
            temp_arr.sort(asc);
        }
        return temp_arr;
    }

    /**
     * 根据数组中的一个或多个字段对数组中的元素进行排序。
     * @param arr 待排序数组
     * @param fieldName 按字典中的key排序
     * @param orderBy 升序/降序,升序默认
     */
    export function sortOn(arr: Array<any>, fieldName: string, orderBy?: any): Array<any> {
        if(!arr) return;
        var temp_arr: Array<any> = arr;
        var order_by = (o, p) => {
            var a: any, b: any;
            if(typeof o === "object" && typeof p === "object" && o && p) {
                a = o[fieldName];
                b = p[fieldName];
                if(orderBy) {
                    if(typeof orderBy === 'function') {
                        return orderBy;
                    } else {
                        if(orderBy == OrderByType.DESCENDING) {
                            return desc(a, b);
                        } else if(orderBy == OrderByType.RETURNINDEXEDARRAY) {
                            index(temp_arr);
                        } else {
                            return asc(a, b);
                        }
                    }
                } else {
                    return asc(a, b);
                }
            }
        };
        temp_arr.sort(order_by);
        return temp_arr;
    }
}
