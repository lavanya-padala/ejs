const { Schema, model } = require('mongoose');
const { hashSync, compareSync } = require('bcryptjs');

const userSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        mobileNumber: {
            type: String,
            validate: {
              validator: function (v) {
                // Regular expression to validate the mobile number format
                return /^\d{10}$/g.test(v);
              },
              message: props => `${props.value} is not a valid mobile number!`
            },
            required: true
          },
    }, {
    versionKey: false,

}
)

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) next()
    this.password = hashSync(this.password)
    next()
})

userSchema.methods.checkPassword = function (password) {
    return compareSync(password, this.password)
}

module.exports = model('user', userSchema)