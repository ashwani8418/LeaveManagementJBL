sap.ui.define([
  "sap/ui/core/BusyIndicator",
  "sap/m/MessageToast"
], function (BusyIndicator, MessageToast) {
  "use strict";

  return {
    /**
     * Generic Create function using global 'mainService' model
     * @param {sap.ui.model.Model} oModel - The OData model
     * @param {string} sEntityName - The entity set name (e.g., "employeeRecord")
     * @param {Object} oPayload - The data to create
     * @returns {Promise<Object>} - The created entity object
     * @throws {Object} - Enhanced error with additional context
     */
    createEntity: async function (oModel, sEntityName, oPayload) {
      try {
        const sPath = sEntityName.startsWith("/") ? sEntityName : "/" + sEntityName;
        const oBinding = oModel.bindList(sPath);
        const oContext = await oBinding.create(oPayload, { bSkipRefresh: true });
        const oCreatedData = await oContext.created();
        MessageToast.show("Entity created successfully");
        return oCreatedData;
      } catch (error) {
        // Process and enhance the error before throwing
        const enhancedError = {
          message: error.message || "Error creating entity in Utils",
          originalError: error,
          entityName: sEntityName,
          payload: oPayload,
          timestamp: new Date().toISOString(),
          source: "Utils.createEntity",
          // Include any OData specific error details
          statusCode: error.statusCode || null,
          responseText: error.responseText || null,
          errorDetails: error.error || null
        };
        
        // Show error message in Utils
        MessageToast.show("Error inside Utils: " + enhancedError.message);
        
        // Log detailed error for debugging
        console.error("Utils createEntity error:", enhancedError);
        
        // Still throw the enhanced error so controller can catch it
        throw enhancedError;
      }
    },

    /**
     * Alternative version that still throws but with more error info
     * @param {sap.ui.model.Model} oModel - The OData model
     * @param {string} sEntityName - The entity set name
     * @param {Object} oPayload - The data to create
     * @returns {Promise<Object>} - The created entity object
     * @throws {Object} - Enhanced error object
     */
    createEntityWithThrow: async function (oModel, sEntityName, oPayload) {
      try {
        const sPath = sEntityName.startsWith("/") ? sEntityName : "/" + sEntityName;
        const oBinding = oModel.bindList(sPath);
        const oContext = await oBinding.create(oPayload, { bSkipRefresh: true });
        const oCreatedData = await oContext.created();
        MessageToast.show("Entity created successfully");
        return oCreatedData;
      } catch (error) {
        const enhancedError = {
          message: error.message || "Error creating entity",
          originalError: error,
          entityName: sEntityName,
          payload: oPayload,
          timestamp: new Date().toISOString(),
          source: "Utils.createEntity"
        };
        
        MessageToast.show("Error inside Utils: " + enhancedError.message);
        throw enhancedError; // Throw enhanced error object
      }
    }
  };
});