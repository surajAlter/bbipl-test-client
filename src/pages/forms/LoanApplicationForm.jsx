import { useState } from 'react';
import axios from 'axios';

export default function LoanApplicationForm() {
    const [maritalStatus, setMaritalStatus] = useState("N");
    const [showSpouseInfo, setShowSpouseInfo] = useState(false);
    const [rentalStatus, setRentalStatus] = useState("N");
    const [showRentalInfo, setShowRentalInfo] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formObject = {};

        formData.forEach((value, key) => {
            // Skip empty values (optional)
            if (value === "") return;

            // Convert numeric fields to numbers
            if (
                key === "yearsPresent" ||
                key === "yearsCity" ||
                key === "loanAmount" ||
                key === "salary" ||
                key === "rentalAmount" ||
                key === "yearsEmployed" ||
                key === "yearsTotalEmployed"
            ) {
                value = isNaN(value) ? value : Number(value);
            }

            // Handle address fields
            if (key.startsWith("currentAddress")) {
                formObject.currentAddress = formObject.currentAddress || {};
                let fieldName = key.replace("currentAddress", "");
                fieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
                formObject.currentAddress[fieldName] = value;
            } else if (key.startsWith("permanentAddress")) {
                formObject.permanentAddress = formObject.permanentAddress || {};
                let fieldName = key.replace("permanentAddress", "");
                fieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
                formObject.permanentAddress[fieldName] = value;
            } else if (key.startsWith("officeAddress")) {
                formObject.officeAddress = formObject.officeAddress || {};
                let fieldName = key.replace("officeAddress", "");
                fieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
                formObject.officeAddress[fieldName] = value;
            } else if (key.startsWith("relativeAddress")) {
                formObject.relativeAddress = formObject.relativeAddress || {};
                let fieldName = key.replace("relativeAddress", "");
                fieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
                formObject.relativeAddress[fieldName] = value;
            } else if (key.startsWith("friendAddress")) {
                formObject.friendAddress = formObject.friendAddress || {};
                let fieldName = key.replace("friendAddress", "");
                fieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
                formObject.friendAddress[fieldName] = value;
            } else if (key.startsWith("bank")) {
                formObject.bankDetails = formObject.bankDetails || {};
                let fieldName = key.replace("bank", "");
                fieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
                formObject.bankDetails[fieldName] = value;
            } else {
                // Non-address fields
                formObject[key] = value;
            }
        });

        console.log(formObject);

        // Send form data to the server
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/loan-forms`, formObject, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Reset the form fields
                e.target.reset();

                // Reset conditional fields' state
                setMaritalStatus("N");
                setShowSpouseInfo(false);
                setRentalStatus("N");
                setShowRentalInfo(false);

                // Show success alert
                alert('Form submitted successfully!');
            } else {
                // Show error alert if the response is not OK
                alert('Failed to submit form!');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Show error alert if there's an exception
            alert('Error submitting form!');
        }
    };

    return (
        <div className="min-h-screen p-4 bg">
            <div className="max-w-3xl mx-auto bg-zinc-200 p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-center mb-6">Loan Application Form</div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Details */}
                    <div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
                                <input id="customerName" name="customerName" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <input id="dateOfBirth" name="dateOfBirth" type="date" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father's Name</label>
                                <input id="fatherName" name="fatherName" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">Mother's Maiden Name</label>
                                <input id="motherName" name="motherName" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Contact Details */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <input id="mobile" name="mobile" type="tel" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone (Landline)</label>
                                <input id="telephone" name="telephone" type="tel" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="mt-2 space-y-2">
                            <h3 className="text-sm font-medium">Current Address</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    {/* <label htmlFor="houseFlatNo" className="block text-sm font-medium text-gray-700">House/Flat No.</label> */}
                                    <input id="houseFlatNo" name="currentAddressHouseFlatNo" className="w-full p-2 border border-gray-300 rounded-md" placeholder='House/Flat No.' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="buildingName" className="block text-sm font-medium text-gray-700">Building Name</label> */}
                                    <input id="buildingName" name="currentAddressBuildingName" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Building Name' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="streetName" className="block text-sm font-medium text-gray-700">Street Name</label> */}
                                    <input id="streetName" name="currentAddressStreetName" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Street Name' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label> */}
                                    <input id="area" name="currentAddressArea" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Area' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label> */}
                                    <input id="city" name="currentAddressCity" className="w-full p-2 border border-gray-300 rounded-md" placeholder='City' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label> */}
                                    <input id="state" name="currentAddressState" className="w-full p-2 border border-gray-300 rounded-md" placeholder='State' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">PIN Code</label> */}
                                    <input id="pinCode" name="currentAddressPinCode" className="w-full p-2 border border-gray-300 rounded-md" placeholder='PIN Code' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label> */}
                                    <input id="country" name="currentAddressCountry" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Country' required />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="yearsPresent" className="block text-sm font-medium text-gray-700">Years at Present Address</label>
                                <input id="yearsPresent" name="yearsPresent" type="number" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="yearsCity" className="block text-sm font-medium text-gray-700">Years in City</label>
                                <input id="yearsCity" name="yearsCity" type="number" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                        </div>

                        {/* Rental Status */}
                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="rentalStatus" className="block text-sm font-medium text-gray-700">
                                        Rental Status
                                    </label>
                                    <select
                                        name="rentalStatus"
                                        id="rentalStatus"
                                        value={rentalStatus}
                                        onChange={(e) => { setRentalStatus(e.target.value); setShowRentalInfo(e.target.value === "Y") }}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="N">Not Renting</option>
                                        <option value="Y">Renting</option>
                                    </select>
                                </div>
                                {showRentalInfo && (
                                    <div className="space-y-2">
                                        <label htmlFor="rentalAmount" className="block text-sm font-medium text-gray-700">
                                            Monthly Rental Amount
                                        </label>
                                        <input
                                            id="rentalAmount"
                                            name="rentalAmount"
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                )}
                            </div>
                            {showRentalInfo && (
                                <div
                                    className="transition-all transform opacity-0 duration-1000 ease-out"
                                    style={{
                                        transform: showRentalInfo ? "translateY(0)" : "translateY(-20px)",
                                        opacity: showRentalInfo ? 1 : 0,
                                    }}
                                >
                                    <div className="space-y-4 mt-2">
                                        <h3 className="text-sm font-medium">Permanent Address</h3>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                {/* <label htmlFor="permanentHouseFlatNo" className="block text-sm font-medium text-gray-700">House/Flat No.</label> */}
                                                <input id="permanentHouseFlatNo" name="permanentAddressHouseFlatNo" className="w-full p-2 border border-gray-300 rounded-md" placeholder='House/Flat No.' required />
                                            </div>
                                            <div className="space-y-2">
                                                {/* <label htmlFor="permanentBuildingName" className="block text-sm font-medium text-gray-700">Building Name</label> */}
                                                <input id="permanentBuildingName" name="permanentAddressBuildingName" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Building Name' />
                                            </div>
                                            <div className="space-y-2">
                                                {/* <label htmlFor="permanentStreetName" className="block text-sm font-medium text-gray-700">Street Name</label> */}
                                                <input id="permanentStreetName" name="permanentAddressStreetName" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Street Name' required />
                                            </div>
                                            <div className="space-y-2">
                                                {/* <label htmlFor="permanentArea" className="block text-sm font-medium text-gray-700">Area</label> */}
                                                <input id="permanentArea" name="permanentAddressArea" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Area' required />
                                            </div>
                                            <div className="space-y-2">
                                                {/* <label htmlFor="permanentCity" className="block text-sm font-medium text-gray-700">City</label> */}
                                                <input id="permanentCity" name="permanentAddressCity" className="w-full p-2 border border-gray-300 rounded-md" placeholder='City' required />
                                            </div>
                                            <div className="space-y-2">
                                                {/* <label htmlFor="permanentState" className="block text-sm font-medium text-gray-700">State</label> */}
                                                <input id="permanentState" name="permanentAddressState" className="w-full p-2 border border-gray-300 rounded-md" placeholder='State' required />
                                            </div>
                                            <div className="space-y-2">
                                                {/* <label htmlFor="permanentPinCode" className="block text-sm font-medium text-gray-700">PIN Code</label> */}
                                                <input id="permanentPinCode" name="permanentAddressPinCode" className="w-full p-2 border border-gray-300 rounded-md" placeholder='PIN Code' required />
                                            </div>
                                            <div className="space-y-2">
                                                {/* <label htmlFor="permanentCountry" className="block text-sm font-medium text-gray-700">Country</label> */}
                                                <input id="permanentCountry" name="permanentAddressCountry" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Country' required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Marital Status */}
                    <div className="space-y-4">
                        <div className="mt-2 grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">Marital Status</label>
                                <select
                                    name="maritalStatus"
                                    id="maritalStatus"
                                    value={maritalStatus}
                                    onChange={e => { setMaritalStatus(e.target.value); setShowSpouseInfo(e.target.value === "Y") }}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="N">Single</option>
                                    <option value="Y">Married</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="dependents" className="block text-sm font-medium text-gray-700">Dependents</label>
                                <select name="dependents" className="w-full p-2 border border-gray-300 rounded-md">
                                    <option value="N">No</option>
                                    <option value="Y">Yes</option>
                                </select>
                            </div>
                        </div>

                        {/* Spouse Information - only shows if married */}
                        {showSpouseInfo && (
                            <div
                                className="transition-transform transform translate-y-10 opacity-0 duration-1000 ease-out"
                                style={{
                                    transform: showSpouseInfo ? "translateY(0)" : "translateY(-20px)",
                                    opacity: showSpouseInfo ? 1 : 0,
                                }}
                            >
                                <div className="mt-2 grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="spouseName" className="block text-sm font-medium text-gray-700">
                                            Spouse's Name
                                        </label>
                                        <input
                                            id="spouseName"
                                            name="spouseName"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="spouseDob" className="block text-sm font-medium text-gray-700">
                                            Spouse's Date of Birth
                                        </label>
                                        <input
                                            id="spouseDob"
                                            name="spouseDob"
                                            type="date"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Employment Details */}
                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="officeName" className="block text-sm font-medium text-gray-700">Office Name</label>
                                <input id="officeName" name="officeName" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="officePhone" className="block text-sm font-medium text-gray-700">Telephone No./Landline (Office)</label>
                                <input id="officePhone" name="officePhone" type="tel" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">Office Address</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    {/* <label htmlFor="officeHouseFlatNo" className="block text-sm font-medium text-gray-700">House/Flat No.</label> */}
                                    <input id="officeHouseFlatNo" name="officeAddressHouseFlatNo" className="w-full p-2 border border-gray-300 rounded-md" placeholder='House/Flat No.' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="officeBuildingName" className="block text-sm font-medium text-gray-700">Building Name</label> */}
                                    <input id="officeBuildingName" name="officeAddressBuildingName" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Building Name' />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="officeStreetName" className="block text-sm font-medium text-gray-700">Street Name</label> */}
                                    <input id="officeStreetName" name="officeAddressStreetName" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Street Name' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="officeArea" className="block text-sm font-medium text-gray-700">Area</label> */}
                                    <input id="officeArea" name="officeAddressArea" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Area' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="officeCity" className="block text-sm font-medium text-gray-700">City</label> */}
                                    <input id="officeCity" name="officeAddressCity" className="w-full p-2 border border-gray-300 rounded-md" placeholder='City' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="officeState" className="block text-sm font-medium text-gray-700">State</label> */}
                                    <input id="officeState" name="officeAddressState" className="w-full p-2 border border-gray-300 rounded-md" placeholder='State' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="officePinCode" className="block text-sm font-medium text-gray-700">PIN Code</label> */}
                                    <input id="officePinCode" name="officeAddressPinCode" className="w-full p-2 border border-gray-300 rounded-md" placeholder='PIN Code' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="officeCountry" className="block text-sm font-medium text-gray-700">Country</label> */}
                                    <input id="officeCountry" name="officeAddressCountry" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Country' required />
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 mt-2">
                            <div className="space-y-2">
                                <label htmlFor="yearsEmployed" className="block text-sm font-medium text-gray-700">Years at Present Job</label>
                                <input id="yearsEmployed" name="yearsEmployed" type="number" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="yearsTotalEmployed" className="block text-sm font-medium text-gray-700">Years at Total Job Experience</label>
                                <input id="yearsTotalEmployed" name="yearsTotalEmployed" type="number" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                        </div>
                    </div>

                    {/* Bank Details */}
                    <div className="space-y-4">
                        <h3 className="font-medium">Banking</h3>
                        <div className="space-y-2">
                            {/* <label htmlFor="bankDetails" className="block text-sm font-medium text-gray-700">Bank Details (Name/A/c No./Branch)</label>
                            <input id="bankDetails" name="bankDetails" className="w-full p-2 border border-gray-300 rounded-md" required /> */}

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    {/* <label htmlFor="relativeName" className="block text-sm font-medium text-gray-700"  required>Name</label> */}
                                    <input id="bankName" name="bankName" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Bank Name' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="relativeMobile" className="block text-sm font-medium text-gray-700">A</label> */}
                                    <input id="bankBranch" name="bankBranch" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Branch Name' required />
                                </div>
                                <div className="space-y-2">
                                    {/* <label htmlFor="relativeMobile" className="block text-sm font-medium text-gray-700">A</label> */}
                                    <input id="bankAcNo" name="bankAcNo" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Bank A/c No.' required />
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 mt-2">
                            <div className="space-y-2">
                                <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">Amount Required</label>
                                <input id="loanAmount" name="loanAmount" type="number" className="w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                        </div>
                    </div>

                    {/* References */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">References</h3>
                        {/* Relative */}
                        <div className="space-y-4">
                            <p className="font-medium">Relative Details</p>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="relativeName" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input id="relativeName" name="relativeName" className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="relativeMobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input id="relativeMobile" name="relativeMobile" type="tel" className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                            </div>
                            <div className="space-y-2 mt-2">
                                <h3 className="text-sm font-medium">Relative Address</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        {/* <label htmlFor="relativeHouseFlatNo" className="block text-sm font-medium text-gray-700">House/Flat No.</label> */}
                                        <input id="relativeHouseFlatNo" name="relativeAddressHouseFlatNo" className="w-full p-2 border border-gray-300 rounded-md" placeholder='House/Flat No.' required />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="relativeBuildingName" className="block text-sm font-medium text-gray-700">Building Name</label> */}
                                        <input id="relativeBuildingName" name="relativeAddressBuildingName" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Building Name' />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="relativeStreetName" className="block text-sm font-medium text-gray-700">Street Name</label> */}
                                        <input id="relativeStreetName" name="relativeAddressStreetName" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Street Name' required />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="relativeArea" className="block text-sm font-medium text-gray-700">Area</label> */}
                                        <input id="relativeArea" name="relativeAddressArea" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Area' required />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="relativeCity" className="block text-sm font-medium text-gray-700">City</label> */}
                                        <input id="relativeCity" name="relativeAddressCity" className="w-full p-2 border border-gray-300 rounded-md" placeholder='City' required />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="relativeState" className="block text-sm font-medium text-gray-700">State</label> */}
                                        <input id="relativeState" name="relativeAddressState" className="w-full p-2 border border-gray-300 rounded-md" placeholder='State' required />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="relativePinCode" className="block text-sm font-medium text-gray-700">PIN Code</label> */}
                                        <input id="relativePinCode" name="relativeAddressPinCode" className="w-full p-2 border border-gray-300 rounded-md" placeholder='PIN Code' required />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="relativeCountry" className="block text-sm font-medium text-gray-700">Country</label> */}
                                        <input id="relativeCountry" name="relativeAddressCountry" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Country' required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Friend */}
                        <div className="space-y-4 mt-4">
                            <p className="font-medium">Friend Details</p>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="friendName" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input id="friendName" name="friendName" className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="friendMobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input id="friendMobile" name="friendMobile" type="tel" className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                            </div>
                            <div className="space-y-2 mt-2">
                                <h3 className="text-sm font-medium">Friend Address</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        {/* <label htmlFor="friendHouseFlatNo" className="block text-sm font-medium text-gray-700">House/Flat No.</label> */}
                                        <input id="friendHouseFlatNo" name="friendAddressHouseFlatNo" className="w-full p-2 border border-gray-300 rounded-md" placeholder='House/Flat No.' required />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="friendBuildingName" className="block text-sm font-medium text-gray-700">Building Name</label> */}
                                        <input id="friendBuildingName" name="friendAddressBuildingName" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Building Name' />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="friendStreetName" className="block text-sm font-medium text-gray-700">Street Name</label> */}
                                        <input id="friendStreetName" name="friendAddressStreetName" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Street Name' required />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="friendArea" className="block text-sm font-medium text-gray-700">Area</label> */}
                                        <input id="friendArea" name="friendAddressArea" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Area' required />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="friendCity" className="block text-sm font-medium text-gray-700">City</label> */}
                                        <input id="friendCity" name="friendAddressCity" className="w-full p-2 border border-gray-300 rounded-md" placeholder='City' required />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="friendState" className="block text-sm font-medium text-gray-700">State</label> */}
                                        <input id="friendState" name="friendAddressState" className="w-full p-2 border border-gray-300 rounded-md" placeholder='State' required />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="friendPinCode" className="block text-sm font-medium text-gray-700">PIN Code</label> */}
                                        <input id="friendPinCode" name="friendAddressPinCode" className="w-full p-2 border border-gray-300 rounded-md" placeholder='PIN Code' required />
                                    </div>
                                    <div className="space-y-2">
                                        {/* <label htmlFor="friendCountry" className="block text-sm font-medium text-gray-700">Country</label> */}
                                        <input id="friendCountry" name="friendAddressCountry" className="w-full p-2 border border-gray-300 rounded-md" placeholder='Country' required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
}