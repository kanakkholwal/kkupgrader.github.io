

      $(document).ready(function() {
      $("#copyit").click(function(){

        $("#output").select();

        document.execCommand('copy');
    alert('Meta Tags  Copied !!!!');
    });
        });

                          function create(form) {
                    if (confirm("kkupgrader.eu.org says ok for confirm")) {
                      form.story.value = "<!-- Meta Tag Generator Tool By kkupgrader.eu.org -->   \n"
                    ;
                      if (form.input1.value != "") {
                        form.story.value +="<meta NAME=\"Title\" CONTENT=\"" +
                        form.input1.value + "\"/>\n";
                      }
                      if (form.input2.value != "") {
                        form.story.value +="<meta NAME=\"Author\" CONTENT=\"" +
                        form.input2.value + "\"/>\n";
                      }
                      if (form.input4.value != "") {
                        form.story.value +="<meta NAME=\"Description\" CONTENT=\"" +
                        form.input4.value + "\"/>\n";
                      }
                      if (form.input5.value != "") {
                        form.story.value +="<meta NAME=\"Keywords\" CONTENT=\"" +
                        form.input5.value + "\"/>\n";
                      }
                      if (form.input14.value != "") {
                        form.story.value +="<meta NAME=\"Distribution\" CONTENT=\"" +
                        form.input14.options[form.input14.selectedIndex].value + "\"/>\n";
                      }
                      if (form.input15.value != "") {
                        form.story.value +="<meta NAME=\"Robots\" CONTENT=\"" +
                        form.input15.options[form.input15.selectedIndex].value + "\"/>\n";
                      }
                    }
                  }
  
