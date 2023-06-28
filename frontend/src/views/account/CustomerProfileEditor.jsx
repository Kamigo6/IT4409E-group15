import React, { useState, useEffect, lazy } from "react";
import { useLocation } from "react-router-dom";

const ProfileForm = lazy(() => import("../../components/account/ProfileForm"));
const NewProfileForm = lazy(() => import("../../components/account/NewProfileForm"));
const ChangePasswordForm = lazy(() => import("../../components/account/ChangePasswordForm"));
const NewChangePasswordForm = lazy(() => import("../../components/account/NewChangePasswordForm"));
const SettingForm = lazy(() => import("../../components/account/SettingForm"));
const CardListForm = lazy(() => import("../../components/account/CardListForm"));
const ShippingInformationForm = lazy(() => import("../../components/account/ShippingInformationForm"));

const MyProfileView = () => {
  const { state: customer } = useLocation();
  const [imagePreview, setImagePreview] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const onSubmitProfile = async (values) => {
    console.log('a');
  };

  const onImageChange = async (obj) => {
    if (obj) {
      const val = await getBase64(obj);
      setImagePreview(val);
    } else {
      setImagePreview("");
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-md-4">
          <NewProfileForm
            onSubmit={onSubmitProfile}
            onImageChange={onImageChange}
            imagePreview={imagePreview}
          />
        </div>
        <div className="col-md-8">
          <NewChangePasswordForm customer={customer}/>
          <br />
          <ShippingInformationForm customer={customer}/>
          <br />
          <CardListForm customer={customer}/>
          <br />
          <SettingForm />
        </div>
      </div>
    </div>
  );
};

export default MyProfileView;
