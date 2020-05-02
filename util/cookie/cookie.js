module.exports = {
    //获取cookie
    getCookie(key) {
        let arr;
        let reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return (arr[2]);
        else
            return null;
    },
    //设置cookie
    setCookie(c_key, value,path, time) {
        if(!path) path = '/'
        if(!time) time = 30*60*1000;
        document.cookie = `${c_key}=${escape(value)};max-age=${time};path=${path}`;
    },
    //删除cookie
    delCookie(key) {
        let cval = this.getCookie(key);
        if (cval)
            document.cookie = key + "=" + cval + ";max-age=-1";
    },
}