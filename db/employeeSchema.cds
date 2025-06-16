namespace employeeDb;

entity employeeRecord  {
    firstName : String(50);
    lastName : String(50);
    key email : String(100);
    phoneNumber : String(10);
    countryCode :String(5);
    dob : Date;
    dateOfJoin : Date;
    department : String(50);
    designation : String(50);
    salary : Double;
    address : String;
}

