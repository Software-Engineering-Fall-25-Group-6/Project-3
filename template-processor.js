'use strict';

function TemplateProcessor(template) {
    this.template = template;
}

TemplateProcessor.prototype.fillIn = function (dictionary) {
    return this.template.replace(/{{(.*?)}}/g, function(match, prop) {
        return Object.prototype.hasOwnProperty.call(dictionary, prop) ? dictionary[prop] : '';
    });
};
