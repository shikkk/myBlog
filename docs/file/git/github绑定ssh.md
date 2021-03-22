# github绑定ssh

## 1.生成ssh（window）
* 右键桌面，选择 Git Bash Here
* 输入 ssh-keygen
* 一路回车生成ssh
* 会在：C:\Users\用户名\.ssh\ 目录下生成两个文件：
    + 私钥：id_rsa 必须要放在自己的电脑上
    + 公钥：id_rsa.pub 放到 GitHub上。
    
## 2. 把公钥配置到 GitHub
* 登陆 GitHub => Settings => SSH and GPG keys => New SSH key
* 然后直接把我们刚刚生成的 id_rsa.pub 文件打开，复制里边的全部内容，放到 Key 文本框内
