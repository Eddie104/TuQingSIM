module libra.device {
    
    /**
     * 是不是微信浏览
     */
    export function isWeiXin(): boolean {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        return microStr == "micromessenger";
    }

    /**
     * 是不是大屏
     */
    export function isBigScreen(): boolean {
        return (document.body.clientHeight / document.body.clientWidth > 1.32);
    } 

    /**
     * 获得浏览器类型 pc android ios
     */
    export function systemType(): string {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if(("" + ua.match(/windows nt/i)) == "windows nt") {
            return "windows";
        } else if(("" + ua.match(/iphone/i)) == "iphone") {
            return "ios";
        } else if(("" + ua.match(/android/i)) == "android") {
            return "android";
        } else if(("" + ua.match(/ipad/i)) == "ipad") {
            return "ipad";
        } else if(("" + ua.match(/linux/i)) == "linux") {
            return "linux";
        } else if(("" + ua.match(/mac/i)) == "mac") {
            return "mac";
        } else if(("" + ua.match(/ucbrower/i)) == "ucbrower") {
            return "ucbrower";
        } else {
            console.log("未知系统类型");
        }
    }  

    //获得平台类型 如 微信、qqzone、qq、微博、校内、facebook
    export function platformType(): string {
        var ua = window.navigator.userAgent.toLowerCase();
        if(("" + ua.match(/micromessenger/i)) == "micromessenger") {
            return "micromessenger";
        } else if(("" + ua.match(/qzone/i)) == "qzone") {
            return "qzone";
        } else if(("" + ua.match(/weibo/i)) == "weibo") {
            return "weibo";
        } else if(("" + ua.match(/qq/i)) == "qq") {
            return "qq";
        } else if(("" + ua.match(/renren/i)) == "renren") {
            return "renren";
        } else if(("" + ua.match(/txmicroblog/i)) == "txmicroblog") {
            return "txmicroblog";
        } else if(("" + ua.match(/douban/i)) == "douban") {
            return "douban";
        } else {
            return "other";
        }
    }

    export function getBrowserType(): string {
        if(egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5) {
            if(navigator.userAgent.indexOf('MQQBrowser') != -1) return "QQ";
            if(navigator.userAgent.indexOf('MSIE') != -1) return "IE";
            if(navigator.userAgent.indexOf('Firefox') != -1) return "Firefox";
            if(navigator.userAgent.indexOf('Chrome') != -1) return "Chrome";
            if(navigator.userAgent.indexOf('Safari') != -1) return "Safari";
            if(navigator.userAgent.indexOf('Opera') != -1) return "Opera";
        }
        return null;
    }
}
