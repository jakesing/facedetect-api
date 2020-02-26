const handleProfileGet = (req, res, db) => {
	//the info comes from the params in the request (i.e. the URL)
	const { id } = req.params;
	db.select('*').from('users').where('id', id)
		.then(user => {
			//check if user exists (user.length will evaluate to false if user does not exist)
			if (user.length){
				res.json(user[0]);	
			} else {
				res.status(400).json('Error getting user');
			}
		})
}

module.exports = {
	handleProfileGet: handleProfileGet
}