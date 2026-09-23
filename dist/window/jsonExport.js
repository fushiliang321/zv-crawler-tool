import { postMessage } from "./index";
const defaultFileName = 'data.json';
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
//# sourceMappingURL=jsonExport.js.map