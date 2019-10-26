var initScreen = function () {
  $("html").css("font-size", document.documentElement.clientWidth / 375 * 312.5 + "%");
}
$(window).bind('onorientationchange' in window ? 'orientationchange' : 'resize', function () {
  setTimeout(initScreen, 200);
});
	var mySwiper1 = new Swiper('.slide-box', {
		autoplay: $('.slide-box .swiper-slide').length>1,
		pagination: {
			el: '.swiper-pagination',
    }
	})


	var swiper3 = new Swiper('#feature-box', {
		effect: 'coverflow',
		autoplay: true,
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		initialSlide: 1,//默认第二个
		coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: true,
		},
		loop: true,
	});

	document.onselectstart = new Function("return false");
	
	
	
getList();
function getList(){
    var url="/lianyun/Article/list",
    param={'index':1, 'typeid':typeid};
    getJson(param,function(res){
     console.log(res)
      var tabsTitle=[],tabsList=[];
      newforEach(res,function(key,value){
        if(key=='type'){
          newforEach(value,function(index,item){
            tabsTitle.push(item)
          })
        }
        if(!(value instanceof Array)&&res[key]&&res[key].name=='notice'){
          tabsList.push(objInArr(value))
        }else if(value instanceof Array){
          tabsList.push(value)
        }
      })

      var label='<div class="swiper-slide"></div>',arr=tabsList.pop(),len=tabsList.length;
      tabsList.splice(len,1);
      tabsList.splice(0,0,arr);
        for(var j=0;j<tabsList.length;j++){
          $('#tabs-container .content').append(label)
          var slide=$('#tabs-container .swiper-slide')
          for(var i=0;i<tabsList[j].length;i++){
            var elem=tabsList[j][i]
            if(elem instanceof Object ){
              var time=getLocalTime(elem.pubdate);
              var wrap='<a href="/'+game+'/detail/?id='+elem.id+'" ><i style="color:'+(elem.color?elem.color:'')+';font-weight:'+(elem.isb==1?'bold':'')+'">'+elem.title+'</i><span>'+time+'</span></a>'
             slide.eq(j).append(wrap)
            }
          }
        }
      tabsTitle.unshift('综合')
      newforEach(tabsTitle,function(i,item){
        $('#tabs-container .tabs').append( '<span onclick="Move(this)">'+i+'</span>' )
      })
      $('#tabs-container .tabs span').eq(0).addClass('active');
    },url)
  }


//对象转为数据
function objInArr(obj){
  var arr = []
  for (let i in obj) {
      arr.push(obj[i]); 
  }
  return arr
}

  //遍历对象，数组
function newforEach(obj,fn) {
  var key;
  if(obj instanceof Array){
      obj.forEach(function(item,index){
          fn(item,index);
      })
  }else {
      for(key in obj){
          fn(key,obj[key]);
      }
  }
}
 
  function getLocalTime(sj)
  {
    var now = new Date(sj*1000);
    var   year=now.getFullYear();    
    var   month=now.getMonth()+1;    
    var   date=now.getDate();    
    return   year+"-"+month+"-"+date;   
  }

//   获取json数据
	function getJson(data, callback, url, type){
		$.ajax({
			'url': url ? url : 'index.php',
			'type': type ? type : 'GET',
			'data': data,
			'dataType': 'json',
			'async': true,
			'cache': false,
			success: function(info){
				callback(info);
				return false;
			},
			error: function(e){
				alert('网络繁忙！');
			}
		});
  }
  
  function Move(obj) {
    $(obj).addClass("active").siblings().removeClass("active");
    
    var mySwiper2 = new Swiper('.tabs-box',{
      swipeHandler : '.swipe-handler',
    });
    $("#tabs-container .tabs").delegate("span","click",function(e){
      e.preventDefault();
      var index = $(this).index(); //获取索引号
      $(this).addClass('active').siblings().removeClass();
      mySwiper2.slideTo(index,200, false);
    });
    
  }
