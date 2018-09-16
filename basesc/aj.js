function getXmlHttp(){
	  var xmlhttp;
	  try {
	    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	  } catch (e) {
	    try {
	      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    } catch (E) {
	      xmlhttp = false;
	    }
	  }
	  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	    xmlhttp = new XMLHttpRequest();
	  }
	  return xmlhttp;
}

function vote(key) {
	// (1) создать объект для запроса к серверу
	var req = getXmlHttp();
	// (3) задать адрес подключения
	req.open('GET', 'http://es.onlinemschool.com/modules/ajax/vote.php?val2='+Math.random()+'&key='+key+'&lang='+languag, true);  
	// (4)
	req.send(null);  // отослать запрос	   
	}