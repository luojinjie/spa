window.onload = function(){
	var header = document.getElementById("header"),
	navList = getByClass(header,"nav-list")[0],
	searchIco = getByClass(header,"search-ico")[0],
	searchBar = getByClass(header,"searchbar")[0],
	count = 1, //切换class的索引
	bannerImg = getByClass(header,"banner-images")[0],
	imgLis = bannerImg.getElementsByTagName("li"),
	timer = null,
	point = getByClass(header,"point-list")[0],
	pointLis = point.getElementsByTagName("li"),
	resBtn = document.getElementById("res-btn");

	//模块显示/隐藏切换（增减class）
	function toggle(e1,e2,c1,c2){
		var oldCls1 = e1.getAttribute("class"),
		oldCls2 = e2.getAttribute("class");
		e1.onclick = function(){
			if(count===1){
				e1.setAttribute("class",c1);
				e2.setAttribute("class",c2);
				count++;
			}else{
				e1.setAttribute("class",oldCls1);
				e2.setAttribute("class",oldCls2);
				count--;
			}
		}
	}
	//头部搜索栏显示/隐藏切换
	toggle(searchIco,searchBar,"search-ico close","searchbar open")

	//小屏设备导航栏显示/隐藏切换
	toggle(resBtn,navList,"responsive-btn open","nav-list open")

	//banner图轮播函数
	function Carousel(){
		for(var i=0;i<imgLis.length;i++){
			var imgCls = imgLis[i].className;
			if(imgCls.indexOf("active")!=-1){
				if(i!=imgLis.length-1){
					imgLis[i].className = imgCls.split(" ")[0];
					imgLis[i+1].className += " active";
					clearCls(pointLis);
					pointLis[i+1].setAttribute("class","active");
					break;
				}else{
					imgLis[i].className = imgCls.split(" ")[0];
					imgLis[0].className += " active";
					clearCls(pointLis);
					pointLis[0].setAttribute("class","active");
					break;
				}
			}
		}
	}

	//手动切换banner图
	for(var i=0;i<pointLis.length;i++){
		pointLis[i].index = i;
		pointLis[i].onclick = function(){
			clearInterval(timer);
			for(var j=0;j<imgLis.length;j++){
				var imgCls = imgLis[j].className;
				imgLis[j].className = imgCls.split(" ")[0];
			}
			clearCls(pointLis);
			this.setAttribute("class","active");
			imgLis[this.index].className += " active";
			timer = setInterval(Carousel,3000);
		}
	}

	function clearCls(arr,cls){
		for(var i=0;i<arr.length;i++){
			arr[i].removeAttribute("class");
		}
	}

	//banner图3秒切换一次
	timer = setInterval(Carousel,3000);
}

//模拟getElementsByClassName
function getByClass(parent,cls){
	var eles = parent.getElementsByTagName("*"),
	result = [];
	for(var i=0;i<eles.length;i++){
		if(eles[i].className == cls){
			result.push(eles[i]);
		}
	}
	return result;
}