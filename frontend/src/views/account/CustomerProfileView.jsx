import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const CustomerProfile = () => {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchCustomer = async () => {
            try {
                const response = await fetch('http://localhost:8000/customers/token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const customerData = await response.json();
                    setCustomer(customerData);
                } else {
                    console.error('Failed to fetch customer information');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCustomer();
    }, []);

    if (!customer) {
        return <div>Loading...</div>;
    }

    const {
        username,
        isAdmin,
        firstName,
        lastName,
        avatarImageUrl,
        mobileNumber,
        email,
        birthday,
        location,
        shippingInformation,
        paymentMethods
    } = customer;

    return (
        <div className="container">
            <h2 className="mb-4">Customer Profile</h2>
            <div className="row">
                <div className="col-md-4">
                    <img src={avatarImageUrl} alt="Avatar" className="img-fluid rounded" style={{ maxHeight: '200px' }} />
                </div>
                <div className="col-md-8">
                    <p>Username: {username}</p>
                    <p>Birthday: {birthday}</p>
                    <p>First Name: {firstName}</p>
                    <p>Last Name: {lastName}</p>
                    <p>Mobile Number: {mobileNumber}</p>
                    <p>Email: {email}</p>
                    <p>
                        <Link to="/account/profile/edit">
                            <button type="button" class="btn btn-secondary">Edit Profile</button>
                        </Link>
                    </p>
                    {isAdmin && <p><button type="button" class="btn btn-danger">Go to Administrator panel</button></p>}
                </div>
            </div>
            <h3 className="mt-4">Location</h3>
            <p>Address: {location.address}</p>
            <p>District: {location.district}</p>
            <p>City: {location.city}</p>
            <h3 className="mt-4">Shipping Information</h3>
            {shippingInformation.map((info, index) => (
                <div key={index}>
                    <p>Shipping #{index + 1}</p>
                    <p>First Name: {info.firstName}</p>
                    <p>Last Name: {info.lastName}</p>
                    <p>Address: {info.address}</p>
                    <p>District: {info.district}</p>
                    <p>City: {info.city}</p>
                </div>
            ))}
            <h3 className="mt-4">Payment Methods</h3>
            {paymentMethods.map((method, index) => (
                <div key={index}>
                    <p>Payment Method #{index + 1}</p>
                    <p>Card Number: {method.cardNumber}</p>
                    <p>Name on Card: {method.nameOnCard}</p>
                    <p>Expiration Month: {method.expirationMonth}</p>
                    <p>Expiration Year: {method.expirationYear}</p>
                </div>
            ))}
        </div>
    );
};

export default CustomerProfile;
