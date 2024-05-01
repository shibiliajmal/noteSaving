import Dexie from 'dexie';

const db = new Dexie('Notes');
db.version(1).stores({
   Notes : '++id,title,description,date,type,imageUrl'
});

export default db;