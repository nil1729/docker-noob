const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
	const filePath = path.join(__dirname, 'views', 'index.html');
	res.sendFile(filePath);
});

app.listen(80);
