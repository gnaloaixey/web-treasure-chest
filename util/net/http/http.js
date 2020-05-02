(function (global, fac) {
    typeof module !== 'undefined' ? module.exports = fac() :
        global['http'] = fac();
})(this, function () {
    function http(){}
    initDefHeader(http);
    initInterceptor(http);
    initDefConfig(http);
    initRequest(http);

    function initDefHeader(http) {
        //默认头
        http.defHeaders = {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }
    function initInterceptor(xmlHttp) {
        http.interceptor = {
            response(xmlHttp) {
                return xmlHttp;
            },
            request(res) {
                return res
            }
        }; http.interceptor.__proto__ = null
    }
    function initDefConfig(http) {
        http.defConfig = {
            timeout: 5000
        }
    }
    function initRequest(http) {
        //请求方法
        let METHODS = ['get', 'post']
        http.req = function (method, url, config) {
            let methodFlag = false;
            METHODS.forEach(item => {
                if (item == method)
                    methodFlag = true;
            })
            if (methodFlag) {
                return this[method](url, config) || Promise.reject()
            }
            else return Promise.reject('方式有误')
        }

        http.get = function (url, config = {}) {
            return new Promise((resolve, reject) => {

                try {
                    let xmlHttp = getXmlHttp();
                    xmlHttp.open('get', url, config.isAsync || true);
                    xmlHttp = http.interceptor.request(xmlHttp)
                    //设置http头部
                    for (let header in http.defHeaders) {
                        xmlHttp.setRequestHeader(header, http.defHeaders[header]);
                    }

                    if (config.header) {
                        for (let header in config.headers) {
                            xmlHttp.setRequestHeader(header, config.headers[header]);
                        }
                    }
                    //响应事件
                    xmlHttp.onreadystatechange = function () {
                        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                            resolve(processData(xmlHttp.responseText))
                        }
                        if (xmlHttp.status === 404) {
                            reject("未找到页面")
                        }
                    };
                    xmlHttp.onerror = function (err) {
                        reject(err)
                    }
                    xmlHttp.send()

                } catch (err) {
                    console.log('error:'+err);
                    reject(err)
                }

            })
        }
        http.post = function (url, data, config = {}) {
            return new Promise((resolve, reject) => {
                try {
                    let xmlHttp = getXmlHttp();
                    xmlHttp.open('post', url, config.isAsync || true);
                    xmlHttp = http.interceptor.request(xmlHttp)
                    //设置http头部
                    for (let header in http.defHeaders) {
                        xmlHttp.setRequestHeader(header, http.defHeaders[header]);

                    }

                    if (config.header) {
                        for (let header in config.headers) {
                            xmlHttp.setRequestHeader(header, config.headers[header]);
                        }
                    }
                    //响应事件
                    xmlHttp.onreadystatechange = function () {
                        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                            resolve(processData(xmlHttp.responseText))
                        }
                        if (xmlHttp.status === 404) {
                            reject("未找到页面")
                        }
                    };
                    xmlHttp.onerror = function (err) {
                        reject(err)
                    }
                    xmlHttp.send(data)

                } catch (err) {
                    console.log(err);
                    reject(err)
                }

            })
        }
    }

    function processData(res) {
        res = http.interceptor.response(res)
        return res
    }
    function getXmlHttp() {
        if (window.XMLHttpRequest)
            return new XMLHttpRequest();
        else return new ActiveXObject("Microsoft.XMLHTTP")
    }


    return http
})