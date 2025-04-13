import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
// import generateApiKey from 'generate-api-key';
import pdfDocs from '../../../src/Gotex_Eg_Doc.pdf'

export default function Navbar({userData ,logout}) {
    let navigate= useNavigate(); //hoke
  const [sideToggle ,setSideToggle]=useState(false);

  


  useEffect(()=>{
    // console.log(userData)
  },[])

 
     
      useEffect(() => {
        const handleClick = (e) => {
          const allSideMenu = document.querySelectorAll('.side-menu.top li a');
          const li = e.currentTarget.parentElement;
    
          allSideMenu.forEach((i) => {
            i.parentElement.classList.remove('active');
          });
          
          li.classList.add('active');
        };
    
        const allSideMenu = document.querySelectorAll('.side-menu.top li a');
        allSideMenu.forEach((item) => {
          item.addEventListener('click', handleClick);
        });
    
        return () => {
          allSideMenu.forEach((item) => {
            item.removeEventListener('click', handleClick);
          });
        };
      }, []);
    

        
  return (
    <>
    {/* <!-- start side navbar --> */} 
    <section id="sidebar" className={sideToggle? "hide" :""}>
        <a href="#" class="brand">
            <img src={logo} alt='logo'/>
        </a>
       
        <ul class="side-menu top">
        
        
            <li>
                <Link to="/category">
                <i class="fa-solid fa-table bx"></i>
                <span class="text">الفئات
                </span>
                </Link>
            </li>
            <li>
                <Link to="/position">
                <i class="fa-solid fa-location-dot bx"></i>
                <span class="text">المناطق
                </span>
                </Link>
            </li>
            <li>
                <Link to="/village">
                <i class="fa-solid fa-map-location bx"></i>
                  <span class="text">القرى
                </span>
                </Link>
            </li>
            <li>
                <Link to="/clients">
                <i class="fa-solid fa-users bx"></i>
                  <span class="text">العملاء
                </span>
                </Link>
            </li>
            <li>
                <Link to="/drivers">
                <i class="fa-solid fa-clipboard-user bx"></i>
                  <span class="text">السائقين
                </span>
                </Link>
            </li>
            
            <li>
                <Link to="/fav">
                <i class="fa-solid fa-heart bx"></i>
                  <span class="text">السائقين المفضلين
                </span>
                </Link>
            </li>
            <li>
                <Link to="/addUser">
                <i class="fa-solid fa-user bx"></i>
                  <span class="text">اضافة مستخدم
                </span>
                </Link>
            </li>
            <li>
                <Link to="/wallet">
                <i class="fa-solid fa-coins bx"></i>
                  <span class="text">المحفظة
                </span>
                </Link>
            </li>
            <li>
                <Link to="/orders">
                <i class="fa-solid fa-truck-arrow-right bx"></i>
                  <span class="text">الاوردرات
                </span>
                </Link>
            </li>
            <li>
                <Link to="/notification">
                <i class="fa-solid fa-bell bx"></i>
                  <span class="text">الاشعارات
                </span>
                </Link>
            </li>
            <li>
                <Link to="/about">
                <i class="fa-solid fa-tablet-screen-button bx"></i>
                  <span class="text">عن التطبيق
                </span>
                </Link>
            </li>
            <li>
                <Link to="/media">
                <i class="fa-solid fa-share-nodes bx"></i>
                  <span class="text">وسائل التواصل
                </span>
                </Link>
            </li>
            <li>
                <Link to="/qAndA">
                <i class="fa-solid fa-circle-question bx"></i>
                <span class="text">الاسئلة الشائعة
                </span>
                </Link>
            </li>
            <li>
                <Link to="/reviewsApp">
                <i class="fa-solid fa-comments bx"></i>
                    <span class="text"> تقييمات التطبيق
                </span>
                </Link>
            </li>
            <li>
                <Link to="/suggests">
                <i class="fa-solid fa-circle-exclamation bx"></i>
                    <span class="text">المقترحات والشكاوى
                </span>
                </Link>
            </li>
            <li>
                <Link to="/contacts">
                <i class="fa-solid fa-comment-dots bx"></i>
                    <span class="text">طلبات التواصل
                </span>
                </Link>
            </li>
            
            
            <li>
            <Link onClick={logout} class="logout" to='/'>
                <i class="fa-solid fa-right-from-bracket bx"></i>
                    <span class="text">تسجيل الخروج</span>
                </Link>
            </li>
        </ul>
    </section>
    
        {/* <!-- end side navbar --> */}
    <section id="content">
        {/* <!--start navbar --> */}
        <nav class="d-flex align-items-center">
            <i class="fa-solid fa-bars" onClick={()=> setSideToggle(!sideToggle)}></i>
          
        </nav>
        {/* <!--end navbar --> */}
        </section>
      
  
       
    </>
  )
}