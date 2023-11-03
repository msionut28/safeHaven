

import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: 'You must be logged in to delete a review.' });
    }

    const reviewId = req.query.id;
    const userId = session.user.id; 

   
    const review = await findReviewById(reviewId);
    if (review && review.userId === userId) {
      await deleteReview(reviewId);
      res.status(200).json({ message: 'Review deleted successfully' });
    } else {
      res.status(403).json({ message: 'You are not authorized to delete this review' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const deleteReview = async (reviewId) => {
    try {
      const res = await fetch(`/DeleteReview/${reviewId}`, {
        method: 'DELETE',
      });
  
      if (res.ok) {

        alert('Review deleted successfully');
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Failed to delete review:', error);
      alert('Failed to delete review');
    }
  };
  
}
