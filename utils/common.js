export const getRnadomFiveInt = () => {
    var temp = [];
    for (var i = 0; i < 1 + parseInt(Math.random() * 5); i++) {
        var random_int = parseInt(Math.random() * 10);
        if (i === 0 && random_int === 0) {
            return getRnadomFiveInt();
        }
        temp.push(random_int);
    }

    return temp.join("")
}

export const formatDate = (date, fmt) => {
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}