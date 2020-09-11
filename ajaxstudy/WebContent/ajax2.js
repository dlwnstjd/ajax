var ajax = {}	//객체
ajax.xhr = {}	//객체
/*
 * ajax.xhr.Request 객체의 생성자.
 * 멤버변수: url, params, claaback, method, req
 * 멤버메서드: getXmlHttpRequest, send, onStateChange
 */
ajax.xhr.Request = function(url,params,callback,method){	//생성자
	this.url = url;
	this.params = params;
	this.callback = callback;
	this.method = method;
	this.send();
}
//prototype: ajax.xhr.Request의 멤버 메서드 구현
ajax.xhr.Request.prototype = {
		//XMLHttpRequest 객체 생성 기능.
		getXmlHttpRequest : function(){
			if(window.ActiveObject){
				try{
					return new ActiveXObject("Msxml2.XMLHTTP");
				}catch(e){
					try{
						return new ActiveXObject("Microsoft.XMLHTTP");
					}catch(e2) {return null;}
				}
			}else if(window.XMLHttpRequest){
				return new XMLHttpRequest();
			}else{
				return null
			}
		},
		send : function(){
			//this.req: ajax객체저장. XMLHttpRequest 객체 저장.
			this.req = this.getXmlHttpRequest();
			var httpMethod = this.method?this.method:"GET";
			if(httpMethod != "GET" && httpMethod != "POST"){
				httpMethod = "GET";
			}
			var httpParams = 
			(this.params == null || this.params == '')?null:this.params;
			var httpUrl = this.url;
			if(httpMethod == 'GET' && httpParams != null){
				httpUrl = httpUrl + "?" + httpParams;
			}
			//open: ajax을 하기위한 준비
			this.req.open(httpMethod,httpUrl,true);
			this.req.setRequestHeader
				("Content-Type","application/x-www-form-urlencoded");
			//this: ajx.xhr.Request 객체
			var request = this;
			//onreadystatechange: 콜백함수를 등록
			this.req.onreadystatechange = function(){
				request.onStateChange.call(request);
			}
			this.req.send(httpMethod=="POST"?httpParams:null);
		},
		onStateChange : function(){
			this.callback(this.req);	//callback 함수 호출
		}
}