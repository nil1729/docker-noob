const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

let userGoal = 'Learn Docker!';

app.get('/', (req, res) => {
	res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Docker Foundation</title>
                <link rel="stylesheet" href="style.css" />
            </head>
            <body>
                <section>
                    <h2>My Course Goal</h2>
                    <h3>${userGoal}</h3>
                </section>
                <form action="/store-goal" method="post">
                    <div class="form-control">
                        <label>Course Goal</label>
                        <input type="text" name="goal" />
                    </div>
                    <button>Set Course Goal</button>
                </form>
            </body>
        </html>
    `);
});

app.post('/store-goal', (req, res) => {
	const enteredGoal = req.body.goal;
	console.log(enteredGoal);
	userGoal = enteredGoal;
	res.redirect('/');
});

app.listen(80, () => {
	console.log('Server listening on port 80');
});
