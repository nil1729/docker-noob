const express = require('express');
const axios = require('axios');
const Favorite = require('./models/Favorite');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/favorites', async (req, res) => {
	const favorites = await Favorite.find();
	return res.status(200).json({
		favorites: favorites,
	});
});

app.post('/favorites', async (req, res) => {
	const fav_name = req.body.name;
	const fav_type = req.body.type;
	const fav_url = req.body.url;

	try {
		if (!['movie', 'character'].includes(fav_type)) {
			throw new Error(`"type" should be "movie" or "character"`);
		}

		const existing_fav = await Favorite.findOne({ name: fav_name });
		if (existing_fav) throw new Error('Favorite exists already');
	} catch (e) {
		return res.status(400).json({ message: e.message });
	}

	try {
		const fav_doc = await Favorite.create({
			name: fav_name,
			type: fav_type,
			url: fav_url,
		});

		return res.status(200).json({
			message: 'Favorite saved!',
			favorite: fav_doc,
		});
	} catch (e) {
		return res.status(500).json({ message: 'Something went wrong.' });
	}
});

app.get('/movies', async (req, res) => {
	try {
		const response = await axios.get('https://swapi.dev/api/films');
		return res.status(200).json({ movies: response.data });
	} catch (e) {
		return res.status(500).json({ message: 'Something went wrong.' });
	}
});

app.get('/people', async (req, res) => {
	try {
		const response = await axios.get('https://swapi.dev/api/people');
		return res.status(200).json({ movies: response.data });
	} catch (e) {
		return res.status(500).json({ message: 'Something went wrong.' });
	}
});

mongoose.connect(
	// 'mongodb://localhost:27017/dbfavorites', // Not work with containerized app
	// 'mongodb://host.docker.internal:27017/dbfavorites', // Work with containerized app to connect MongoDB which is hosted on our Local Machine
	// 'mongodb://172.17.0.3:27017/db_favorites', // Working with mongodb container
	'mongodb://mongodb:27017/db_favorites', // Work with containers connected with same Networks
	{
		useNewUrlParser: true,
	},
	(err) => {
		if (err) {
			console.log(err);
		} else {
			app.listen(8080, () => {
				console.log('Database connected and server listening on port 8080');
			});
		}
	}
);
