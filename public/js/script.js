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

	// $('.moveTryit').on('click',function(e){
	// 	e.preventDefault();
	// 	var tryitBtn = $(this);
	// 	if(confirm('Move to Try It list?')){
	// 		var myUrl = $(this).attr('href');
	// 		$.ajax({
	// 			method:'PUT',
	// 			url:myUrl
	// 		}).done(function(data){})
			
	// 		location.href="/lists"

	// 	}
	// })

	// $('.moveLove').on('click',function(e){
	// 	e.preventDefault();
	// 	var loveBtn = $(this);
	// 	if(confirm('Move to Love list?')){
	// 		var myUrl = $(this).attr('href');
	// 		$.ajax({
	// 			method:'PUT',
	// 			url:myUrl
	// 		}).done(function(data){})
			
	// 		location.href="/lists"

	// 	}
	// })

	// $('.moveOwn').on('click',function(e){
	// 	e.preventDefault();
	// 	var ownBtn = $(this);
	// 	if(confirm('Move to Own list?')){
	// 		var myUrl = $(this).attr('href');
	// 		$.ajax({
	// 			method:'PUT',
	// 			url:myUrl
	// 		}).done(function(data){})
			
	// 		location.href="/lists"
			
	// 	}
	// })

});