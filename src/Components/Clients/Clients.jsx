import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'
import {Modal, Button } from 'react-bootstrap';

export default function Clients() {
  useEffect(()=>{
    getData()
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
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/admin/get-clients',
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
      const [searchName, setSearchName] = useState('');
      const [searchAge, setSearchAge] = useState('');
      const [searchPhone, setSearchPhone] = useState('');
      const [loading, setLoading] = useState(false);

      async function getSearchData() {
        try {
          setLoading(true);
          const response = await axios.get(`https://delivery-app-pi-sable.vercel.app/api/admin/get-clients`, {
            params: {
                position: searchPosition,
                name: searchName,
                phone:searchPhone,
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

      const [showModalMain, setShowModalMain] = useState(false);
      const [selectedId, setSelectedId] = useState(false);
      const openModalMain = (id) => {
        setShowModalMain(true);
        setSelectedId(id)
      };
    
      const closeModalMain = () => {
        setShowModalMain(false);
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
          <input className='form-control m-1' type="search"
            placeholder="العمر"
              onChange={(e) => setSearchAge(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input className='form-control m-1' type="search" 
          placeholder="الاسم"
          onChange={(e) => setSearchName(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input className='form-control m-1' type="search" 
          
          placeholder="الهاتف"
          onChange={(e) => setSearchPhone(e.target.value)} />
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
<th scope="col">التوثيق  </th>
<th scope="col">الاشتراك  </th>
<th scope="col">الوصف  </th>

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
          <td>{item.isConfirmed===true?"true":"false" || "_"}</td>
          <td>{item.isValid===true?"true":"false" || "_"}</td>
          <td>{item.description || "_"}</td>
         
          
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
          </div>

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
