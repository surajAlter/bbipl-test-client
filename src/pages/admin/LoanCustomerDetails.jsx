import React from "react";

export default function CustomerDetails({ customer, onBack }) {
    // Scroll to the top when the component mounts
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    // Format the date and time
    const formatDate = (date) => {
        date = new Date(date);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    };

    const formatTime = (time) => {
        time = new Date(time);
        return time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
    };

    const printDiv = () => {
        // window.print();
        // Step 1: Get the content of the div
        const printableElement = document.getElementById('printableArea').innerHTML;

        // Step 2: Open a new window
        const printWindow = window.open('', '', 'height=500,width=800');

        // Step 3: Write the content to the new window
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<style>body { font-family: Arial, sans-serif; }</style>'); // Optional: Add styles
        printWindow.document.write('</head><body>');
        printWindow.document.write(printableElement); // Add the content
        printWindow.document.write('</body></html>');

        // Step 4: Close the document and trigger the print dialog
        printWindow.document.close();
        printWindow.print();
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full bg-zinc-200 shadow-lg rounded-lg p-8">
                <div id="printableArea">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Filled Form Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-stretch">
                        {/* Customer Name */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Customer Name</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.customerName}</p>
                        </div>

                        {/* Date of Birth */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.dateOfBirth}</p>
                        </div>

                        {/* Mobile */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Mobile</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.mobile}</p>
                        </div>

                        {/* Current Address */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Current Address</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">
                                {customer.currentAddress?.houseFlatNo}, {customer.currentAddress?.streetName}, {customer.currentAddress?.city}, {customer.currentAddress?.state}, {customer.currentAddress?.country} - {customer.currentAddress?.pinCode}
                            </p>
                        </div>

                        {/* Years at Present Address */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Years at Present Address</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.yearsPresent}</p>
                        </div>

                        {/* Years in City */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Years in City</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.yearsCity}</p>
                        </div>

                        {/* Rental Status */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Rental Status</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">
                                {customer.rentalStatus === "Y" ? "Renting" : "Not Renting"}
                            </p>
                        </div>

                        {/* Rental Amount */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Rental Amount</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.rentalAmount || "N/A"}</p>
                        </div>

                        {/* Marital Status */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Marital Status</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">
                                {customer.maritalStatus === "Y" ? "Married" : "Single"}
                            </p>
                        </div>

                        {/* Spouse Name */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Spouse Name</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.spouseName || "N/A"}</p>
                        </div>

                        {/* Office Name */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Office Name</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.officeName}</p>
                        </div>

                        {/* Office Address */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Office Address</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">
                                {customer.officeAddress?.houseFlatNo}, {customer.officeAddress?.streetName}, {customer.officeAddress?.city}, {customer.officeAddress?.state}, {customer.officeAddress?.country} - {customer.officeAddress?.pinCode}
                            </p>
                        </div>

                        {/* Years Employed */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Years Employed</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.yearsEmployed}</p>
                        </div>

                        {/* Total Years Employed */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Total Years Employed</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.yearsTotalEmployed}</p>
                        </div>

                        {/* Bank Details */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Bank Details</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">
                                {customer.bankDetails?.name}, {customer.bankDetails?.branch} - {customer.bankDetails?.acNo}
                            </p>
                        </div>

                        {/* Loan Amount */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Loan Amount</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">₹{customer.loanAmount}</p>
                        </div>

                        {/* Relative Name */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Relative Name</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.relativeName}</p>
                        </div>

                        {/* Relative Mobile */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Relative Mobile</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.relativeMobile}</p>
                        </div>

                        {/* Relative Address */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Relative Address</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">
                                {customer.relativeAddress?.houseFlatNo}, {customer.relativeAddress?.streetName}, {customer.relativeAddress?.city}, {customer.relativeAddress?.state}, {customer.relativeAddress?.country} - {customer.relativeAddress?.pinCode}
                            </p>
                        </div>

                        {/* Friend Name */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Friend Name</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.friendName}</p>
                        </div>

                        {/* Friend Mobile */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Friend Mobile</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">{customer.friendMobile}</p>
                        </div>

                        {/* Friend Address */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-600">Friend Address</label>
                            <p className="mt-1 text-lg text-gray-900 font-semibold">
                                {customer.friendAddress?.houseFlatNo}, {customer.friendAddress?.streetName}, {customer.friendAddress?.city}, {customer.friendAddress?.state}, {customer.friendAddress?.country} - {customer.friendAddress?.pinCode}
                            </p>
                        </div>
                    </div>

                    <p className="text-right mt-4">{`Date of submission: ${formatDate(customer.createdAt)} at ${formatTime(customer.createdAt)}`}</p>

                </div>

                {/* Back to List Button */}
                <div className="mt-8 text-center space-x-4">
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        onClick={() => {
                            onBack();
                            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top
                        }}
                    >
                        Back to List
                    </button>
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        onClick={printDiv}
                    >
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
}