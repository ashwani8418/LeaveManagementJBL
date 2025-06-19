sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/ui/model/Model",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/BusyIndicator"
], (BaseController, Fragment, Model, JSONModel, MessageToast, BusyIndicator) => {
  "use strict";

  return BaseController.extend("com.ingenx.leavemanagementui.controller.employeeRecord", {
    onInit() {
      let employeeRecord = {
        // firstName: "", // String(50)
        // lastName: "", // String(50)
        // email: "", // String(100)
        // phoneNumber: "", // String(10)
        // countryCode: "", // String(5)
        // dob: null, // Date
        // dateOfJoin: null, // Date
        // department: "HR", // String(50)
        // designation: "", // String(50)
        // salary: 0, // Double
        // address: "", // String
        // reportingManger: "" // String
        "firstName": "Liam",
        "lastName": "hernandez",
        "email": "hernandez.hernandez@example.com",
        "phoneNumber": "9012345678",
        "countryCode": "+1",
        "dob": "1987-04-04",
        "dateOfJoin": "2019-02-02",
        "department": "HR",
        "designation": "T1",
        "salary": 90000.00,
        "address": "357 Fir St, Springfield, IL",
        "reportingManger": "Michael Smith"
      };

      

      let employeeJSONModel = new JSONModel(employeeRecord);
      this.getView().setModel(employeeJSONModel, "empRecord");

    },

    onPressAddEmployee: async function () {
      let oDialog = this.getView().byId("IdHMAddEmp");
      if (!oDialog) {
        oDialog = await Fragment.load({
          id: this.getView().getId(),
          name: "com.ingenx.leavemanagementui.fragments.addEmployee",
          controller: this.getView().getController()
        });
        this.getView().addDependent(oDialog);
      }
      oDialog.open();
    },

    onPressCloseDialog: function () {
      let oDialog = this.getView().byId("IdHMAddEmp");
      if (oDialog) {
        oDialog.close();
      }
      return;
    },

    onPressSubmitRecord: async function () {
      debugger
      // let sFirstName = this.getView().byId("IdHMInpFirstName").getValue();
      // let sLastName = this.getView().byId("IdHMInpLastName").getValue()
      // console.log("sFirstName ", sFirstName);
      // console.log("sLastName ", sLastName);
      this.onPressCloseDialog();
      try {
        let userData = this.getView().getModel("empRecord").getData();
        console.log("userData", typeof userData.salary);
        let mainModel = this.getOwnerComponent().getModel();
        let oBinding = mainModel.bindList("/employeeRecord");
        await oBinding.create(userData);

        // To refresh current Page
        this.getView().getModel().refresh();
        MessageToast.show("Creating.....")

      } catch (error) {
        throw error
      }
    }
  });
});