var TheJsValidator = function(fieldsToValidate, errorDiv) {
    var pub = {};
    var priv = {};

    priv.fieldsToValidate = fieldsToValidate;
    priv.errorDiv = errorDiv;

    pub.init = function() {
        priv.initFieldEvents();
    };

    priv.initFieldEvents = function() {
        for (var i = 0; i < fieldsToValidate.length; i++) {
            priv.initFieldEvent(fieldsToValidate[i]);
        }
    };

    priv.initFieldEvent = function (fieldData) {
        fieldData.field.change(function() {
            priv.validateThisField(fieldData);
        });
        if (fieldData.type == "compare") {
            fieldData.fieldToCompare.change(function () {
                priv.validateThisField(fieldData);
            });
        }
    };

    pub.validate = function() {
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

    priv.validateThisField = function(fieldData) {
        priv.validateField(fieldData, null, true);
    };

    priv.validateField = function (validationValues, errorMessages, singleValidation) {
        var isValid;
        var fieldId;
        switch (validationValues.type) {
            case "notEmpty":
                fieldId = validationValues.field[0].id;
                if (validationValues.field.val() == "") {
                    isValid = false;
                    break;
                }
                isValid = true;
                break;
            case "compare":
                fieldId = validationValues.field[0].id + "-" + validationValues.fieldToCompare[0].id;
                if (validationValues.field.val() != validationValues.fieldToCompare.val() && validationValues.field.val() != "" && validationValues.fieldToCompare.val() != "") {
                    isValid = false;
                    break;
                }
                isValid = true;
                break;
            default:
                fieldId = validationValues.field[0].id;
                isValid = true;
                break;
        }
        if (!isValid && !singleValidation) {
            errorMessages.push({
                fieldId: fieldId,
                message: validationValues.message
            });
        }
        else if (singleValidation) {
            if (isValid) {
                priv.errorDiv.find("#" + fieldId + "-not-valid").remove();
            } else if (priv.errorDiv.find("#" + fieldId + "-not-valid").length <= 0) {
                priv.errorDiv.append("<div id='" + fieldId + "-not-valid" + "'>" + validationValues.message + "</div>");
            }
        }
    };
    return pub;
}
