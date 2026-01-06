$(document).ready(function () {
	if (window.File && window.FileList && window.FileReader) {
		$(".file-upload").on("change", function (e) {
			var files = e.target.files,
				filesLength = files.length;
				console.log(files);

			if (filesLength < 6) {
				for (var i = 0; i < filesLength; i++) {
                    var f = files[i];
					var fileReader = new FileReader();
					fileReader.onload = (function (e) {
						var file = e.target;
						$("<span class=\"pip\">" +
							"<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
							"<br/><span class=\"remove\">X</span>" +
							"</span>").insertBefore('.file-box-active');
						$(".remove").click(function () {
							$(this).parent(".pip").remove();
							$('.evt-view > img').attr('src', 'Assets/img/event-registration/evt-capture.png');
						});

					});
					fileReader.readAsDataURL(f);
				}
			}
			else {
				$('.evt-upload').removeClass('active-box');
				$('.file-upload').removeClass('file-box-active');
				//maxImageError();
				$('.evt-error-pop').show();
				//alert("ONLY 5 IMAGES ARE ALLOWED")
			}

		});
	} else {
        alert("Your browser doesn't support to File API");
	}
    
	//SIR Jelo > >
    $("#eventForm").validate({
        highlight: function (element) {
            $(element).closest('div').removeClass('has-success').addClass('has-error');
            $(element).addClass('border-red');
        },
        success: function (success, element) {
            $(element).removeClass('border-red');
            $(element).closest('div').removeClass('has-error');
            //$(element).remove();

        },
        errorPlacement: function (error, element) {
            return true;
        }
    });
       
    //$('.file-upload').each(function () {
    //    $(this).rules('add', {
    //        required: true
    //    });
    //})


	$('.evt-upload').on('change', function () {
		var numItems = $("span.pip").length;
		console.log(numItems);

	});    

	$('.capture-img').on('click', 'img', function () {

		if ($('.evt-upload').hasClass('active-box')) {
			$('.evt-upload').removeClass('active-box');
			$('.file-upload').removeClass('file-box-active');
		}
		$(this).closest('.evt-upload').addClass('active-box');
		$(this).closest('.capture-img').prev().addClass('file-box-active');
	});


	$('.capture-box').on('DOMSubtreeModified', '.active-box', function () {
		console.log('changed');
		var numItems = $(".active-box > span.pip").length;
		console.log(numItems);

		if (numItems === 6) {
			$('.evt-error-pop').show();
			//maxImageError();
			$('.active-box > span.pip').eq(4).nextAll('span.pip').remove();
			//alert("ONLY 5 IMAGES ARE ALLOWED")

		}
		
	});

	$('.evt-upload').on('click', '.pip', function () {
		$(this).addClass('onview');
		var imgLink = $(this).children().attr('src');
		$('.evt-view > img').attr('src', imgLink);
		$('.img-viewer-box').show();
		//console.log(imgLink)
	});

	$('.evt-back').on('click', function () {
		$('.img-viewer-box').hide();
		$('.evt-block').hide();
		$('.evt-upload > span').removeClass('onview');
	});

	$('.evt-delete').on('click', function () {
		$('.evt-block').show();
	});

	$('.cancel-popup').click(function () {
		$('.evt-block').hide();
	});

	$('.confirm-delete').click(function () {
		$(".onview").remove();
		$('.img-viewer-box').hide();
		$('.evt-block').hide();
	});


	//SIR Jelo > >
    $('.evt-btn-submit').click(function () {
        var imgLengh = true;
        var $btn = $(this);
        $(".file-upload").each(function () {     
            var file = $(this)[0];
			if (file.files.length == 0) {          
                ShowErrorMessage("请上传图片");
				imgLengh = false;
                return false;
            }
        });
        var valid = $("#eventForm").valid();
        if (valid && imgLengh) {
            $btn.attr("disabled", "disabled");
            $(".event-modal").show();
            $("#eventForm").submit();
            
        }
	});


	$('.evt-success').click(function () {
        $('.evt-success-pop').hide();
	});

	$('.evt-error').click(function () {
		$('.evt-error-pop').hide();
		//$('.evt-error-pop').load();
		$('.box-title').html("<span><img src='Assets/img/event-registration/error.png' alt='error' /></span>注意");
		$('.evt-error-box > p').text("最多上传5张图片！");
	});
});