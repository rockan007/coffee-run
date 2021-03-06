(function (window) {
    'use strict'
    var $ = window.jQuery;
    var App = window.App || {};

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length == 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }
    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            fn(data).then(function(){
                this.reset();
                this.elements[0].focus();
            }.bind(this));
        })
    }
    FormHandler.prototype.addInputHandler = function (fn) {
        console.log('setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function (event) {
            var emailAddress = event.target.value;
            console.log(fn(emailAddress));
            var msg = '';
            if (!fn(emailAddress)) {
                msg = emailAddress + ' is not an authorized email address!';
            }
            console.log(msg);
            event.target.setCustomValidity(msg);
        })
    }
    App.FormHandler = FormHandler;
    window.App = App;
})(window)