import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://svibnfyu2j.execute-api.ap-south-1.amazonaws.com/Production/customer-enquiry', // AWS APIGATEWAY USING REST-API
        formData
      );

      // Handle response based on status code
      switch (response.status) {
        case 200:
          toast.success('Enquiry submitted successfully!');
          setFormData({
            name: '',
            email: '',
            category: '',
            message: '',
          });
          break;
        case 400:
          toast.error('Bad Request: Please check your input and try again.');
          break;
        case 500:
          toast.error('Server Error: There was a problem processing your request. Please try again later.');
          break;
        default:
          toast.error('Unexpected error occurred. Please try again.');
      }
    } catch (error) {
      // Extract the error message from the response if available
      const errorMessage = error.response?.data?.error || 'Failed to submit enquiry. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className='py-8'>
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-xl rounded-2xl flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        {/* Left Information Section */}
        <div className="bg-slate-900 text-white p-8 rounded-xl md:w-2/3 flex flex-col space-y-4 gap-3">
          <h1 className="text-4xl font-light">Serverless Customer Enquiry</h1>
          <h1 className="text-xl font-semibold">Project Overview: Serverless Architecture with REST API, AWS Lambda, and DynamoDB</h1>

          <div className="space-y-1">
            <p className="font-semibold text-base">Email:</p>
            <p className="text-gray-300">j.karthikeyandev@gmail.com</p>
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-base">Github:</p>
            <p className="text-gray-300">https://github.com/iamkarthykeyan</p>
          </div>
        </div>

        {/* Right Contact Form Section */}
        <div className="bg-white p-8 rounded-xl md:w-2/3 flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Get In Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 font-medium mb-1">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 font-medium mb-1">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category" className="text-gray-700 font-medium mb-1">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="border-0 rounded-lg p-3 bg-gray-100 text-gray-700"
              >
                <option value="" disabled>Select a category</option>
                <option value="General">General</option>
                <option value="Support">Support</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="text-gray-700 font-medium mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="3"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-2 px-4 rounded-lg hover:bg-slate-800 transition duration-300 font-semibold text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <ToastContainer className="mt-6" />
    </div>



  );
};

export default EnquiryForm;
