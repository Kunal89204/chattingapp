const  mongoose  = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: String
}, { timestamps: true })

// hashing the password before saving
userSchema.pre("save", async function (next) {
    const user = this;

    try {
        if (!user.isModified("password")) {
            return next();
        }

        user.password = await bcrypt.hash(user.password, 10);
        next();
    } catch (error) {
        console.log(error);
    }
});

// comparing the password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// generating access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
        },
        process.env.jwt_secret,
        {
            expiresIn: "2h",
        }
    );
};

// generating Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.jwt_secret,
        {
            expiresIn: "24h",
        }
    );
};


module.exports = mongoose.model("user", userSchema)