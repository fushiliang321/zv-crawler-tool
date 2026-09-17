import { postMessage } from "./index";
export const localStorage = {
    get(key) {
        return postMessage({
            funName: 'localStorage.getItem',
            arguments: arguments,
        });
    },
    key(index) {
        return postMessage({
            funName: 'localStorage.key',
            arguments: arguments,
        });
    },
    remove(key) {
        return postMessage({
            funName: 'localStorage.removeItem',
            arguments: arguments,
        });
    },
    set(key, value) {
        return postMessage({
            funName: 'localStorage.setItem',
            arguments: arguments,
        });
    },
    clear() {
        return postMessage({
            funName: 'localStorage.clear',
            arguments: arguments,
        });
    }
};
export const sessionStorage = {
    get(key) {
        return postMessage({
            funName: 'sessionStorage.getItem',
            arguments: arguments,
        });
    },
    key(index) {
        return postMessage({
            funName: 'sessionStorage.key',
            arguments: arguments,
        });
    },
    remove(key) {
        return postMessage({
            funName: 'sessionStorage.removeItem',
            arguments: arguments,
        });
    },
    set(key, value) {
        return postMessage({
            funName: 'sessionStorage.setItem',
            arguments: arguments,
        });
    },
    clear() {
        return postMessage({
            funName: 'sessionStorage.clear',
            arguments: arguments,
        });
    }
};
//# sourceMappingURL=cache.js.map