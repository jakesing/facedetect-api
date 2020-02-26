const handleRank = (req, res, db) => {
	const { id } = req.body;
	db.raw(`with RANKED as (select *, rank() over (ORDER BY entries desc) as rank from users)
		SELECT * from RANKED WHERE id=${id}`)
	.then(data => {
		res.json(data.rows[0].rank)
	})
	.catch(err => res.status(400).json('unable to get rank'))
}

module.exports = {
	handleRank: handleRank
}