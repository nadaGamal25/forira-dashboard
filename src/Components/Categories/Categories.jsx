import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'
import {Modal, Button } from 'react-bootstrap';

export default function Categories() {
  useEffect(()=>{
    getCategories()
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




  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  const [selectedFiles, setselectedFiles] = useState([]);
  const [nameCategory, setNameCategory] = useState('');


  async function sendDataToApi() {
    console.log(localStorage.getItem('userToken'))
    console.log(selectedFiles)
    const formData = new FormData();
    formData.append('name', nameCategory);
    
    
    selectedFiles.forEach((file) => {
      formData.append('img', file);
    });
  
    try {
      const response = await axios.post(
        `https://delivery-app-pi-sable.vercel.app/api/category`,
        formData,
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );

      alert("تمت الاضافة بنجاح")
      console.log(response);
      setselectedFiles([]);
      getCategories();
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }
  
  function handleFileChange(event) {
    const files = Array.from(event.target.files);
    setselectedFiles((prevFiles) => [...prevFiles, ...files]);
  }
  



const [selectedImages, setSelectedImages] = useState([]);
      const [showModal, setShowModal] = useState(false);
      function openCarousel(images) {
        setSelectedImages(images);
        setShowModal(true);
      }
  return (
    <>
    <div className='p-4 admin' id='content'>
   
   <div className=" py-3">
     <div className="edit-form">
       <div className="p-saee p-3">
         <h5 className="text-center mb-3">إضافة فئة جديدة   </h5>
         <form onSubmit={(e) => { e.preventDefault(); sendDataToApi(); }} action="">
           <label htmlFor="name">الاسم :</label>
           <input onChange={(e) => { setNameCategory(e.target.value); }} required type='string' className='my-input my-2 form-control' name='name' />
           
           <label htmlFor="">الصورة</label>
        <input
          type="file"
          className="my-2 my-input form-control"
          name="img"
          multiple
          onChange={handleFileChange} required
        />
           


          <div className="text-center">
           <button className='btn btn-green mt-3'>
           {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'إضافة '}
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
   <th scope="col"> الاسم </th>
   <th scope="col">الصور </th>
   <th></th>           
   <th></th>           
   
 </tr>
</thead>
<tbody>
 {categories && categories.map((item,index) =>(
   item !== null ? (
     <tr key={index}>
       <td>{index+1}</td>
       {item.name?<td>{item.name}</td>:<td>_</td>}
       
       {item.img && item.img?.length !== 0 ?<td>
        <a className="text-primary" onClick={() => openCarousel(item.img)}>الصور</a>
       </td>:<td>_</td>}
       
<td>
<button
   className="btn btn-danger"
   onClick={() => {
     if (window.confirm('هل انت بالتأكيد تريد حذف هذه الفئة ؟')) {
       axios
         .delete(`https://delivery-app-pi-sable.vercel.app/api/category/${item._id}`, 
          {
           headers: {
             token: localStorage.getItem('userToken'),
           },
         }
       )
         .then((response) => {
           if (response.status === 200) {
             console.log(response)
             getCategories();
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

     </tr>
   ): null
 )
 
 
 )}
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
  {/* {selectedImages.map((img, index)=>{
            return( */}
                <div>
                <img src={selectedImages} class="d-block w-50" alt="..."/>
              </div>
            {/* )
        })} */}
   
    
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
