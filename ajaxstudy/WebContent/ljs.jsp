<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<fmt:requestEncoding value="UTF-8"/>
<!-- Connection ��ü ����� -->
<sql:setDataSource var="conn" driver="org.mariadb.jdbc.Driver"
	url="jdbc:mariadb://localhost:3306/classdb"
	user="scott" password="4151"/>
<sql:query var="rs" dataSource="${conn}">
	select * from professor where ${param.st} like ?
	<sql:param>%${param.find}%</sql:param>
</sql:query>
<table border="1" style="border-collapse: collapse;">
<tr><th>������ȣ</th><th>�̸�</th><th>���̵�</th><th>�޿�</th><th>�Ի���</th><th>����</th></tr>
<c:forEach var="data" items="${rs.rows }">
<tr><td>${data.profno}</td><td>${data.name}</td><td>${data.id}</td>
<td>${data.salary}</td><td>${data.hiredate}</td><td>${data.position }</td></tr>
</c:forEach></table>