import React, { useState, useEffect, lazy } from "react";

const ProfileForm = lazy(() => import("../../components/account/ProfileForm"));
const NewProfileForm = lazy(() => import("../../components/account/NewProfileForm"));
const ChangePasswordForm = lazy(() => import("../../components/account/ChangePasswordForm"));
const SettingForm = lazy(() => import("../../components/account/SettingForm"));
const CardListForm = lazy(() => import("../../components/account/CardListForm"));

const MyProfileView = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const onSubmitProfile = async (values) => {
    console.log('a');
  };

  const onSubmitChangePassword = async (values) => {
    alert(JSON.stringify(values));
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
          <ChangePasswordForm onSubmit={onSubmitChangePassword} />
          <br />
          <SettingForm />
          <br />
          <CardListForm />
        </div>
      </div>
    </div>
  );
};

export default MyProfileView;
