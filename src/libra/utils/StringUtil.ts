module libra.utils.stringUtil {
    
	/**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    export function trimSpace(str: string): string {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    };
    
    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    export function getStringLength(str:string):number {
        var strArr = str.split("");
        var length = 0;
        for(var i = 0;i < strArr.length;i++) {
            length += isChinese(strArr[i]) ? 2 : 1;
        }
        return length;
    };

    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    export function isChinese(str:string):boolean {
        var reg = /^[u4E00-u9FA5]+$/;
        return !reg.test(str);
    };
}
