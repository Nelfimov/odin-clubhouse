import {Schema, model} from 'mongoose';

const userSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  status: {type: Boolean, required: true, default: false},
  isAdmin: {type: Boolean, default: false},
});

const User = model('User', userSchema);

export default User;
