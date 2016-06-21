module libra.utils.dateUtil {
	
    /**
     * 根据秒数格式化字符串
     * @param second 秒数
     * @return
     */
    export function formatByTime(time: number, format: string = "YYYY-MM-DD HH:NN:SS"): string {
        var o: Date = new Date(time);
        var reStr: string = "";
//        var months: string[] = ["January", "February", "March", "May", "June", "July", "August", "September", "October", "November", "December"];
//        var weeks: string[] = ["Sunday", "Monday", "TuesDay", "Wednesday", "Thursday", "Friday", "Saturday"];
        var _y: string = o.getFullYear().toString();
        var _m: number = o.getMonth();
        var _mb: string = _m < 10 ? "0" + (_m + 1) : (_m + 1).toString();
        var _d: number = o.getDate();
        var _db: string = _d < 10 ? "0" + _d : _d.toString();
        var _h: number = o.getHours();
        var _hb: string = _h < 10 ? "0" + _h : _h.toString();
        var _n: number = o.getMinutes();
        var _nb: string = _n < 10 ? "0" + _n : _n.toString();
        var _s: number = o.getSeconds();
        var _sb: string = _s < 10 ? '0' + _s : _s.toString();
//        var _e: number = o.getDay();
//        var _eb: string = "0" + (_e + 1);
        reStr = format;
        reStr = reStr.replace(/YYYY/g, _y);
        reStr = reStr.replace(/YY/g, _y.slice(-2));
//        reStr = reStr.replace(/MMMM/g, months[_m]);
//        reStr = reStr.replace(/MMM/g, months[_m].substr(0, 3));
        reStr = reStr.replace(/MM/g, _mb);
        reStr = reStr.replace(/M/g, String(_m + 1));
        reStr = reStr.replace(/DD/g, _db);
        reStr = reStr.replace(/D/g, _d.toString());
        reStr = reStr.replace(/A/g, _h < 12 ? "AM" : "PM");
        reStr = reStr.replace(/HH/g, _hb);
        reStr = reStr.replace(/L/g, (_h % 12).toString());
        reStr = reStr.replace(/NN/g, _nb);
        reStr = reStr.replace(/SS/g, _sb);
//        reStr = reStr.replace(/EEEE/g, weeks[_e]);
//        reStr = reStr.replace(/EEE/g, weeks[_e].substr(0, 3));
//        reStr = reStr.replace(/EE/g, _eb);
//        reStr = reStr.replace(/E/g, (_e + 1).toString());
        return reStr;
    };
    
    /**
     * xx天前，xx小时前，xx分钟前
     */ 
    export function getTimeAgo(time: number): string {
        var t:number = Math.floor(time / 3600);
        if(t > 0) {
            if(t > 24) {
                return Math.floor(t / 24) + "天前";
            } else {
                return t + "小时前";
            }
        } else {
            return Math.floor(time / 60) + "分钟前";
        }
    };

}
