const notFound = (req, res) => res.status(404).send('URL does not exist')

module.exports = notFound