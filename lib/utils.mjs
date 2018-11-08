export const wrap = fn => {
	return (req, res, next) => {
		return fn(req, res, next)
			.then(data => {
				if (data !== undefined && typeof data === "object") {
					res.json(data);
				}
			})
			.catch(next);
	};
};
