import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Aboutus from './Components/Aboutus/Aboutus';
import Categories from './Components/Categories/Categories';
import Clients from './Components/Clients/Clients';
import Contacts from './Components/Contacts/Contacts';
import Drivers from './Components/Drivers/Drivers';
import FavDrivers from './Components/FavDrivers/FavDrivers';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import Orders from './Components/Orders/Orders';
import Positions from './Components/Positions/Positions';
import QandA from './Components/QandA/QandA';
import ReviewsApp from './Components/ReviewsApp/ReviewsApp';
import SocialMidea from './Components/SocialMidea/SocialMidea';
import Suggests from './Components/Suggests/Suggests';
import UsersWallet from './Components/UsersWallet/UsersWallet';
import Villages from './Components/Villages/Villages';


function App() {
  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      saveUserData();
    }
  },[])

  const [userData, setuserData] = useState(null)

  async function saveUserData(){
    console.log(localStorage.getItem('userToken'))
    let encodedToken =localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setuserData(decodedToken)
    console.log(userData)
  }

 

  let routers =createBrowserRouter([
    {index:true,element:<Login saveUserData={saveUserData} setuserData={setuserData} userData={userData}/>},    // {index:true,element:<Login/>},
  
    {path:'/',element:<Layout setuserData={setuserData} userData={userData}/> ,children:[
        {path:'main',element:<Main/>},
        {path:'category',element:<Categories/>},
        {path:'position',element:<Positions/>},
        {path:'village',element:<Villages/>},
        {path:'qAndA',element:<QandA/>},
        {path:'suggests',element:<Suggests/>},
        {path:'reviewsApp',element:<ReviewsApp/>},
        {path:'contacts',element:<Contacts/>},
        {path:'drivers',element:<Drivers/>},
        {path:'clients',element:<Clients/>},
        {path:'wallet',element:<UsersWallet/>},
        {path:'orders',element:<Orders/>},
        {path:'fav',element:<FavDrivers/>},
        {path:'media',element:<SocialMidea/>},
        {path:'about',element:<Aboutus/>},
       
      ]},
     
  ])
  return (
    <> 
            <RouterProvider router={routers} />
    </>
  );
}

export default App;
