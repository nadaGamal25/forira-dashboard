

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Drivers() {
  const [searchPosition, setSearchPosition] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchRate, setSearchRate] = useState('');
  const [searchMinAge, setSearchMinAge] = useState('');
  const [searchMaxAge, setSearchMaxAge] = useState('');
  const [searchOnline, setSearchOnline] = useState('');

  const [categories, setCategories] = useState([]);
  const [positions, setPosition] = useState([]);
  const [villages, setVillages] = useState([]);
  const [data, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalMain, setShowModalMain] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showModalOffer, setShowModalOffer] = useState(false);
  const [showModalReviews, setShowModalReviews] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState(false);
  const [isModalOpenData, setIsModalOpenData] = useState(false);

  const [offers, setOffers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [theTitle, setTitle] = useState('');
  const [theBody, setTheBODY] = useState('');

  const [editedData, setEditedData] = useState(null);
  const [eData, seteData] = useState(null);

  useEffect(() => {
    getCategories();
    getPosition();
    getVillage();
    fetchData(1);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchData(1);
  }, [searchPosition, searchCategory, searchRate, searchMinAge, searchMaxAge, searchOnline, limit]);

  async function fetchData(page) {
    try {
      setLoading(true);
      const params = {
        page: page,
        limit: limit,
      };

      if (searchPosition) params.position = searchPosition;
      if (searchCategory) params.category = searchCategory;
      if (searchRate) params.rateAvg = searchRate;
      if (searchMinAge) params.minAge = searchMinAge;
      if (searchMaxAge) params.maxAge = searchMaxAge;
      if (searchOnline !== '') params.online = searchOnline === 'true';

      const response = await axios.get(
        'https://delivery-app-pi-sable.vercel.app/api/admin/get-drivers-pag',
        {
          params: params,
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );

      setdata(response.data.data.users);
      setCurrentPage(response.data.data.page);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function getCategories() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/category');
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPosition() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/position');
      setPosition(response.data.data.positions);
    } catch (error) {
      console.error(error);
    }
  }

  async function getVillage() {
    try {
      const response = await axios.get('https://delivery-app-pi-sable.vercel.app/api/village');
      setVillages(response.data.data.village);
    } catch (error) {
      console.error(error);
    }
  }

  function openCarousel(images) {
    setSelectedImages(images);
    setShowModal(true);
  }

  const openModalMain = (id) => {
    setShowModalMain(true);
    setSelectedId(id);
  };

  const closeModalMain = () => {
    setShowModalMain(false);
  };

  const openModalOffer = (id) => {
    getOffers(id);
    setShowModalOffer(true);
  };

  const closeModalOffer = () => {
    setShowModalOffer(false);
    setOffers('');
  };

  const openModalReviews = (id) => {
    getRevies(id);
    setShowModalReviews(true);
  };

  const closeModalReviews = () => {
    setShowModalReviews(false);
    setReviews('');
  };

  const openModalMsg = (id) => {
    setShowModalMsg(true);
    setSelectedId(id);
  };

  const closeModalMsg = () => {
    setShowModalMsg(false);
    setTitle('');
    setTheBODY('');
    setSelectedId(null);
  };

  async function getOffers(id) {
    try {
      const response = await axios.get(
        `https://delivery-app-pi-sable.vercel.app/api/offer/by-userid/${id}`,
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      setOffers(response.data.data.offers);
    } catch (error) {
      console.error(error);
    }
  }

  async function getRevies(id) {
    try {
      const response = await axios.get(
        `https://delivery-app-pi-sable.vercel.app/api/review/by-driverid/${id}`,
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      setReviews(response.data.data.review);
    } catch (error) {
      console.error(error);
    }
  }

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
      );
      alert(response.data.message);
      fetchData(currentPage);
    } catch (error) {
      console.error(error);
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
      );
      alert(response.data.message);
      fetchData(currentPage);
    } catch (error) {
      console.error(error);
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
      );
      alert(response.data.message);
      fetchData(currentPage);
    } catch (error) {
      console.error(error);
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
      );
      alert(response.data.message);
      fetchData(currentPage);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditClickData = (data) => {
    seteData(data);
    setEditedData({
      name: data?.name || '',
      phone: data?.phone || '',
      email: data?.email || '',
      password: data?.password || '',
      position: data?.position?._id || '',
      village: data?.village?._id || '',
      address: data?.address || '',
      urlLocation: data?.urlLocation || '',
      online: data?.online || '',
      categoryId: data?.categoryId?._id || '',
      dateOfBirth: data?.dateOfBirth || '',
      positionLocation: data?.positionLocation || '',
      description: data?.description || '',
      vehicleNumber: data?.vehicleNumber || '',
      vehicleColor: data?.vehicleColor || '',
      vehicleType: data?.vehicleType || '',
      vehiclesImgs: data?.vehiclesImgs || [],
      licenseVehicleImgs: data?.licenseVehicleImgs || [],
      profileImg: data?.profileImg || [],
      idCardImg: data?.idCardImg || [],
      licenseImg: data?.licenseImg || [],
    });
    setIsModalOpenData(true);
  };

  const closeModalData = () => {
    setIsModalOpenData(false);
    setEditedData(null);
  };

  const handleInputChangeData = (event) => {
    const { name, value } = event.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChangeEdit = (event) => {
    const files = Array.from(event.target.files);
    setEditedData((prev) => ({
      ...prev,
      profileImg: [...prev.profileImg, ...files],
    }));
  };

  const handleFileIdCardEdit = (event) => {
    const files = Array.from(event.target.files);
    setEditedData((prev) => ({
      ...prev,
      idCardImg: [...prev.idCardImg, ...files],
    }));
  };

  const handleFileLicenseImgEdit = (event) => {
    const files = Array.from(event.target.files);
    setEditedData((prev) => ({
      ...prev,
      licenseImg: [...prev.licenseImg, ...files],
    }));
  };

  const handleFileVehiclesEdit = (event) => {
    const files = Array.from(event.target.files);
    setEditedData((prev) => ({
      ...prev,
      vehiclesImgs: [...prev.vehiclesImgs, ...files],
    }));
  };

  const handleLicenseVehicleImgsEdit = (event) => {
    const files = Array.from(event.target.files);
    setEditedData((prev) => ({
      ...prev,
      licenseVehicleImgs: [...prev.licenseVehicleImgs, ...files],
    }));
  };

  const handleEditSubmitData = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', editedData.name);
    formData.append('description', editedData.description);
    formData.append('phone', editedData.phone);
    formData.append('email', editedData.email);
    formData.append('password', editedData.password);
    formData.append('position', editedData.position);
    formData.append('village', editedData.village);
    formData.append('address', editedData.address);
    formData.append('urlLocation', editedData.urlLocation);
    formData.append('online', editedData.online);
    formData.append('categoryId', editedData.categoryId);
    formData.append('dateOfBirth', editedData.dateOfBirth);
    formData.append('positionLocation', editedData.positionLocation);
    formData.append('vehicleNumber', editedData.vehicleNumber);
    formData.append('vehicleColor', editedData.vehicleColor);
    formData.append('vehicleType', editedData.vehicleType);

    if (Array.isArray(editedData.profileImg)) {
      editedData.profileImg.forEach((file) => formData.append('profileImg', file));
    } else if (editedData.profileImg) {
      formData.append('profileImg', editedData.profileImg);
    }

    editedData.vehiclesImgs.forEach((file) => formData.append('vehiclesImgs', file));
    editedData.licenseVehicleImgs.forEach((file) => formData.append('licenseVehicleImgs', file));
    editedData.idCardImg.forEach((file) => formData.append('idCardImg', file));
    editedData.licenseImg.forEach((file) => formData.append('licenseImg', file));

    try {
      const response = await axios.put(
        `https://delivery-app-pi-sable.vercel.app/api/admin/update-user/${eData._id}`,
        formData,
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      alert('تم التعديل بنجاح');
      closeModalData();
      fetchData(currentPage);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

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
      );
      alert('تم الارسال بنجاح');
      closeModalMsg();
    } catch (error) {
      console.error(error);
    }
  }

  const deleteUser = (id) => {
    if (window.confirm('هل انت بالتأكيد تريد حذف هذا ؟')) {
      axios
        .delete(
          `https://delivery-app-pi-sable.vercel.app/api/admin/delete-user/${id}`,
          {
            headers: {
              token: localStorage.getItem('userToken'),
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            fetchData(currentPage);
            alert('تم الحذف بنجاح');
          }
        })
        .catch((error) => {
          console.error(error);
          alert(error.response?.data?.data?.error || 'حدث خطأ ما');
        });
    }
  };

  return (
    <>
      <div className="p-4 admin" id="content">
        {/* Filter Section */}
        <div className="gray-table p-4 mb-4">
          <div className="row">
            <div className="col-md-4">
              <select
                className="form-control m-1"
                value={searchPosition}
                onChange={(e) => setSearchPosition(e.target.value)}
              >
                <option value="">كل المناطق</option>
                {positions &&
                  positions.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-control m-1"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">كل الفئات</option>
                {categories &&
                  categories.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-4">
              <input
                className="form-control m-1"
                type="number"
                placeholder="الحد الأدنى للعمر"
                value={searchMinAge}
                onChange={(e) => setSearchMinAge(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control m-1"
                type="number"
                placeholder="الحد الأقصى للعمر"
                value={searchMaxAge}
                onChange={(e) => setSearchMaxAge(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control m-1"
                type="number"
                placeholder="التقييم"
                value={searchRate}
                onChange={(e) => setSearchRate(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-control m-1"
                value={searchOnline}
                onChange={(e) => setSearchOnline(e.target.value)}
              >
                <option value="">الكل</option>
                <option value="true">متاح</option>
                <option value="false">غير متاح</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="clients-table-container">
          <div className="clients-table p-4 my-4">
            <div className="table-responsive">
              {loading ? (
                <div className="text-center p-4">جاري التحميل...</div>
              ) : (
                <>
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
                        {/* <th scope="col">الموقع</th>
                        <th scope="col">التوصيل</th>
                        <th scope="col">الفئة</th>
                        <th scope="col">عدد التواصل</th>
                        <th scope="col">التقييم</th>
                        <th scope="col">الوصف</th>
                        <th scope="col">الصور</th>
                        <th scope="col">اللون</th>
                        <th scope="col">النوع</th>
                        <th scope="col">الرقم</th>
                        <th scope="col">البطاقة</th>
                        <th scope="col">الرخصة</th>
                        <th scope="col">رخص العربية</th>
                        <th scope="col">isConfirmed</th>
                        <th scope="col">isValid(الاشتراك)</th>
                        <th scope="col">حظر</th>
                        <th scope="col">التمييز</th> */}
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((item, index) =>
                          item !== null ? (
                            <tr
                              key={index}
                              className={item.isBlocked === true ? 'bg-block' : ''}
                            >
                              <td>{(currentPage - 1) * limit + index + 1}</td>
                              <td>
                                {item.profileImg ? (
                                  <img
                                    className="img-driver"
                                    src={item.profileImg || "/placeholder.svg"}
                                    alt="img"
                                  />
                                ) : (
                                  '_'
                                )}
                              </td>
                              <td>{item.name || '_'}</td>
                              <td>{item.age || '_'}</td>
                              <td>{item.phone || '_'}</td>
                              {/* <td>{item.email || '_'}</td> */}
                              <td>{item.position?.name || '_'}</td>
                              <td>{item.address || '_'}</td>
                              {/* <td>{item.urlLocation || '_'}</td>
                              <td>{item.positionLocation || '_'}</td>
                              <td>{item.categoryId?.name || '_'}</td>
                              <td>{item.numberOfConnect || '_'}</td>
                              <td>{item.rateAvg || '_'}</td>
                              <td>{item.description || '_'}</td>
                              <td>
                                {item.vehiclesImgs ? (
                                  <a
                                    className="text-primary"
                                    onClick={() => openCarousel(item.vehiclesImgs)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    الصور
                                  </a>
                                ) : (
                                  '_'
                                )}
                              </td>
                              <td>{item.vehicleColor || '_'}</td>
                              <td>{item.vehicleType || '_'}</td>
                              <td>{item.vehicleNumber || '_'}</td>
                              <td>
                                {item.idCardImg ? (
                                  <a
                                    className="text-primary"
                                    onClick={() => openCarousel(item.idCardImg)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    الصور
                                  </a>
                                ) : (
                                  '_'
                                )}
                              </td>
                              <td>
                                {item.licenseImg ? (
                                  <a
                                    className="text-primary"
                                    onClick={() => openCarousel(item.licenseImg)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    الصور
                                  </a>
                                ) : (
                                  '_'
                                )}
                              </td>
                              <td>
                                {item.licenseVehicleImgs ? (
                                  <a
                                    className="text-primary"
                                    onClick={() => openCarousel(item.licenseVehicleImgs)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    الصور
                                  </a>
                                ) : (
                                  '_'
                                )}
                              </td>
                              <td>{item.isConfirmed === true ? 'true' : 'false'}</td>
                              <td>{item.isValid === true ? 'true' : 'false'}</td>
                              <td>{item.isBlocked === true ? 'true' : 'false'}</td>
                              <td>{item.isHighlighted === true ? 'true' : 'false'}</td> */}
                              <td>
                               <div className='d-flex'>
                                <Link to={`/driverDetails/${item._id}`} className="m-1">
                                <i class="fa-regular fa-eye text-success fa-lg"></i>
                                </Link>
                                 <button
                                  className="btn-none m-1"
                                  onClick={() => {
                                    handleEditClickData(item);
                                  }}
                                >
                                  <i className="fa fa-edit text-primary fa-lg"></i>
                                </button>
                                 <button
                                  className="btn-none m-1"
                                  onClick={() => {
                                    deleteUser(item._id);
                                  }}
                                >
                                  <i className="fa-regular fa-trash-can fa-lg text-danger"></i>
                                </button>
                                <button
                                  className="btn-none m-1"
                                  onClick={() => {
                                    openModalMain(item._id);
                                  }}
                                >
                                  <i className="fa fa-cogs fa-lg text-secondary"></i>
                                </button>
                                 <button
                                  className="btn-none m-1"
                                  onClick={() => {
                                    openModalMsg(item._id);
                                  }}
                                >
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Carousel Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {selectedImages.map((img, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                >
                  <img src={img || "/placeholder.svg"} className="d-block w-100" alt="..." />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Actions Modal */}
      <Modal show={showModalMain} onHide={closeModalMain}>
        <Modal.Header>
          <Modal.Title>كل الاجراءات</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Button
              className="btn btn-success m-1"
              onClick={() => {
                confirmUser(selectedId, true);
                closeModalMain();
              }}
            >
              توثيق الحساب
            </Button>
            <Button
              className="btn btn-success m-1"
              onClick={() => {
                validUser(selectedId, true);
                closeModalMain();
              }}
            >
              تفعيل الحساب
            </Button>
            <Button
              className="btn btn-success m-1"
              onClick={() => {
                blockUser(selectedId, false);
                closeModalMain();
              }}
            >
              الغاء الحظر
            </Button>
            <Button
              className="btn btn-success m-1"
              onClick={() => {
                highlightUser(selectedId, true);
                closeModalMain();
              }}
            >
              تمييز الحساب
            </Button>
            <Button
              className="btn btn-danger m-1"
              onClick={() => {
                confirmUser(selectedId, false);
                closeModalMain();
              }}
            >
              الغاء التوثيق
            </Button>
            <Button
              className="btn btn-danger m-1"
              onClick={() => {
                validUser(selectedId, false);
                closeModalMain();
              }}
            >
              تعطيل الحساب
            </Button>
            <Button
              className="btn btn-danger m-1"
              onClick={() => {
                blockUser(selectedId, true);
                closeModalMain();
              }}
            >
              حظر المستخدم
            </Button>
            <Button
              className="btn btn-danger m-1"
              onClick={() => {
                highlightUser(selectedId, false);
                closeModalMain();
              }}
            >
              الغاء التمييز
            </Button>
            <Button
              className="btn btn-primary m-1"
              onClick={() => {
                openModalOffer(selectedId);
              }}
            >
              العروض
            </Button>
            <Button
              className="btn btn-warning m-1"
              onClick={() => {
                openModalReviews(selectedId);
              }}
            >
              التقييمات
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalMain}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Offers Modal */}
      
      <Modal show={showModalOffer} onHide={closeModalOffer}>
        <Modal.Header >
          <Modal.Title>
          العروض </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {offers && offers.map((item,index)=>{
            return(
              <div className='bg-green p-2 m-1' key={index}>
                <div className="d-flex">
                <p className='mx-3'>السعر : <span className='fw-bold'>{item.price}</span></p>
                {item.time?<p className='mx-3'>الوقت : <span className='fw-bold'>{item.time}</span></p>:null}
                <p className='mx-3'>الحالة : <span className='fw-bold'>{item.status}</span></p>
                <button
  className="btn btn-danger"
  onClick={() => {
    if (window.confirm('هل انت بالتأكيد تريد حذف هذا  ؟')) {
      console.log(localStorage.getItem('userToken'));
      axios
        .delete(
          `https://delivery-app-pi-sable.vercel.app/api/offer/delete-offer/${item._id}`,
          {
            headers: {
              token: localStorage.getItem('userToken'), // Move headers here
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            getOffers(selectedId);
            window.alert('تم الحذف بنجاح');
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            window.alert(error.response.data.data.error || 'حدث خطأ ما');
          }
        });
    }
  }}
>
  حذف
</button>
                </div>
                
                </div>
            )
          })}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalOffer}>
          إغلاق
          </Button>
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>
      <Modal show={showModalReviews} onHide={closeModalReviews}>
        <Modal.Header >
          <Modal.Title>
          التقييمات </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {reviews && reviews.map((item,index)=>{
            return(
              <div className='bg-green p-2 m-1' key={index}>
                <div className="d-flex">
                <p className='mx-3'>التقييم : <span className='fw-bold'>{item.rate}</span></p>
                <p className='mx-3'>التعليق : <span className='fw-bold'>{item.comment}</span></p>
              
                </div>
                <div className="d-flex align-items-center">
                  <img className='img-offer' src={item.client?.profileImg} alt='img'/>
                <p className='mx-3'> <span className='fw-bold'>{item.client?.name}</span></p>
                <button
  className="btn btn-danger"
  onClick={() => {
    if (window.confirm('هل انت بالتأكيد تريد حذف هذا  ؟')) {
      console.log(localStorage.getItem('userToken'));
      axios
        .delete(
          `https://delivery-app-pi-sable.vercel.app/api/review/${item._id}`,
          {
            headers: {
              token: localStorage.getItem('userToken'), // Move headers here
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            getRevies(selectedId);
            window.alert('تم الحذف بنجاح');
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            window.alert(error.response.data.data.error || 'حدث خطأ ما');
          }
        });
    }
  }}
>
  حذف
</button>
                </div>
                </div>
            )
          })}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalReviews}>
          إغلاق
          </Button>
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>

      {/* Message Modal */}
      <Modal show={showModalMsg} onHide={closeModalMsg}>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMsg(selectedId);
            }}
          >
            <div className="form-group">
              <label htmlFor="title">العنوان:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={theTitle}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label htmlFor="body" className="mt-3">
                المحتوى:
              </label>
              <textarea
                className="form-control"
                id="body"
                value={theBody}
                onChange={(e) => setTheBODY(e.target.value)}
                required
                rows="4"
              ></textarea>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-success m-2">
                إرسال إشعار
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Edit Data Modal */}
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
                  <label htmlFor="categoryId">الفئة :</label>
                  <select
                    className="form-control my-2"
                    name="categoryId"
                    value={editedData.categoryId.name}
                    onChange={handleInputChangeData}
                    
                  >
                    <option value="">اختر الفئة</option>
                    {categories &&
                      categories.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="position">المنطقة :</label>
                  <select
                    className="form-control my-2"
                    name="position"
                    value={editedData.position.name}
                    onChange={handleInputChangeData}
                    
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
                    className="form-control my-2"
                    name="village"
                    value={editedData.village.name}
                    onChange={handleInputChangeData}
                    
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
                {/* <div className="col-md-6 pb-1">
                  <label htmlFor="startTime">وقت البدء :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.startTime}
                    type="text"
                    className="my-input my-2 form-control"
                    name="startTime"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="endTime">وقت الانتهاء :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.endTime}
                    type="text"
                    className="my-input my-2 form-control"
                    name="endTime"
                  />
                </div> */}
                <div className="col-md-6 pb-1">
                  <label htmlFor="dateOfBirth">تاريخ الميلاد :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.dateOfBirth}
                    type="date"
                    className="my-input my-2 form-control"
                    name="dateOfBirth"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="urlLocation">لينك الموقع :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.urlLocation}
                    type="text"
                    className="my-input my-2 form-control"
                    name="urlLocation"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="positionLocation">الموقع (داخل,خارج):</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.positionLocation}
                    type="text"
                    className="my-input my-2 form-control"
                    name="positionLocation"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="">رقم العربية :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.vehicleNumber}
                    type="text"
                    className="my-input my-2 form-control"
                    name="vehicleNumber"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="vehicleColor">اللون :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.vehicleColor}
                    type="text"
                    className="my-input my-2 form-control"
                    name="vehicleColor"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="vehicleType">النوع :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.vehicleType}
                    type="text"
                    className="my-input my-2 form-control"
                    name="vehicleType"
                  />
                </div>
                
                <div className="col-md-6 pb-1">
                  <label htmlFor="description">الوصف :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.description}
                    type="text"
                    className="my-input my-2 form-control"
                    name="description"
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="">صور طريقة التوصيل :</label>
                  <input
                    type="file"
                    className="form-control my-2"
                    multiple
                    onChange={handleFileVehiclesEdit}
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="">الصورة الشخصية :</label>
                  <input
                    type="file"
                    className="form-control my-2"
                    multiple
                    onChange={handleFileChangeEdit}
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="">صورة البطاقة :</label>
                  <input
                    type="file"
                    className="form-control my-2"
                    multiple
                    onChange={handleFileIdCardEdit}
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="">صورة الرخصة :</label>
                  <input
                    type="file"
                    className="form-control my-2"
                    multiple
                    onChange={handleFileLicenseImgEdit}
                  />
                </div>
                <div className="col-md-6 pb-1">
                  <label htmlFor="">صور رخص العربية :</label>
                  <input
                    type="file"
                    className="form-control my-2"
                    multiple
                    onChange={handleLicenseVehicleImgsEdit}
                  />
                </div>
                <div className="text-center pt-1">
                  <button className="btn btn-primary">تعديل</button>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalData}>
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
   )}
    </>
  );
}
