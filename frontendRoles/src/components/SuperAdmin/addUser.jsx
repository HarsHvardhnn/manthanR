import React, { useState } from 'react';
import axios from 'axios';

const generateRandomPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength = 8;
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
};

const UserForm = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        lastname: '',
        email: '',
        password: generateRandomPassword()
    });

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddUser = e => {
        e.preventDefault();
        setUsers([...users, formData]);
        setFormData({
            username: '',
            lastname: '',
            email: '',
            password: generateRandomPassword()
        });
    };
    const handleUploadToDatabase = async () => {
        try {
            const formData = new FormData();
            users.forEach((user, index) => {
                formData.append(`users[${index}][username]`, user.username);
                formData.append(`users[${index}][lastname]`, user.lastname);
                formData.append(`users[${index}][email]`, user.email);
                formData.append(`users[${index}][password]`, user.password);
            });
    
            const response = await axios.post('http://localhost:3030/v1/add-users', {formData}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status !== 201) {
                throw new Error('Failed to upload users to database');
            }
    
            console.log('Users uploaded to database successfully');
            setUsers([]); // Clear the users array after uploading to database
        } catch (error) {
            console.error('Error uploading users to database:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={handleAddUser} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                        Lastname
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <span className="text-gray-600 text-sm">Automatically generated</span>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                    >
                        Add Other User
                    </button>
                </div>
            </form>
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Users List</h2>
                <ul>
                    {users.map((user, index) => (
                        <li key={index} className="mb-2">
                            <span className="font-semibold">Username:</span> {user.username},{' '}
                            <span className="font-semibold">Lastname:</span> {user.lastname},{' '}
                            <span className="font-semibold">Email:</span> {user.email},{' '}
                            <span className="font-semibold">Password:</span> {user.password}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center justify-center mt-4">
                <button
                    onClick={handleUploadToDatabase}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Upload to Database
                </button>
            </div>
        </div>
    );
};

export default UserForm;
