$(function(){
  //
  $("#requestjavaget").click(function(){
    $.ajax({
      charset:"UTF-8",
      url:'http://localhost:8088/requestget',
      data:{a:'你',b:'好'},
      type:'get',
      success :function(data){
        alert(JSON.stringify(data));
      },
      error:function(data){
        alert(JSON.stringify(data));
      }
    });
  });

  $("#requestget").click(function(){
    $.ajax({
      url:'/requestget',
      type:'get',
      success :function(data){
          alert(JSON.stringify(data));
      }
    });
  });
  $("#requestpost").click(function(){
    $.ajax({
      url:'/requestpost',
      type:'post',
      success :function(data){
        alert("success:"+JSON.stringify(data));
      },
      error :function(data){
        alert("error:"+JSON.stringify(data));
      }
    });
  });
}) ;
