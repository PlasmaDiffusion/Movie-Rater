const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    score: Number,
    movieId: String,
    userId: String,
});


module.exports = mongoose.model('Review', reviewSchema);
