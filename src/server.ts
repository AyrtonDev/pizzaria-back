import app from './app';

const port = Bun.env.PORT_EXPRESS;

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
