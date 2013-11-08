TheJsValidator
==============

A simple javascript validator 
A small JS validation plugin. 
A small example about how to use it:
```
var fieldsToValidate = [
       {
         field: $("#username"),
         message: "You must enter an username",
         type: "required"
       }, {
         field: $("#password"),
         message:"You must enter a password",
         type: "required"
       }, {
         field: $("#newPassword"),
         message:"You must enter a new password",
         type: "required"
       }, {
         field: $("#newPasswordRepeat"),
         message:"You must repeat your new password",
         type: "required"
       }, {
	        field: $("#newPassword"),
	        fieldToCompare: $("#newPasswordRepeat"),
	        message:"Fields must match",
	        type: "compare"
	}];
  var theJSValidator = new TheJsValidator(fieldsToValidate, $("#errorDiv"));
  theJSValidator.init();
```

To trigger the validation run theJSValidator.validate();
