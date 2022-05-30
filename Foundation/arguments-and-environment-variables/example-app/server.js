const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/feedback', express.static('feedback'));

app.get('/', (req, res) => {
	const file_path = path.join(__dirname, 'pages', 'feedback.html');
	res.sendFile(file_path);
});

app.get('/exists', (req, res) => {
	const file_path = path.join(__dirname, 'pages', 'exists.html');
	res.sendFile(file_path);
});

app.post('/create', async (req, res) => {
	const title = req.body.title;
	const content = req.body.text;

	const adj_title = title.toLowerCase();

	const temp_file_path = path.join(__dirname, 'temp', adj_title + '.txt');
	const final_file_path = path.join(__dirname, 'feedback', adj_title + '.txt');

	fs.writeFileSync(temp_file_path, content);
	if (fs.existsSync(final_file_path)) {
		res.redirect('/exists');
	} else {
		// fs.renameSync(temp_file_path, final_file_path); // Not work with volumes
		fs.copyFileSync(temp_file_path, final_file_path);
		fs.unlinkSync(temp_file_path);
		res.redirect('/');
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
