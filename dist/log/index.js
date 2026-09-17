var logType;
(function (logType) {
    logType[logType["info"] = 0] = "info";
    logType[logType["error"] = 1] = "error";
})(logType || (logType = {}));
export class logs {
    limit = 10;
    list = [];
    constructor(limit = 10) {
        this.limit = limit;
    }
    push(log) {
        this.list.unshift(log);
        if (this.list.length > this.limit) {
            this.list.length = this.limit;
        }
    }
    info(data) {
        this.push({
            type: logType.info,
            data: data
        });
    }
    error(data) {
        this.push({
            type: logType.error,
            data: data
        });
    }
}
//# sourceMappingURL=index.js.map