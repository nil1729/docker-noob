const connectToDatabase = () => {
	const dummyPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('Connected to database');
		}, 1000);
	});

	return dummyPromise;
};

export default connectToDatabase;
