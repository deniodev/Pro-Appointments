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
  const stats = await this.aggregate([
    {
      $match: { pro: proId }
    },
    {
      $group: {
        _id: "$pro",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" }
      }
    },
    {
      $project: {
        _id: 0,
        numOfRating: 1,
        avgRating: { $round: ["$avgRating", 1] }
      }
    }
  ]);

await Pro.findByIdAndUpdate(proId, {
  totalRating: stats[0].numOfRating,
  averageRating:stats[0].avgRating,
});
};

reviewSchema.post('save', async function(){
  try {
    await this.constructor.calcAverageRatings(this.pro);
  } catch (error) {
    console.error(error);
  }
});

export default mongoose.model("Review", reviewSchema);
