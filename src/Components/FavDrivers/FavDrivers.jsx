import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'
import {Modal, Button } from 'react-bootstrap';

export default function FavDrivers() {
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
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/driver/fav',
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      console.log(response)
      setdata(response.data.data.fav)
      
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
          const response = await axios.get(`https://delivery-app-pi-sable.vercel.app/api/driver/fav`, {
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
            setdata(response.data.data.fav)
        } catch (error) {
          console.error('Error fetching :', error);
        } finally {
          setLoading(false); 
        }
      }
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
<th></th>           

</tr>
</thead>
<tbody>
    {data && data.map((item, index) => (
      item !== null ? (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.driver.profileImg?<img className='img-driver' src={item.driver.profileImg} alt='img'/> : "_"}</td>
          <td>{item.driver.name || "_"}</td>
          <td>{item.driver.age || "_"}</td>
          <td>{item.driver.phone || "_"}</td>
          <td>{item.driver.email || "_"}</td>
          <td>{item.driver.position?.name || "_"}</td>
          <td>{item.driver.address || "_"}</td>
          {item.driver.village !== null?<td> {item.driver.village?.name}</td>:<td>_</td>}
          <td>{item.driver.urlLocation || "_"}</td>
          <td>{item.driver.positionLocation || "_"}</td>
          <td>{item.driver.categoryId?.name || "_"}</td>
          <td>{item.driver.numberOfConnect || "_"}</td>
          <td>{item.driver.isConfirmed===true?"true":"false" || "_"}</td>
          <td>{item.driver.isValid===true?"true":"false" || "_"}</td>
          <td>{item.driver.rateAvg || "_"}</td>
          <td>{item.driver.description || "_"}</td>
          <td>
          <a className="text-primary" onClick={() => openCarousel(item.driver.vehiclesImgs)}>الصور</a>

          </td>
          <td>{item.driver.vehicleColor || "_"}</td>
          <td>{item.driver.vehicleType || "_"}</td>
          <td>{item.driver.vehicleNumber || "_"}</td>
          
     <td>
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
     
</>
  )
}
