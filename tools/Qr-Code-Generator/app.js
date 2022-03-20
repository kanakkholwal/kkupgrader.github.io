  var $ = jQuery.noConflict();
  jQuery(document).ready(function(e) { qrCodes.init() });
  var qrCodes = {
          types: [],
          init: function() { this.initTypes(), this.initForms() },
          initForms: function() { $("#qrcode").on("change", function() { "select" != $("#qrcode").val() ? qrCodes.buildFields($("#qrcode").val()) : $("#custom-fields").html("") }) },
          initTypes: function() {
              var e = this.addType();
              e = this.addField(e, "Text", "text", "textarea"), this.types.text = e;
              e = this.addType();
              e = this.addField(e, "Url", "url", "text"), this.types.url = e;
              e = this.addType();
              e = this.addField(e, "Telephone", "telephone", "text"), this.types.tel = e;
              e = this.addType();
              e = this.addField(e, "First Name", "first-name", "text"), e = this.addField(e, "Last Name", "last-name", "text"), e = this.addField(e, "Address", "address", "text"), e = this.addField(e, "Telephone", "telephone", "text"), e = this.addField(e, "Email", "email", "email"), this.types.contact = e;
              e = this.addType();
              e = this.addField(e, "Number", "number", "text"), e = this.addField(e, "Message", "message", "textarea"), this.types.sms = e;
              e = this.addType();
              e = this.addField(e, "Longitude", "longitude", "text"), e = this.addField(e, "Latitude", "latitude", "text"), e = this.addField(e, "Alititude", "altitude", "text", "100"), this.types.geo = e;
              e = this.addType();
              e = this.addField(e, "SSID", "ssid", "text"), e = this.addField(e, "Network", "network", "select", ["WEP", "WPA/WPA2"]), e = this.addField(e, "Password", "password", "text"), this.types.wifi = e;
              e = this.addType();
              e = this.addField(e, "Skype Name", "name", "text"), this.types.skype = e;
              e = this.addType();
              e = this.addField(e, "Number", "number", "text"), this.types.facetime = e;
              e = this.addType();
              e = this.addField(e, "Paypal email", "email", "text"), e = this.addField(e, "Item Name", "name", "text"), e = this.addField(e, "Product Code (optional)", "code", "text"), e = this.addField(e, "Value", "value", "text"), e = this.addField(e, "Currency", "currency", "select", ["USD", "GBP", "INR", "AUD", "EUR", "NZD", "JPY"]), this.types.paypal = e
          },
          addType: function() { var e = new Object; return e.fields = [], e },
          addField: function(e, t, i, d, a) { var l = new Object; return l.label = t, l.name = i, l.fieldType = d, void 0 !== a && (l.options = a), e.fields.push(l), e },
          buildFields: function(e) {
              $("#custom-fields").html("");
              var t = this.types[e].fields;
              $.each(t, function(e) {
                  switch (fieldHtml = "", t[e].fieldType) {
                      case "textarea":
                          fieldHtml = '<textarea  class="form-control" id="' + t[e].name + '"></textarea>';
                          break;
                      case "text":
                          void 0 !== t[e].options ? fieldHtml = '<input  class="form-control" type="text" value="' + t[e].options + '" id="' + t[e].name + '"/>' : fieldHtml = '<input type="text"  class="form-control" id="' + t[e].name + '"/>';
                          break;
                      case "email":
                          fieldHtml = '<input type="email"  class="form-control" id="' + t[e].name + '"/>';
                          break;
                      case "select":
                          fieldHtml = '<select  class="form-control" id="' + t[e].name + '">', $.each(t[e].options, function(i) { fieldHtml += "<option>" + t[e].options[i] + "</option>" }), fieldHtml += "</select>"
                  }
                  $("#custom-fields").append("<div class='flex margin-top'><div><div>" + t[e].label + "</div>" + fieldHtml + "</div></div>")
              }), $("#custom-fields").append("<div><input id='generate' class=' btn-outline-success m-2 btn' type='submit' value='Generate' /></div>"), $("#generate").on("click", function() {
                  var e = $("#qrcode").val();
                  builder.build(e), $("#qrcode-info").removeClass("hidden")
              })
          }
      },
      builder = {
          build: function(e) {
              var t = builder[e]();
              $("#qrcode-display").html(""), $("#qrcode-display").qrcode({ text: t, render: "image" })
          },
          text: function() { return $("#text").val() },
          url: function() { return $("#url").val() },
          tel: function() { return "TEL:" + $("#telephone").val() },
          contact: function() { return "MECARD:N:" + $("#first-name").val() + "," + $("#last-name").val() + ";ADR:" + $("#address").val() + ",;TEL:" + $("#telephone").val() + ";EMAIL:" + $("#email").val() + ";;" },
          sms: function() { return "SMSTO:" + $("#number").val() + ":" + $("#message").val() },
          geo: function() { return "GEO:" + $("#latitude").val() + "," + $("#longitude").val() + "," + $("#altitude").val() },
          wifi: function() { return "WIFI:S:" + $("#ssid").val() + ";T:" + $("#network").val() + ";P:" + $("#password").val() },
          skype: function() { return "skype:" + $("#name").val() },
          facetime: function() { return "facetime:" + $("#number").val() },
          paypal: function() { return "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=" + $("#email").val() + "&item_name=" + encodeURIComponent($("#name").val()) + "&item_number=" + encodeURIComponent($("#code").val()) + "&amount=" + $("#value").val() + "&currency_code=" + $("#currency").val() }
      };
  const clearUrl = url => url.replace(/^data:image\/\w+;base64,/, '');

  const downloadImage = (name, content, type) => {

      var link = document.createElement('a');

      link.style = 'position: fixed; left -10000px;';

      link.href = `data:application/octet-stream;base64,${encodeURIComponent(content)}`;

      link.download = /\.\w+/.test(name) ? name : `${name}.${type}`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

  }

  ['png', 'jpg', 'gif'].forEach(type => {

      var download = document.querySelector(`#${type}`);

      download.addEventListener('click', function() {

          var img = document.querySelector('#qrcode-display img');

          downloadImage('myImage', clearUrl(img.src), type);

      });

  });