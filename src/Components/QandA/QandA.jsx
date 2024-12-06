import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'
import {Modal, Button } from 'react-bootstrap';

export default function QandA() {
    useEffect(()=>{
        getData()
      },[])
      const [data,setdata]=useState([])
      async function getData() {
        try {
          const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/question');
          console.log(response)
          setdata(response.data.data.data)
          
        } catch (error) {
          console.error(error);
        }
      }
      const [errorList, seterrorList]= useState([]); 
    
      const [newData,setNewData] =useState({
        question :'',
        answer :'',
      })
    
    
      const [error , setError]= useState('')
      const [isLoading, setisLoading] =useState(false)
      
      async function sendDataToApi() {
        try {
          const response = await axios.post(`https://delivery-app-pi-sable.vercel.app/api/question`,
           newData,
          {
            headers: {
              token: localStorage.getItem('userToken'),
            },
          }
        );
            console.log(response)
            setisLoading(false)
            window.alert("تمت الاضافة بنجاح");
            getData()
          
        } catch (error) {
          console.log(error);
          setisLoading(false)
          alert(error.response.data.message)
        //   window.alert('somthing wrong');
        }
      }
      
    function submitForm(e){
      e.preventDefault();
      setisLoading(true)
      let validation = validateForm();
      console.log(validation);
      if(validation.error){
        setisLoading(false)
        seterrorList(validation.error.details)
    
      }else{
        sendDataToApi();
      }
    
    }
    
      function getNewData(e){
        let mynewData={...newData};
        mynewData[e.target.name]= e.target.value;
        setNewData(mynewData);
        console.log(mynewData);
      }
    
      function validateForm() {
        let schema = Joi.object({
          question: Joi.string().required(),
          answer: Joi.string().required(),
        });
      
        return schema.validate(newData, { abortEarly: false });
      }
    
   //edit Data
const [isModalOpenData, setIsModalOpenData] = useState(false);
const [editedData, setEditedData] = useState(null);
const [eData, seteData] = useState(null);
const handleEditClickData = (data) => {
  seteData(data);
  setEditedData(
    {
      question: data?.question || '',
      answer: data?.answer || '',
     
      
  }
  )
  setIsModalOpenData(true);

  console.log(data)
  console.log(editedData)
  console.log("yes")
}
const closeModalData = () => {
  setIsModalOpenData(false);
  setEditedData(null)
};
const handleInputChangeData = (event) => {
  const { name, value } = event.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    })); 
};
const handleEditSubmitData = async (event) => {
  console.log(editedData)
  event.preventDefault();
  try {
    const response = await axios.put(
      `https://delivery-app-pi-sable.vercel.app/api/question/${eData._id}`,
      {...editedData},
      {
        headers: {
          token: localStorage.getItem('userToken'),
        },
      }
    );
    console.log(editedData)
    console.log(response);

    closeModalData();
    window.alert("تم التعديل بنجاح")
    getData()
    
  } catch (error) {
    console.error(error);
    alert(error.response.data.message)
  }
} 
    
    return (
    <>
     <div className='p-4 admin' id='content'>
    
    <div className=" py-3">
      <div className="edit-form">
        <div className="p-saee p-3">
          <h5 className="text-center mb-3">إضافة سؤال جديد   </h5>
          <form onSubmit={submitForm} action="">
            <label htmlFor="">السؤال :</label>
            <input onChange={getNewData} type='text' className='my-input my-2 form-control' name='question' />
            {errorList.map((err,index)=>{
    if(err.context.label ==='question'){
    return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
    }
    
    })}
     <label htmlFor="">الاجابة :</label>
            <input onChange={getNewData} type='text' className='my-input my-2 form-control' name='answer' />
            {errorList.map((err,index)=>{
    if(err.context.label ==='answer'){
    return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
    }
    
    })}
           
    
    
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
    <th scope="col">السؤال  </th>
    <th scope="col">الاجابة  </th>
    <th></th>           
    <th></th>           
    
    </tr>
    </thead>
    <tbody>
    {data && data.map((item,index) =>(
    item !== null ? (
      <tr key={index}>
        <td>{index+1}</td>
        {item.question?<td>{item.question}</td>:<td>_</td>}
        {item.answer?<td>{item.answer}</td>:<td>_</td>}
        
    <td>
    <button
    className="btn btn-danger"
    onClick={() => {
      if (window.confirm('هل انت بالتأكيد تريد الحذف ؟')) {
        axios
          .delete(`https://delivery-app-pi-sable.vercel.app/api/question/${item._id}`, 
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
    <td>
<button className=" btn btn-secondary" onClick={()=>{handleEditClickData(item)}}>  تعديل </button>
</td>
    
      </tr>
    ): null
    )
    
    
    )}
    </tbody>
    </table>
    </div>
    </div>
    {isModalOpenData && (<Modal show={isModalOpenData} onHide={closeModalData} >
        <Modal.Header >
          <Modal.Title>تعديل البيانات 
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <form onSubmit={handleEditSubmitData}>
        <div className="row">
                <div className="col-md-12 pb-1">
        <label htmlFor="">السؤال      :</label>
      <input onChange={handleInputChangeData} value={editedData.question} type="text" className='my-input my-2 form-control' name='question' />
      
      
    </div>
    <div className="col-md-12 pb-1">
        <label htmlFor=""> الاجابة    :</label>
      <input onChange={handleInputChangeData} value={editedData.answer} type="text" className='my-input my-2 form-control' name='answer' />
      
    </div>
   
    
  

    <div className="text-center pt-1">
      <button className='btn btn-primary'>
      تعديل  
      </button>
      </div>
      </div>
      </form>  
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalData}>
          إغلاق
          </Button>
        </Modal.Footer>
      </Modal>)} 
    </>
    )
    }
    