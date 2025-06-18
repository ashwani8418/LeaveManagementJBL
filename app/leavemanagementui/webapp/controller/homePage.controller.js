sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.ingenx.leavemanagementui.controller.homePage", {
        onInit() {
        },

        onPressAddEmployee : function (){
            this.getOwnerComponent().getRouter().navTo("RouteemployeeRecord");
        }

    });
});