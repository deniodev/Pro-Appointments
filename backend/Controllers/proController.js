import Pro from "../models/ProSchema.js";

export const updatePro = async(req,res)=>{
    const id = req.params.id;

    try {
        const updatedPro= await Pro.findByIdAndUpdate(
            id, 
            {$set:req.body}, 
            {new:true}
        );

        res
        .status(200)
        .json({
            success:true, 
            message:'Sucessfully updated', 
            data:updatedPro,
        });
    } catch (err) {
        res.status(500).json({ success:false, message:'Failed to update'})
    }
};

export const deletePro = async (req, res)=>{
    const id = req.params.id;

    try {
        await Pro.findByIdAndDelete(id);

        res
        .status(200)
        .json({
            success:true, 
            message:'Sucessfully deleted', 
        });
    } catch (err) {
        res.status(500).json({ success:false, message:'Failed to delete'})
    }
};

export const getSinglePro = async(req,res)=>{
    const id = req.params.id;

    try {
        const pro = await Pro.findById(id)
        .populate("reviews")
        .select("-password");

        res
        .status(200)
        .json({
            success:true, 
            message:'User Found', 
            data:pro,
        });
    } catch (err) {
        res.status(404).json({ success:false, message:'No user found'})
    }
};

export const getAllPro = async(req,res)=>{

    try {

        const {query} = req.query;
        let pros;

        if(query){
            pros = await Pro.find({
                isApproved:'approved',
                $or:[
                    {name:{$regex: query, $options: "i" }},
                    {specialization: { $regex: query, $options: "i" }}],
            }).select("-password");
        } else {

            pros = await Pro.find({isApproved:'approved'}).select("-password");
        }

        res
        .status(200)
        .json({
            success:true, 
            message:'Pros Found', 
            data: pros,
        });
    } catch (err) {
        res.status(404).json({ success:false, message:'Not found'})
    }
};

export const getProProfile = async(req,res)=>{
    const proId = req.userId

    try {
        const pro = await Pro.findById(proId);

        if(!pro){
            return res.status(404).json({success:false, message:'Pro not found'})
        }

        const {password, ...rest} = pro._doc;

        res.status(200).json({success:true, message:'Profile info is getting', data:{...rest}})

    } catch (err) {
        res.status(500).json({ success:false, message:'Something went wrong, cannot get'});
    }
}