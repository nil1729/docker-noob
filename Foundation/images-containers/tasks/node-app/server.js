const express = require('express');
const app = express();

app.get('/', (req, res) => {
	return res.status(200).send(`
        <h1>Hello from Node JS app</h1>
    `);
});

app.listen(5050, () => {
	console.log('Server listening on port 5050');
});
