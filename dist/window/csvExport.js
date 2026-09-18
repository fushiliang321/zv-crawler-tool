import { postMessage } from "./index";
const defaultFileName = 'data.csv';
export function string(data, filename = defaultFileName) {
    return postMessage({
        funName: 'exportData',
        arguments: arguments,
    });
}
export function arrays(data, filename = defaultFileName) {
    return postMessage({
        funName: 'exportArr',
        arguments: arguments,
    });
}
export function objects(data, keys = undefined, filename = defaultFileName) {
    const arr = [];
    let keySet = new Set(keys ?? []);
    for (const item of data) {
        if (!keys) {
            //如果没有指定key的话就自动从数据中提取所有key
            //每条数据的key可能会不一样，获取所有key
            keySet = new Set([...keySet, ...Object.keys(item)]);
        }
        const values = [];
        if (!item) {
            continue;
        }
        for (const key of keySet) {
            values.push(item[key] ?? '');
        }
        arr.push(values);
    }
    arr.unshift(Array.from(keySet));
    return arrays(arr, filename);
}
//# sourceMappingURL=csvExport.js.map