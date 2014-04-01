'use strict';

var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var authTypes = ['twitter', 'facebook', 'google'],
    SALT_WORK_FACTOR = 10;

/**
 * User Schema
 */
var UserSchema = new Schema({
    name: String,
    email: {type: String,unique: true, lowercase: true},
    role: String,   //Physician, Nurse, Patient, Sensor, Relative, Monitor
    status:String,
    msgCnt: Number,

    details: {
        address: {type:String},
        city: {type: String, index: true, default:''},
        pincode: {type: String},
        phone: {type: String, default:''},
        tagline: {type: String},
        note: {type: String},
        thumbnail: {
            cdnUri: String,
            files: []
        },
        platform: String,
        deviceid: String
    },

    hashedPassword: String,
    provider: String,
    salt: String,
    facebook: {},
    twitter: {},
    google: {},

    passwordResetToken:String,
    resetEmailTime: {type: Date, default: Date.now},

    active: Boolean,

    createdAt  : {type : Date, default : Date.now},
    createdBy: {type : Schema.ObjectId, ref : 'User'}
});

/**
 * Virtuals
 */
UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// Basic info to identify the current authenticated user in the app
UserSchema
    .virtual('userInfo')
    .get(function() {
        return {
            'name': this.name,
            'role': this.role,
            'provider': this.provider,
            '_id': this._id
        };
    });

// Public profile information
UserSchema
    .virtual('profile')
    .get(function() {
        return {
            'name': this.name,
            'role': this.role
        };
    });

/**
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

// Validate empty email
UserSchema
    .path('email')
    .validate(function(email) {
        // if you are authenticating by any of the oauth strategies, don't validate
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return email.length;
    }, 'Email cannot be blank');

// Validate empty password
UserSchema
    .path('hashedPassword')
    .validate(function(hashedPassword) {
        // if you are authenticating by any of the oauth strategies, don't validate
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return hashedPassword.length;
    }, 'Password cannot be blank');

/**
 * Plugins
 */
UserSchema.plugin(uniqueValidator,  { message: 'Value is not unique.' });

/**
 * Pre-save hook
 */
UserSchema
    .pre('save', function(next) {
        if (!this.isNew) return next();

        if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
            next(new Error('Invalid password'));
        else
            next();
    });

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

/**
 * Statics
 */

UserSchema.statics = {

    load: function (id, cb) {
        this.findOne({ _id : id })
            //.populate('user', 'name email username')
            .exec(cb)
    },

    /**
     * Return users list
     *
     * @param {String} options
     * @return none
     * @callback with err, users list
     * @api public
     */
    list: function (options, cb) {
        var criteria = options.criteria || {}

        this.find(criteria, 'name email role provider organization')
            .sort({'name': 1}) // sort by name
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(cb)
    }
}

mongoose.model('User', UserSchema);