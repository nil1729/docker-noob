import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
	const BASE_URL = 'http://localhost:8080';
	const [goals, set_goals] = useState([]);
	const [goal_input, set_goal_input] = useState('');
	const [adding_new_goal, set_adding_new_goal] = useState(false);
	const [fetching_goals, set_fetching_goals] = useState(true);
	const [fetching_error, set_fetching_error] = useState(false);

	useEffect(() => {
		fetch(`${BASE_URL}/goals`)
			.then((res) => res.json())
			.then((data) => {
				set_goals(data.goals);
				set_fetching_goals(false);
			})
			.catch((e) => {
				set_fetching_error(true);
			});
		// eslint-disable-next-line
	}, []);

	const add_new_goal = async () => {
		try {
			if (!goal_input || goal_input.trim().length === 0) return alert('Invalid goal text.');

			set_adding_new_goal(true);

			const response = await fetch(`${BASE_URL}/goals`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					text: goal_input,
				}),
			});
			const data = await response.json();
			set_goals([...goals, data.goal]);
			set_goal_input('');
			set_adding_new_goal(false);
		} catch (e) {
			console.log(e);
		}
	};

	const delete_goal = (goal_id) => async () => {
		try {
			await fetch(`${BASE_URL}/goals/${goal_id}`, {
				method: 'DELETE',
			});
			set_goals(goals.filter((goal) => goal.id !== goal_id));
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className='App'>
			{fetching_error && (
				<section className='error_alert_section'>
					<h2>Something went wrong!</h2>
					<p>Failed to fetch</p>
				</section>
			)}
			<section className='goal_input_section'>
				<h2>New Goal</h2>
				<input
					type='text'
					value={goal_input}
					onChange={(e) => set_goal_input(e.target.value)}
					disabled={adding_new_goal}
				/>
				<button onClick={add_new_goal} disabled={adding_new_goal}>
					{adding_new_goal ? 'Adding Goal' : 'Add Goal'}
				</button>
			</section>
			<section className='goals_list_section'>
				{fetching_goals ? (
					<>
						<h2>Loading Goals ...</h2>
					</>
				) : goals.length === 0 ? (
					<>
						<h2>No goals found. Start adding some!</h2>
					</>
				) : (
					<>
						{goals.map((goal) => (
							<div key={goal.id} className='goal_item' onClick={delete_goal(goal.id)}>
								{goal.text}
							</div>
						))}
					</>
				)}
			</section>
		</div>
	);
};

export default App;
