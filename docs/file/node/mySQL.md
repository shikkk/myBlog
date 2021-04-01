# mySql

## mySql下载
* mysql 工具下载<https://dev.mysql.com/downloads/mysql/>
* mysql workbench 可视化客户端工具<https://dev.mysql.com/downloads/workbench/>  
**初始状态：**
* 用户名：root
* 密码：12345678  
## 基本使用
命令|解释
--|:--|
show databases;|显示所有数据库|
use myblog;| 显示（myblog项目）数据库|
show tables;| 显示（myblog项目）中的表|
 -- show tables| 注释代码|

### mySql增删改查
1. 增
```js
insert into users(username,password,name) values ('zk','123456','志凯')  
```
2. 查
```javascript
// 查询users表中的所有列  尽量不适用* ，会耗费性能
select * from users;
// 查询users表中的所有的 id和username 
select  id,username from users; 
// 查询users表中的 username="zk" 的数据   where为条件关键词 
select  * from users  where username="zk"; 
// 查询users表中的 username="zk" 和 password="123456"  的数据 
// and  为并且   or  或者 
select  * from users  where username="zk" and password="123456"
// 模糊查询users表中的 username带z 的数据 
select  * from users  where username like "%z%";
// 查询id为正序的数据
select  * from users  where username like "%z%"  order by id 
// 查询id为倒序的数据
select  * from users  where username like "%z%"  order by id  desc
```
3. 改
```javascript
SET SQL_SAFE_UPDATES = 0;   //解决执行报错问题  删除、更新都会发生

update  users set `name`='石志凯' where username='zk';
```
4. 删除
```javascript
delete from users where username='zk'
```
### 查询mysql版本
```javascript
select version();
```

### node-mysql
1. 安装mysql
```javascript
npm install mysql
```

2. 连接mysql会报错,node8.00以上

* sqlMessage: <font color=red>'Client does not support authentication protocol requested by server; consider upgrading MySQL client'</font>
* 解决-命令行输入：
    1. ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
    2. 刷新：FLUSH PRIVILEGES;
