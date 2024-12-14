import React, { useState } from 'react';
import axios from 'axios';
import { getAuthHeader } from '../utils/authUtils';
import { checkTokenValidity } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa'; // For loading spinner

const SubmitComplaint = () => {
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintMessage, setComplaintMessage] = useState('');
  const [messNumber, setMessNumber] = useState('dh1');
  const [related, setRelated] = useState('food');
  const [other, setOther] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // To handle loading state

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Start loading

    // Fetch token for authorization
    const headers = getAuthHeader();

    if (!headers || !headers.Authorization) {
      setError("User is not logged in. Please log in to submit a complaint.");
      setLoading(false); // Stop loading
      return;
    }

    // Create FormData object for the complaint submission
    const formData = new FormData();
    formData.append('complaint_title', complaintTitle);
    formData.append('complaint_message', complaintMessage);
    formData.append('related', related);
    formData.append('other', other);
    if (image) {
      formData.append('image', image);
    }

    if (!checkTokenValidity()) {
      setError("Session expired. Please log in again.");
      setLoading(false); // Stop loading
      navigate("/login");
      return;
    }

    try {
      // Send the complaint data to the backend API with messid in URL
      const response = await axios.post(
        `http://localhost:5000/api/complaint/create/${messNumber}`, // Backend URL
        formData,
        { headers }
      );

      setSuccess(response.data.message || 'Complaint submitted successfully.');
      setError('');
      setLoading(false); // Stop loading

      // Clear the form after successful submission
      setComplaintTitle('');
      setComplaintMessage('');
      setMessNumber('dh1');
      setRelated('food');
      setOther('');
      setImage(null);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Error submitting complaint';
      setError(errorMessage);
      setSuccess('');
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800">Submit Your Complaint</h2>

      {/* Show error or success messages */}
      {error && (
        <div className="text-red-600 flex items-center space-x-2">
          <span className="font-medium">Error:</span><p>{error}</p>
        </div>
      )}
      {success && (
        <div className="text-green-600 flex items-center space-x-2">
          <span className="font-medium">Success:</span><p>{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Complaint Title:</label>
          <input
            type="text"
            value={complaintTitle}
            onChange={(e) => setComplaintTitle(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the title of your complaint"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Complaint Message:</label>
          <textarea
            value={complaintMessage}
            onChange={(e) => setComplaintMessage(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Describe the complaint in detail"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mess Number:</label>
          <select
            value={messNumber}
            onChange={(e) => setMessNumber(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="dh1">DH1</option>
            <option value="dh2">DH2</option>
            <option value="dh3">DH3</option>
            <option value="dh4">DH4</option>
            <option value="dh5">DH5</option>
            <option value="dh6">DH6</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Related to:</label>
          <select
            value={related}
            onChange={(e) => setRelated(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="food">Food</option>
            <option value="water">Water</option>
            <option value="cleaning">Cleaning</option>
            <option value="tables">Tables</option>
            <option value="hygiene">Hygiene</option>
            <option value="chairs">Chairs</option>
            <option value="workers">Workers</option>
            <option value="other">Other</option>
          </select>
        </div>

        {related === 'other' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Other Details:</label>
            <input
              type="text"
              value={other}
              onChange={(e) => setOther(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Specify the issue"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Complaint Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin mr-2" /> Processing...
              </div>
            ) : (
              'Submit Complaint'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitComplaint;
