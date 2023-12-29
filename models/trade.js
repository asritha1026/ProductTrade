const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const tradeSchema = new Schema({
    name:{type: String, required:[true,'Name is required']},
    category: {type:String, required: [true,'Category is required']},
    details:{type:String, required:[true, 'Details is required'],minLength:[10,'the details content should have at least 10 characters']},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    status: {type:String, required: [true,'Status is required'],enum:['Available','Offer pending','Traded']},
    image: {type:String, required: [true,'Image is required']},
    topic: {type:String, required: [true,'Topic is required']},
    age: {type:String, required: [true,'Age is required']},
    offerName: { type:String },
    Offered:{type:Boolean},
    Watchlist: { type: Boolean },
},
{timestamps:true}
);

//collection name is stories in the database
module.exports = mongoose.model('trades',tradeSchema);
