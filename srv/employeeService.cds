using { employeeDb } from '../db/employeeSchema';

service leaveManagementSRV {
    entity employeeRecord as projection on employeeDb.employeeRecord;
}
