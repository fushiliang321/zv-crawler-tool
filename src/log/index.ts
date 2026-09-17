
enum logType {
    info,
    error
}

type log = {
    type: logType,
    data: any
}

export class logs {
    limit: number = 10
    list: log[] = []

    constructor(limit: number) {
        this.limit = limit
    }

    push(log: log) {
        this.list.unshift(log)
        if (this.list.length > this.limit) {
            this.list.length = this.limit
        }
    }

    info(data: any) {
        this.push({
            type: logType.info,
            data: data
        })
    }

    error(data: any) {
        this.push({
            type: logType.error,
            data: data
        })
    }
}