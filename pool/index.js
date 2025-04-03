
export default class pool {
    status = true
    concurrencyNum = 1
    #tasksResolve = []
    #awaitAllResolve = []

    #pause = undefined

    constructor(num) {
        this.setConcurrencyNum(num)
        this.open()
    }

    //设置并发数量
    setConcurrencyNum(num) {
        this.concurrencyNum = num
    }

    push() {
        this.concurrencyNum++
        const resolve = this.#tasksResolve.pop()
        if (resolve) {
            resolve()
        }else {
            this.#awaitAllResolve.forEach(resolve => {
                resolve()
            })
            this.#awaitAllResolve.length = 0
        }
    }

    async pop() {
        if (this.#pause) {
            await this.#pause.promise
        }
        if (this.concurrencyNum < 1) {
            await new Promise(resolve => this.#tasksResolve.unshift(resolve))
            if (this.#pause) {
                await this.#pause.promise
            }
        }
        this.concurrencyNum--
    }

    //暂停
    pause() {
        if (this.#pause) {
            return
        }
        let resolve
        this.#pause = {
            promise: new Promise(r => resolve = r),
            resolve,
        }
    }

    //继续
    continue() {
        if (!this.#pause) {
            return
        }
        const resolve = this.#pause.resolve
        this.#pause = undefined
        resolve && resolve()
    }

    //关闭
    close() {
        this.status = false
        this.continue()
    }

    //开启
    open() {
        this.status = true
    }

    //添加任务
    async add(task) {
        await this.pop()
        if (this.status) {
            await Promise.resolve(task())
        }
        this.push()
    }

    //等待所有任务完成
    async awaitAll() {
        if (!this.#tasksResolve.length) {
            return
        }
        await new Promise(resolve => this.#awaitAllResolve.push(resolve))
    }
}

export function New(num) {
    return new pool(num)
}