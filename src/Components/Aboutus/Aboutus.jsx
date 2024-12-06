
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi';

export default function Aboutus() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState(''); // Store raw HTML string
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  // Fetch all about entries
  async function getData() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/about');
      setData(response.data.data || []);
      console.log(response)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Send raw HTML to the API
  async function sendDataToApi() {
    try {
      const response = await axios.post(
        'https://delivery-app-pi-sable.vercel.app/api/about',
        { about: newData }, // Send the raw HTML string inside an object
        {
          headers: {
            'Content-Type': 'application/json', // Set content type as JSON
            token: localStorage.getItem('userToken'), // Include token
          },
        }
      );
      console.log('Response:', response.data);
      alert('تمت الإضافة بنجاح');
      setNewData(''); // Reset form
      getData(); // Refresh data
    } catch (error) {
      console.error('Error sending data:', error.response?.data || error);
      alert(error.response?.data?.message || 'حدث خطأ ما');
    } finally {
      setIsLoading(false);
    }
  }
  

  // Handle form submission
  function submitForm(e) {
    e.preventDefault();
    setIsLoading(true);

    const validation = validateForm();
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    } else {
      sendDataToApi();
    }
  }

  // Validate the raw HTML string
  function validateForm() {
    const schema = Joi.string().required();
    return schema.validate(newData, { abortEarly: false });
  }

  // Handle textarea input
  function getNewData(e) {
    setNewData(e.target.value); // Directly store the raw HTML string
    console.log('Raw data:', e.target.value); // Check the HTML content
  }
  

  // Delete an entry
  async function deleteEntry(id) {
    if (window.confirm('هل انت بالتأكيد تريد الحذف ؟')) {
      try {
        const response = await axios.delete(
          `https://delivery-app-pi-sable.vercel.app/api/about/${id}`,
          {
            headers: {
              token: localStorage.getItem('userToken'),
            },
          }
        );
        if (response.status === 200) {
          alert('تم الحذف بنجاح');
          getData();
        }
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  }

  return (
    <div className="p-4 admin" id="content">
      {/* Add New About Section */}
      <div className="py-3">
        <div className="edit-form">
          <div className="p-saee p-3">
            <h5 className="text-center mb-3">إضافة نبذه جديدة</h5>
            <form onSubmit={submitForm}>
              <label htmlFor="about">النص:</label>
              <textarea
                dir="ltr"
                onChange={getNewData}
                rows={5}
                className="my-input my-2 form-control"
                value={newData}
              />
              {errorList.map((err, index) => (
                <div key={index} className="alert alert-danger my-2">
                  {err.message}
                </div>
              ))}
              <div className="text-center">
                <button type="submit" className="btn btn-green mt-3">
                  {isLoading ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    'إضافة'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* About List */}
      <div className="clients-table p-4 my-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">النبذه</th>
              <th scope="col">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                item && (
                  <tr key={index} dir="ltr">
                    <td>{index + 1}</td>
                    <td>{item.about || '_'}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteEntry(item._id)}>
                        حذف
                      </button>
                    </td>
                  </tr>
                )
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
