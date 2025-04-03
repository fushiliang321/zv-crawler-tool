import indexedDBClass from './indexedDB'
import Table from './table'

export default (name = 'default', config = {}) => {
    const _map = {}
    _map[ name ] = config
    const db = new indexedDBClass(name + '_DB', _map)
    db.initDB()
    return new Table(db, name)
}
