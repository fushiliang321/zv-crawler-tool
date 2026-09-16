
export default class pool {
    status = true
    concurrencyNum = 1
    #tasksResolve: Function[] = []
    #awaitAllResolve: Function[] = []

    #pause: { promise: Promise<void>; resolve: Function | undefined } | undefined

    constructor(num = 1) {
        this.setConcurrencyNum(num)
        this.open()
    }

    //设置并发数量
     setConcurrencyNum(num: number): void {
        if (num < 1) {
            num = 1
        }
        this.concurrencyNum = num
    }

    push(): void {
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

    async pop(): Promise<void> {
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
    pause(): void {
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
    continue(): void {
        if (!this.#pause) {
            return
        }
        const resolve = this.#pause.resolve
        this.#pause = undefined
        resolve && resolve()
    }

    //关闭
    close(): void {
        this.status = false
        this.continue()
    }

    //开启
    open(): void {
        this.status = true
    }

    //添加任务
    async add(task: () => Promise<any>): Promise<void> {
        await this.pop()
        if (this.status) {
            await Promise.resolve(task())
        }
        this.push()
    }

    //等待所有任务完成
    async awaitAll(): Promise<void> {
        if (!this.#tasksResolve.length) {
            return
        }
        await new Promise(resolve => this.#awaitAllResolve.push(resolve))
    }
}

export function New(num = 1): pool {
    return new pool(num)
}