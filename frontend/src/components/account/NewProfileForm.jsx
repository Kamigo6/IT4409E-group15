import React, { useState } from 'react';
import axios from 'axios';
import { ReactComponent as IconPersonSquareFill } from "bootstrap-icons/icons/person-lines-fill.svg";
import './ProfileForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerForm = () => {
    const [avatarImageUrl, setAvatarImageUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [imagePreview, setImagePreview] = useState('../../images/NO_IMG.png');
    const [message] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result;
            setAvatarImageUrl(base64Data);
            setImagePreview(base64Data);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the customer object
        const customer = {
            avatarImageUrl,
            firstName,
            lastName,
            birthday,
            email,
            mobileNumber,
            "location": {
                address,
                district,
                city,
                country
            }
        };

        console.log(JSON.stringify(customer.avatarImageUrl));

        try {
            const token = localStorage.getItem("token");
            const customerResponse = await axios.get("http://localhost:8000/customers/token", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await axios.patch(`http://localhost:8000/customers/${customerResponse.data._id}`, customer, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Profile successfully updated!');
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Fail to update profile!');
        }
    };

    return (
        <div className="card border-primary">
            <ToastContainer autoClose={3000} />
            <h6 className="card-header ">
                <IconPersonSquareFill /> Profile Detail
            </h6>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    {imagePreview && (
                        <div className="card-img-top rounded-0 bg-secondary mb-4">
                            <img src={imagePreview} alt="Avatar Preview" className="img-fluid card-img-content" />
                        </div>
                    )}
                    <div className="preview-container mb-4">
                        <label htmlFor="file-input" className="file-label">
                            Chọn ảnh
                            <input id="file-input" type="file" onChange={handleImageChange} className="file-input" />
                        </label>
                    </div>

                    <ProfileForm
                        firstName={firstName}
                        lastName={lastName}
                        birthday={birthday}
                        email={email}
                        mobileNumber={mobileNumber}
                        address={address}
                        district={district}
                        city={city}
                        country={country}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        setBirthday={setBirthday}
                        setEmail={setEmail}
                        setMobileNumber={setMobileNumber}
                        setAddress={setAddress}
                        setDistrict={setDistrict}
                        setCity={setCity}
                        setCountry={setCountry}
                        message={message}
                    />
                </div>
                <br></br>
                <div className="submit-button-container">
                    <button type="submit" className="submit-button">Submit</button>
                </div>
                <br></br>
            </form>
        </div>
    );
};

const ProfileForm = (props) => {
    const {
        firstName,
        lastName,
        birthday,
        email,
        mobileNumber,
        address,
        district,
        city,
        country,
        setFirstName,
        setLastName,
        setBirthday,
        setEmail,
        setMobileNumber,
        setAddress,
        setDistrict,
        setCity,
        setCountry,
    } = props;

    return (
        <table className="form-table">
            <tbody>
                <tr>
                    <td>
                        <label>First Name:</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="input-field"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Last Name:</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="input-field"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Birthday:</label>
                    </td>
                    <td>
                        <input
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            className="input-field"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Email:</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Phone Number:</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="input-field"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Address:</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="input-field"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>District:</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="input-field"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>City:</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="input-field"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Country:</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="input-field"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default CustomerForm;
