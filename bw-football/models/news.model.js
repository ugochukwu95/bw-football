const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const NewsSchema = mongoose.Schema({
	title: {
		type: String,
		index: true,
        unique: true,
        required: true
	},
	description: {
        type: String,
    },
    content: {
    	type: String
    },
    pubDate: {
    	type: Date, 
        index: true,
        default: Date.now
    },
    link: {
    	type: String
    },
    author: {
    	type: String
    },
    thumbnail: {
    	type: String
    },
    source: {
    	type: String
    },
    category: {
    	type: String
    }
});

// Give schema pagination capabilities
NewsSchema.plugin(mongoosePaginate);

// add a text index to schema
NewsSchema.index({ description: 'text', title: 'text' });

module.exports = mongoose.model('News', NewsSchema);