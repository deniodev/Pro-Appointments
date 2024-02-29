import Review from "../models/ReviewSchema.js";
import Pro from "../models/ProSchema.js";

//get all reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});

        res
        .status(200)
        .json({success:true, message:'Succcessful', data:reviews});
    } catch (err) {        
        res.status(404).json({success:false, message:'Not Found!'});
    }
};

//create review
export const createReview = async(req,res) => {

    if(!req.body.pro) req.body.pro = req.params.proId
    if(!req.body.user) req.body.user = req.userId

    const newReview = new Review(req.body)

    try {

        const savedReview = await newReview.save();

        await Pro.findByIdAndUpdate(req.body.pro, {
            $push:{reviews: savedReview._id}
        })

        res.status(200).json({ success:true, message:"Review submitted", data:savedReview });
        
    } catch (err) {
        res.status(500).json({ success:false, message: err.message });
    }

};

