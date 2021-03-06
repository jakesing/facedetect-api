const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});


const handleAPICall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	//req.body because the info comes from the body, not the params
	const { id } = req.body;
	
	//get entries
	db('users')
	  .where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries', 'name')
	  .then(data => {
	  	res.json(data[0]);
	  })
	  .catch(err => res.status(400).json('unable to get count'))
}

module.exports = {
	handleImage: handleImage,
	handleAPICall: handleAPICall
}