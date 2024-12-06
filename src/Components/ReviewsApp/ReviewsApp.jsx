import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'

export default function ReviewsApp() {
  useEffect(()=>{
    getData()
  },[])
  const [data,setdata]=useState([])
  async function getData() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/review-app');
      console.log(response)
      setdata(response.data.data.review)
      
    } catch (error) {
      console.error(error);
    }
  }

 


return (
<>
 <div className='p-4 admin' id='content'>


<div className="clients-table p-4 my-4">
<table className="table">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">التعليق  </th>
<th scope="col">التقييم  </th>
<th scope="col">المستخدم  </th>
<th scope="col">الهاتف  </th>
<th></th>           

</tr>
</thead>
<tbody>
{data && data.map((item,index) =>(
item !== null ? (
  <tr key={index}>
    <td>{index+1}</td>
    {item.comment?<td>{item.comment}</td>:<td>_</td>}
    {item.rate?<td>{item.rate}</td>:<td>_</td>}
    {item.user?<td>{item.user.name}</td>:<td>_</td>}
    {item.user?<td>{item.user.phone}</td>:<td>_</td>}
    
<td>
<button
className="btn btn-danger"
onClick={() => {
  if (window.confirm('هل انت بالتأكيد تريد الحذف ؟')) {
    axios
      .delete(`https://delivery-app-pi-sable.vercel.app/api/review-app/${item._id}`, 
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

</>
)
}
