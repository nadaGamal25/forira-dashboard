

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'
import { Modal, Button } from 'react-bootstrap'

export default function Clients() {
  // Pagination & Filter State
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [searchPosition, setSearchPosition] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchAge, setSearchAge] = useState('')
  const [searchPhone, setSearchPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  // Dropdowns State
  const [categories, setCategories] = useState([])
  const [positions, setPosition] = useState([])
  const [villages, setVillages] = useState([])

  // Modal States
  const [selectedImages, setSelectedImages] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showModalMain, setShowModalMain] = useState(false)
  const [selectedId, setSelectedId] = useState(false)
  const [showModalMsg, setShowModalMsg] = useState(false)
  const [theTitle, setTitle] = useState('')
  const [theBody, setTheBody] = useState('')
  const [isModalOpenData, setIsModalOpenData] = useState(false)
  const [editedData, setEditedData] = useState(null)
  const [eData, seteData] = useState(null)

  const page = currentPage;
  const setPage = setCurrentPage;

  // Load dropdown data
  useEffect(() => {
    getCategories()
    getPosition()
    getVillage()
  }, [])

  // Load clients with pagination
  useEffect(() => {
    fetchData(currentPage)
  }, [searchPosition, searchName, searchAge, searchPhone, currentPage, limit])

  async function getCategories() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/category')
      setCategories(response.data.data.categories)
    } catch (error) {
      console.error(error)
    }
  }

  async function getPosition() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/position')
      setPosition(response.data.data.positions)
    } catch (error) {
      console.error(error)
    }
  }

  async function getVillage() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/village')
      setVillages(response.data.data.village)
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchData(pageNum) {
    try {
      setLoading(true)
      const params = {
        page: pageNum,
        limit,
      }
      if (searchPosition) params.position = searchPosition
      if (searchName) params.name = searchName
      if (searchAge) params.age = searchAge
      if (searchPhone) params.phone = searchPhone

      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/admin/get-clients-pag', {
        params,
        headers: {
          token: localStorage.getItem('userToken'),
        },
      })
      setData(response.data.data.users)
      setCurrentPage(response.data.data.page || pageNum)
      setTotalPages(response.data.data.totalPages || Math.ceil(response.data.data.totalCount / limit))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Handle search input changes
  const handlePositionChange = (e) => {
    setSearchPosition(e.target.value)
    setCurrentPage(1)
  }

  const handleNameChange = (e) => {
    setSearchName(e.target.value)
    setCurrentPage(1)
  }

  const handleAgeChange = (e) => {
    setSearchAge(e.target.value)
    setCurrentPage(1)
  }

  const handlePhoneChange = (e) => {
    setSearchPhone(e.target.value)
    setCurrentPage(1)
  }

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value))
    setCurrentPage(1)
  }

  // User Actions
  async function confirmUser(id, value) {
    try {
      const response = await axios.put(
        `https://delivery-app-pi-sable.vercel.app/api/admin/confirm-user/${id}`,
        { value },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      )
      alert(response.data.message)
      closeModalMain()
      fetchData(currentPage)
    } catch (error) {
      console.error(error)
    }
  }

  async function validUser(id, value) {
    try {
      const response = await axios.put(
        `https://delivery-app-pi-sable.vercel.app/api/admin/invalid-user/${id}`,
        { value },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      )
      alert(response.data.message)
      closeModalMain()
      fetchData(currentPage)
    } catch (error) {
      console.error(error)
    }
  }

  async function blockUser(id, value) {
    try {
      const response = await axios.put(
        `https://delivery-app-pi-sable.vercel.app/api/admin/block-user/${id}`,
        { value },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      )
      alert(response.data.message)
      closeModalMain()
      fetchData(currentPage)
    } catch (error) {
      console.error(error)
    }
  }

  async function highlightUser(id, value) {
    try {
      const response = await axios.put(
        `https://delivery-app-pi-sable.vercel.app/api/admin/highlight-user/${id}`,
        { value },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      )
      alert(response.data.message)
      closeModalMain()
      fetchData(currentPage)
    } catch (error) {
      console.error(error)
    }
  }

  // Modal Functions
  const openModalMain = (id) => {
    setShowModalMain(true)
    setSelectedId(id)
  }

  const closeModalMain = () => {
    setShowModalMain(false)
  }

  const openModalMsg = (id) => {
    setShowModalMsg(true)
    setSelectedId(id)
  }

  const closeModalMsg = () => {
    setShowModalMsg(false)
    setTitle('')
    setTheBody('')
    setSelectedId(null)
  }

  // Edit Modal Functions
  const handleEditClickData = (data) => {
    seteData(data)
    setEditedData({
      name: data?.name || '',
      phone: data?.phone || '',
      email: data?.email || '',
      password: data?.password || '',
      position: data?.position?._id || '',
      village: data?.village?._id || '',
      address: data?.address || '',
      urlLocation: data?.urlLocation || '',
      dateOfBirth: data?.dateOfBirth || '',
      description: data?.description || '',
      profileImg: data?.profileImg || [],
    })
    setIsModalOpenData(true)
  }

  const closeModalData = () => {
    setIsModalOpenData(false)
    setEditedData(null)
  }

  const handleInputChangeData = (event) => {
    const { name, value } = event.target
    setEditedData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChangeEdit = (event) => {
    const files = Array.from(event.target.files)
    setEditedData((prev) => ({
      ...prev,
      profileImg: [...prev.profileImg, ...files],
    }))
  }

  const handleEditSubmitData = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', editedData.name)
    formData.append('description', editedData.description)
    formData.append('phone', editedData.phone)
    formData.append('email', editedData.email)
    formData.append('password', editedData.password)
    formData.append('position', editedData.position)
    formData.append('village', editedData.village)
    formData.append('address', editedData.address)
    formData.append('urlLocation', editedData.urlLocation)
    formData.append('dateOfBirth', editedData.dateOfBirth)
    if (Array.isArray(editedData.profileImg)) {
      editedData.profileImg.forEach((file) => formData.append('profileImg', file))
    } else if (editedData.profileImg) {
      formData.append('profileImg', editedData.profileImg)
    }

    try {
      const response = await axios.put(`https://delivery-app-pi-sable.vercel.app/api/admin/update-user/${eData._id}`, formData, {
        headers: {
          token: localStorage.getItem('userToken'),
        },
      })
      alert('تم التعديل بنجاح')
      closeModalData()
      fetchData()
    } catch (error) {
      console.error(error)
      alert(error.response.data.message)
    }
  }

  // Send Notification
  async function sendMsg(id) {
    try {
      const response = await axios.post(
        `https://delivery-app-pi-sable.vercel.app/api/notifications/to-user/${id}`,
        {
          title: theTitle,
          body: theBody,
        },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      )
      alert('تم الارسال بنجاح')
      closeModalMsg()
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="p-4 admin" id="content">
        {/* Filter Section */}
        <div className="gray-table p-4 mb-4">
          <div className="row">
            <div className="col-md-3">
              <select className="form-control m-1" value={searchPosition} onChange={handlePositionChange}>
                <option value="">كل المناطق</option>
                {positions &&
                  positions.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-3">
              <input
                className="form-control m-1"
                type="search"
                placeholder="العمر"
                value={searchAge}
                onChange={handleAgeChange}
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control m-1"
                type="search"
                placeholder="الاسم"
                value={searchName}
                onChange={handleNameChange}
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control m-1"
                type="search"
                placeholder="الهاتف"
                value={searchPhone}
                onChange={handlePhoneChange}
              />
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="clients-table p-4 my-4">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">الصورة</th>
                <th scope="col">الاسم</th>
                <th scope="col">العمر</th>
                <th scope="col">الهاتف</th>
                {/* <th scope="col">الايميل</th> */}
                <th scope="col">المنطقة</th>
                <th scope="col">العنوان</th>
                <th scope="col">القرية</th>
                {/* <th scope="col">الموقع</th> */}
                <th scope="col">الاشتراك</th>
                <th scope="col">حظر</th>
                <th scope="col">التمييز</th>
                <th scope="col">الوصف</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) =>
                  item !== null ? (
                    <tr key={index} className={item.isBlocked == true ? 'bg-block' : ''}>
                      <td>{(currentPage - 1) * limit + index + 1}</td>
                      <td>{item.profileImg ? <img className="img-driver" src={item.profileImg || "/placeholder.svg"} alt="img" /> : '_'}</td>
                      <td>{item.name || '_'}</td>
                      <td>{item.age || '_'}</td>
                      <td>{item.phone || '_'}</td>
                      {/* <td>{item.email || '_'}</td> */}
                      <td>{item.position?.name || '_'}</td>
                      <td>{item.address || '_'}</td>
                      {item.village !== null ? <td> {item.village?.name}</td> : <td>_</td>}
                      {/* <td>{item.urlLocation || '_'}</td> */}
                      <td>{item.isValid === true ? 'true' : 'false' || '_'}</td>
                      <td>{item.isBlocked === true ? 'true' : 'false' || '_'}</td>
                      <td>{item.isHighlighted === true ? 'true' : 'false' || '_'}</td>
                      <td>{item.description || '_'}</td>
                      <td>
                         <div className='d-flex'>
                          <button className="btn-none m-1" onClick={() => {
                          handleEditClickData(item)
                        }}>
                          <i className="fa fa-edit text-primary fa-lg"></i>
                        </button>
                        <button
                          className="btn-none m-1"
                          onClick={() => {
                            if (window.confirm('هل انت بالتأكيد تريد حذف هذا  ؟')) {
                              axios
                                .delete(`https://delivery-app-pi-sable.vercel.app/api/admin/delete-user/${item._id}`, {
                                  headers: {
                                    token: localStorage.getItem('userToken'),
                                  },
                                })
                                .then((response) => {
                                  if (response.status === 200) {
                                    fetchData(currentPage)
                                    window.alert('تم الحذف بنجاح')
                                  }
                                })
                                .catch((error) => {
                                  console.error(error)
                                  if (error.response) {
                                    window.alert(error.response.data.data.error || 'حدث خطأ ما')
                                  }
                                })
                            }
                          }}
                        >
                          <i className="fa-regular fa-trash-can fa-lg text-danger"></i>
                        </button>
                          <button className="btn-none m-1" onClick={() => {
                          openModalMain(item._id)
                        }}>
                        <i className="fa fa-cogs fa-lg text-secondary"></i>
                        </button>
                        <button className="btn-none m-1" onClick={() => {
                          openModalMsg(item._id)
                        }}>
                     <i className="fa-regular fa-bell fa-lg text-success"></i>
                        </button>
                         </div>
                      </td>
                    </tr>
                  ) : null
                )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
            <button
              className="btn btn-outline-secondary"
              onClick={() => fetchData(currentPage - 1)}
              disabled={currentPage === 1}
            >
              السابق
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`btn ${
                  currentPage === page ? 'btn-secondary' : 'btn-outline-secondary'
                }`}
                onClick={() => fetchData(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="btn btn-outline-secondary"
              onClick={() => fetchData(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              التالي
            </button>

            <select
              className="form-control m-1"
              style={{ maxWidth: '100px' }}
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="text-center mt-2">
            <small className="text-muted">
              الصفحة {currentPage} من {totalPages} | إجمالي الصفوف: {data.length}
            </small>
          </div>
        </div>
      </div>

      {/* Actions Modal */}
      <Modal show={showModalMain} onHide={closeModalMain}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Button className="btn btn-success m-1" onClick={() => {
              confirmUser(selectedId, true)
            }}>
              توثيق الحساب
            </Button>
            <Button className="btn btn-success m-1" onClick={() => {
              validUser(selectedId, true)
            }}>
              تفعيل الحساب
            </Button>
            <Button className="btn btn-success m-1" onClick={() => {
              blockUser(selectedId, false)
            }}>
              الغاء الحظر
            </Button>
            <Button className="btn btn-success m-1" onClick={() => {
              highlightUser(selectedId, true)
            }}>
              تمييز الحساب
            </Button>
            <Button className="btn btn-danger m-1" onClick={() => {
              confirmUser(selectedId, false)
            }}>
              الغاء التوثيق
            </Button>
            <Button className="btn btn-danger m-1" onClick={() => {
              validUser(selectedId, false)
            }}>
              تعطيل الحساب{' '}
            </Button>
            <Button className="btn btn-danger m-1" onClick={() => {
              blockUser(selectedId, true)
            }}>
              حظر المستخدم
            </Button>
            <Button className="btn btn-danger m-1" onClick={() => {
              highlightUser(selectedId, false)
            }}>
              الغاء التمييز
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalMain}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Notification Modal */}
      <Modal show={showModalMsg} onHide={closeModalMsg}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMsg(selectedId)
            }}
          >
            <div className="form-group" dir='ltr'>
              <label htmlFor="title" >title :</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={theTitle}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label htmlFor="body">body :</label>
              <input
                type="text"
                className="form-control"
                id="body"
                value={theBody}
                onChange={(e) => setTheBody(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit" className="btn btn-success m-2">
                ارسال اشعار
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalMsg}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      {isModalOpenData && (
        <Modal show={isModalOpenData} onHide={closeModalData}>
          <Modal.Header>
            <Modal.Title>تعديل البيانات</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditSubmitData}>
              <div className="row">
                <div className="col-md-6 pb-1">
                  <label htmlFor="name">الاسم :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.name}
                    type="text"
                    className="my-input my-2 form-control"
                    name="name"
                  />
                </div>

                <div className="col-md-6 pb-1">
                  <label htmlFor="phone">الهاتف :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.phone}
                    type="text"
                    className="my-input my-2 form-control"
                    name="phone"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="email">الايميل :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.email}
                    type="text"
                    className="my-input my-2 form-control"
                    name="email"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="password">كلمة المرور :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.password}
                    type="text"
                    className="my-input my-2 form-control"
                    name="password"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="address">العنوان :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.address}
                    type="text"
                    className="my-input my-2 form-control"
                    name="address"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="position">المنطقة :</label>
                  <select
                    onChange={handleInputChangeData}
                    value={editedData.position}
                    className="my-input my-2 form-control"
                    name="position"
                  >
                    <option value="">اختر المنطقة</option>
                    {positions &&
                      positions.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="village">القرية :</label>
                  <select
                    onChange={handleInputChangeData}
                    value={editedData.village}
                    className="my-input my-2 form-control"
                    name="village"
                  >
                    <option value="">اختر القرية</option>
                    {villages &&
                      villages.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="urlLocation">الموقع :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.urlLocation}
                    type="text"
                    className="my-input my-2 form-control"
                    name="urlLocation"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="dateOfBirth">تاريخ الميلاد :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.dateOfBirth}
                    type="text"
                    className="my-input my-2 form-control"
                    name="dateOfBirth"
                  />
                </div>
                <div className="col-md-12 pb-1">
                  <label htmlFor="description">الوصف :</label>
                  <textarea
                    onChange={handleInputChangeData}
                    value={editedData.description}
                    className="my-input my-2 form-control"
                    name="description"
                  />
                </div>
                <div className="col-md-12 pb-1">
                  <label htmlFor="profileImg">صورة المستخدم :</label>
                  <input onChange={handleFileChangeEdit} type="file" className="form-control" name="profileImg" multiple />
                </div>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-primary m-1">
                  حفظ التعديلات
                </button>
                <button type="button" className="btn btn-secondary m-1" onClick={closeModalData}>
                  إلغاء
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}
