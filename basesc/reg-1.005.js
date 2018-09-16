//для просмотра активных куков
//alert( document.cookie );

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Показать форму авторизации
function oms_show_auth() {
	$('div.reg_form').fadeIn(500);
	$("body").append("<div id='overlay' onclick=oms_close_auth()></div>");
	$('#overlay').show().css({'filter' : 'alpha(opacity=80)'});
	return false;				
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Скрыть форму авторизации
function oms_close_auth() {
	$('div.reg_form').fadeOut(100);
	$('#overlay').remove('#overlay');
	return false;
}

function oms_focus(name){
	document.getElementById('oms_'+name+'_sp').innerHTML='';
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Авторизироваться
function oms_auth(){
	var oms_login=document.getElementById('oms_login1').value;
	var oms_pas=document.getElementById('oms_password1').value;
	var oms_reg_ch=document.getElementById('oms_reg_ch').checked;
	document.getElementById('oms_auth_res').innerHTML='';

	if(oms_login == '' || oms_pas == ''){}
	else if(oms_pas.length<6||oms_pas.length>32){document.getElementById('oms_auth_res').innerHTML=oms_reg1;}
	else if(oms_login.length<2||oms_login.length>15){document.getElementById('oms_auth_res').innerHTML=oms_reg2;}
	else if(oms_login != oms_login.replace(/\s+/,'')){document.getElementById('oms_auth_res').innerHTML=oms_reg3;}
	else if(oms_pas != oms_pas.replace(/\s+/,'')){document.getElementById('oms_auth_res').innerHTML=oms_reg4;}
	else if(oms_login.search(',') != -1){document.getElementById('oms_auth_res').innerHTML=oms_reg3;}
	else{
		$.ajax({
			url:        'http://'+oms_s_name+'/modules/authentication/auth.php',
			type:       'POST',
			cache:      false,
			data:       {'login':oms_login, 'password':oms_pas, 'ch':oms_reg_ch },
			dataType:   'html',
			success: function(json) {
//				alert(json);
				if(json.length>200){document.getElementById('oms_auth_res').innerHTML=oms_reg5;exit;}
				var data = JSON.parse(json);
				if(data.error==0){
					oms_usr_id=data.id;
					document.getElementById('oms_usr_login').innerHTML=data.login;
					$('#oms_show_auth').fadeOut(100);
					$('#oms_show_auth1').fadeOut(100);
					$('#oms_auth_exit').fadeIn(100);
					oms_close_auth();
					if(document.getElementById("oms_main_pai")){
						var t=j1;
						var now = new Date();
						t=t.replace(new RegExp("{id}",'g'),data.id+'-'+now.getFullYear()+'.'+now.getMonth()+'.'+now.getDate()+'.'+now.getHours()+'.'+now.getMinutes()+'.'+now.getSeconds()+'.'+Math.floor(Math.random()*1000000));
						//t=t.replace(new RegExp("{mm}",'g'),'block');
						//t=t.replace(new RegExp("{ss}",'g'),'none');
						document.getElementById("oms_main_pai").innerHTML=t;
					}
					oms_1=data.vip;
					if(data.vip){
						if(document.getElementById("left_bloc")){
							$('#left_bloc').fadeOut(100);
						}
						if(document.getElementById("G_M")){
							$('#G_M').fadeOut(100);
						}
						if(document.getElementById("G_r1")){
							$('#G_r1').fadeOut(100);
						}

					}


				}
				else if(data.error<3){document.getElementById('oms_auth_res').innerHTML=oms_reg6;}
				else if(data.error>=3){document.getElementById('oms_auth_res').innerHTML=oms_reg5;}
			}
		});
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//выход авторизированного пользователя
function oms_exit_user(){
	document.getElementById('oms_usr_login').innerHTML=Auth4;
	document.getElementById('oms_login1').value='';
	document.getElementById('oms_password1').value='';
	oms_usr_id=0;
	$('#oms_auth_exit').fadeOut(100);
	$('#oms_show_auth').fadeIn(100);
	$('#oms_show_auth1').fadeIn(100);

	var date = new Date(0);
	var str = "user_id=; path=/; domain=.onlinemschol.com; expires="+date.toUTCString();
	document.cookie = str;
	var str = "user_code=; path=/; domain=.onlinemschol.com; expires="+date.toUTCString();
	document.cookie = str;
	
//	if(document.getElementById("oms_main_pai")){
//		var t=j1;
//		t=t.replace(new RegExp("{ss}",'g'),'block');
//		t=t.replace(new RegExp("{mm}",'g'),'none');
//		document.getElementById("oms_main_pai").innerHTML=t;
//	}

	$.ajax({
		url:        'http://'+oms_s_name+'/modules/authentication/auth_exit.php',
		type:       'POST',
		cache:      false,
		data:       {'login':document.getElementById('oms_usr_login').innerHTML},
		dataType:   'html',
		success: function(data) {}
	});
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//регистрация нового пользователя
function oms_reg(){
	var oms_login=oms_ch_fild_log();
	var oms_mail=oms_ch_fild_mail();
	var oms_pas1=oms_ch_fild_pas1();
	var oms_pas2=oms_ch_fild_pas2();
	var oms_name=oms_ch_fild('name');
	var oms_lastname=oms_ch_fild('lastname');

	var y=document.getElementById('oms_year').value;
	var m=document.getElementById('oms_month').value;
	var d=document.getElementById('oms_day').value;
	var g=document.getElementById('oms_gender').value;

	if(oms_login == '' || oms_pas1 == '' || oms_pas1 == '' || oms_mail=='' || oms_name=='' || oms_lastname==''){}
	else{
		$.ajax({
			url:        'http://'+oms_s_name+'/modules/authentication/reg.php',
			type:       'POST',
			cache:      false,
			data:       {'login':oms_login, 'password':oms_pas1, 'name':oms_name, 'lastname':oms_lastname, 'mail':oms_mail, 'y':y, 'm':m, 'd':d, 'g':g},
			dataType:   'html',
			success: function(data) {
				//document.getElementById('res').innerHTML=data;
				switch (data) {
					case '0':
						document.getElementById('res').innerHTML=j7;
						break;
					case '1':
						document.getElementById('res').innerHTML=j8;
						break;
					case '2':
						document.getElementById('res').innerHTML=j9;
						break;
					case '3':
						document.getElementById('res').innerHTML=j10;
						break;
					case '4':
						document.getElementById('res').innerHTML=j11;
						break;
					case '5':
						document.getElementById('res').innerHTML=j12;
						break;
					case '6':
						document.getElementById('res').innerHTML=j13;
						break;
					case '7':
						document.getElementById('res').innerHTML=j14;
						break;
					case '8':
						document.getElementById('res').innerHTML=j15;
						break;
				}
			}
		});
	}

}

function oms_l_ch(l){
	$.ajax({
		url:        'http://'+oms_s_name+'/modules/authentication/auth_l_pr.php',
		type:       'POST',
		cache:      false,
		data:       {'login':l},
		dataType:   'html',
		success: function(data) {
			switch (data) {
				case '0':
					oms_fild_yes_no(true,'','oms_log_sp');
					break;
				case '1':
					oms_fild_yes_no(false,j16,'oms_log_sp');
					break;
				case '2':
					oms_fild_yes_no(false,j17,'oms_log_sp');
					break;
			}
		}
	});
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function oms_e_ch(e){
	$.ajax({
		url:        'http://'+oms_s_name+'/modules/authentication/auth_e_pr.php',
		type:       'POST',
		cache:      false,
		data:       {'mail':e},
		dataType:   'html',
		success: function(data) {
			switch (data) {
				case '0':
					oms_fild_yes_no(true,'','oms_mail_sp');
					break;
				case '1':
					oms_fild_yes_no(false,j18,'oms_mail_sp');
					break;
				case '2':
					oms_fild_yes_no(false,j17,'oms_mail_sp');
					break;
			}
		}
	});
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function oms_fild_yes_no(s,dop,id){
	if(s==''){s='<image src="http://'+oms_s_name+'/pictures/no.png">&nbsp;&nbsp;&nbsp;'+dop;}
	else{s='<image src="http://'+oms_s_name+'/pictures/yes.png">';}
	document.getElementById(id).innerHTML=s;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function oms_ch_fild_mail(){
	var dop='';
	var s=document.getElementById('oms_mail').value;
	if(s==''){dop=j1;}
	else if(!s.match(/^[a-zA-Z0-9_\.\-]+\@[a-zA-Z0-9_\.\-]+\.[a-zA-Z0-9]{2,6}$/)){s='';dop=j3;}

	if(s!=''){
		document.getElementById('oms_mail_sp').innerHTML='<image src="http://'+oms_s_name+'/pictures/i1.gif">';
		oms_e_ch(s);
	}
	else{oms_fild_yes_no(s,dop,'oms_mail_sp');}
	return s;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function oms_ch_fild_log(){
	var dop='';
	var s=document.getElementById('oms_log').value;
	if(s==''){dop=j1;}
	else if(s.length<2||s.length>15){dop=j4;s='';}
	else if(s.match(/["\$%&()*:;?\@\[\]^{}|]/)){dop=j5;s='';}
	else if(s.indexOf(',') != -1){dop=j5;s='';}

	if(s!=''){
		document.getElementById('oms_log_sp').innerHTML='<image src="http://'+oms_s_name+'/pictures/i1.gif">';
		oms_l_ch(s);
	}
	else{oms_fild_yes_no(s,dop,'oms_log_sp');}
	return s;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function oms_ch_fild_pas1(){
	var dop='';
	var s=document.getElementById('oms_pas1').value;
	if(s!=document.getElementById('oms_pas2').value){oms_fild_yes_no('',j2,'oms_pas2_sp');}
	if(s==''){dop=j1;}
	else if(s.length<6||s.length>32){dop=j6;s='';}
	oms_fild_yes_no(s,dop,'oms_pas1_sp');
	return s;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function oms_ch_fild_pas2(){
	var dop='';
	var s=document.getElementById('oms_pas2').value;
	if(s==''){dop=j1;}
	else if(s!=document.getElementById('oms_pas1').value){dop=j2;s='';}
	oms_fild_yes_no(s,dop,'oms_pas2_sp');
	return s;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function oms_ch_fild(name){
	var dop='';
	var s=document.getElementById('oms_'+name).value;
	if(s==''){dop=j1;}
	else if(s.length<2||s.length>15){dop=j4;s='';}
	else if(s.match(/[!"#\$%&()*+:;<=>?\@\[\]^{}|~]/)){dop=j5;s='';}
	else if(s.indexOf(',') != -1){dop=j5;s='';}
	oms_fild_yes_no(s,dop,'oms_'+name+'_sp');
	return s;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function oms_year_ch(){
	var y=document.getElementById('oms_year').value;
	if((y!='')&(document.getElementById('oms_month').value==2)){
		var d=document.getElementById('oms_day').value;
		var s='<select id=oms_day><option value="">'+oms_reg8+'</option>';
		if(4*Math.floor(y/4)==y){
			if(d!='') if(d>29){d=29;}
			for(var i=1;i<30;i++){
				if(i==d){s+='<option value="'+i+'" selected>'+i+'</option>';}
				else{s+='<option value="'+i+'">'+i+'</option>';}
			}
		}
		else{
			if(d!='') if(d>28){d=28;}
			for(var i=1;i<29;i++){
				if(i==d){s+='<option value="'+i+'" selected>'+i+'</option>';}
				else{s+='<option value="'+i+'">'+i+'</option>';}
			}
		}
		s+='</select>';
		document.getElementById('oms_day_span').innerHTML=s;
	}
	
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function oms_month_ch(){
	var y=document.getElementById('oms_year').value;
	var m=document.getElementById('oms_month').value;
	var d=document.getElementById('oms_day').value;
	var k=32;
	if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){k=32;}
	if(m==4||m==6||m==9||m==11){k=31;if(d==31){d=30;}}
	if(m==2){
		k=30;
		if(d==30||d==31){d=29;}
		if(y!=''){
			if(4*Math.floor(y/4)!=y){
				if(d!='') if(d>28){d=28;}
				k=29;
			}
		}
	}

	var s='<select id=oms_day><option value="">'+oms_reg8+'</option>';
	for(var i=1;i<k;i++){
		if(i==d){s+='<option value="'+i+'" selected>'+i+'</option>';}
		else{s+='<option value="'+i+'">'+i+'</option>';}
	}
	s+='</select>';
	document.getElementById('oms_day_span').innerHTML=s;
}