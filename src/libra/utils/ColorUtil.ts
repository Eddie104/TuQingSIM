module libra.utils.colorUtil {
	
    /**
     * 将一个32位ARGB颜色值转换成一个十六进制字符形式
     * @param a 一个从0到255表示透明度的值。
     * @param r 一个从0到255表示红色的颜色值。
     * @param g 一个从0到255表示绿色的颜色值。
     * @param b 一个从0到255表示蓝色的颜色值。
     * @returns {string}
     *
     * <code>
     *     var hexColor : string = lcp.ColorUtil.getHexStringFromARGB(128, 255, 0, 255);
     *     console.log(hexColor); // 输出 80FF00FF
     * </code>
     */
    export function getHexStringFromARGB(a: number, r: number, g: number, b: number): string {
        var aa: string = a.toString(16);
        var rr: string = r.toString(16);
        var gg: string = g.toString(16);
        var bb: string = b.toString(16);
        aa = (aa.length == 1) ? '0' + aa : aa;
        rr = (rr.length == 1) ? '0' + rr : rr;
        gg = (gg.length == 1) ? '0' + gg : gg;
        bb = (bb.length == 1) ? '0' + bb : bb;
        return (aa + rr + gg + bb).toUpperCase();
    };

}
