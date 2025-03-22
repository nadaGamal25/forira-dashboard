import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'

export default function Positions() {
  useEffect(()=>{
    getData()
  },[])
  const [data,setdata]=useState([])
  async function getData() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/position');
      console.log(response)
      setdata(response.data.data.positions)
      
    } catch (error) {
      console.error(error);
    }
  }
  const [errorList, seterrorList]= useState([]); 

  const [newData,setNewData] =useState({
    name :'',
  })


  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  
  async function sendDataToApi() {
    try {
      const response = await axios.post(`https://delivery-app-pi-sable.vercel.app/api/position`,
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
      name: Joi.string().required(),
    });
  
    return schema.validate(newData, { abortEarly: false });
  }


return (
<>
 <div className='p-4 admin' id='content'>

<div className=" py-3">
  <div className="edit-form">
    <div className="p-saee p-3">
      <h5 className="text-center mb-3">إضافة منطقة جديدة   </h5>
      <form onSubmit={submitForm} action="">
        <label htmlFor="name">الاسم :</label>
        <input onChange={getNewData} type='string' className='my-input my-2 form-control' name='name' />
        {errorList.map((err,index)=>{
if(err.context.label ==='name'){
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

<div className="clients-table-container">
<div className="clients-table p-4 my-4">
<div className="table-responsive">
<table className="table">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">الاسم  </th>
<th></th>           

</tr>
</thead>
<tbody>
{data && data.map((item,index) =>(
item !== null ? (
  <tr key={index}>
    <td>{index+1}</td>
    {item.name?<td>{item.name}</td>:<td>_</td>}
    
<td>
<button
className="btn btn-danger"
onClick={() => {
  if (window.confirm('هل انت بالتأكيد تريد الحذف ؟')) {
    axios
      .delete(`https://delivery-app-pi-sable.vercel.app/api/position/${item._id}`, 
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

  </tr>
): null
)


)}
</tbody>
</table>
</div>
</div>
</div>
</div>

</>
)
}
