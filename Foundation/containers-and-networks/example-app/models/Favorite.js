const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
	name: {
		type: mongoose.SchemaTypes.String,
		unique: true,
	},
	type: {
		type: mongoose.SchemaTypes.String,
		enum: ['movie', 'character'],
	},
	url: {
		type: mongoose.SchemaTypes.String,
	},
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
