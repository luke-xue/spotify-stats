import Typography from '@mui/material/Typography';

const ErrorPage = props => {
	return (
		<>
			<Typography variant="h4">error 404 :(</Typography>
			<Typography variant="body1">That page doesn't exist. Go back or hit one of the buttons above.</Typography>
		</>
	);
};

export default ErrorPage;