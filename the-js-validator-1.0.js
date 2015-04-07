var TheJsValidator = function (fieldsToValidate, errorDiv) {
    var pub = {};
    var priv = {};

    priv.fieldsToValidate = fieldsToValidate;
    priv.errorDiv = errorDiv;

    pub.init = function () {
        priv.initFieldEvents();
    };

    priv.initFieldEvents = function () {
        for (var i = 0; i < fieldsToValidate.length; i++) {
            priv.initFieldEvent(fieldsToValidate[i]);
        }
    };

    priv.initFieldEvent = function (fieldData) {
        fieldData.field.change(function () {
            priv.validateThisField(fieldData);
        });
        if (fieldData.type == "compare") {
            fieldData.fieldToCompare.change(function () {
                priv.validateThisField(fieldData);
            });
        }
        if (fieldData.type == "requiredIfRadioChecked") {
            fieldData.radio.change(function () {
                priv.validateThisField(fieldData);
            });
        }
    };

    pub.validate = function () {
        var errorMessages = [];
        priv.errorDiv.empty();
        for (var i = 0; i < priv.fieldsToValidate.length; i++) {
            priv.validateField(priv.fieldsToValidate[i], errorMessages, false);
        }
        if (errorMessages.length > 0) {
            for (var message = 0; message < errorMessages.length; message++) {
                priv.errorDiv.append("<div id='" + errorMessages[message].fieldId + "-not-valid" + "'>" + errorMessages[message].message + "</div>");
            }
            priv.errorDiv.show();
        }
        return errorMessages.length <= 0;
    };

    priv.validateThisField = function (fieldData) {
        priv.validateField(fieldData, null, true);
    };

    priv.validateField = function (validationValues, errorMessages, singleValidation) {
        var isValid = true;
        var fieldId = validationValues.field[0].id;
        var errorMessage = validationValues.message;
        switch (validationValues.type) {
            case "required":
                if (validationValues.field.val() == "") {
                    errorMessage = validationValues.message;
                    isValid = false;
                    break;
                }
                break;
            case "compare":
                fieldId = validationValues.field[0].id + "-" + validationValues.fieldToCompare[0].id;
                if (validationValues.field.val() != validationValues.fieldToCompare.val() && validationValues.field.val() != "" && validationValues.fieldToCompare.val() != "") {
                    errorMessage = validationValues.message;
                    isValid = false;
                    break;
                }
                isValid = true;
                break;
            case "requiredIfRadioChecked":
                if (validationValues.field.val() == "" && validationValues.radio.is(":checked")) {
                    errorMessage = validationValues.message;
                    isValid = false;
                }
                break;
            case "requiredNumber":
                if (validationValues.field.val() == "") {
                    errorMessage = validationValues.message;
                    isValid = false;
                    break;
                }
                if (parseInt(validationValues.field.val()) < validationValues.minNum) {
                    errorMessage = validationValues.numMessage;
                    isValid = false;
                }
                break;
            case "requiredNumeric":
                if (validationValues.field.val() == "") {
                    errorMessage = validationValues.message;
                    isValid = false;
                    break;
                }
                if (!$.isNumeric(validationValues.field.val())) {
                    errorMessage = validationValues.numMessage;
                    isValid = false;
                }
                break;
            default:
                break;
        }
        if (!isValid && !singleValidation) {
            errorMessages.push({
                fieldId: fieldId,
                message: errorMessage
            });
        }
        else if (singleValidation) {
            if (isValid) {
                priv.errorDiv.find("#" + fieldId + "-not-valid").remove();
                priv.errorDiv.hide();
            } else if (priv.errorDiv.find("#" + fieldId + "-not-valid").length <= 0) {
                priv.errorDiv.append("<div id='" + fieldId + "-not-valid" + "'>" + errorMessage + "</div>");
                priv.errorDiv.show();
            } else {
                priv.errorDiv.find("#" + fieldId + "-not-valid").remove();
                priv.errorDiv.append("<div id='" + fieldId + "-not-valid" + "'>" + errorMessage + "</div>");
                priv.errorDiv.show();
            }
        }
    };
    return pub;
}
