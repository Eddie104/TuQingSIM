module libra.utils.mathUtil {

    export class MathUtil {

        public static A: number = 180 / Math.PI;
        public static B: number = Math.PI / 180;

        /**
         * 获取一个区间的随机数
         * @param from 最小值
         * @param end 最大值
         * @returns {number}
         */
        public static getRandom(from: number, end: number): number {
            from = MathUtil.min(from, end);
            end = MathUtil.max(from, end);
            return from + Math.random() * (end - from);
        }

        /**
         * 获取某点的夹角
         * 返回为弧度值
         */
        public static getPointAngle(x: number, y: number): number {
            return Math.atan2(y, x);
        }

        /**
         * 弧度转角度
         */
        public static R2A(r: number): number {
            return Math.floor(r * MathUtil.A);
        }

        /**
         * 角度转弧度
         */
        public static A2R(a: number): number {
            return a * MathUtil.B;
        }

        /**
         * 是否约等于0
         * @return
         */
        public static isApproximateZero(num: number): Boolean {
            return MathUtil.abs(num) < .001;
        }

        public static min(a: number, b: number): number {
            return a > b ? b : a;
        }

        public static max(a: number, b: number): number {
            return a > b ? a : b;
        }

        public static abs(a: number): number {
            return a > 0 ? a : 0 - a;
            //(i + (i >> 31)) ^ (i >> 31);
        }

        public static confine(value: number, min: number, max: number): number {
            return value < min ? min : (value > max ? max : value);
        }

        /**
         * Returns a random int number within a given range
         * @param	min
         * @param	max
         * @return
         */
        public static random(min: number, max: number): number {
            return Math.random() * (max - min + 1) + min;
        }

        /**
		 * 根据两点确定这两点连线的二元一次方程 y = ax + b或者 x = ay + b
		 * @param ponit1
		 * @param point2
		 * @param type		指定返回函数的形式。为0则根据x值得到y，不为0则根据y得到x
		 * 
		 * @return 由参数中两点确定的直线的二元一次函数
		 */
        public static getLineFunc(ponit1: egret.Point, point2: egret.Point, type: number = 0): any {
            var resultFuc: any;
            //先考虑两点在一条垂直于坐标轴直线的情况，此时直线方程为 y = a 或者 x = a 的形式
            if(ponit1.x == point2.x) {
                if(type) {
                    resultFuc = function(y: number): number { return ponit1.x; };
                } else {
                    throw new Error("两点所确定直线垂直于y轴，不能根据x值得到y值");
                }
                return resultFuc;
            } else if(ponit1.y == point2.y) {
                if(type) {
                    throw new Error("两点所确定直线垂直于y轴，不能根据x值得到y值");
                } else {
                    resultFuc = function(x: number): number { return ponit1.y; };
                }
                return resultFuc;
            }

            //当两点确定直线不垂直于坐标轴时直线方程设为 y = ax + b
            var a: number;
            // 根据
            // y1 = ax1 + b
            // y2 = ax2 + b
            // 上下两式相减消去b, 得到 a = ( y1 - y2 ) / ( x1 - x2 ) 
            a = (ponit1.y - point2.y) / (ponit1.x - point2.x);

            var b: number;
            //将a的值代入任一方程式即可得到b
            b = ponit1.y - a * ponit1.x;
            //把a,b值代入即可得到结果函数
            resultFuc = type ? function(y: number): number { return (y - b) / a; } : function(x: number): number { return a * x + b; };
            return resultFuc;
        }

        /**
		 * 得到两点间连线的斜率 
		 * @param ponit1	
		 * @param point2
		 * @return 			两点间连线的斜率 
		 * 
		 */
        public static getSlope(ponit1: egret.Point, point2: egret.Point): number {
            return (point2.y - ponit1.y) / (point2.x - ponit1.x);
        }
        
        /**
        * 判断一个数是否为偶数
        * @param value 数字
        * @returns {boolean}
        *
        *    <code>
        *        console.log(lcp.NumberUtil.isEven(7)); // 输出 false
        *        console.log(lcp.NumberUtil.isEven(12)); // 输出 true
        *    </code>
        *
        */
        public static isEven(value: number): boolean {
            return (value & 1) == 0;
        }

        /**
         * 判断一个数是否为奇数
         * @param value 数字
         * @returns {boolean}
         *
         *    <code>
         *        console.log(lcp.NumberUtil.isOdd(7)); // 输出 true
         *        console.log(lcp.NumberUtil.isOdd(12)); // 输出 false
         *    </code>
         */
        public static isOdd(value: number): boolean {
            return !MathUtil.isEven(value);
        }

        /**
         * 判断是否数字
         * @param value
         * @returns {boolean}
         */
        public static isNumber(value: any): Boolean {
            return typeof (value) === "number" && !isNaN(value);
        }

        /**
         * 判断一个数是否是整数
         * @param value
         * @returns {boolean}
         *
         *    <code>
         *        console.log(lcp.NumberUtil.isInteger(13)); // 输出 true
         *        console.log(lcp.NumberUtil.isInteger(1.2345)); // 输出 false
         *    </code>
         */
        public static isInteger(value: number): boolean {
            return (value % 1) == 0;
        }

        /**
         * 取整
         * @param value
         * @returns {number}
         */
        public static int(value: number): number {
            return value >> 0;
        }

        /**
         * 判断一个数是否为质数
         * @param value
         * @returns {boolean}
         *
         *    <code>
         *        console.log(lcp.NumberUtil.isPrime(13)); // 输出 true
         *        console.log(lcp.NumberUtil.isPrime(4)); // 输出 false
         *    </code>
         */
        public static isPrime(value: number): boolean {
            if(value == 1 || value == 2)
                return true;

            if(MathUtil.isEven(value))
                return false;

            var s: number = Math.sqrt(value);
            for(var i: number = 3;i <= s;i++)
                if(value % i == 0)
                    return false;

            return true;
        }

        /**
         * 获取小数点后几位,四舍五入
         * @param value
         * @param place
         * @returns {number}
         *
         *    <code>
         *        console.log(lcp.NumberUtil.roundToPlace(3.14159, 2)); // 输出 3.14
         *        console.log(lcp.NumberUtil.roundToPlace(3.14159, 3)); // 输出 3.142
         *    </code>
         *
         */
        public static roundDecimalToPlace(value: number, place: number = 0): number {
            var p: number = Math.pow(10, place);

            return Math.round(value * p) / p;
        }

        /**
         * 循环获取数值
         * @param index
         * @param length
         * @returns {number}
         *
         *    <code>
         *        var colors:Array<ant> = ["红", "绿", "蓝"];
         *        console.log(colors[lcp.NumberUtil.loopIndex(2, colors.length)]); // 输出 蓝
         *        console.log(colors[lcp.NumberUtil.loopIndex(4, colors.length)]); // 输出 绿
         *        console.log(colors[lcp.NumberUtil.loopIndex(-6, colors.length)]); // 输出 红
         *    </code>
         *
         */
        public static loopIndex(index: number, length: number = 0): number {
            if(index < 0)
                index = length + index % length;

            if(index >= length)
                return index % length;

            return index;
        }

        /**
         * 在区间内是否包含一个值
         * @param value
         * @param firstValue
         * @param secondValue
         * @returns {boolean}
         *
         *    <code>
         *        console.log(lcp.NumberUtil.isBetween(3, 0, 5)); // 输出 true
         *        console.log(lcp.NumberUtil.isBetween(7, 0, 5)); // 输出 false
         *    </code>
         *
         */
        public static isBetween(value: number, firstValue: number, secondValue: number): boolean {
            return !(value < Math.min(firstValue, secondValue) || value > Math.max(firstValue, secondValue));
        }

        /**
         * 在区间内就输出该值,不在就输入与之较近的值
         * @param value
         * @param firstValue
         * @param secondValue
         * @returns {number}
         *
         *    <code>
         *        console.log(lcp.NumberUtil.constrain(3, 0, 5)); // 输出 3
         *        console.log(lcp.NumberUtil.constrain(7, 0, 5)); // 输出 5
         *    </code>
         *
         */
        public static constrain(value: number, firstValue: number, secondValue: number): number {
            return Math.min(Math.max(value, Math.min(firstValue, secondValue)), Math.max(firstValue, secondValue));
        }

        /**
         * 两数区间创建等间距数值数组
         * @param begin 开始数
         * @param end 结束数
         * @param steps 间距
         * @returns {Array<any>}
         *
         *    <code>
         *        console.log(lcp.NumberUtil.createStepsBetween(0, 5, 4)); // 输出 1,2,3,4
         *        console.log(lcp.NumberUtil.createStepsBetween(1, 3, 3)); // 输出 1.5,2,2.5
         *    </code>
         *
         */
        public static createStepsBetween(begin: number, end: number, steps: number): Array<any> {
            steps++;

            var i: number = 0;
            var stepsBetween: Array<any> = [];
            var increment: number = (end - begin) / steps;

            while(++i < steps)
                stepsBetween.push((i * increment) + begin);

            return stepsBetween;
        }

        /**
         * 一个值从一个坐标空间映射到另一个
         * @param value
         * @param min1
         * @param max1
         * @param min2
         * @param max2
         * @returns {number}
         *
         *    <code>
         *        console.log(lcp.NumberUtil.map(0.75, 0, 1, 0, 100)); // 输出 75
         *    </code>
         *
         */
        public static map(value: number, min1: number, max1: number, min2: number, max2: number): number {
            return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
        }

        /**
         * 加权平均值
         * @param value
         * @param dest
         * @param n
         * @returns {number}
         */
        public static getWeightedAverage(value: number, dest: number, n: number): number {
            return value + (dest - value) / n;
        }

        /**
         * 格式化数字为字符串
         * @param value
         * @param kDelim
         * @param minLength
         * @param fillChar
         * @returns {string}
         *
         *    <code>
         *        console.log(lcp.NumberUtil.format(1234567, ",", 8)); // 输出 01,234,567
         *    </code>
         *
         */
        public static format(value: number, kDelim: string = ",", minLength: number = 0, fillChar: string = "0"): string {
            var remainder: number = value % 1;
            var num: string = Math.floor(value).toString();
            var len: number = num.length;

            if(minLength != 0 && minLength > len) {
                minLength -= len;

                var addChar: string = fillChar || '0';

                while(minLength--)
                    num = addChar + num;
            }

            if(kDelim != null && num.length > 3) {
                var totalDelim: number = Math.floor(num.length / 3);
                var totalRemain: number = num.length % 3;
                var numSplit: Array<any> = num.split('');
                var i: number = -1;

                while(++i < totalDelim)
                    numSplit.splice(totalRemain + (4 * i), 0, kDelim);

                if(totalRemain == 0)
                    numSplit.shift();

                num = numSplit.join('');
            }

            if(remainder != 0)
                num += remainder.toString().substr(1);

            return num;
        }

        /**
         * 格式化数字为货币形式
         * @param value
         * @param forceDecimals
         * @param kDelim
         * @returns {string}
         *
         *    <code>
         *        console.log(lcp.NumberUtil.formatCurrency(1234.5)); // 输出 "1,234.50"
         *    </code>
         *
         */
        public static formatCurrency(value: number, forceDecimals: boolean = true, kDelim: string = ","): string {
            var remainder: number = value % 1;
            var currency: string = MathUtil.format(Math.floor(value), kDelim);

            if(remainder != 0 || forceDecimals)
                currency += remainder.toFixed(2).substr(1);

            return currency;
        }

        /**
         * 数字转英文序列后缀
         * @param value
         * @returns {string}
         *
         *    <code>
         *        console.log(32 + lcp.NumberUtil.getOrdinalSuffix(32)); // 输出 32nd
         *    </code>
         *
         */
        public static getOrdinalSuffix(value: number = 0): string {
            if(value >= 10 && value <= 20)
                return 'th';

            if(value == 0)
                return '';

            switch(value % 10) {
                case 3:
                    return 'rd';
                case 2:
                    return 'nd';
                case 1:
                    return 'st';
                default:
                    return 'th';
            }
        }

        /**
         * 一位数字补0操作
         * @param value
         * @returns {string}
         *
         *    <code>
         *        console.log(lcp.NumberUtil.addLeadingZero(7)); // 输出 07
         *        console.log(lcp.NumberUtil.addLeadingZero(11)); // 输出 11
         *    </code>
         *
         */
        public static addLeadingZero(value: number): string {
            return (value < 10) ? '0' + value : value.toString();
        }

    }
}
