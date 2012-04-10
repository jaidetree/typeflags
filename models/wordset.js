var WordSet = new Schema({
      id        : Schema.ObjectId
    , date      : { type: Date, default: Date.now }   
    , words     : [String]
    , status    : { type: String, default: 'public' }
});
mongoose.model('WordSet', WordSet);
