import indexedDBClass, { tableConfig } from './indexedDB'
import Table from './table'

export default (name = 'default', config: tableConfig = {}) => {
    const _map: Record<string, tableConfig> = {}
    _map[name] = config
    const db = new indexedDBClass(name + '_DB', _map)
    db.initDB()
    return new Table(db, name)
}
