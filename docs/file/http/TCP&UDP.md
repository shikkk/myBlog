# TCP和UDP

<div style="width: 50px">类型</div>|TCP|UDP
:--|:--|:--|
名称|面向连接的可靠传输|无连接的不可靠传输
介绍|建立需要三次握手，为了确保双方能够确实建立起稳定的传输通道|数据想发就发，随时可发。它不关心自己的数据对方有没有接收到
连接个数|一对一|一对一，一对多，多对一和多对多交互通信
头部开销|20个字节|8个字节，UDP会比TCP更高效
传输方式|面向报文|面向字节流
应用|文件传输，对可靠性和稳定性要求高的|网络电话、视频会议和在线直播等