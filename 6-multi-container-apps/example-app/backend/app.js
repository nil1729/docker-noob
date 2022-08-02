const PORT = 8080;

const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const Goal = require('./models/Goal');

const app = express();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), {
	flags: 'a',
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'DELETE'],
		allowedHeaders: ['Content-Type'],
	})
);

app
	.route('/goals')
	.get(async (req, res) => {
		console.log('TRYING TO FETCH GOALS...');

		try {
			const goals = await Goal.find();
			res.status(200).json({
				goals: goals.map((goal) => ({ id: goal._id, text: goal.text })),
			});
			console.log('FETCHED GOALS');
		} catch (e) {
			console.error('ERROR FETCHING GOALS');
			console.error(e.message);
			res.status(500).json({ message: 'Failed to load goals.' });
		}
	})
	.post(async (req, res) => {
		console.log('TRYING TO STORE GOAL...');
		const goal_text = req.body.text;

		if (!goal_text || goal_text.trim().length === 0) {
			console.log('INVALID INPUT - NO TEXT');
			res.status(422).json({ message: 'Invalid goal text.' });
		}

		try {
			const goal = await Goal.create({
				text: goal_text,
			});
			res.status(201).json({ message: 'Goal saved', goal: { id: goal._id, text: goal.text } });
			console.log('STORED NEW GOAL');
		} catch (e) {
			console.error('ERROR SAVING GOAL');
			console.error(e.message);
			res.status(500).json({ message: 'Failed to save goal.' });
		}
	});

app.route('/goals/:id').delete(async (req, res) => {
	console.log('TRYING TO DELETE GOAL...');
	try {
		const response = await Goal.deleteOne({ _id: req.params.id });
		if (response.deletedCount === 0)
			res.status(404).json({ message: 'No found requested goal on our records' });
		res.status(200).json({ message: 'Goal deleted!' });
		console.log('DELETED GOAL');
	} catch (e) {
		console.error('ERROR DELETING GOAL');
		console.error(e.message);
		res.status(500).json({ message: 'Failed to delete goal.' });
	}
});

mongoose.connect(
	`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/course-goals?authSource=admin`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			console.log('DATABASE NOT CONNECTED. SHUTING DOWN ...');
			console.log(err);
			process.exit(1);
		} else {
			console.log('DATABASE CONNECTED');
			app.listen(PORT, () => {
				console.log(`Server listening on port ${PORT}`);
			});
		}
	}
);
