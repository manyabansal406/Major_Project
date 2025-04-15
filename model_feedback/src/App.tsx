import React, { useState, useEffect } from 'react';
import { Star, StarOff } from 'lucide-react';

interface FeedbackData {
  id: string;
  jobPosting: string;
  rating: number;
  feedback: string;
  timestamp: string;
}

const MOCK_JOB_POSTINGS = [
  "Software Engineer at TechCorp",
  "Data Scientist at DataCo",
  "Product Manager at ProductLabs",
  "UX Designer at DesignStudio"
];

function App() {
  const [selectedJob, setSelectedJob] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState<FeedbackData[]>([]);

  useEffect(() => {
    const savedFeedback = localStorage.getItem('feedbackData');
    if (savedFeedback) {
      setFeedbackList(JSON.parse(savedFeedback));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedJob || rating === 0) {
      alert('Please select a job posting and provide a rating');
      return;
    }

    const newFeedback: FeedbackData = {
      id: crypto.randomUUID(),
      jobPosting: selectedJob,
      rating,
      feedback,
      timestamp: new Date().toISOString()
    };

    const updatedFeedbackList = [...feedbackList, newFeedback];
    setFeedbackList(updatedFeedbackList);
    localStorage.setItem('feedbackData', JSON.stringify(updatedFeedbackList));

    // Reset form
    setSelectedJob('');
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Provide Feedback</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Posting Dropdown */}
          <div>
            <label htmlFor="jobPosting" className="block text-sm font-medium text-gray-700">
              Select Job Posting
            </label>
            <select
              id="jobPosting"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border"
            >
              <option value="">Select a job posting</option>
              {MOCK_JOB_POSTINGS.map((job) => (
                <option key={job} value={job}>{job}</option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-yellow-400 hover:scale-110 transition-transform"
                >
                  {star <= rating ? (
                    <Star className="w-6 h-6 fill-current" />
                  ) : (
                    <StarOff className="w-6 h-6" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 border"
              placeholder="Please describe your experience with this job posting verification..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Feedback
          </button>
        </form>

        {/* Feedback List */}
        {feedbackList.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Previous Feedback</h2>
            <div className="space-y-4">
              {feedbackList.map((item) => (
                <div key={item.id} className="border rounded-md p-4">
                  <p className="font-medium">{item.jobPosting}</p>
                  <div className="flex gap-1 my-2">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{item.feedback}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;