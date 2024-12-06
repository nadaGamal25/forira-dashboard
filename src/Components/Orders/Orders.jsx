import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Modal, Button } from 'react-bootstrap';

export default function Orders() {
  useEffect(()=>{
    getData()
  },[])
  const [data,setdata]=useState([])
  async function getData() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/admin/get-orders',
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      console.log(response)
      setdata(response.data.data.order)
      
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

return (
<>
 <div className='p-4 admin' id='content'>

<div className="clients-table p-4 my-4">
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

</tr>
</thead>
<tbody>
    {data && data.map((item, index) => (
      item !== null ? (
        <tr key={index}>
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
          <td>{item.nums || "_"}</td>
          <td>{item.type || "_"}</td>
          <td>{item.isTips ? "Yes" : "No"}</td>
          <td>{item.clientId?.name || "_"}</td>
          <td>{item.driverId?.name || "_"}</td>
          <td>
          <a className="text-primary" onClick={() => openCarousel(item.orderImgs)}>الصور</a>

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
      <button className="btn btn-success" onClick={() => openModalOffer(item._id)}>العروض</button>
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
</>
)
}
