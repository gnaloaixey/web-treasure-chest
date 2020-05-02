(function (global, fac) {
    typeof module !== 'undefined' ? module.exports = fac() :
        global['WS'] = fac();
})(this, function () {
    if (WebSocket == 'undefined') return null;
    function WS(url,createError) {
        let socket = null
        // let interceptor = {
        //     send:
        // }
        this.__proto__ = null
        try {
            socket = new WebSocket(url)
        } catch (err) {
            if(typeof createError == 'function')
                createError(err);
            return
        }
        //创建方法
        this.send = data => {
            // interceptor.send(data)
            socket.send(data)
        }
        this.close = (cellback) => {
            cellback()
            socket.close()
        }
        //添加钩子
        this.doOpen = () =>{}
        this.doReceive = evt => { }
        this.doError = err => { }

        this.getState = ()=>{
            return socket.readyState
        }
        //打印socket
        this.logSocket = () => {
            console.log(socket);
        }
        //事件处理
        let that = this
        socket.onopen = () => {
            if(isFunc(that.doOpen))
                that.doOpen();
        }
        socket.onmessage = function (evt) {
            // interceptor.receive()
            if(isFunc(that.doReceive))
             that.doReceive(evt)
        }

        socket.onerror = err => {
            if(isFunc(that.doError))
                that.doError(err);
        }
        //util
        function isFunc(func){
            return typeof(func)=='function'
        }

    }
    WS.prototype = null
    return WS;
})