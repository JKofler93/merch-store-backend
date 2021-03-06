import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    // createdAt updatedAt is made auto with this
    timestamps: true
    }
);

userSchema.methods.matchPassword = async function(passwordInput) {
    return await bcrypt.compare(passwordInput, this.password);
} 

const User = mongoose.model('User', userSchema);

export default User;