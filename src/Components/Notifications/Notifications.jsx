import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi';

export default function Notifications() {
    const [errorList, seterrorList] = useState([]);
    const [newData, setNewData] = useState({
      title: '',
      body: '',
    });
    const [target, setTarget] = useState(""); // "clients" or "drivers"
    const [error, setError] = useState('');
    const [isLoading, setisLoading] = useState(false);
  
    function getNewData(e) {
      setNewData({ ...newData, [e.target.name]: e.target.value });
    }
  
    function validateForm() {
      let schema = Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
      });
  
      return schema.validate(newData, { abortEarly: false });
    }
  
    async function submitForm(e) {
      e.preventDefault();
      setisLoading(true);
      const validation = validateForm();
  
      if (validation.error) {
        setisLoading(false);
        seterrorList(validation.error.details);
        return;
      }
  
      try {
        const endpoint =
          target === 'clients'
            ? 'to-clients'
            : target === 'drivers'
            ? 'to-drivers'
            : null;
  
        if (!endpoint) return;
  
        const response = await axios.post(
          `https://delivery-app-pi-sable.vercel.app/api/notifications/${endpoint}`,
          newData,
          {
            headers: {
              token: localStorage.getItem('userToken'),
            },
          }
        );
  
        alert('تم الإرسال بنجاح');
        console.log(response);
        seterrorList([]);
      } catch (error) {
        console.error(error);
      } finally {
        setisLoading(false);
      }
    }
  
    return (
      <div className='p-4 admin' id='content'>
        <div className='edit-form'>
          <div className='p-saee p-3'>
            <h5 className='text-center mb-3'>إرسال اشعارات</h5>
            <form onSubmit={submitForm}>
              <div className='form-group' dir='ltr'>
                <label htmlFor='title'>title :</label>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  name='title'
                  value={newData.title}
                  onChange={getNewData}
                  required
                />
                {errorList.map(
                  (err, index) =>
                    err.context.label === 'title' && (
                      <div key={index} className='alert alert-danger my-2'>
                        يجب ملىء جميع البيانات
                      </div>
                    )
                )}
  
                <label htmlFor='body'>body :</label>
                <input
                  type='text'
                  className='form-control'
                  id='body'
                  name='body'
                  value={newData.body}
                  onChange={getNewData}
                  required
                />
                {errorList.map(
                  (err, index) =>
                    err.context.label === 'body' && (
                      <div key={index} className='alert alert-danger my-2'>
                        يجب ملىء جميع البيانات
                      </div>
                    )
                )}
              </div>
  
              <div className='text-center'>
                <button
                  type='submit'
                  className='btn btn-success m-2'
                  onClick={() => setTarget('clients')}
                >
                    {isLoading===true?<i
                    className="fa fa-spinner fa-spin"></i>:"ارسال لجميع العملاء"}
                
                </button>
                <button
                  type='submit'
                  className='btn btn-primary m-2'
                  onClick={() => setTarget('drivers')}
                >
                    {isLoading===true?<i
                    className="fa fa-spinner fa-spin"></i>:"ارسال لجميع السائقين"}
                  
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
