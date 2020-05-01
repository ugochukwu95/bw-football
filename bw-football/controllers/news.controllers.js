const News = require('../models/news.model.js');
const axios = require('axios');
const striptags = require('striptags');
const rssToJson = require('rss-to-json');

// Create and save a new article
exports.create = (req, res) => {
	// Validate request
	if (!req.body.title) {
		return res.status(400).send({
            error: "title cannot be empty"
        })
	}

	// create an article
    const news = new News({
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        thumbnail: req.body.thumbnail,
        pubDate: req.body.pubDate,
        content: req.body.content,
        source: req.body.source,
        category: req.body.category
    });

    // Save article in the database
    news.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the News article."
        });
    });
}

// get news article
exports.findAll = async (req, res) => {
	
	const page = req.query.page || 1;

	if (page == 1) {
		// code to get articles from rss feed
		try {
			rssToJson.load('https://caughtoffside.com/feed', function(err, rss) {
				if (rss) {
					let source = rss.title.trim() || "CaughtOffside";
					if (rss.items.length !== 0) {
						let data = rss.items;
						for (let i=0; i<data.length; i++) {
							if (data.hasOwnProperty(i)) {
								if (!data[i]['title']) {
			                        continue;
			                    }

			                    let news = new News({
			                    	title: data[i]['title'],
			                    	description: striptags(data[i]['description']).replace(/The post (.+)/, "").trim(),
			                    	content: striptags(data[i]['content']).trim(),
			                    	pubDate: data[i]['created'] || Date.parse(data[i]['pubDate']),
			                    	link: data[i]['link'],
			                    	author: data[i]['dc_creator'],
			                    	thumbnail: data[i].media['thumbnail'][0].url[0],
			                    	source: source,
			                    	category: data[i]['category']
			                    })

			                    news.save()
			                    .then(data => {
			                        // do nothing
			                    }).catch(err => {
			                        // do nothing
			                        // ignore duplicate error
			                    });
							}
						}
					}

					News.paginate({}, { page: page, limit: 10, sort: { pubDate: -1 } })
	                .then(results => {
	                    res.send(results);
	                }).catch(err => {
	                    res.status(500).send({
	                        error: err.message || "Some error occurred while retrieving News articles."
	                    });
	                });
				}
				else {
					// if there is an error, get news articles from db
					News.paginate({}, { page: page, limit: 10, sort: { pubDate: -1 } })
	                .then(results => {
	                    res.send(results);
	                }).catch(err => {
	                    res.status(500).send({
	                        error: err.message || "Some error occurred while retrieving News articles."
	                    });
	                });
				}
			}) 
		}
		catch(error) {
			// if there is an error, get news articles from db
			News.paginate({}, { page: page, limit: 10, sort: { pubDate: -1 } })
            .then(results => {
                res.send(results);
            }).catch(err => {
                res.status(500).send({
                    error: err.message || "Some error occurred while retrieving News articles."
                });
            });
		}
	}
	// Here i am trying to prevent calling the api when switching pages
	else if (page > 1) {
		// simply send the articles in the DB
		News.paginate({}, { page: page, limit: 10, sort: { pubDate: -1 } })
        .then(results => {
            res.send(results);
        }).catch(err => {
            res.status(500).send({
                error: err.message || "Some error occurred while retrieving News articles."
            });
        });
	}	
}

// Find a single article with an Id
exports.findOne = (req, res) => {
	
	if (!req.query.newsId) {
        return res.status(400).send({
            error: "newsId cannot be empty"
        });
    }

    News.findById(req.query.newsId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                error: "Article not found"
            });            
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Article not found"
            });                
        }
        return res.status(500).send({
            error: "Error retrieving article. Please check your network connection"
        });
    });
};

// get related articles
exports.findRelated = (req, res) => {
	// Make sure id is not part of the results
    if (!req.query.category) {
        return res.status(400).send({
            error: "category cannot be empty"
        });
    }

    News.paginate({category: req.query.category}, { page: req.query.page || 1, limit: 10, sort: { pubDate: -1 } })
    .then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            error: err.message || "Some error occurred while retrieving News articles."
        });
    });
}

// retrieve categories
exports.findCategories = (req, res) => {
	News.find({}).distinct('category')
	.then(cat => {
        res.send(cat);
    }).catch(err => {
        res.status(500).send({
            error: err.message || "Some error occurred while retrieving categories."
        });
    });
}

// searching the database 
exports.search = (req, res) => {
	// Validate the request
    if (!req.query.searchString) {
        return res.status(400).send({
            error: "searchString cannot be empty"
        })
    }

    News.paginate({$text: {$search: req.query.searchString}}, { page: req.query.page || 1, limit: 40})
    .then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            error: err.message || "Some error occurred while retrieving News articles."
        });
    });
}

// Update a news article
exports.update = (req, res) => {
	// Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            error: "Article name cannot be empty"
        });
    }
    if (!req.body.newsId) {
        return res.status(400).send({
            error: "newsId cannot be empty"
        });
    }

    // Find Article and update it with the request body
    Article.findByIdAndUpdate(req.body.newsId, {
        title: req.body.title,
    	description: req.body.description,
    	content: req.body.content,
    	pubDate: req.body.pubDate,
    	link: req.body.link,
    	author: req.body.author,
    	thumbnail: req.body.thumbnail,
    	source: req.body.source,
    	category: req.body.category
    }, {new: true})
    .then(article => {
        if(!article) {
            return res.status(404).send({
                error: "Article not found with id " + req.body.newsId
            });
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Article not found with id " + req.body.newsId
            });                
        }
        return res.status(500).send({
            error: "Error updating Article with id " + req.body.newsId
        });
    });
}

// Delete a news article 
exports.delete = (req, res) => {
	if (!req.query.newsId) {
        return res.status(400).send({
            error: "newsId cannot be empty"
        });
    }

	Article.findByIdAndRemove(req.query.newsId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                error: "Article not found with id " + req.query.newsId
            });
        }
        res.send({message: "Article deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Article not found with id " + req.query.newsId
            });                
        }
        return res.status(500).send({
            error: "Could not delete article with id " + req.params.articleId
        });
    });
}