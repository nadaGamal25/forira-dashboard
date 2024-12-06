import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'
import {Modal, Button } from 'react-bootstrap';

export default function Drivers() {
  useEffect(()=>{
    getData()
    getCategories()
    getPosition()
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
                time:searchTime,
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
          
          placeholder="الوقت"
          onChange={(e) => setSearchTime(e.target.value)} />
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
<th scope="col">التوثيق  </th>
<th scope="col">الاشتراك  </th>
<th scope="col">التقييم  </th>
<th scope="col">الوصف  </th>
<th scope="col">الصور  </th>
<th scope="col">اللون  </th>
<th scope="col">النوع  </th>
<th scope="col">الرقم  </th>
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
          <td>{item.isConfirmed===true?"true":"false" || "_"}</td>
          <td>{item.isValid===true?"true":"false" || "_"}</td>
          <td>{item.rateAvg || "_"}</td>
          <td>{item.description || "_"}</td>
          <td>
          <a className="text-primary" onClick={() => openCarousel(item.vehiclesImgs)}>الصور</a>

          </td>
          <td>{item.vehicleColor || "_"}</td>
          <td>{item.vehicleType || "_"}</td>
          <td>{item.vehicleNumber || "_"}</td>
          
     <td>
      <button className='btn btn-green' onClick={()=>{openModalMain(item._id)}}>اجراءات</button>
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
          <Button className='btn btn-danger m-1' onClick={()=>{confirmUser(selectedId,false)}}>الغاء التوثيق</Button>
          <Button className='btn btn-danger m-1' onClick={()=>{validUser(selectedId,false)}}>تعطيل الحساب </Button>
          <Button className='btn btn-danger m-1' onClick={()=>{blockUser(selectedId,true)}}>حظر المستخدم</Button>
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
     
</>
  )
}
