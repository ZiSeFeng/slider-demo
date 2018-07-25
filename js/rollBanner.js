;(function($){
    $.fn.rollBanner = function(opts){
    	var defaults = {
    		autoPlay: 5000,
    	}
    	$.extend(defaults, opts);
    	var arr = ['banner_pos1', 'banner_pos2', 'banner_pos3', 'banner_pos4', 'banner_pos5'];
    	var timer = 0;
    	var index = 0;

        console.log(opts)
    	return this.each(function(){
            var banLi = $(this).find('.banner_content li');
            var menuLi = $(this).find('.banner_menu li');
            var banLen = banLi.length;

            $(opts.left).click(function(event) {
            	next();
            });

            $(opts.right).click(function(event) {
            	prev();
            });

            function next(){
            	arr.push(arr[0]);
            	arr.shift();
            	banLi.each(function(i, el) {
            		$(el).removeClass().addClass(arr[i]);
            	});
            	index++;
            	if (index > banLen -1) {
            		index = 0
            	}
            	show()
            }

            function prev(){
                arr.unshift(arr[banLen-1])
                arr.pop();
                banLi.each(function(i, el) {
                	$(el).removeClass().addClass(arr[i])
                });
                index--;
                if (index < 0) {
                	index = banLen - 1;
                }
                show();
            }

            menuLi.click(function(event) {
            	var myindex = $(this).index();
            	var mindex = myindex - index;
            	if (mindex == 0) return;
            	if (mindex > 0) {
            		var newarr = arr.splice(0, mindex);
            		arr = $.merge(arr, newarr);
            		banLi.each(function(i, el) {
	                	$(el).removeClass().addClass(arr[i])
	                });
	                index = myindex;
	                show();
            	}
            	if (mindex < 0) {
            		arr.reverse();
            		var oldarr = arr.splice(0, -mindex);
            		arr = $.merge(arr, oldarr);
            		arr.reverse();
            		banLi.each(function(i, el) {
	                	$(el).removeClass().addClass(arr[i])
	                });
	                index = myindex;
	                show();
            	}
            });

            function show(){
            	menuLi.eq(index).addClass('active').siblings('li').removeClass('active')
                $('.banner_content').find('.banner_pos3').addClass('active');
            }

            
    	})
    }
})(jQuery)