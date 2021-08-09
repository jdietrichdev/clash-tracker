const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/clash', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('connection established');
});

const heroModel = mongoose.model('hero', new mongoose.Schema({}, {strict: false}));

exports.mongoose = mongoose;
exports.HERO_MODEL = heroModel;