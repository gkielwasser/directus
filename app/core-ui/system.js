//  System core UI component
//  Directus 6.0

//  (c) RANGER
//  Directus may be freely distributed under the GNU license.
//  For all details and documentation:
//  http://www.getdirectus.com

define(['app','backbone'], function(app, Backbone) {

  "use strict";

  var Module = {};


  //Temporarily disable styling since breaks this ui when in overlay
  /*var template = '<div class="custom-check"> \
    <input value="1" id="check1" name="status" type="radio" {{#if active}}checked{{/if}}> \
    <label for="check1"><span></span>Active</label> \
    <input value="2" id="check2" name="status" type="radio" {{#if inactive}}checked{{/if}}> \
    <label for="check2"><span></span>Inactive</label> \
    <input value="0" id="check3" name="status" type="radio" {{#if deleted}}checked{{/if}}> \
    <label for="check3"><span></span>Deleted</label> \
  <input type="hidden" name="{{name}}" value="{{#if value}}{{value}}{{/if}}">';*/

  var template = '<input type="radio" name="status" value="1" {{#if active}}checked{{/if}}>Active<br> \
                  <input type="radio" name="status" value="2" {{#if inactive}}checked{{/if}}>Inactive<br> \
                  <input type="radio" name="status" value="0" {{#if deleted}}checked{{/if}}>Deleted \
                  <input type="hidden" name="{{name}}" value="{{#if value}}{{value}}{{/if}}">';

  Module.id = 'system';
  Module.dataTypes = ['TINYINT'];

  Module.variables = [];

  Module.Input = Backbone.Layout.extend({

    tagName: 'div',
    attributes: {
      'class': 'field'
    },
    template: Handlebars.compile(template),

    events: {
      'change input[type=radio]': function(e) {
        this.$el.find('input[type=hidden]').val($(e.target).val());
      }
    },

    serialize: function() {
      var data = {};
      var value = this.options.value;

      switch(value) {
        case 1:
          data.active = true;
          break;
        case 2:
          data.inactive = true;
          break;
        case 0:
          data.deleted = true;
          break;
      }

      data.value = value;
      data.name = this.options.name;


      return data;
    }

  });

  Module.list = function(options) {
    var val = (options.value) ? '<input type="checkbox" checked="true" disabled>' : '<input type="checkbox" disabled>';
    //var val = options.value.toString().replace(/<(?:.|\n)*?>/gm, '').substr(0,100);
    return val;//val;
  };


  return Module;
});