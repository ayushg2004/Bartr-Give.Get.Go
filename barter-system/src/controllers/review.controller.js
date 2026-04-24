import { BarterRequest } from "../models/barterRequest.model.js";
import { Review } from "../models/review.model.js";

//! add a review and rating after completed the trade
export const createReview = async (req, res) => {
	const { reviewedUserId, barterRequestId, rating, comment } = req.body;
  
	try {
	  // Check if barter request exists
	  const barterRequest = await BarterRequest.findById(barterRequestId);
	  if (!barterRequest) {
		return res.status(404).json({ message: "Barter request not found" });
	  }
  
	  // Avoid self-review
	  if (reviewedUserId == req.user._id) {
		return res.status(400).json({ message: "You can't review yourself" });
	  }
  
	  // Ensure only users from the transaction can leave a review
	  if (
		![
		  barterRequest.sender.toString(),
		  barterRequest.receiver.toString(),
		].includes(req.user._id.toString())
	  ) {
		return res
		  .status(403)
		  .json({ message: "You can only review trades you participated in" });
	  }
  
	  // Use findOneAndUpdate with upsert to create or update the review
	  const review = await Review.findOneAndUpdate(
		{
		  reviewer: req.user._id,
		  barterRequestId: barterRequestId,
		},
		{
		  reviewer: req.user._id,
		  reviewedUser: reviewedUserId,
		  barterRequestId: barterRequestId,
		  rating,
		  comment,
		},
		{
		  upsert: true, // Create if it doesn't exist, update if it does
		  new: true, // Return the updated document
		}
	  );
	  res.status(200).json(review);
	} catch (error) {
		console.log(error)
	  res.status(500).json({ message: "Server error", error: error.message });
	}
  };

//! fetch all review for a user
export const getUserReviews = async (req, res) => {
	try {
		const reviews = await Review.find({ reviewedUser: req.params.userId })
			.populate("reviewer", "name") // Get reviewer's name
			.select("rating comment createdAt");

		res.status(200).json(reviews);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
