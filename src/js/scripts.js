$(document).ready(function(){  
    $(document).bind("contextmenu",function(e){   
          return false;   
    });
    $('#myModal').modal({
    	backdrop:true,
    	keyboard:false
    });
    $('[data-toggle=popover]').popover();
    
});

$(function () {
// 随机数产生
	function pos(a) {
		var pos=Math.floor(Math.random()*a+1);
		return pos;
	}
// 旋转
    function rotate(event) {
    	var i=$drag.data('deg');
    	if ($drag!==null) {
    		if (event.button===0) {
    			    setI1=setInterval(function () {
    			    i+=1;
    				$drag.css({
    					transform:'rotate('+i+'deg)'
    				}).data('deg', i);	
    			},50);
    		}
    		if (event.button==2) {
    			    setI2=setInterval(function () {
    			    i-=1;
    				$drag.css({
    					transform:'rotate('+i+'deg)'
    				}).data('deg', i);	
    			},50);
    		}
    		   
    	}
    }
// 随机散落
    $('#myModal').on('hidden.bs.modal', function() {
    	$('#bigworld>div').each(function(index) {
    		var posx=pos(650)+150;
    		var posy=pos(650)+150;
    		var deg=pos(360);
    		console.log($(this).css('z-index'));
    		$(this).css({
    			top: posx,
    			left: posy,
    			transform:'rotate('+deg+'deg)'
    		}).data('deg', deg).show();
    	});
    	$('#bigworld').show();
    });
// 拖放
    var correct=(window.innerWidth-parseInt($('#bigworld').css('width')))/2;
        $drag=null;
        setI1=null;
        setI2=null;
        correctTop=0;
        correctLeft=0;
        clientX=0;
        clientY=0;
        j=0;
	$('#bigworld').on('mousedown', 'div[draggable]', function(event) {
		event.preventDefault();
		clientX=event.clientX-correct;
		clientY=event.clientY;
		console.log(event.button);
		if(this.className.indexOf("draggable")){
			$drag=$(this);
			correctTop=clientY-parseInt($drag.css('top'));
			correctLeft=clientX-parseInt($drag.css('left'));
			j+=1;

			$drag.css('z-index',j).siblings('z-index',0);
			j=j%2;
			rotate(event);
	    }
	});
	$('body').on('mouseup mousemove', function(event) {
		event.preventDefault();
        clearInterval(setI1);
        clearInterval(setI2);
		switch(event.type){
			case "mouseup":
				$drag=null;
				break;
			case "mousemove":
			if ($drag!==null) {
				    clientX=event.clientX-correct;
				    clientY=event.clientY;
					$drag.css({
						top: (clientY-correctTop)+"px",
						left: (clientX-correctLeft)+"px"
					});
			}
		}
		
	});
// 颜色可变
	
	
});