import mongoose from "mongoose";
import Pro from "./ProSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    pro: {
      type: mongoose.Types.ObjectId,
      ref: "Pro",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function(next){

  this.populate({
    path:'user',
    select: 'name photo',
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function(proId){

  //this points the current review
  const stats = await this.aggregate([{
    $match:{pro:proId}
  },
  {
    $group:{
      _id:'$pro',
      numOfRating:{$sum:1},
      avgRating:{$avg:'$rating'}
    }
  }
])

await Pro.findByIdAndUpdate(proId, {
  totalRating: stats[0].numOfRating,
  averageRating:stats[0].averageRating,
});

};

reviewSchema.post('save', function(){
  this.constructor.calcAverageRatings(this.pro)
});

export default mongoose.model("Review", reviewSchema);
