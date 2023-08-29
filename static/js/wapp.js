function readURL(input) {
  if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function(e) {
          e.preventDefault();
          $('.image-upload-wrap').hide();
          $('.file-upload-image').attr('src', e.target.result);
          $('.file-upload-content').show();
          $('.image-title').html(input.files[0].name);
      };

      reader.readAsDataURL(input.files[0]);
  } else {
      removeUpload();
  }
}
function removeUpload() {
    $('.file-upload-image').attr('src', '');
    $('.file-upload-input').replaceWith('<input class="file-upload-input" type="file" onchange="readURL(this);" accept="image/*" name="img">');
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}


(function($, window, document) {
    $(function () {

        var csrf_token = "IjBmYzNlMTk2OTlhMzI5ZTNhNzczODU1ODBlZTA0MjA1OGU1MmQyMmMi.ZM2EGw.0PHcklEpbxqc569YBdm40--86jk";
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type)) {
                    xhr.setRequestHeader("X-CSRFToken",csrf_token);
                    xhr.withCredentials= true;
                }
            }
        });


        //let param_form =  {"method": "", "cache" : false, "contentType": "json", "processData": false, "url":""}
        $.fn.jsax = function (m) {
            $(this).click(function (e){
                e.preventDefault();
                //let param =  Object.assign({},param_form);
                let $this = $(this);
                let param = {'url':  $this.attr('href')};

                if (m == null)
                    param['method'] = $this.is('[data-jsax]')?"DELETE":$this.is('[data-push]')? "PATCH" : "GET"
                else
                    param['method'] = m;

               $.ajax(param).done(function(data){
                   if (data)
                       location.href = data
                   else
                       location.reload()
                   }
               )
               return false

            });
        };
        $('[data-jsax]').jsax();
        $('[data-toggler]').click(function() {
            let item = $(this).attr('data-toggler');
            let items = item.split(' ');

            for (var xi in items) {
                item = items [xi];
                let $this = $('.' + item + '[data-toggle]');

                $this.toggleClass($this.attr('data-toggle'));
            }

        });

        $(".image-upload-wrap").bind("dragover", function () {
            $(".image-upload-wrap").addClass("image-dropping");
        }).bind("dragleave", function () {
            $(".image-upload-wrap").removeClass("image-dropping");
        });

        $(".remove-image").click(function(){
            $("[name=imgmem]").val("");

            $('a.delete').jsax();
            $('a.push').jsax();
        });
        $.fn.formax = function (){
            $(this).submit(function (event) {
                let $me = $(this);
                let param = {'url': $me.attr('action') || location.pathname , 'method': $me.attr('method'), 'data':$me.serialize() };
                $.ajax(param).done(function(next) {
                    location.href=next
                }).fail(function(data){
                    location.reload()
                })

                event.preventDefault();
            });
        };

        $('form.formjax').formax();
        //---------------------- END JS
        $(document).foundation();

    });
}(window.jQuery, window, document));


