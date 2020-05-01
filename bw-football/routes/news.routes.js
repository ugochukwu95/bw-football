module.exports = (app) => {
	const news = require('../controllers/news.controllers.js');

	// create a new article
	app.post('/api/news', news.create);

	// retrieve all sports news
	app.get('/api/news', news.findAll);

	// retrieve an article
	app.get('/api/news/details', news.findOne);

	// retrieve related articles
	app.get('/api/news/related', news.findRelated);

	// retrieve all categories
	app.get('/api/news/categories', news.findCategories);

	// search
	app.get('/api/news/search', news.search);

	// update a news article
	app.put('/api/news', news.update);

	// delete a news article
	app.delete('/api/news', news.delete);
}