sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/ui/model/Model",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/BusyIndicator",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], (BaseController, Fragment, Model, JSONModel, MessageToast, BusyIndicator, Filter, FilterOperator) => {
  "use strict";
  let isDeleteOREdit = undefined;
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

    onPressAddEmployee: async function (){
      await this.openFragmentDialog("IdLMAddEmp", "addEmployee");
      this.getView().byId("IdHMCreateBtn").setText("Submit Record")
      
    },
    onPressEditRecord: async function (oEvent){
      let  Id = oEvent.getSource().getId()
      isDeleteOREdit =Id
      this.byId("IdLMEmplTable").setMode("SingleSelectLeft");
    },

    onEmpRowSelection : async function(){
      if(isDeleteOREdit.includes("IdLMEditbtn")){
        this.openUpdateFragment();
      }
    },

    openUpdateFragment : async function(){
      let oTable = this.byId("IdLMEmplTable");
      let selectedItem = oTable.getSelectedItem();

      if(selectedItem){
        const selectedRow = selectedItem.getBindingContext();
        const selectedRowData = selectedRow.getObject();
        console.log("selectedRowData", selectedRowData);
        let updateRecordModel = new JSONModel(selectedRowData);
        this.getView().setModel(updateRecordModel, "updateRecord");
      }
      await this.openFragmentDialog("IdLMUpdateEmp", "updateRecord");
    },

    onPressUpdateRecord : async function(){
      let that = this
      let updatedData = this.getView().getModel("updateRecord").getData();
      console.log("updatedData", updatedData);
      let mainModel = this.getView().getModel();

      let oBindList  = mainModel.bindList("/employeeRecord");
      await oBindList.requestContexts().then((aContext) =>{
       for(let i = 0; i < aContext.length; i++){
        if(aContext[i].getProperty("email") === updatedData.email){
          aContext[i].setProperty("firstName", updatedData.firstName)
          aContext[i].setProperty("lastName", updatedData.lastName)
          aContext[i].setProperty("phoneNumber", updatedData.phoneNumber)
          aContext[i].setProperty("countryCode", updatedData.countryCode)
          aContext[i].setProperty("dob", updatedData.dob)
          aContext[i].setProperty("dateOfJoin", updatedData.dateOfJoin)
          aContext[i].setProperty("department", updatedData.department)
          aContext[i].setProperty("designation", updatedData.designation)
          aContext[i].setProperty("address", updatedData.address)
          aContext[i].setProperty("salary", updatedData.salary)
          aContext[i].setProperty("reportingManger", updatedData.reportingManger)
        }
       }
       that.getView().getModel().refresh()
      })
      this.onPressRecCloseDialog()
    },
    onConfirmDelete : async function(){
      let that = this
      let oTable = this.byId("IdLMEmplTable");
      let selectedItem = oTable.getSelectedItem();
      let selectedRowData = undefined

      if(selectedItem){
        const selectedRow = selectedItem.getBindingContext();
        selectedRowData = selectedRow.getObject();
        console.log("selectedRowData", selectedRowData);
      }

      let mainModel = this.getView().getModel();

      let oBindList  = mainModel.bindList("/employeeRecord");
      await oBindList.requestContexts().then((aContext) =>{
       for(let i = 0; i < aContext.length; i++){
        if(aContext[i].getProperty("email") === selectedRowData.email){
          aContext[i].delete()
        }
       }
       that.getView().getModel().refresh()
      })
      this.getView().byId("IdLMDeletebtn").setVisible(true);
      this.getView().byId("IdLMCnfDeletebtn").setVisible(false);
    },

    onPressDelete: function(oEvent){
      let  Id = oEvent.getSource().getId();
      this.getView().byId("IdLMDeletebtn").setVisible(false)
      this.getView().byId("IdLMCnfDeletebtn").setVisible(true)
      isDeleteOREdit = Id;
      this.byId("IdLMEmplTable").setMode("SingleSelectLeft");
    },


    openFragmentDialog : async function(sFragment, sFragmentFileName){
      let oDialog = this.getView().byId(sFragment);
      if (!oDialog) {
        oDialog = await Fragment.load({
          id: this.getView().getId(),
          name: "com.ingenx.leavemanagementui.fragments." + sFragmentFileName,
          controller: this.getView().getController()
        });
        this.getView().addDependent(oDialog);
      }
      oDialog.open();
    },

   
    onPressAddCloseDialog: function () {
      let oDialog = this.getView().byId("IdLMAddEmp");
      if (oDialog) {
        oDialog.close();
      }
      return;
    },
    
    onPressRecCloseDialog: function () {
      let oDialog = this.getView().byId("IdLMUpdateEmp");
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

      // let payload = {
      //   "firstName" : sFirstName,
      //   "lastName" : sLastName,
      // }
      this.onPressAddCloseDialog();
      try {
        let userData = this.getView().getModel("empRecord").getData();
        console.log("userData", typeof userData.salary);
        let mainModel = this.getOwnerComponent().getModel();
        let oBinding = mainModel.bindList("/employeeRecord");
        await oBinding.create(userData,  {
          bSkipRefresh : true
        });

        // To refresh current Page
        this.getView().getModel().refresh();
        MessageToast.show("Creating.....")

      } catch (error) {
        throw error
      }
    }
  });
});