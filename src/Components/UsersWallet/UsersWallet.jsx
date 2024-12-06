import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'

export default function UsersWallet() {
  useEffect(()=>{
    getData()
  },[])
  const [data,setdata]=useState([])
  async function getData() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/admin/get-users-numberOfOrders',
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

  const [depositAmount, setDepositAmount] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  async function addPointsToUser(id) {
    try {
      const response = await axios.put(
        `https://delivery-app-pi-sable.vercel.app/api/admin/update-wallet/${id}`,
        {
          wallet: depositAmount,
        },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }

      );
      // Handle the response as per your requirement
      console.log(response.data);
        closeModal();
        getData();
        alert(response.data.message)
    } catch (error) {
      console.error(error);
    }
  }
  const[showModal,setShowModal]=useState(false)
  const openModal = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setShowModal(false);
    setDepositAmount('');
  };

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
<th scope="col">الدور  </th>
<th scope="col">عدد الاوردرات  </th>
<th scope="col">المحفظة  </th>
<th></th>           

</tr>
</thead>
<tbody>
{data && data.map((item,index) =>(
item !== null ? (
  <tr key={index}>
    <td>{index+1}</td>
    {item.name?<td>{item.name}</td>:<td>_</td>}
    {item.phone?<td>{item.phone}</td>:<td>_</td>}
    {item.role?<td>{item.role}</td>:<td>_</td>}
    {item.numberOfOrders?<td>{item.numberOfOrders}</td>:<td>0</td>}
    {item.wallet?<td>{item.wallet}</td>:<td>0</td>}
    <td>
                <button
                        className=' btn btn-green mt-2'
                        onClick={() => openModal(item._id)}
                      >
                        إضافة نقاط
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
{showModal && (
        <div className='modal' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>إضافة رصيد</h5>
                <button
                  type='button'
                  className='close'
                  onClick={closeModal}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='deposit'>الرصيد :</label>
                  <input
                    className='form-control'
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-green'
                  onClick={()=>{addPointsToUser(selectedUserId)}}
                >
                  إضافة
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModal}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
</>
)
}
