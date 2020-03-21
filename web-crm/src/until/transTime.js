export default function transTimer(time){
    let str = JSON.stringify(new Date(JSON.parse(time)))
    return str.slice(1,11)
}
//获取当前日期的字符串格式
export function nowDateStr(){
    return new Date().toLocaleDateString();
}
//将指定日期转换成时间戳
export function dategetTime(date){
    return new Date(date).getTime();
}