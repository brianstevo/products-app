const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
    password: {
		type: String,
		required: true,
	},
	role:{
		type: Number,
		default: 1
	},
}, {
	timestamps: true
});
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);
module.exports = User;