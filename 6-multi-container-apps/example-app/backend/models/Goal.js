const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema(
	{
		text: {
			type: mongoose.SchemaTypes.String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Goal', GoalSchema);
