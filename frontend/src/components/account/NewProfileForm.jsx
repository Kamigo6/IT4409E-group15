import React, { useState } from 'react';
import axios from 'axios';
import { ReactComponent as IconPersonSquareFill } from "bootstrap-icons/icons/person-lines-fill.svg";
import './ProfileForm.css';

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
    const [message, setMessage] = useState(null);

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
            setMessage('Profile successfully updated!');
        } catch (error) {
            console.error('Error updating data:', error);
            setMessage('Fail to update profile!');
        }
    };

    return (
        <div className="card border-primary">
            <h6 className="card-header ">
                <IconPersonSquareFill /> Profile Detail
            </h6>
            <form onSubmit={handleSubmit}>
                <div>
                    {imagePreview && (
                        <img src={imagePreview} alt="Avatar Preview" className="card-img-top rounded-0 img-fluid bg-secondary mb-4" />
                    )}
                    <div className="preview-container mb-4">
                    <label>
                        <input type="file" onChange={handleImageChange} />
                    </label>
                    </div>
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
                    handleSubmit={handleSubmit}
                    message={message}
                />
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
        message
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
                {message && (<tr><td>{message}</td></tr>)}
                <tr>
                    <td colSpan="2" className="submit-button-container">
                        <button type="submit" className="submit-button">Submit</button>
                    </td>

                </tr>
            </tbody>
        </table>
    );
};

export default CustomerForm;
