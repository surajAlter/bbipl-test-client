import React, { useState } from 'react';
import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER_URL;

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        countryCode: '',
        gender: '',
        dob: '',
    });

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleEmployeeChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('employeeDetails', JSON.stringify(employee));

        try {
            setUploadStatus('Uploading...');
            const response = await axios.post(`${serverURL}/api/upload-users-details`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadStatus('Upload successful!');
            console.log('Server Response:', response.data);
        } catch (error) {
            setUploadStatus('Upload failed.');
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Upload File</h1>
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-4 block"
            />
            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
                Upload
            </button>
            {uploadStatus && (
                <p className="mt-4 text-gray-700">{uploadStatus}</p>
            )}

            <h2 className="text-2xl font-bold mt-8 mb-4">Employee Details</h2>
            <div className='md:grid md:grid-cols-4 space-y-5 space-x-4 bg-zinc-200 p-5 rounded-lg text-zinc-600 text-lg'>
                <label className='col-span-2 mt-5 ml-4'>
                    Employee Name
                    <div className='flex space-x-5 mt-1 w-full'>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={employee.firstName}
                            onChange={handleEmployeeChange}
                            required
                            className='w-full'
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={employee.lastName}
                            onChange={handleEmployeeChange}
                            required
                            className='w-full'
                        />
                    </div>
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleEmployeeChange}
                        required
                        className="block mb-2 mt-1 w-full"
                    />
                </label>
                <label>
                    Mobile
                    <input
                        type="text"
                        name="mobile"
                        value={employee.mobile}
                        onChange={handleEmployeeChange}
                        required
                        className="block mb-2 mt-1 w-full"
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={employee.password}
                        onChange={handleEmployeeChange}
                        required
                        className="block mb-2 mt-1 w-full"
                    />
                </label>
                <label>
                    Country Code
                    <input
                        type="text"
                        name="countryCode"
                        value={employee.countryCode}
                        onChange={handleEmployeeChange}
                        required
                        className="block mb-2 mt-1 w-full"
                    />
                </label>
                <label>
                    Gender
                    <select
                        name="gender"
                        value={employee.gender}
                        onChange={handleEmployeeChange}
                        required
                        className="block mb-2 mt-1 w-full"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                <label>
                    Date of Birth
                    <input
                        type="date"
                        name="dob"
                        value={employee.dob}
                        onChange={handleEmployeeChange}
                        required
                        className="block mb-2 mt-1 w-full"
                    />
                </label>
            </div>

            {/* <div className='w-full text-center'> */}
            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 mt-4 w-full"
            >
                Submit
            </button>
            {/* </div> */}
        </div>
    );
};

export default FileUpload;
