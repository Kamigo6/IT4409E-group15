import React, { useState } from 'react';
import axios from 'axios';
import { ReactComponent as IconPersonSquareFill } from "bootstrap-icons/icons/person-lines-fill.svg";

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
            console.log('Data successfully updated!');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <div className="card border-primary">
            <h6 className="card-header">
                <IconPersonSquareFill /> Profile Detail
            </h6>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Upload Avatar Image:
                        <input type="file" onChange={handleImageChange} />
                    </label>
                    <br />
                    Preview:
                    {imagePreview && (
                        <img src={imagePreview} alt="Avatar Preview" className="card-img-top rounded-0 img-fluid bg-secondary" />
                    )}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <label>
                            First Name:
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>
                    </li>
                    <li className="list-group-item">
                        <label>
                            Last Name:
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>
                    </li><li className="list-group-item">
                        <label>
                            Birthday:
                            <input
                                type="text"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </label></li><li className="list-group-item">
                        <label>
                            Email:
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label></li><li className="list-group-item">
                        <label>
                            Phone Number:
                            <input
                                type="text"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </label></li><li className="list-group-item">
                        <label>
                            Address:
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </label></li><li className="list-group-item">
                        <label>
                            District:
                            <input
                                type="text"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                        </label></li><li className="list-group-item">
                        <label>
                            City:
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </label></li><li className="list-group-item">
                        <label>
                            Country:
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </label></li><li className="list-group-item">
                        <button type="submit">Submit</button>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default CustomerForm;
