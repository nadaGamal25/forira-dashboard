

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DriverDetails() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal States
  const [showModalOffer, setShowModalOffer] = useState(false);
  const [showModalReviews, setShowModalReviews] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState(false);
  const [showModalData, setShowModalData] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Message Modal State
  const [msgTitle, setMsgTitle] = useState('');
  const [msgBody, setMsgBody] = useState('');

  // Edit State
  const [editedData, setEditedData] = useState(null);
  const [offers, setOffers] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Fetch driver data
  useEffect(() => {
    if (id) {
      getDriverData();
    }
  }, [id]);

  async function getDriverData() {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://delivery-app-pi-sable.vercel.app/api/auth/get-account/${id}`
      );
      console.log(response)
      setDriver(response.data.data?.user);
      setEditedData(response.data.data?.user);
      setError(null);
    } catch (err) {
      setError('Failed to fetch driver data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function getOffers() {
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

  async function getReviews() {
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

  // Modal handlers
  const openModalOffer = () => {
    getOffers();
    setShowModalOffer(true);
  };

  const openModalReviews = () => {
    getReviews();
    setShowModalReviews(true);
  };

  const openCarousel = (images) => {
    setSelectedImages(images);
    setShowCarousel(true);
    setCarouselIndex(0);
  };

  const handleCarouselPrev = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : selectedImages.length - 1));
  };

  const handleCarouselNext = () => {
    setCarouselIndex((prev) => (prev < selectedImages.length - 1 ? prev + 1 : 0));
  };

  // Edit handlers
  const handleEditChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (field, files) => {
    const fileArray = Array.from(files);
    setEditedData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ...fileArray],
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all fields
    formData.append('name', editedData.name);
    formData.append('description', editedData.description);
    formData.append('phone', editedData.phone);
    formData.append('email', editedData.email);
    formData.append('password', editedData.password);
    formData.append('position', editedData.position?._id || editedData.position);
    formData.append('village', editedData.village);
    formData.append('address', editedData.address);
    formData.append('urlLocation', editedData.urlLocation);
    formData.append('online', editedData.online);
    formData.append('categoryId', editedData.categoryId?._id || editedData.categoryId);
    formData.append('dateOfBirth', editedData.dateOfBirth);
    formData.append('positionLocation', editedData.positionLocation);
    formData.append('vehicleNumber', editedData.vehicleNumber);
    formData.append('vehicleColor', editedData.vehicleColor);
    formData.append('vehicleType', editedData.vehicleType);

    // Handle images
    if (Array.isArray(editedData.profileImg)) {
      editedData.profileImg.forEach((file) => {
        if (file instanceof File) {
          formData.append('profileImg', file);
        }
      });
    }

    if (Array.isArray(editedData.vehiclesImgs)) {
      editedData.vehiclesImgs.forEach((file) => {
        if (file instanceof File) {
          formData.append('vehiclesImgs', file);
        }
      });
    }

    if (Array.isArray(editedData.idCardImg)) {
      editedData.idCardImg.forEach((file) => {
        if (file instanceof File) {
          formData.append('idCardImg', file);
        }
      });
    }

    if (Array.isArray(editedData.licenseImg)) {
      editedData.licenseImg.forEach((file) => {
        if (file instanceof File) {
          formData.append('licenseImg', file);
        }
      });
    }

    if (Array.isArray(editedData.licenseVehicleImgs)) {
      editedData.licenseVehicleImgs.forEach((file) => {
        if (file instanceof File) {
          formData.append('licenseVehicleImgs', file);
        }
      });
    }

    try {
      await axios.put(
        `https://delivery-app-pi-sable.vercel.app/api/admin/update-user/${id}`,
        formData,
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      alert('تم التعديل بنجاح');
      setShowModalData(false);
      getDriverData();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'حدث خطأ ما');
    }
  };

  // Action handlers
  async function confirmUser(value) {
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
      getDriverData();
    } catch (error) {
      console.error(error);
    }
  }

  async function validUser(value) {
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
      getDriverData();
    } catch (error) {
      console.error(error);
    }
  }

  async function blockUser(value) {
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
      getDriverData();
    } catch (error) {
      console.error(error);
    }
  }

  async function highlightUser(value) {
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
      getDriverData();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteDriver() {
    if (window.confirm('هل انت متأكد من حذف هذا السائق؟')) {
      try {
        const response = await axios.delete(
          `https://delivery-app-pi-sable.vercel.app/api/admin/delete-user/${id}`,
          {
            headers: {
              token: localStorage.getItem('userToken'),
            },
          }
        );
        alert('تم الحذف بنجاح');
        window.location.href = '/drivers';
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'حدث خطأ ما');
      }
    }
  }

  async function sendMsg() {
    try {
      const response = await axios.post(
        `https://delivery-app-pi-sable.vercel.app/api/notifications/to-user/${id}`,
        {
          title: msgTitle,
          body: msgBody,
        },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      alert('تم الارسال بنجاح');
      setShowModalMsg(false);
      setMsgTitle('');
      setMsgBody('');
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="p-4 admin">
        <div className="text-center p-4">جاري التحميل...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 admin">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="p-4 admin">
        <div className="alert alert-warning">لم يتم العثور على بيانات السائق</div>
      </div>
    );
  }

  return (
    <div className="p-4 admin" id="content" style={{ direction: 'rtl' }}>
      {/* Driver Profile Header */}
      <div
        className="gray-table p-4 mb-4"
        style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div style={{ flex: '0 0 auto' }}>
            {driver.profileImg ? (
              <img
                src={driver.profileImg || '/placeholder.svg'}
                alt="Driver"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  border: '3px solid #708d9b',
                }}
              />
            ) : (
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '8px',
                  backgroundColor: '#e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                لا توجد صورة
              </div>
            )}
          </div>
          <div style={{ flex: '1', minWidth: '0' }}>
            <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>{driver.name || '_'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>الهاتف:</strong> {driver.phone || '_'}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>الايميل:</strong> {driver.email || '_'}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>العمر:</strong> {driver.age || '_'}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>التقييم:</strong> {driver.rateAvg || '_'}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>المنطقة:</strong> {driver.position?.name || '_'}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>
                <strong>الفئة:</strong> {driver.categoryId?.name || '_'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="gray-table p-4 mb-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h5 style={{ marginBottom: '15px', color: '#333' }}>الاجراءات</h5>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button
            className="btn btn-green"
            onClick={() => confirmUser(true)}
          >
            تأكيد
          </button>
          <button
            className="btn btn-green"
            onClick={() => confirmUser(false)}
          >
            إلغاء التأكيد
          </button>
          <button
            className="btn btn-green"
            onClick={() => validUser(true)}
          >
            تفعيل الاشتراك
          </button>
          <button
            className="btn btn-green"
            onClick={() => validUser(false)}
          >
            إلغاء الاشتراك
          </button>
          <button
            className="btn btn-green"
            onClick={() => blockUser(true)}
            style={{
              backgroundColor: '#dc3545',
              borderColor: '#dc3545',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            حظر
          </button>
          <button
            className="btn btn-green"
            onClick={() => blockUser(false)}
          >
            إلغاء الحظر
          </button>
          <button
            className="btn btn-green"
            onClick={() => highlightUser(true)}
            style={{
              backgroundColor: '#ffc107',
              borderColor: '#ffc107',
              color: '#333',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            تمييز
          </button>
          <button
            className="btn btn-green"
            onClick={() => highlightUser(false)}
            style={{
              backgroundColor: '#6c757d',
              borderColor: '#6c757d',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            إلغاء التمييز
          </button>
          <button
            className="btn btn-green"
            onClick={() => setShowModalMsg(true)}
            style={{
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ارسال اشعار
          </button>
          {/* <button
            className="btn btn-green"
            onClick={() => setShowModalData(true)}
            style={{
              backgroundColor: '#17a2b8',
              borderColor: '#17a2b8',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            تعديل
          </button> */}
          <button
            className="btn btn-danger"
            onClick={deleteDriver}
          >
            حذف
          </button>
        </div>
      </div>

      {/* Driver Details */}
      <div className="clients-table p-4 mb-4" style={{ backgroundColor: 'white', borderRadius: '8px' }}>
        <h5 style={{ marginBottom: '20px', color: '#333' }}>بيانات السائق</h5>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div>
            <h6 style={{ color: '#28a745', marginBottom: '10px' }}>المعلومات الشخصية</h6>
            <p style={{ margin: '5px 0' }}>
              <strong>الاسم:</strong> {driver.name || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>العمر:</strong> {driver.age || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>تاريخ الميلاد:</strong> {driver.dateOfBirth || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>الهاتف:</strong> {driver.phone || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>الايميل:</strong> {driver.email || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>الوصف:</strong> {driver.description || '_'}
            </p>
          </div>

          <div>
            <h6 style={{ color: '#28a745', marginBottom: '10px' }}>معلومات الموقع والعمل</h6>
            <p style={{ margin: '5px 0' }}>
              <strong>المنطقة:</strong> {driver.position?.name || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>القرية:</strong> {driver.village || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>العنوان:</strong> {driver.address || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>موقع التوصيل:</strong> {driver.positionLocation || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>رابط الموقع:</strong>{' '}
              {driver.urlLocation ? (
                <a href={driver.urlLocation} target="_blank" rel="noopener noreferrer">
                  اضغط هنا
                </a>
              ) : (
                '_'
              )}
            </p>
          </div>

          <div>
            <h6 style={{ color: '#28a745', marginBottom: '10px' }}>معلومات العمل والتقييم</h6>
            <p style={{ margin: '5px 0' }}>
              <strong>الفئة:</strong> {driver.categoryId?.name || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>التقييم:</strong> {driver.rateAvg || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>عدد التواصل:</strong> {driver.numberOfConnect || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>متاح:</strong>{' '}
              <span style={{ color: driver.online ? '#28a745' : '#dc3545' }}>
                {driver.online ? 'متاح' : 'غير متاح'}
              </span>
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>مؤكد:</strong>{' '}
              <span style={{ color: driver.isConfirmed ? '#28a745' : '#dc3545' }}>
                {driver.isConfirmed ? 'نعم' : 'لا'}
              </span>
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>الاشتراك:</strong>{' '}
              <span style={{ color: driver.isValid ? '#28a745' : '#dc3545' }}>
                {driver.isValid ? 'نعم' : 'لا'}
              </span>
            </p>
          </div>

          <div>
            <h6 style={{ color: '#28a745', marginBottom: '10px' }}>معلومات العربية</h6>
            <p style={{ margin: '5px 0' }}>
              <strong>رقم العربية:</strong> {driver.vehicleNumber || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>لون العربية:</strong> {driver.vehicleColor || '_'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>نوع العربية:</strong> {driver.vehicleType || '_'}
            </p>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="clients-table p-4 mb-4" style={{ backgroundColor: 'white', borderRadius: '8px' }}>
        <h5 style={{ marginBottom: '20px', color: '#333' }}>الصور والوثائق</h5>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {driver.vehiclesImgs && driver.vehiclesImgs.length > 0 && (
            <div>
              <h6 style={{ color: '#28a745', marginBottom: '10px' }}>صور العربية</h6>
              <button
                className="btn btn-sm"
                onClick={() => openCarousel(driver.vehiclesImgs)}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                عرض الصور ({driver.vehiclesImgs.length})
              </button>
            </div>
          )}

          {driver.idCardImg && driver.idCardImg.length > 0 && (
            <div>
              <h6 style={{ color: '#28a745', marginBottom: '10px' }}>صور الهوية</h6>
              <button
                className="btn btn-sm"
                onClick={() => openCarousel(driver.idCardImg)}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                عرض الصور ({driver.idCardImg.length})
              </button>
            </div>
          )}

          {driver.licenseImg && driver.licenseImg.length > 0 && (
            <div>
              <h6 style={{ color: '#28a745', marginBottom: '10px' }}>صور الرخصة</h6>
              <button
                className="btn btn-sm"
                onClick={() => openCarousel(driver.licenseImg)}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                عرض الصور ({driver.licenseImg.length})
              </button>
            </div>
          )}

          {driver.licenseVehicleImgs && driver.licenseVehicleImgs.length > 0 && (
            <div>
              <h6 style={{ color: '#28a745', marginBottom: '10px' }}>صور رخصة العربية</h6>
              <button
                className="btn btn-sm"
                onClick={() => openCarousel(driver.licenseVehicleImgs)}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                عرض الصور ({driver.licenseVehicleImgs.length})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Additional Data Buttons */}
      <div className="gray-table p-4 mb-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h5 style={{ marginBottom: '15px', color: '#333' }}>معلومات اضافية</h5>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button
            className="btn btn-green"
            onClick={openModalOffer}
          >
            العروض
          </button>
          <button
            className="btn btn-green"
            onClick={openModalReviews}
          >
            التقييمات
          </button>
        </div>
      </div>

      {/* Carousel Modal */}
      {showCarousel && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowCarousel(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              maxWidth: '600px',
              width: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <img
                src={selectedImages[carouselIndex] || '/placeholder.svg'}
                alt="Carousel"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />
              <button
                onClick={handleCarouselPrev}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                السابق
              </button>
              <button
                onClick={handleCarouselNext}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                التالي
              </button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              {carouselIndex + 1} من {selectedImages.length}
            </div>
            <button
              onClick={() => setShowCarousel(false)}
              style={{
                width: '100%',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Offers Modal */}
      {showModalOffer && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowModalOffer(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '600px',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5 style={{ marginBottom: '20px', color: '#333' }}>العروض</h5>
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
            getOffers(id);
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
            <button
              onClick={() => setShowModalOffer(false)}
              style={{
                width: '100%',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Reviews Modal */}
      {showModalReviews && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowModalReviews(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '600px',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5 style={{ marginBottom: '20px', color: '#333' }}>التقييمات</h5>
            {reviews && reviews.length > 0 ? (
              <div>
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '10px',
                      borderBottom: '1px solid #ddd',
                      marginBottom: '10px',
                    }}
                  >
                    <p style={{ margin: '5px 0' }}>
                      <strong>المستخدم:</strong> {review.client?.name || '_'}
                    </p>
                    <p style={{ margin: '5px 0' }}>
                      <strong>التقييم:</strong> {review.rate || '_'} ⭐
                    </p>
                    <p style={{ margin: '5px 0' }}>
                      <strong>التعليق:</strong> {review.comment || '_'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>لا توجد تقييمات</p>
            )}
            <button
              onClick={() => setShowModalReviews(false)}
              style={{
                width: '100%',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showModalMsg && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowModalMsg(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              maxWidth: '500px',
              width: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5 style={{ marginBottom: '20px', color: '#333' }}>ارسال اشعار</h5>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMsg();
              }}
            >
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  العنوان
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={msgTitle}
                  onChange={(e) => setMsgTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  الرسالة
                </label>
                <textarea
                  className="form-control"
                  value={msgBody}
                  onChange={(e) => setMsgBody(e.target.value)}
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontFamily: 'Arial, sans-serif',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  ارسال
                </button>
                <button
                  type="button"
                  onClick={() => setShowModalMsg(false)}
                  style={{
                    flex: 1,
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  إغلاق
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showModalData && editedData && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            overflowY: 'auto',
          }}
          onClick={() => setShowModalData(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              maxWidth: '800px',
              width: '95%',
              margin: '20px 0',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5 style={{ marginBottom: '20px', color: '#333' }}>تعديل بيانات السائق</h5>
            <form
              onSubmit={handleEditSubmit}
              style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '10px' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    الاسم
                  </label>
                  <input
                    type="text"
                    value={editedData.name || ''}
                    onChange={(e) => handleEditChange('name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    الايميل
                  </label>
                  <input
                    type="email"
                    value={editedData.email || ''}
                    onChange={(e) => handleEditChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    ا��هاتف
                  </label>
                  <input
                    type="text"
                    value={editedData.phone || ''}
                    onChange={(e) => handleEditChange('phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    العمر
                  </label>
                  <input
                    type="number"
                    value={editedData.age || ''}
                    onChange={(e) => handleEditChange('age', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    العنوان
                  </label>
                  <input
                    type="text"
                    value={editedData.address || ''}
                    onChange={(e) => handleEditChange('address', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    رقم العربية
                  </label>
                  <input
                    type="text"
                    value={editedData.vehicleNumber || ''}
                    onChange={(e) => handleEditChange('vehicleNumber', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    لون العربية
                  </label>
                  <input
                    type="text"
                    value={editedData.vehicleColor || ''}
                    onChange={(e) => handleEditChange('vehicleColor', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    نوع العربية
                  </label>
                  <input
                    type="text"
                    value={editedData.vehicleType || ''}
                    onChange={(e) => handleEditChange('vehicleType', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  الوصف
                </label>
                <textarea
                  value={editedData.description || ''}
                  onChange={(e) => handleEditChange('description', e.target.value)}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    صورة الملف الشخصي
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange('profileImg', e.target.files)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    صور العربية
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange('vehiclesImgs', e.target.files)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    صور الهوية
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange('idCardImg', e.target.files)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    صور الرخصة
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange('licenseImg', e.target.files)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    صور رخصة العربية
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange('licenseVehicleImgs', e.target.files)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  حفظ التعديلات
                </button>
                <button
                  type="button"
                  onClick={() => setShowModalData(false)}
                  style={{
                    flex: 1,
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  إغلاق
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
