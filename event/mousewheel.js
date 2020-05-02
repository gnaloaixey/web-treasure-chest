(function (global, fac) {
    typeof module !== 'undefined' ? module.exports = fac() :
        global['mousewheel'] = fac();
})(this, function () {
    // 执行时为el绑定mousewheel事件，触发时执行act
    function mousewheel(el, act) {
        /*IE、Opera注册事件*/
        if (el.attachEvent) {
            el.attachEvent('onmousewheel', scrollFunc);
        }
        //Firefox使用addEventListener添加滚轮事件  
        if (el.addEventListener) {//firefox  
            el.addEventListener('DOMMouseScroll', scrollFunc, false);
            //Safari与Chrome属于同一类型
            el.addEventListener('mousewheel', scrollFunc, false);
        }

        function scrollFunc(e) {
            let hook = Object.create(null)
            hook.stop = function(){
                e.stopPropagation()
            }
            hook.prevent = function() {
                e.preventDefault() 
            }
            e = e || window.event;
            if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
                act(e.wheelDelta,hook)
            } else if (e.detail) {  //Firefox滑轮事件  
                act(e.detail,hook)
            }
        }
    }
    return mousewheel;

})