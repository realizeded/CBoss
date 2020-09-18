/**
 * @description 
 * 路由跳转
 * genius/boss -> geniusinfo/bossinfo
 * avater -> 同上/信息完善
 */
export function getRedircetTo(type,avater) {
    let path = type+'info';
    return path;
}