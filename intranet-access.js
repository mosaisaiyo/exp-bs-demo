/**
 * http://usejsdoc.org/
 */

var app=require("express")();
//接收来自用户的任何请求
app.use(function(req,res){
    res.write("云服务，助力企业成功！");
    res.end();
});

//port写端口号，ip写ip地址，
app.listen('3000','10.130.78.187',function(err){
    if(err){
        console.error(err);
    }else {
        console.info("服务器起动成功..");
    }
});