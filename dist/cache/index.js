import db from 'zv-crawler-tool/db';
let cacheDbName = 'cache';
export function setName(name) {
    cacheDbName = name;
}
let _table;
function table() {
    if (!_table) {
        _table = db(cacheDbName);
    }
    return _table;
}
export async function has(key) {
    const res = await table().get(key);
    return (!!res && res.hasOwnProperty('value'));
}
export async function get(key) {
    const res = await table().get(key);
    return res ? res?.value : undefined;
}
export async function getAll() {
    const res = await table().getAll();
    return res;
}
export async function set(key, value) {
    return await table().put({
        id: key,
        value: value
    });
}
export async function del(key) {
    return await table().delete(key);
}
//# sourceMappingURL=index.js.map