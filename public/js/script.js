$(function(){

	$('.deleteBtn').on('click',function(e){
		e.preventDefault();
		var delBtn = $(this);
		if(confirm('Are you sure you want do delete this?')){
			var myUrl = $(this).attr('href');
			$.ajax({
				method:'DELETE',
				url:myUrl
			}).done(function(data){})
			delBtn.closest('ul').fadeOut('slow',function(){
				$(this).remove();
			});
		}
	});

});