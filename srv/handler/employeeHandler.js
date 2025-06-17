const {
    string
} = require("@sap/cds/lib/core/classes");

module.exports = async (srv) => {
    srv.on('READ', 'employeeRecord', async (req) => {
        const queryResponse = await SELECT.from('employeeRecord')
        console.log("employeeRecord", queryResponse);
        queryResponse.dummy = "Testing";
        return queryResponse;
    })

    srv.before('CREATE', 'employeeRecord', async (req) => {
        try {
            let isMissingData = validateEmployeeRecord(req.data);
            if (!isMissingData.valid) {
                req.reject(isMissingData.errors)
            }
            let getLastEmpRecord = await SELECT.from('employeeRecord', ['empID']).orderBy('createdAt desc').limit(1);
            if(getLastEmpRecord.length === 0){
                let newEMPID = 'INX10001';
                req.data.empID = newEMPID
            }
            else{
                let newGeneratedEID = generateEmpId(getLastEmpRecord[0].empID);
                req.data.empID = newGeneratedEID
            }
           
        } catch (error) {
            req.reject(error)
        }

    })

    srv.on('CREATE', 'employeeRecord', async (req) => {
        console.log("User Data", req.data);

        let createEmp = await INSERT.into('employeeRecord').entries(req.data);
        return;
    })

    function generateEmpId(empID) {
        let intPart = empID.substring(3);
        console.log("Datat Type",typeof intPart);
        let newIntPart = parseInt(intPart) + 1
        
        return 'INX' + newIntPart;
    }

    function validateEmployeeRecord(data) {
        const errors = [];
        // Destructure properties
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            countryCode,
            dob,
            dateOfJoin,
            department,
            designation,
            salary,
            address,
            reportingManger
        } = data;
        // Helper functions
        const isString = val => typeof val === 'string';
        const isDate = val => !isNaN(Date.parse(val));
        const isNumber = val => typeof val === 'number' && !isNaN(val);
        // Validation
        if (!firstName || !isString(firstName) || firstName.length > 50) {
            errors.push('firstName is required, must be a string, max 50 characters.');
        }
        if (!lastName || !isString(lastName) || lastName.length > 50) {
            errors.push('lastName is required, must be a string, max 50 characters.');
        }
        if (!email || !isString(email) || email.length > 100 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('email is required, must be a valid email string, max 100 characters.');
        }
        if (!phoneNumber || !isString(phoneNumber) || phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
            errors.push('phoneNumber is required, must be a 10-digit numeric string.');
        }
        if (!countryCode || !isString(countryCode) || countryCode.length > 5 || !/^\+\d{1,4}$/.test(countryCode)) {
            errors.push('countryCode is required, must be a string starting with "+" followed by 1 to 4 digits, max 5 characters.');
        }
        if (!dateOfJoin || !isDate(dateOfJoin)) {
            errors.push('dateOfJoin is required, must be a valid date string.');
        }
        if (!department || !isString(department) || department.length > 50) {
            errors.push('department is required, must be a string, max 50 characters.');
        }
        if (!designation || !isString(designation) || designation.length > 50) {
            errors.push('designation is required, must be a string, max 50 characters.');
        }
        if (salary === undefined || !isNumber(salary) || salary < 0) {
            errors.push('salary is required, must be a non-negative number.');
        }
        if (!address || !isString(address)) {
            errors.push('address is required, must be a string.');
        }
        if (!reportingManger || !isString(reportingManger)) {
            errors.push('reportingManger is required, must be a string.');
        }
        return {
            valid: errors.length === 0,
            errors
        };
    }
}