export default function (path: string) {
	let success: boolean;

	const paths = [
		'/v1/update',
		'/v1/change-password',
	];

	if (paths.includes(path)) {
		success = true;
		return success;
	}

	success = false;
	return success;
}
