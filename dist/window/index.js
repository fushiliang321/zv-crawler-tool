import { arrays, string } from "./csvExport";
const taskSuffix = String(Math.random());
const taskMap = {};
let taskId = 0;
window.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    const task = taskMap[data?.taskId];
    if (!task || !task.resolve || !task.reject) {
        return;
    }
    delete taskMap[data.taskId];
    if (data.error) {
        task.reject(data.error);
    }
    else {
        task.resolve(data.result);
    }
});
export function postMessage(data) {
    data.taskId = `${++taskId}${taskSuffix}`;
    if (data.arguments && data.arguments.length) {
        const args = [];
        for (let i = 0; i < data.arguments.length; i++) {
            args[i] = data.arguments[i];
        }
        data.arguments = args;
    }
    const promise = new Promise((resolve, reject) => {
        taskMap[data.taskId] = {
            resolve,
            reject
        };
    });
    window.parent.postMessage(JSON.stringify(data), '*');
    return promise;
}
export function fetch(input, init) {
    return postMessage({
        funName: 'fetch',
        arguments: arguments,
    });
}
export function exportArr(data, filename = 'data.csv') {
    return arrays(data, filename);
}
export function exportData(data, filename = 'data.csv') {
    return string(data, filename);
}
export function win(key) {
    return postMessage({
        funName: key,
    });
}
//# sourceMappingURL=index.js.map