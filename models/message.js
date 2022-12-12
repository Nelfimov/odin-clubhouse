import {Schema, model} from 'mongoose';

const messageSchema = new Schema({
  text: {type: String, required: true},
  time_stamp: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
});

const Message = model('Message', messageSchema);

export default Message;
