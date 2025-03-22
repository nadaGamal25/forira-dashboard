import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Modal, Button } from 'react-bootstrap';

export default function Orders() {
  useEffect(()=>{
    getData()
    getPosition()
  },[])
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
  const [currentPage, setCurrentPage] = useState(Number(1));
      const [numberOfPages, setNumberOfPages] = useState(1);
      const [currentPage2, setCurrentPage2] = useState(Number(1));
      const [numberOfPages2, setNumberOfPages2] = useState(1);
      const [loading, setLoading] = useState(false);
      const [secondFilter, setSecondFilter] = useState(false);
      const [searchNameClient, setSearchNameClient] = useState('');
      const [searchStatus, setSearchStatus] = useState('');
      const [searchPositionClient, setSearchPositionClient] = useState('');
      const [searchPositionReciever, setSearchPositionReciever] = useState('');
      const [searchDeliveryType, setSearchDeliveryType] = useState('');
  const [data,setdata]=useState([])
 
  async function getData() {
    try {
      setLoading(true);
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/admin/get-orders',
      {
        params: {
          page: currentPage,
          limit: 30,
         
          
        },
        headers: {
          token: localStorage.getItem('userToken'),

        },
      });
      const List = response.data.data.orders
      setSecondFilter(false);
      console.log(List)
      setdata(List)
      console.log(response)
      setCurrentPage(response.data.data.page);
      setNumberOfPages(response.data.data.totalPages);
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false); 
    }
  }
  async function getSearchList() {
    try {
      setLoading(true);
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/admin/get-orders',
      {
        params: {
          page: 1,
          limit: 30,
          status: searchStatus,
          clientPositionId: searchPositionClient,
          recieverPositionId: searchPositionReciever,
          clientName:searchNameClient,
          deliveryType:searchDeliveryType
          
        },
        headers: {
                      token: localStorage.getItem('userToken'),

        },
      });
      const List = response.data.data.orders
      setSecondFilter(true)

      console.log(List)
      setdata(List)
      console.log(response)
      setCurrentPage(response.data.data.page);
      setNumberOfPages(response.data.data.totalPages);
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false); 
    }
  }
 
  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); 
      try {
        setLoading(true);
        const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/admin/get-orders',
        {
          params: {
            page: currentPage -1,
            limit: 30,
            status: searchStatus,
          clientPositionId: searchPositionClient,
          recieverPositionId: searchPositionReciever,
          clientName:searchNameClient,
          deliveryType:searchDeliveryType
            
          },
          headers: {
                        token: localStorage.getItem('userToken'),

          },
        });
        const List = response.data.data.orders
        console.log(List)
        setSecondFilter(false)
        setdata(List)
        console.log(response)
        setCurrentPage(response.data.data.page);
      setNumberOfPages(response.data.data.totalPages);
      } catch (error) {
        console.error(error);
      }finally {
        setLoading(false); 
      }
    }
  };
  const handleNextPage = async () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
      try {
        setLoading(true);
        const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/admin/get-orders',
        {
          params: {
            page: currentPage +1,
            limit: 30,
            status: searchStatus,
          clientPositionId: searchPositionClient,
          recieverPositionId: searchPositionReciever,
          clientName:searchNameClient,
          deliveryType:searchDeliveryType
          },
          headers: {
                        token: localStorage.getItem('userToken'),

          },
        });
        const List = response.data.data.orders
        setSecondFilter(false)
        console.log(List)
        setdata(List)
        console.log(response)
        setCurrentPage(response.data.data.page);
      setNumberOfPages(response.data.data.totalPages);
      } catch (error) {
        console.error(error);
      }finally {
        setLoading(false); 
      }
    }
  };
  const handlePreviousPage2 = async () => {
if (currentPage2 > 1) {
  setCurrentPage2(currentPage2 - 1); 
  try {
    setLoading(true);
    const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/admin/get-orders',
    {
      params: {
        page: currentPage2 -1,
        limit: 30,
        status: searchStatus,
          clientPositionId: searchPositionClient,
          recieverPositionId: searchPositionReciever,
          clientName:searchNameClient,
          deliveryType:searchDeliveryType
      },
      headers: {
                    token: localStorage.getItem('userToken'),

      },
    });
    const List = response.data.data.orders
    console.log(List)
    setSecondFilter(true)
    setdata(List)
    console.log(response)
    setCurrentPage(response.data.data.page);
      setNumberOfPages(response.data.data.totalPages);
  } catch (error) {
    console.error(error);
  }finally {
    setLoading(false); 
  }
}
};
const handleNextPage2 = async () => {
if (currentPage2 < numberOfPages2) {
  setCurrentPage2(currentPage2 + 1) 
  try {
    setLoading(true);
    const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/admin/get-orders',
    {
      params: {
        page: currentPage2 + 1,
        limit: 30,
        status: searchStatus,
          clientPositionId: searchPositionClient,
          recieverPositionId: searchPositionReciever,
          clientName:searchNameClient,
          deliveryType:searchDeliveryType
      },
      headers: {
                    token: localStorage.getItem('userToken'),

      },
    });
    const List = response.data.data.orders
    setSecondFilter(true)
    console.log(List)
    setdata(List)
    console.log(response)
    setCurrentPage(response.data.data.page);
      setNumberOfPages(response.data.data.totalPages);
  } catch (error) {
    console.error(error);
  }finally {
    setLoading(false); 
  }
}
};

  const [selectedImages, setSelectedImages] = useState([]);
      const [showModal, setShowModal] = useState(false);
      function openCarousel(images) {
        setSelectedImages(images);
        setShowModal(true);
      }
 
      const [offers,setOffers]=useState([])
      async function getOffers(id) {
        try {
          const response = await axios.get(`https://delivery-app-pi-sable.vercel.app/api/offer/by-orderid/${id}`,
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

   //edit data 
   const [isModalOpenData, setIsModalOpenData] = useState(false);
   const [editedData, setEditedData] = useState(null);
   const [eData, seteData] = useState(null);
     const handleEditClickData = (data) => {
     seteData(data);
     setEditedData({
      clientAddress: data?.clientAddress || '',
       recieverAddress: data?.recieverAddress || '',
       clientName: data?.clientName || '',
       payType: data?.payType || '',
       clientPosition: data?.clientPosition?._id || '',
       recieverPosition: data?.recieverPosition?._id || '',
       clientName: data?.clientName || '',
       recieverName: data?.recieverName || '',
       clientPhone:data?.clientPhone || '',
       recieverPhone: data?.recieverPhone || '',
       goDate: data?.goDate || '',
       nums: data?.nums || '',
       price: data?.price || '',
       type: data?.type || '',
       goTime: data?.goTime || '',
       waitingTime: data?.waitingTime || '',
       notes: data?.notes || '',
       isTips: data?.isTips || '',
       orderImgs: data?.orderImgs || [],
       deliveryType: data?.deliveryType || '',
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
   
   
   const handleFileorderImgsEdit = (event) => {
     const files = Array.from(event.target.files);
     setEditedData((prev) => ({
       ...prev,
       orderImgs: [...prev.orderImgs, ...files],
     }));
   };
   
   const handleEditSubmitData = async (event) => {
     console.log("Edited Data to Submit:", editedData);
   
     event.preventDefault();
     const formData = new FormData();
     formData.append('payType', editedData.payType);
     formData.append('recieverPosition', editedData.recieverPosition);
     formData.append('clientPosition', editedData.clientPosition);
     formData.append('recieverAddress', editedData.recieverAddress);
     formData.append('clientAddress', editedData.clientAddress);
     formData.append('clientName', editedData.clientName);
     formData.append('recieverName', editedData.recieverName);
     formData.append('clientPhone', editedData.clientPhone);
     formData.append('recieverPhone', editedData.recieverPhone);
     formData.append('goDate', editedData.goDate);
     formData.append('nums', editedData.nums);
     formData.append('price', editedData.price);
     formData.append('type', editedData.type);
     formData.append('goTime', editedData.goTime);
     formData.append('waitingTime', editedData.waitingTime);
     formData.append('deliveryType', editedData.deliveryType);
     formData.append('isTips', editedData.isTips);
     formData.append('notes', editedData.notes);
    
     editedData.orderImgs.forEach((file) => formData.append('orderImgs', file));
   
     try {
       const response = await axios.put(`https://delivery-app-pi-sable.vercel.app/api/admin/update-order/${eData._id}`, formData,
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
   const [showModalMain, setShowModalMain] = useState(false);
         const [store, setStore] = useState('');
         const openModalMain = (item) => {
           setShowModalMain(true);
           setStore(item)
         };
       
         const closeModalMain = () => {
           setShowModalMain(false);
           setStore('');

         };

         async function endOrder(id) {
          try {
            const response = await axios.put(`https://delivery-app-pi-sable.vercel.app/api/order/recieve-order/${id}`);
            console.log(response)
            alert("تم انهاء الرحلة بنجاح");
            getData();
          } catch (error) {
            console.error(error);
            alert(error.response.data.message);
          }
        }       
return (
<>
 <div className='p-4 admin' id='content'>
 <div className="gray-table p-4 mb-4">
      <div className="row">
        <div className="col-md-4">
          <select className="form-control m-1"  onChange={(e) => setSearchPositionClient(e.target.value)}>
            {positions&&positions.map((item,index)=>{
              return(<>
                    <option value="">منطقة العميل</option>
                    <option key={index} value={item._id}>{item.name}</option>

              </>
              )
            })}
          </select>
        </div>
        <div className="col-md-4">
          <select className="form-control m-1"  onChange={(e) => setSearchPositionReciever(e.target.value)}>
            {positions&&positions.map((item,index)=>{
              return(<>
                    <option value="">منطقة المستلم</option>
                    <option key={index} value={item._id}>{item.name}</option>

              </>
              )
            })}
          </select>
        </div>
        
        <div className="col-md-4">
          <input className='form-control m-1' type="search"
            placeholder="اسم العميل"
              onChange={(e) => setSearchNameClient(e.target.value)} />
        </div>
        <div className="col-md-4">
        <select className="form-control m-1"  onChange={(e) => setSearchStatus(e.target.value)}>
          <option value="">حالة الاوردر</option>
          <option value="waiting">waiting</option>
          <option value="current">current</option>
          <option value="ended">ended</option>
          <option value="canceled">canceled</option>
        </select>
        </div>
       <div className="col-md-4">
       <select className="form-control m-1"  onChange={(e) => setSearchDeliveryType(e.target.value)}>
          <option value="">نوع الاوردر</option>
          <option value="persons">توصيل أشخاص</option>
          <option value="things">توصيل طلبات</option>
          <option value="special">طلب خاص</option>
        </select>
        </div>
        
        <div className="text-center mt-1">
        <button className="btn btn-green m-1" onClick={getSearchList}>
  بحث
</button>  

 </div>
      </div>
    </div>
<div className="clients-table p-4 my-4">
<button className="btn btn-green m-1" onClick={getData}>عرض الكل   </button>

<table className="table">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">المرسل  </th>
<th scope="col">هاتف المرسل  </th>
<th scope="col">عنوان المرسل  </th>
<th scope="col">المستلم  </th>
<th scope="col">هاتف المستلم  </th>
<th scope="col">عنوان المستلم  </th>
<th scope="col">مدة الانتظار  </th>
<th scope="col">التاريخ  </th>
<th scope="col">الوقت  </th>
<th scope="col">السعر  </th>
<th scope="col">العدد  </th>
<th scope="col">نوع الرحلة  </th>
<th scope="col">tips  </th>
<th scope="col">العميل  </th>
<th scope="col">السائق  </th>
<th scope="col">الصور  </th>
<th scope="col">ملاحظات  </th>
<th scope="col">التقييم  </th>
<th scope="col">الحالة  </th>
<th></th>           
<th></th>           
<th></th>           
<th></th>           
<th></th>           

</tr>
</thead>
<tbody>
{data && data.map((item,index) =>{
            return(
              <tr key={index}>
                {loading ? (
      <td>
        <i className="fa-solid fa-spinner fa-spin"></i>
      </td>
    ) : (
      <>

<td>{index + 1}</td>
          <td>{item.clientName || "_"}</td>
          <td>{item.clientPhone || "_"}</td>
          <td>{item.clientPosition?.name || "_"}</td>
          <td>{item.recieverName || "_"}</td>
          <td>{item.recieverPhone || "_"}</td>
          <td>{item.recieverPosition?.name || "_"}</td>
          <td>{item.waitingTime || "_"}</td>
          <td>{item.goDate ? new Date(item.goDate).toLocaleDateString() : "_"}</td>
          <td>{item.goTime || "_"}</td>
          <td>{item.price || "_"}</td>
          <td>{item.nums || "_"}</td>
          <td>{item.type || "_"}</td>
          <td>{item.isTips ? "Yes" : "No"}</td>
          <td>{item.clientId?.name || "_"}</td>
          <td>{item.driverId?.name || "_"}</td>
          <td>
            {item.orderImgs.length !==0 ?
          <a className="text-primary" onClick={() => openCarousel(item.orderImgs)}>الصور</a>
          :<span>_</span>}
          </td>
          <td>{item.notes || "_"}</td>
          <td>{item.rate || "_"}</td>
          <td>{item.status || "_"}</td>
          <td>
          <button
  className="btn btn-danger"
  onClick={() => {
    if (window.confirm('هل انت بالتأكيد تريد الغاء الاوردر ؟')) {
      console.log(localStorage.getItem('userToken'));
      axios
        .put(
          `https://delivery-app-pi-sable.vercel.app/api/order/cancel-order/${item._id}`,
          {}, // Pass an empty object as the body since you aren't sending any data
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
            window.alert('تم الالغاء بنجاح');
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
<td>
     <button className='btn btn-secondary' onClick={()=>{handleEditClickData(item)}}>تعديل</button>
     </td>
     <td>
      <button className="btn btn-warning" onClick={() => openModalOffer(item._id)}>العروض</button>
     </td>
     <td>
      {item.shopping.length !==0?
      <button className="btn btn-primary" onClick={() => openModalMain(item.shopping)}>التسوق</button>
      :<span>_</span>}
     </td>
     <td>
      <button className="btn btn-success" onClick={() => endOrder(item._id)}>انهاء الرحلة</button>
     </td>
</>
    )}
              </tr>
            )
          }
          )}
    
  </tbody>

</table>
{secondFilter?(
      <div>
        <button className="btn btn-green" onClick={handlePreviousPage2} disabled={currentPage2 === 1}>
          الصفحة السابقة 
        </button>
        <span className='px-1'>
          Page {currentPage2} of {numberOfPages2}
        </span>
        <button className="btn btn-green" onClick={handleNextPage2} disabled={currentPage2 === numberOfPages2}>
          الصفحة التالية 
        </button>
      </div>
      ):
      (
        <div>
        <button className="btn btn-green" onClick={handlePreviousPage} disabled={currentPage === 1}>
          الصفحة السابقة 
        </button>
        <span className='px-1'>
          Page {currentPage} of {numberOfPages}
        </span>
        <button className="btn btn-green" onClick={handleNextPage} disabled={currentPage === numberOfPages}>
          الصفحة التالية 
        </button>
      </div>
      )}
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
    <span class="carousel-control-prev-icon bg-green" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
          
        </Modal.Body>
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
                {item.time?<p className='mx-3'>الوقت : <span className='fw-bold'>{item.time}</span></p>:null}
                <p className='mx-3'>الحالة : <span className='fw-bold'>{item.status}</span></p>
                </div>
                <div className="d-flex align-items-center">
                  <img className='img-offer' src={item.driverId.profileImg} alt='img'/>
                <p className='mx-3'> <span className='fw-bold'>{item.driverId.name}</span></p>
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
       {isModalOpenData && (
              <Modal show={isModalOpenData} onHide={closeModalData}>
                <Modal.Header>
                  <Modal.Title>تعديل البيانات</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={handleEditSubmitData}>
                    <div className="row">
                      <div className="col-md-6 pb-1">
                        <label htmlFor="clientName">اسم العميل :</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.clientName}
                          type="text"
                          className="my-input my-2 form-control"
                          name="clientName"
                        />
                      </div>
                      
                      <div className="col-md-6 pb-1">
                        <label htmlFor="clientPhone">هاتف العميل :</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.clientPhone}
                          type="text"
                          className="my-input my-2 form-control"
                          name="clientPhone"
                        />
                      </div>
                      <div className="col-md-6 pb-1">
                        <label htmlFor="clientAddress">عنوان العميل :</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.clientAddress}
                          type="text"
                          className="my-input my-2 form-control"
                          name="clientAddress"
                        />
                      </div>
                      
                      <div className="col-md-6 pb-1">
                        <label htmlFor="clientPosition">منطقة العميل :</label>
                        <select
                          className="form-control my-2"
                          name="clientPosition"
                          // value={editedData.clientPosition.name}
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
                        <label htmlFor="recieverName">اسم المستلم :</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.recieverName}
                          type="text"
                          className="my-input my-2 form-control"
                          name="recieverName"
                        />
                      </div>
                      
                      <div className="col-md-6 pb-1">
                        <label htmlFor="recieverPhone">هاتف المستلم :</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.recieverPhone}
                          type="text"
                          className="my-input my-2 form-control"
                          name="recieverPhone"
                        />
                      </div>
                      <div className="col-md-6 pb-1">
                        <label htmlFor="recieverAddress">عنوان المستلم :</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.recieverAddress}
                          type="text"
                          className="my-input my-2 form-control"
                          name="recieverAddress"
                        />
                      </div>
                      
                      <div className="col-md-6 pb-1">
                        <label htmlFor="recieverPosition">منطقة المستلم :</label>
                        <select
                          className="form-control my-2"
                          name="recieverPosition"
                          // value={editedData.recieverPosition.name}
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
                        <label htmlFor="goDate">تاريخ الرحلة :</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.goDate}
                          type="date"
                          className="my-input my-2 form-control"
                          name="goDate"
                        />
                      </div>
                      
                      <div className="col-md-6 pb-1">
                        <label htmlFor="type"> (ذهاب,ذهاب وعودة):</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.type}
                          type="text"
                          className="my-input my-2 form-control"
                          name="type"
                        />
                      </div>
                      <div className="col-md-6 pb-1">
                        <label htmlFor="goTime">الوقت :</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.goTime}
                          type="text"
                          className="my-input my-2 form-control"
                          name="goTime"
                        />
                      </div>
                      <div className="col-md-6 pb-1">
                        <label htmlFor="waitingTime">مدة الانتظار :</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.waitingTime}
                          type="text"
                          className="my-input my-2 form-control"
                          name="waitingTime"
                        />
                      </div>
                      <div className="col-md-6 pb-1">
                        <label htmlFor="nums">العدد :</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.nums}
                          type="text"
                          className="my-input my-2 form-control"
                          name="nums"
                        />
                      </div>
                      <div className="col-md-6 pb-1">
                        <label htmlFor="price">السعر :</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.price}
                          type="text"
                          className="my-input my-2 form-control"
                          name="price"
                        />
                      </div>
                      <div className="col-md-6 pb-1">
                        <label htmlFor="payType">نوع الدفع :</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.payType}
                          type="text"
                          className="my-input my-2 form-control"
                          name="payType"
                        />
                      </div>
                      <div className="col-md-6 pb-1">
                        <label htmlFor="deliveryType">نوع التوصيل :</label>
                        <select className="form-control m-1" 
                         onChange={handleInputChangeData}>
          <option value="">نوع الاوردر</option>
          <option value="persons">توصيل أشخاص</option>
          <option value="things">توصيل طلبات</option>
          <option value="special">طلب خاص</option>
        </select>
                      
                      </div>
                      
                      <div className="col-md-6 pb-1">
                        <label htmlFor="deliveryType">ملاحظات :</label>
                        <input
                          onChange={handleInputChangeData}
                          value={editedData.deliveryType}
                          type="text"
                          className="my-input my-2 form-control"
                          name="deliveryType"
                        />
                      </div>
                      <div className="col-md-6 pb-1">
                        <label htmlFor="">صور الطلب :</label>
                        <input
                          type="file"
                          className="form-control my-2"
                          multiple
                          onChange={handleFileorderImgsEdit}
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
         <Modal show={showModalMain} onHide={closeModalMain}>
                 <Modal.Header>
          <Modal.Title>التسوق</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {store.length > 0 ? (
            store.map((shop, index) => (
              <div key={shop._id || index} className="mb-3">
                <h5>المتجر: {shop.store}</h5>
                <ul>
                  {shop.products.map((product) => (
                    <li key={product._id}>
                      المنتج: {product.name}, الكمية: {product.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>لا توجد بيانات للتسوق.</p>
          )}
        </Modal.Body>
                 <Modal.Footer>
                   <Button variant="secondary" onClick={closeModalMain}>
                   إغلاق
                   </Button>
                   {/* Additional buttons or actions can be added here */}
                 </Modal.Footer>
               </Modal>
</>
)
}
