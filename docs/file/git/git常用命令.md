# git常用命令

命令|备注
--|:--|
status|查看状态
branch|查看分支列表
branch -r|查看远程主机分支
checkout|切换分支
checkout -b|新建本地分支
commit -m|提交代码到主机
log|查看提交记录
merge|合并代码：历史log不清晰，会污染merge信息
rebase|合并代码：历史log清晰，一条线
stash|未修改好的代码储存起来
stash pop|释放储存器的代码
stash list|查看stash列表
diff|代码对比
remote -v|查找远程url
remote set-url origin xxxxxx|替换远程url
fetch|更新远程主机全部取回本地
show-ref|显示所有分支、tags列表

### merge和rebase区别
* merge
    1. 会记录下合并动作,很多时候这些合并产生的是垃圾信息
    2. 不会修改commit id
    3. 冲突只解决一次
    4. 分支看着不太整洁，但能看出来合并的先后顺序
    5. 记录真实的commit情况，包括每个分支的详情
    * **特点**：自动创建一个新的commit，当合并时遇到冲突，修改后重新commit即可
    * **有点**：将commit的实际情况进行记录，便于以后查看
    * **缺点**：由于每次merge会自动产生一个merge commit，这样会使得feature分支很杂乱
* rebase
    1. 改变当前分支的branch out位置
    2. 项目历史更整洁明了
    3. 每个commit都需要解决冲突
    4. 修改了所有的commit id
    * **特点**：将commit历史进行合并
    * **有点**：将项目历史比较简单，少了merge commit
    * **缺点**：当发生冲突时不容易定位问题
        * 如果出现冲突如下解决
            1. 修改冲突部分
            2. git add
            3. `git rebase --continue`
            4.  如果3不行，`git rebase --skip`
