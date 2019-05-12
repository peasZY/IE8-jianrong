/*
* 本文件封装IE8兼容性
*/

/**1.获取元素文本
 *
 * @param ele 元素
 * @return {*}  文本
 */
function  getText( ele ) {
    //能力检测
    if (ele.textContent){//IE8浏览器  如果textContent可以获取则使用textContent
        return ele.textContent;
    }else{//如果textContent不能获取，就是用innerText
        return ele.innerText;
    };
};

/**2.设置元素文本
 *
 * @param ele 元素
 * @param text 要修改的文本
 * @return {*}  文本
 */

function  setText( ele,text ) {
    //能力检测
    if (ele.textContent){//IE8浏览器  如果textContent可以获取则使用textContent
        ele.textContent = text;
    }else{//如果textContent不能获取，就是用innerText
        ele.innerText = text;
    };
};


/**2.获取元素的上一个兄弟元素
 *
 * @param ele 元素
 * @return 元素的上一个兄弟元素
 */
function getPreviousElementSibling ( ele ) {
    //能力检测
    if (ele.previousElementSibling){//非IE8浏览器
        return ele.previousElementSibling;
    }else{//IE8
        //1.获取上一个兄弟节点
        var node = ele.previousSibling;
        //2.如果 (1)节点不是null  (2)nodeType != 1
        while(node != null  && node.nodeType != 1){
            node = node.previousSibling;
        };
        //循环结束：  （1）node 为null 找到顶了还没有找到  (2)node.nodeTYpe == 1
        return node;
    }
};


/**
 * 3.获取下一个兄弟元素
 * @param ele 元素
 * @return ele的下一个兄弟元素
 */

function getNextElementSibling (ele  ) {
    //1.能力检测
    if (ele.nextElementSibling){
        return ele.nextElementSibling;
    }else{
        //1.获取下一个兄弟节点
        var node = ele.nextSibling;
        //2.如果 （1）节点存在  （2）节点类型不是1  继续往下找
        while (node != null && node.nodeType != 1){
            node = node.nextSibling;
        };
        return node;
    };
};

/**4.获取元素的第一个子元素
 *
 * @param ele 父元素
 * @return 第一个子元素
 */
function getFirstElementChild ( ele  ) {
    //能力检测
    if (ele.firstElementChild){
        return ele.firstElementChild;
    }else{//IE8
        //1.获取第一个子节点
        var node =ele.firstChild;
        //2.只要  可以找到 并且 节点类型不是1  继续往下找
        while(node && node.nodeType != 1){
            node = node.nextSibling;
        };
        return node;
    }
}

/**
 * 5.获取最后一个子元素
 * @param ele 父元素
 * @return 最后一个子元素
 */
function getLastElementChild ( ele ) {
    //能力检测
    if (ele.lastElementChild){
        return ele.lastElementChild;
    }else{
        //1.获取最后一个子节点
        var node = ele.lastChild;
        //2.如果  节点存在 并且 节点类型 ！= 1   继续往上找
        while (node && node.nodeType != 1){
            node = node.previousSibling;
        };
        return node;
    };
};

/**
 * 6.获取元素属性值
 * @param ele 元素
 * @param attribute 属性名字符串
 */
function getSyle (  ele,attribute) {
    //能力检测
    if (window.getComputedStyle){//谷歌火狐
        /*注意：这里不能使用点语法。这个语法含义：取style对象的一个叫做attribute的属性值，得到undefined*/
        // return style.attribute;
        /*含义：字符串语法取attribute变量中存储的字符串对应的属性的值 */
        return window.getComputedStyle(ele, null)[attribute];
    }else{//IE8
        return ele.currentStyle[attribute];
    }
};

/**7.获取页面滚动出去的距离
 *
 * @return {{scrollLeft: number, scrollTop: number}}
 */
function getPageScroll (  ) {
    return {
        scrollLeft:window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        scrollTop:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    };
};

/**8.获取页面可视区域大小
 *
 * @return {{clientWidth: number, clientHeight: number}}
 */
function getClientSize (  ) {
    //能力检测: 逻辑或短路
    var x = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
    var y = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;

    return {
        clientWidth:x,
        clientHeight:y
    };
};

/**
 * 9.获取鼠标触发点相对于页面左上角距离
 * @param e ： 事件对象
 */
function getPagePoint ( e ) {
    e = e || window.event;
    var x = e.pageX || e.clientX + getPageScroll().scrollLeft;
    var y = e.pageY || e.clientY + getPageScroll().scrollTop;

    return {
        pageX : x,
        pageY : y
    };
}


/**
 * 10.注册多个同名事件
 * @param ele 元素
 * @param type 事件类型  不要on
 * @param fn 事件处理函数
 */
function addEvent ( ele,type,fn ) {
    //能力检测
    if (ele.addEventListener){//谷歌火狐
        ele.addEventListener(type, fn);
    }else{//IE8
        ele.attachEvent('on' + type,fn);
    }
};


/**11.移除事件
 * @param type: 事件类型 不要on
 * @param 事件处理函数
 */
function removeEvent ( ele,type,fn ) {
    if (ele.removeEventListener){//谷歌火狐
        ele.removeEventListener(type, fn);
    }else{//IE8浏览器
        ele.detachEvent('on' + type, fn);
    }
}
