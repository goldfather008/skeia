/*********************************
** 名称:JQeury实现表格行列冻结
**
** 作者:习晨龙
**
** 时间:2015年7月23日
**
** 联系:xichenlong@126.com
**
** 描述:类似Excel中的冻结窗格功能.建议给出表头固定宽度,所有单元格的高度,指定表格宽度;
**********************************/
$.fn.mergeAttributes = function(src){
	if($.browser.msie) {
		$(this).get(0).mergeAttributes(src.get(0));
	}else{
		attrs = src.get(0).attributes;
		i = attrs.length - 1;
		for(;i>=0;i--){
			var name = attrs[i].name;
			if(name.toLowerCase() === 'id' || attrs[i].value=="" || attrs[i].value==null ||attrs[i].value=="null"){
				continue;
			}
			try{
				$(this).attr(name,attrs[i].value);
			}catch(e){
			}
		}
	}
}
$.fn.FrozenTable = function(){
	var iRowHead = $(".fixedRow").size();
	var iColLeft = $(".fixedCol").size();
	
	var oTable = $(this);
	var oTableId = oTable.attr("id");
	var layoutDiv = oTable.parent();
	
	var width = layoutDiv.width();
	var height = layoutDiv.height();
	
	var oDivHeight = height;
	var oDivLHHeight = 0;
	var oDivHHeight = 0;
	
	var oDiv = $("<div id='oDiv_" + oTableId + "' style='overflow:auto;height:" + height + "px; width:" + width + "px;position:relative;z-index:35'></div>");
	layoutDiv.append(oDiv);
	oDiv.append(oTable);
	
	if(oTable.width()>oDiv.width() && oTable.height()>oDiv.height()){
		if(iRowHead>0 && iColLeft>0){
			var oTableLH = $("<table id='oTableLH_"+oTableId+"'></table>");
			var oDivLH = $('<div id="oDivLH_' + oTableId + '" style="overflow: hidden; position: relative; z-index: 50;"></div>');
			oDivLH.append(oTableLH);
			layoutDiv.append(oDivLH);
			
			oTableLH.CloneLHTable(oTable);
			oDivLH.width(oTableLH.outerWidth());
			oDivLH.css("top",-oDivHeight);
			
			oDivLHHeight = oDivLH.outerHeight();
		}
	}
	if(iRowHead>0 && oTable.height()>oDiv.height()){
		var oDivH = $("<div id='oDivH_"+oTableId+"' style='position: relative; z-index:45;'><table></table></div>");
		layoutDiv.append(oDivH);
		oDivH.find("table").CloneHTable(oTable);
		oDivH.css("overflow","hidden");
		oDivH.css("width",oDiv.outerWidth(true)-17);
		oDivH.css("top",-oDivHeight-oDivLHHeight);
		
		oDivHHeight = oDivH.outerHeight();
	}
	if(iColLeft>0 && oTable.width()>oDiv.width()){
		var oDivL = $("<div id='oDivL_"+oTableId+"'><table></table></div>");
		layoutDiv.append(oDivL);
		oDivL.find("table").CloneLTable(oTable);
		oDivL.css("overflow","hidden");
		oDivL.css("height",oDiv.outerHeight(true)-17);
		oDivL.css("position","relative");
		oDivL.css("z-index","40");
		oDivL.css("top",-oDivHeight-oDivLHHeight-oDivHHeight);
	}
	oDiv.scroll(function(){
		if(typeof($("#oDivH_"+oTableId).get(0))!='undefined'){
			$("#oDivH_"+oTableId).scrollLeft($(this).scrollLeft());
		}
		if(typeof($("#oDivL_"+oTableId).get(0))!='undefined'){
			$("#oDivL_"+oTableId).scrollTop($(this).scrollTop());
		}
	});
};

$.fn.CloneLHTable = function(oSrcTable){
	var iRowHead = $(".fixedRow").size();
	$(this).mergeAttributes(oSrcTable);
	$(this).removeClass("width");
	$(this).removeAttr("width");
	
	for(var i=0;i<iRowHead;i++){
		var oldTr = oSrcTable.find("tr").eq(i);
		
		var newTr = $("<tr></tr>");
		oldTr.find(".fixedCell").each(function(){
			var newTd=$(this).clone();
			//newTd.width($(this).width());
			//newTd.height($(this).height());
			
			newTr.append(newTd);
		});
		
		$(this).append(newTr);
	}
};

$.fn.CloneHTable = function(oSrcTable){
	var iRowHead = $(".fixedRow").size();
	$(this).mergeAttributes(oSrcTable);
	
	for(var i=0;i<iRowHead;i++){
		var oldTr = oSrcTable.find("tr").eq(i);
		
		if (oldTr.find("th,td").length > 0) {
			var newTr = $("<tr></tr>");
			oldTr.find("th,td").each(function(){
				var newTd=$(this).clone();
				
				newTr.append(newTd);
			});
			
			$(this).append(newTr);
		}
	}
	$(this).width(oSrcTable.width());
};

$.fn.CloneLTable = function(oSrcTable){
	$(this).mergeAttributes(oSrcTable);
	$(this).removeClass("width");
	$(this).removeAttr("width");
	
	for(var i=0;i<oSrcTable.find("tr").size();i++){
		var oldTr = oSrcTable.find("tr").eq(i);
		var newTr = $("<tr></tr>").addClass(oldTr.attr("class"));
		
		oldTr.find(".fixedCol").each(function(){
			var newTd=$(this).clone();
			
			newTr.append(newTd);
		});
		$(this).append(newTr);
	}

	var width=0;
	var oldTr = oSrcTable.find("tr").eq(0);
	oldTr.find(".fixedCol").each(function(){
		width+=$(this).outerWidth();
	});
	
	var $oTableLH = $("#oTableLH_"+oSrcTable.attr("id"));
	
	if($oTableLH.length > 0){
		$(this).width($("#oTableLH_"+oSrcTable.attr("id")).width());
	} else {
		$(this).width(width);
	}
	$(this).parent().width($(this).outerWidth());
};