import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'
import {Modal, Button } from 'react-bootstrap';

export default function Drivers() {
  useEffect(()=>{
    getData()
    getCategories()
    getPosition()
    getVillage()
  },[])
  const [categories,setCategories]=useState([])
  async function getCategories() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/category');
      console.log(response)
      setCategories(response.data.data.categories)
      
    } catch (error) {
      console.error(error);
    }
  }
  const [positions,setPosition]=useState([])
  async function getPosition() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/position');
      console.log(response)
      setPosition(response.data.data.positions)
      
    } catch (error) {
      console.error(error);
    }
  }
  const [villages,setVillages]=useState([])
  async function getVillage() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/village');
      console.log(response)
      setVillages(response.data.data.village)
      
    } catch (error) {
      console.error(error);
    }
  }
  const [data,setdata]=useState([])
  async function getData() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/driver',
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      console.log(response)
      setdata(response.data.data.users)
      
    } catch (error) {
      console.error(error);
    }
  }

  const [selectedImages, setSelectedImages] = useState([]);
      const [showModal, setShowModal] = useState(false);
      function openCarousel(images) {
        setSelectedImages(images);
        setShowModal(true);
      }

      const [searchPosition, setSearchPosition] = useState('');
      const [searchCategory, setSearchCategory] = useState('');
      const [searchRate, setSearchRate] = useState('');
      const [searchAge, setSearchAge] = useState('');
      const [searchOnline, setSearchOnline] = useState('');
      const [searchTime, setSearchTime] = useState('');
      const [loading, setLoading] = useState(false);

      async function getSearchData() {
        try {
          setLoading(true);
          const response = await axios.get(`https://delivery-app-pi-sable.vercel.app/api/driver`, {
            params: {
                position: searchPosition,
                category: searchCategory,
                rateAvg: searchRate,
                online:searchOnline,
                age:searchAge,
                
              },
              
                headers: {
                  token: localStorage.getItem('userToken'),
                },
              }
            );
            console.log(response)
            setdata(response.data.data.users)
        } catch (error) {
          console.error('Error fetching :', error);
        } finally {
          setLoading(false); 
        }
      }

      const [showModalMain, setShowModalMain] = useState(false);
      const [selectedId, setSelectedId] = useState(false);
      const openModalMain = (id) => {
        setShowModalMain(true);
        setSelectedId(id)
      };
    
      const closeModalMain = () => {
        setShowModalMain(false);
      };

      async function confirmUser(id,value) {
        try {
          const response = await axios.put(`https://delivery-app-pi-sable.vercel.app/api/admin/confirm-user/${id}`,
            {
              value
            },
            {
              headers: {
                token: localStorage.getItem('userToken'),
              },
            }
          );
          console.log(response)
          alert(response.data.message)   
          getData()       
        } catch (error) {
          console.error(error);
        }
      }
      async function validUser(id,value) {
        try {
          const response = await axios.put(`https://delivery-app-pi-sable.vercel.app/api/admin/invalid-user/${id}`,
            {
              value
            },
            {
              headers: {
                token: localStorage.getItem('userToken'),
              },
            }
          );
          console.log(response)
          alert(response.data.message) 
          getData()         
        } catch (error) {
          console.error(error);
        }
      }
      async function blockUser(id,value) {
        try {
          const response = await axios.put(`https://delivery-app-pi-sable.vercel.app/api/admin/block-user/${id}`,
            {
              value
            },
            {
              headers: {
                token: localStorage.getItem('userToken'),
              },
            }
          );
          console.log(response)
          alert(response.data.message)   
          getData()       
        } catch (error) {
          console.error(error);
        }
      }
      async function highlightUser(id,value) {
        try {
          const response = await axios.put(`https://delivery-app-pi-sable.vercel.app/api/admin/highlight-user/${id}`,
            {
              value
            },
            {
              headers: {
                token: localStorage.getItem('userToken'),
              },
            }
          );
          console.log(response)
          alert(response.data.message)   
          getData()       
        } catch (error) {
          console.error(error);
        }
      }

      const [offers,setOffers]=useState([])
      async function getOffers(id) {
        try {
          const response = await axios.get(`https://delivery-app-pi-sable.vercel.app/api/offer/by-userid/${id}`,
            {
              headers: {
                token: localStorage.getItem('userToken'),
              },
            }
          );
          console.log(response)
          setOffers(response.data.data.offers)
          
        } catch (error) {
          console.error(error);
        }
      }   
      const [showModalOffer, setShowModalOffer] = useState(false);
  const openModalOffer = (id) => {
    getOffers(id)
    setShowModalOffer(true);
  };

  const closeModalOffer = () => {
    setShowModalOffer(false);
    setOffers('')
  }; 
  const [reviews,setReviews]=useState([])
      async function getRevies(id) {
        try {
          const response = await axios.get(`https://delivery-app-pi-sable.vercel.app/api/review/by-driverid/${id}`,
            {
              headers: {
                token: localStorage.getItem('userToken'),
              },
            }
          );
          console.log(response)
          setReviews(response.data.data.review)
          
        } catch (error) {
          console.error(error);
        }
      }   
  const [showModalReviews, setShowModalReviews] = useState(false);
  const openModalReviews = (id) => {
    getRevies(id)
    setShowModalReviews(true);
  };

  const closeModalReviews = () => {
    setShowModalReviews(false);
    setReviews('')
  }; 

  //edit data 
  const [isModalOpenData, setIsModalOpenData] = useState(false);
const [editedData, setEditedData] = useState(null);
const [eData, seteData] = useState(null);
  const handleEditClickData = (data) => {
  seteData(data);
  setEditedData({
    name: data?.name || '',
    phone: data?.phone || '',
    email: data?.email || '',
    password: data?.password || '',
    position: data?.position?._id || '',
    village: data?.village?._id || '',
    address: data?.address || '',
    urlLocation: data?.urlLocation || '',
    online:data?.online || '',
    categoryId: data?.categoryId?._id || '',
    dateOfBirth: data?.dateOfBirth || '',
    positionLocation: data?.positionLocation || '',
    description: data?.description || '',
    vehicleNumber: data?.vehicleNumber || '',
    vehicleColor: data?.vehicleColor || '',
    vehicleType: data?.vehicleType || '',
    vehiclesImgs: data?.vehiclesImgs || [],
    licenseVehicleImgs: data?.licenseVehicleImgs || [],
    profileImg: data?.profileImg || [],
    idCardImg: data?.idCardImg || [],
    licenseImg: data?.licenseImg || [],
  });
  setIsModalOpenData(true);
}; 

const closeModalData = () => {
  setIsModalOpenData(false);
  setEditedData(null);
};

const handleInputChangeData = (event) => {
  const { name, value } = event.target;
  setEditedData((prev) => ({ ...prev, [name]: value }));
};

const handleFileChangeEdit = (event) => {
  const files = Array.from(event.target.files);
  setEditedData((prev) => ({
    ...prev,
    profileImg: [...prev.profileImg, ...files],
  }));
};
const handleFileIdCardEdit = (event) => {
  const files = Array.from(event.target.files);
  setEditedData((prev) => ({
    ...prev,
    idCardImg: [...prev.idCardImg, ...files],
  }));
};
const handleFileLicenseImgEdit = (event) => {
  const files = Array.from(event.target.files);
  setEditedData((prev) => ({
    ...prev,
    licenseImg: [...prev.licenseImg, ...files],
  }));
};
const handleFileVehiclesEdit = (event) => {
  const files = Array.from(event.target.files);
  setEditedData((prev) => ({
    ...prev,
    vehiclesImgs: [...prev.vehiclesImgs, ...files],
  }));
};

const handleLicenseVehicleImgsEdit = (event) => {
  const files = Array.from(event.target.files);
  setEditedData((prev) => ({
    ...prev,
    licenseVehicleImgs: [...prev.licenseVehicleImgs, ...files],
  }));
};

const handleEditSubmitData = async (event) => {
  console.log("Edited Data to Submit:", editedData);

  event.preventDefault();
  const formData = new FormData();
  formData.append('name', editedData.name);
  formData.append('description', editedData.description);
  formData.append('phone', editedData.phone);
  formData.append('email', editedData.email);
  formData.append('password', editedData.password);
  formData.append('position', editedData.position);
  formData.append('village', editedData.village);
  formData.append('address', editedData.address);
  formData.append('urlLocation', editedData.urlLocation);
  formData.append('online', editedData.online);
  // formData.append('startTime', editedData.startTime);
  // formData.append('endTime', editedData.endTime);
  formData.append('categoryId', editedData.categoryId);
  formData.append('dateOfBirth', editedData.dateOfBirth);
  formData.append('positionLocation', editedData.positionLocation);
  formData.append('vehicleNumber', editedData.vehicleNumber);
  formData.append('vehicleColor', editedData.vehicleColor);
  formData.append('vehicleType', editedData.vehicleType);
  if (Array.isArray(editedData.profileImg)) {
    // If profileImg is an array, loop through and append files to formData
    editedData.profileImg.forEach((file) => formData.append('profileImg', file));
} else if (editedData.profileImg) {
    // If profileImg is a single file, append it directly
    formData.append('profileImg', editedData.profileImg);
}
// if (Array.isArray(editedData.idCardImg)) {
//   editedData.idCardImg.forEach((file) => formData.append('idCardImg', file));
// } else if (editedData.idCardImg) {
//   formData.append('idCardImg', editedData.idCardImg);
// }
// if (Array.isArray(editedData.licenseImg)) {
//   editedData.licenseImg.forEach((file) => formData.append('licenseImg', file));
// } else if (editedData.licenseImg) {
//   formData.append('licenseImg', editedData.licenseImg);
// }
editedData.vehiclesImgs.forEach((file) => formData.append('vehiclesImgs', file));
editedData.licenseVehicleImgs.forEach((file) => formData.append('licenseVehicleImgs', file));
editedData.idCardImg.forEach((file) => formData.append('idCardImg', file));
editedData.licenseImg.forEach((file) => formData.append('licenseImg', file));

  try {
    const response = await axios.put(`https://delivery-app-pi-sable.vercel.app/api/admin/update-user/${eData._id}`, formData,
      {
        headers: {
          token: localStorage.getItem('userToken'),
        },
      }
    );
    alert("تم التعديل بنجاح");
    console.log(response)
    closeModalData();
    getData();
  } catch (error) {
    console.error(error);
    alert(error.response.data.message);
  }
};
  return (
    <>
 <div className='p-4 admin' id='content'>
 <div className="gray-table p-4 mb-4">
      <div className="row">
        <div className="col-md-4">
          <select className="form-control m-1"  onChange={(e) => setSearchPosition(e.target.value)}>
            {positions&&positions.map((item,index)=>{
              return(<>
                    <option value="">المنطقة</option>
                    <option key={index} value={item._id}>{item.name}</option>

              </>
              )
            })}
          </select>
        </div>
        <div className="col-md-4">
          <select className="form-control m-1"  onChange={(e) => setSearchCategory(e.target.value)}>
            {categories&&categories.map((item,index)=>{
              return(<>
                    <option value="">الفئة</option>
                    <option key={index} value={item._id}>{item.name}</option>

              </>
              )
            })}
          </select>
        </div>
        <div className="col-md-4">
          <input className='form-control m-1' type="search"
            placeholder="العمر"
              onChange={(e) => setSearchAge(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input className='form-control m-1' type="search" 
          placeholder="التقييم"
          onChange={(e) => setSearchRate(e.target.value)} />
        </div>
       <div className="col-md-4">
          <input className='form-control m-1' type="search" 
          
          placeholder="متاح"
          onChange={(e) => setSearchOnline(e.target.value)} />
        </div>
        
        <div className="text-center mt-1">
        <button className="btn btn-green m-1" onClick={getSearchData}>
  بحث
</button>  

 </div>
      </div>
    </div>

<div className="clients-table p-4 my-4">
<button className="btn btn-green m-1" onClick={getData}>عرض الجميع   </button>

<table className="table">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">الصورة  </th>
<th scope="col">الاسم  </th>
<th scope="col">العمر  </th>
<th scope="col">الهاتف  </th>
<th scope="col">الايميل  </th>
<th scope="col">المنطقة  </th>
<th scope="col">العنوان  </th>
<th scope="col">القرية  </th>
<th scope="col">الموقع  </th>
<th scope="col">التوصيل  </th>
<th scope="col">الفئة  </th>
<th scope="col">عدد التواصل  </th>
{/* <th scope="col">التوثيق  </th>
<th scope="col">الاشتراك  </th> */}
<th scope="col">التقييم  </th>
<th scope="col">الوصف  </th>
<th scope="col">الصور  </th>
<th scope="col">اللون  </th>
<th scope="col">النوع  </th>
<th scope="col">الرقم  </th>
<th scope="col">البطاقة  </th>
<th scope="col">الرخصة  </th>
<th scope="col">رخص العربية  </th>
<th scope="col">isConfirmed  </th>
<th scope="col">isValid(الاشتراك)  </th>
<th scope="col">حظر  </th>
<th scope="col">التمييز  </th>
<th></th>           
<th></th>           
<th></th>           

</tr>
</thead>
<tbody>
    {data && data.map((item, index) => (
      item !== null ? (
        <tr key={index} className={item.isBlocked==true?"bg-block":""}>
          <td>{index + 1}</td>
          <td>{item.profileImg?<img className='img-driver' src={item.profileImg} alt='img'/> : "_"}</td>
          <td>{item.name || "_"}</td>
          <td>{item.age || "_"}</td>
          <td>{item.phone || "_"}</td>
          <td>{item.email || "_"}</td>
          <td>{item.position?.name || "_"}</td>
          <td>{item.address || "_"}</td>
          {item.village !== null?<td> {item.village?.name}</td>:<td>_</td>}
          <td>{item.urlLocation || "_"}</td>
          <td>{item.positionLocation || "_"}</td>
          <td>{item.categoryId?.name || "_"}</td>
          <td>{item.numberOfConnect || "_"}</td>
          
          <td>{item.rateAvg || "_"}</td>
          <td>{item.description || "_"}</td>
          {item.vehiclesImgs?<td>
          <a className="text-primary" onClick={() => openCarousel(item.vehiclesImgs)}>الصور</a>

          </td>:<td>_</td>}
          <td>{item.vehicleColor || "_"}</td>
          <td>{item.vehicleType || "_"}</td>
          <td>{item.vehicleNumber || "_"}</td>
          {item.idCardImg?<td><a className="text-primary" onClick={() => openCarousel(item.idCardImg)}>الصور</a></td>:<td>_</td>}
          {item.licenseImg?<td><a className="text-primary" onClick={() => openCarousel(item.licenseImg)}>الصور</a></td>:<td>_</td>}
          {item.licenseVehicleImgs?<td><a className="text-primary" onClick={() => openCarousel(item.licenseVehicleImgs)}>الصور</a></td>:<td>_</td>}
          <td>{item.isConfirmed===true?"true":"false" || "_"}</td>
          <td>{item.isValid===true?"true":"false" || "_"}</td>
          <td>{item.isBlocked===true?"true":"false"  || "_"}</td>
          <td>{item.isHighlighted===true?"true":"false"  || "_"}</td>
     <td>
      <button className='btn btn-green' onClick={()=>{openModalMain(item._id)}}>اجراءات</button>
     </td>
     <td>
     <button className='btn btn-secondary' onClick={()=>{handleEditClickData(item)}}>تعديل</button>
     </td>
     <td>
     <button
  className="btn btn-danger"
  onClick={() => {
    if (window.confirm('هل انت بالتأكيد تريد حذف هذا  ؟')) {
      console.log(localStorage.getItem('userToken'));
      axios
        .delete(
          `https://delivery-app-pi-sable.vercel.app/api/admin/delete-user/${item._id}`,
          {
            headers: {
              token: localStorage.getItem('userToken'), // Move headers here
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            getData();
            window.alert('تم الحذف بنجاح');
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            window.alert(error.response.data.data.error || 'حدث خطأ ما');
          }
        });
    }
  }}
>
  حذف
</button>
     </td>
     
        </tr>
      ) : null
    ))}
  </tbody>

</table>
</div>
</div>
<Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton >
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
  {selectedImages.map((img, index)=>{
            return(
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={img} class="d-block w-100" alt="..."/>
              </div>
            )
        })}
   
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
          
        </Modal.Body>
      </Modal>

      <Modal show={showModalMain} onHide={closeModalMain}>
        <Modal.Header >
          <Modal.Title>
           </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <Button className='btn btn-success m-1' onClick={()=>{confirmUser(selectedId,true)}}>توثيق الحساب</Button>
          <Button className='btn btn-success m-1' onClick={()=>{validUser(selectedId,true)}}>تفعيل الحساب</Button>
          <Button className='btn btn-success m-1' onClick={()=>{blockUser(selectedId,false)}}>الغاء الحظر</Button>
          <Button className='btn btn-success m-1' onClick={()=>{highlightUser(selectedId,true)}}>تمييز الحساب</Button>
          <Button className='btn btn-danger m-1' onClick={()=>{confirmUser(selectedId,false)}}>الغاء التوثيق</Button>
          <Button className='btn btn-danger m-1' onClick={()=>{validUser(selectedId,false)}}>تعطيل الحساب </Button>
          <Button className='btn btn-danger m-1' onClick={()=>{blockUser(selectedId,true)}}>حظر المستخدم</Button>
          <Button className='btn btn-danger m-1' onClick={()=>{highlightUser(selectedId,false)}}>الغاء التمييز</Button>
          <Button className='btn btn-primary m-1' onClick={()=>{openModalOffer(selectedId)}}>العروض</Button>
          <Button className='btn btn-warning m-1' onClick={()=>{openModalReviews(selectedId)}}>التقييمات</Button>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalMain}>
          إغلاق
          </Button>
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>
      <Modal show={showModalOffer} onHide={closeModalOffer}>
        <Modal.Header >
          <Modal.Title>
          العروض </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {offers && offers.map((item,index)=>{
            return(
              <div className='bg-green p-2 m-1' key={index}>
                <div className="d-flex">
                <p className='mx-3'>السعر : <span className='fw-bold'>{item.price}</span></p>
                <p className='mx-3'>الوقت : <span className='fw-bold'>{item.time}</span></p>
                <p className='mx-3'>الحالة : <span className='fw-bold'>{item.status}</span></p>
                <button
  className="btn btn-danger"
  onClick={() => {
    if (window.confirm('هل انت بالتأكيد تريد حذف هذا  ؟')) {
      console.log(localStorage.getItem('userToken'));
      axios
        .delete(
          `https://delivery-app-pi-sable.vercel.app/api/offer/delete-offer/${item._id}`,
          {
            headers: {
              token: localStorage.getItem('userToken'), // Move headers here
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            getOffers(selectedId);
            window.alert('تم الحذف بنجاح');
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            window.alert(error.response.data.data.error || 'حدث خطأ ما');
          }
        });
    }
  }}
>
  حذف
</button>
                </div>
                
                </div>
            )
          })}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalOffer}>
          إغلاق
          </Button>
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>
      <Modal show={showModalReviews} onHide={closeModalReviews}>
        <Modal.Header >
          <Modal.Title>
          التقييمات </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {reviews && reviews.map((item,index)=>{
            return(
              <div className='bg-green p-2 m-1' key={index}>
                <div className="d-flex">
                <p className='mx-3'>التقييم : <span className='fw-bold'>{item.rate}</span></p>
                <p className='mx-3'>التعليق : <span className='fw-bold'>{item.comment}</span></p>
              
                </div>
                <div className="d-flex align-items-center">
                  <img className='img-offer' src={item.client?.profileImg} alt='img'/>
                <p className='mx-3'> <span className='fw-bold'>{item.client?.name}</span></p>
                <button
  className="btn btn-danger"
  onClick={() => {
    if (window.confirm('هل انت بالتأكيد تريد حذف هذا  ؟')) {
      console.log(localStorage.getItem('userToken'));
      axios
        .delete(
          `https://delivery-app-pi-sable.vercel.app/api/review/${item._id}`,
          {
            headers: {
              token: localStorage.getItem('userToken'), // Move headers here
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            getRevies(selectedId);
            window.alert('تم الحذف بنجاح');
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            window.alert(error.response.data.data.error || 'حدث خطأ ما');
          }
        });
    }
  }}
>
  حذف
</button>
                </div>
                </div>
            )
          })}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalReviews}>
          إغلاق
          </Button>
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>
     {isModalOpenData && (
        <Modal show={isModalOpenData} onHide={closeModalData}>
          <Modal.Header>
            <Modal.Title>تعديل البيانات</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditSubmitData}>
              <div className="row">
                <div className="col-md-6 pb-1">
                  <label htmlFor="name">الاسم :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.name}
                    type="text"
                    className="my-input my-2 form-control"
                    name="name"
                  />
                </div>
                
                <div className="col-md-6 pb-1">
                  <label htmlFor="phone">الهاتف :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.phone}
                    type="text"
                    className="my-input my-2 form-control"
                    name="phone"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="email">الايميل :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.email}
                    type="text"
                    className="my-input my-2 form-control"
                    name="email"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="password">كلمة المرور :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.password}
                    type="text"
                    className="my-input my-2 form-control"
                    name="password"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="address">العنوان :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.address}
                    type="text"
                    className="my-input my-2 form-control"
                    name="address"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="categoryId">الفئة :</label>
                  <select
                    className="form-control my-2"
                    name="categoryId"
                    value={editedData.categoryId.name}
                    onChange={handleInputChangeData}
                    
                  >
                    <option value="">اختر الفئة</option>
                    {categories &&
                      categories.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="position">المنطقة :</label>
                  <select
                    className="form-control my-2"
                    name="position"
                    value={editedData.position.name}
                    onChange={handleInputChangeData}
                    
                  >
                    <option value="">اختر المنطقة</option>
                    {positions &&
                      positions.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="village">القرية :</label>
                  <select
                    className="form-control my-2"
                    name="village"
                    value={editedData.village.name}
                    onChange={handleInputChangeData}
                    
                  >
                    <option value="">اختر القرية</option>
                    {villages &&
                      villages.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                {/* <div className="col-md-6 pb-1">
                  <label htmlFor="startTime">وقت البدء :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.startTime}
                    type="text"
                    className="my-input my-2 form-control"
                    name="startTime"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="endTime">وقت الانتهاء :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.endTime}
                    type="text"
                    className="my-input my-2 form-control"
                    name="endTime"
                  />
                </div> */}
                <div className="col-md-6 pb-1">
                  <label htmlFor="dateOfBirth">تاريخ الميلاد :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.dateOfBirth}
                    type="date"
                    className="my-input my-2 form-control"
                    name="dateOfBirth"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="urlLocation">لينك الموقع :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.urlLocation}
                    type="text"
                    className="my-input my-2 form-control"
                    name="urlLocation"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="positionLocation">الموقع (داخل,خارج):</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.positionLocation}
                    type="text"
                    className="my-input my-2 form-control"
                    name="positionLocation"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="">رقم العربية :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.vehicleNumber}
                    type="text"
                    className="my-input my-2 form-control"
                    name="vehicleNumber"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="vehicleColor">اللون :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.vehicleColor}
                    type="text"
                    className="my-input my-2 form-control"
                    name="vehicleColor"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="vehicleType">النوع :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.vehicleType}
                    type="text"
                    className="my-input my-2 form-control"
                    name="vehicleType"
                  />
                </div>
                
                <div className="col-md-6 pb-1">
                  <label htmlFor="description">الوصف :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.description}
                    type="text"
                    className="my-input my-2 form-control"
                    name="description"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="">صور طريقة التوصيل :</label>
                  <input
                    type="file"
                    className="form-control my-2"
                    multiple
                    onChange={handleFileVehiclesEdit}
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="">الصورة الشخصية :</label>
                  <input
                    type="file"
                    className="form-control my-2"
                    multiple
                    onChange={handleFileChangeEdit}
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="">صورة البطاقة :</label>
                  <input
                    type="file"
                    className="form-control my-2"
                    multiple
                    onChange={handleFileIdCardEdit}
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="">صورة الرخصة :</label>
                  <input
                    type="file"
                    className="form-control my-2"
                    multiple
                    onChange={handleFileLicenseImgEdit}
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="">صور رخص العربية :</label>
                  <input
                    type="file"
                    className="form-control my-2"
                    multiple
                    onChange={handleLicenseVehicleImgsEdit}
                  />
                </div>
                <div className="text-center pt-1">
                  <button className="btn btn-primary">تعديل</button>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalData}>
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
   )}
</>
  )
}
