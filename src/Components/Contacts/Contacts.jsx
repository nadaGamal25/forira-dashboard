import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'

export default function Contacts() {
  useEffect(()=>{
    getData()
  },[])
  const [data,setdata]=useState([])
  async function getData() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/contactus');
      console.log(response)
      setdata(response.data.data.msg)
      
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
<th scope="col">الاسم  </th>
<th scope="col">الهاتف  </th>
<th scope="col">الاقتراح او المشكلة  </th>

</tr>
</thead>
<tbody>
{data && data.map((item,index) =>(
item !== null ? (
  <tr key={index}>
    <td>{index+1}</td>
    {item.name?<td>{item.name}</td>:<td>_</td>}
    {item.phone?<td>{item.phone}</td>:<td>_</td>}
    {item.comment?<td>{item.comment}</td>:<td>_</td>}
    

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
