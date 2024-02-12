import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './OfficerNavbar';


function AdminPage() {
  const [requests, setRequests] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/api/certificateRequests');
      const sortedRequests = response.data.requests.sort((a, b) => b._id.localeCompare(a._id));
      setRequests(sortedRequests);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    setSelectedRequestId(requestId);
  };

  const handleReject = async (requestId) => {
    try {
      const reason = prompt('Enter the reason for rejection:');
      if (reason) {
        await axios.post(`/api/rejectRequest/${requestId}`, { reason });
        setSuccessMessage('Rejection reason sent to student!');
        fetchRequests();
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSendFile = async () => {
    try {
      if (!selectedFile) {
        setErrorMessage('Please select a file');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(`/api/sendFile/${selectedRequestId}`, formData);

      setSuccessMessage(response.data.message);
      setSelectedRequestId(null);
      setSelectedFile(null);
      fetchRequests();
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar/>
      <h2>Certificate Distribution</h2>
      <div className="request-list">
        {requests.map((request) => (
          <div key={request._id}>
            <h3>{request.name}</h3>
            <h3>{request.reason}</h3>
          {/*<p>Student: {request.name}</p>*/}
            {selectedRequestId === request._id ? (
              <>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleSendFile}>Send File</button>
              </>
            ) : (
              <>
                <button onClick={() => handleApprove(request._id)}>Approve</button>
                <button onClick={() => handleReject(request._id)}>Reject</button>
              </>
            )}
          </div>
        ))}
      </div>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default AdminPage;