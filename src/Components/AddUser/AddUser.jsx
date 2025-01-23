import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Joi from 'joi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
export default function AddUser() {
    useEffect(()=>{
        getCategories()
        getPosition()
        getVillage()
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
      const [villages,setVillages]=useState([])
  async function getVillage() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/village');
      console.log(response)
      setVillages(response.data.data.village)
      
    } catch (error) {
      console.error(error);
    }
  }
    
  const [visible , setVisible] =useState(false);
  const [errorList, seterrorList]= useState([]); 
  const [user,setUser] =useState({
    name:'',
    phone:'',
    email:'',
    password:'',
    confirmPassword:'',
    address:'',
    position:'',
    role:'',
    dateOfBirth:'',
    categoryId:"000000000000000000000000",
    village:"675068dd3f3723057f53b24e"
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  const [value ,setPhoneValue]=useState()

  async function sendRegisterDataToApi(){
    try {
        let response= await axios.post(`https://delivery-app-pi-sable.vercel.app/api/auth/signup`,user);
          setisLoading(false)
          console.log(response)
          alert("تم انشاء حساب")
        
      } catch (error) {
        console.log(error);
        setisLoading(false)
        alert(error.response.data.message)     
      }
    }
    
  



  
function submitRegisterForm(e){
  e.preventDefault();
  setisLoading(true)
  seterrorList([]); 
  let validation = validateRegisterForm();
  console.log(validation);
  if(validation.error){
    setisLoading(false)
    seterrorList(validation.error.details)

  }else{
    if (user.password !== user.confirmPassword) {
    setError('Passwords do not match');
    setisLoading(false);
    return;
  }else{
    sendRegisterDataToApi();
  }
  }
}

  function getUserData(e){
    if (e && e.target) {
    let myUser={...user};
    myUser[e.target.name]= e.target.value;
    setUser(myUser);
    console.log(myUser);
    }
  }

  function validateRegisterForm(){
    let scheme= Joi.object({
      name:Joi.string().min(3).max(10).required(),
      phone:Joi.string(),
      email:Joi.string().email({ tlds: { allow: ['com', 'net'] }}).required(),
      password:Joi.string(),
    confirmPassword: Joi.valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Password confirmation is required',
      }),
      address:Joi.string().required(),
      position:Joi.string().required(),
      role:Joi.string().required(),
      dateOfBirth:Joi.date().required(),
      categoryId:Joi.string().allow('',null),
      village:Joi.string().allow('',null),

    });
    return scheme.validate(user, {abortEarly:false});
  }
  return (
    <>
     <div className='p-4 admin' id='content'>

    <div className="d-flex min-vh-100 p-1 ">
    <div className="edit-form bg-light m-auto p-2">
    
        <form onSubmit={submitRegisterForm} className='my-3' action="">
      <label htmlFor="name">الاسم  :</label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='name' id='name' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    <label htmlFor="email">البريد الالكترونى :</label>
      <input onChange={getUserData} type="email" className='my-input my-2 form-control' name='email' id='email' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">الايميل يجب ان يكون بريدا الكتروني صحيح</div>
      }
      
    })}
      <label htmlFor="password">كلمة المرور :</label>
      <div className='pass-box'>
      <input onChange={getUserData} type={visible? "text" :"password"} className='my-input my-2 form-control' name='password' id='password' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
      </span>
      {errorList.map((err,index)=>{
      if(err.context.label ==='password'){
        return <div key={index} className="alert alert-danger my-2">كلمة المرور يجب ان  لا تقل عن ثمانية احرف وارقام على الاقل</div>
      }
      
    })}
    </div>
      <label htmlFor="confirmPassword">تأكيد كلمة المرور :</label>
      <div className='pass-box'>
      <input onChange={getUserData} type={visible? "text" :"password"} className='my-input my-2 form-control' name='confirmPassword' id='confirmPassword' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      </span>
      {/* {error.length >0 ?<div className='alert alert-danger my-2'>{error}</div>:''} */}
      {errorList.map((err,index)=>{
      if(err.context.label ==='confirmPassword'){
        return <div key={index} className="alert alert-danger my-2">كلمة السر غير متطابقة</div>
      }
      
    })}
    </div>
     
    <label htmlFor="phone">رقم الهاتف :</label>
    <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='phone' id='phone' />
    {errorList.map((err,index)=>{
      if(err.context.label ==='phone'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    <label htmlFor="dateOfBirth">تاريخ الميلاد :</label>
    <input onChange={getUserData} type="date" className='my-input my-2 form-control' name='dateOfBirth' id='dateOfBirth' />
    {errorList.map((err,index)=>{
      if(err.context.label ==='dateOfBirth'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    
      
      
      <label htmlFor="address">العنوان :</label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='address' id='address' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='address'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
      <label htmlFor="location">المنطقة :</label>
      <select name='position' className="form-control my-2" onChange={getUserData}>
        <option value="0">اختر المنطقة</option>
            {positions&&positions.map((item,index)=>{
              return(<>
                    <option key={index} value={item._id}>{item.name}</option>

              </>
              )
            })}
          </select>
      {errorList.map((err,index)=>{
      if(err.context.label ==='location'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    <label>القرية</label>
    <select
                    className="form-control my-2"
                    name="village"
                    // value={editedData.village.name}
                    onChange={getUserData}
                    
                  >
                    <option value="">اختر القرية</option>
                    {villages &&
                      villages.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
    <label>الدور</label>
    <select name='role' className="form-control my-2" onChange={getUserData}>
    <option value="">الدور</option>
    <option value="client">عميل</option>
    <option value="driver">سائق</option>
        
</select>
<label>اختر الفئة اذا كان سائق</label>
<select name='categoryId' className="form-control m-1"  onChange={getUserData}>
    <option value="000000000000000000000000">اختر الفئة</option>
            {categories&&categories.map((item,index)=>{
              return(<>
                    <option key={index} value={item._id}>{item.name}</option>

              </>
              )
            })}
          </select>
      <button className='btn btn-green mt-3'>
        {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'انشاء حساب'}
      </button>
     </form>
     
     
     </div>
     </div>
     </div>
     
    </>
  )
}
