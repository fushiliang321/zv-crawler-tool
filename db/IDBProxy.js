function ProxyResult(result) {
    if (result instanceof IDBIndex ||
        result instanceof IDBObjectStore) {
        return new Proxy(result, ProxyHandler)
    }
    return result
}

const ProxyHandler  = {
    get(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
            return function(...args) {
                const result = target[prop](...args)
                if (result instanceof IDBRequest && prop !== 'openCursor') {
                    return new Promise((resolve, reject) => {
                        result.onsuccess = event => {
                            resolve(ProxyResult(result.result))
                        }
                        result.onerror = event =>{
                            reject(event)
                        }
                    })
                }
                return ProxyResult(result)
            };
        } else {
            return ProxyResult(target[prop])
        }
    }
}

export default (IDB) => {
   return ProxyResult(IDB)
}