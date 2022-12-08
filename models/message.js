import { Schema, model, ObjectId } from 'mongoose';

const messageSchema = new Schema({
  text: {type: String, required: true},
  time_stamp: {type: String, required: true},
  author: {type: ObjectId, ref: 'User', required: true},
});

const Message = model('Message', messageSchema);

export default Message;
