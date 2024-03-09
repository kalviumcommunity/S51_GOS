const mongoose = require("mongoose");

const SenakerSchema = new mongoose.Schema({
    SneakerID: { type: Number },
    Brand: { type: String },
    Model: { type: String },
    Type : {type : String},
    Color : {type : String},
    Size : {type : Number },
    Price : {type : Number},
    SneakerURL : {type : String},
    Availability : {type : String},
    CreatedBy : {type : String}

},
);


module.exports = mongoose.model("galleryofsneakers", SenakerSchema);