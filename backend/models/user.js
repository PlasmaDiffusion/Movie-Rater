const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    username: String,
    favouriteGenre: String,
    favouriteMovieId: String,
});


module.exports = mongoose.model('Review', bookSchema);
