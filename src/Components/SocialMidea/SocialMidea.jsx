import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'

export default function SocialMidea() {
  useEffect(()=>{
    getData()
  },[])
  const [data,setdata]=useState([])
  async function getData() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/social');
      console.log(response)
      setdata(response.data.data.social)
      
    } catch (error) {
      console.error(error);
    }
  }
   // Declare state for new data and new key/value for social media links
   const [newData, setNewData] = useState({
    phone: '',
    email: '',
    pages: {}, // Store social media links here
  });
  const [newKey, setNewKey] = useState(''); // State for the social media platform name (e.g., "insta")
  const [newValue, setNewValue] = useState(''); // State for the corresponding link/email
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  async function sendDataToApi() {
    try {
      const response = await axios.post(
        'https://delivery-app-pi-sable.vercel.app/api/social',
        newData,
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      console.log(response);
      setIsLoading(false);
      window.alert('تمت الاضافة بنجاح');
      getData(); // Refresh data
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert(error.response.data.message || 'حدث خطأ ما');
    }
  }

  // Function to handle form validation
  function validateForm() {
    let schema = Joi.object({
      phone: Joi.string().required(),
      email: Joi.string().required(),
      pages: Joi.object().required(),
    });

    return schema.validate(newData, { abortEarly: false });
  }

  // Handle form submission
  function submitForm(e) {
    e.preventDefault();
    setIsLoading(true);
    let validation = validateForm();
    console.log(validation);
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    } else {
      sendDataToApi();
    }
  }

  // Handle new social media entry (add key-value pair to `pages`)
  function addSocialMedia() {
    if (newKey && newValue) {
      setNewData((prevData) => ({
        ...prevData,
        pages: {
          ...prevData.pages,
          [newKey]: newValue, // Add the key-value pair
        },
      }));
      setNewKey(''); // Clear key input after adding
      setNewValue(''); // Clear value input after adding
    } else {
      alert('Please enter both key and value');
    }
  }

  // Handle change in general form inputs
  function getNewData(e) {
    const updatedData = { ...newData };
    updatedData[e.target.name] = e.target.value;
    setNewData(updatedData);
    console.log(updatedData);
  }


return (
<>
 <div className='p-4 admin' id='content'>

<div className=" py-3">
  <div className="edit-form">
    <div className="p-saee p-3">
      <h5 className="text-center mb-3">إضافة وسائل التواصل   </h5>
      <form onSubmit={submitForm} action="">
              <label htmlFor="">رقم الهاتف :</label>
              <input
                onChange={getNewData}
                type="text"
                className="my-input my-2 form-control"
                name="phone"
                value={newData.phone}
              />
                   <label htmlFor="">الايميل :</label>
              <input
                onChange={getNewData}
                type="text"
                className="my-input my-2 form-control"
                name="email"
                value={newData.email}
              />

              {/* Social Media Input Fields */}
              <label htmlFor="">أضف وسيلة التواصل الاجتماعي:</label>
              <div>
                <input
                  onChange={(e) => setNewKey(e.target.value)}
                  type="text"
                  className="my-input my-2 form-control"
                  placeholder="مفتاح مثل 'insta'"
                  value={newKey}
                />
                <input
                  onChange={(e) => setNewValue(e.target.value)}
                  type="text"
                  className="my-input my-2 form-control"
                  placeholder="رابط أو بريد إلكتروني"
                  value={newValue}
                />
                <button type="button" className='btn btn-secondary fw-bold' onClick={addSocialMedia}>
                  +
                </button>
              </div>

              {/* Display the added social media links */}
              <div>
                {Object.entries(newData.pages).map(([key, value], index) => (
                  <div key={index}>
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button className="btn btn-green mt-3">
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


<div className="clients-table p-4 my-4">
<table className="table">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">رقم الهاتف  </th>
<th scope="col">الايميل  </th>
<th scope="col">الصفحات  </th>
<th></th>           

</tr>
</thead>
<tbody>
{/* {data && data.map((item,index) =>(
item !== null ? ( */}
{data &&
  <tr>
    <td></td>
    {data.phone?<td>{data.phone}</td>:<td>_</td>}
    {data.email?<td>{data.email}</td>:<td>_</td>}
{/* Display social media pages */}
<td>
            {data.pages && Object.entries(data.pages).length > 0 ? (
              Object.entries(data.pages).map(([key, value], idx) => (
                <div key={idx}>
                  <strong>{key}:</strong> {value}
                </div>
              ))
            ) : (
              '_'
            )}
          </td>    
<td>
<button
className="btn btn-danger"
onClick={() => {
  if (window.confirm('هل انت بالتأكيد تريد الحذف ؟')) {
    axios
      .delete(`https://delivery-app-pi-sable.vercel.app/api/social/${data._id}`, 
       {
        headers: {
          token: localStorage.getItem('userToken'),
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
          getData();
                  window.alert('تم الحذف بنجاح')

        }
      })
      .catch((error) => {
        console.error(error);
            // window.alert(error.response.data.data.error)
      });
  }
}}
>
 حذف 
</button>
</td>

  </tr>}
{/* // ): null
// ) */}


{/* )} */}
</tbody>
</table>
</div>
</div>

</>
)
}
