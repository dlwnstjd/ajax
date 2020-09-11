var ajax = null;	//전역변수
function getAjaxObject(){	//ajax 객체 생성 함수
	if(window.ActiveXObject){	//익스플로러 브라우저
		try{
			return new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				return new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e2){
				return null;
			}
		}
	}else if(window.XMLHttpRequest){	//익스플로러 이외의 브라우저.
		return new XMLHttpRequest();	//ajax객체. 서버와 통신 가능 객체.
	}else{
		return null;
	}
}
/*
 url: "hello.jsp",
 params: "name=홍길동", 
 callback: helloFromServer,
 method: "POST"
 */
function sendRequest(url,params,callback,method){
	//ajax: ajax 객체 저장. XMLHttpRequest객체.
	ajax = getAjaxObject();
	//httpMethod: GET or POST
	var httpMethod = method?method:"GET";
	if(httpMethod != "GET" && httpMethod != "POST"){
		httpMethod = "GET";
	}
	//httpParams: name=홍길동
	var httpParams = (params == null || params =='')?null:params;
	var httpUrl = url;
	if(httpMethod == "GET" && httpParams != null){
		//GET 방식인 경우 url 정보에 파라미터를 전송
		httpUrl = httpUrl + "?" + httpParams;
	}
	//true: 비동기 방식 전송
	ajax.open(httpMethod,httpUrl,true);
	ajax.setRequestHeader
		("Content-Type","application/x-www-form-urlencoded");
	//onreadystatechange: 콜백함수 등록.
	//콜백은 상태가 바뀔때마다 자동으로 호출된다.
	ajax.onreadystatechange = callback;	//helloFromServer
	ajax.send(httpMethod=="POST"?httpParams:null);	//서버로 전송
}