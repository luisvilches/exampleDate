const config = require('../settings');
const db = process.env.DATABASE === 'production' ? config.DATABASE.producction : config.DATABASE.development;
exports.connectionString = function(){
    if(db.provider === 'local'){
        return 'mongodb://' + db.host +  '/' + db.name;
    } else if(db.provider === 'mlab'){
        return 'mongodb://' + db.user + ':' + db.password + '@' + db.host + ':' + db.port + '/' + db.name;
    }
};