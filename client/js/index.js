
/*
  Developed by farhad mehryari
  web : farhad-m.ir
  web : mrfarhad.ir
  telegram : @mrfarhad7
  email : farhadmehryari@gmail.com
*/
var myname = prompt("enter your name :");
var log=document.getElementById("log");
serverUrl = 'ws://127.0.0.1:8800/chat_ws/server/server.php';
if (window.MozWebSocket) {
    socket = new MozWebSocket(serverUrl);
} else if (window.WebSocket) {
    socket = new WebSocket(serverUrl);
}

  socket.binaryType = 'blob';
  socket.onopen = function(msg) {
    console.log("connected");
    sendmsg("save_name",myname);
      return true;
  };

  socket.onmessage = function(msg) {
    data=msg.data.split("**");
    switch (data[0]) {
      case 'new_join':
        friendData='<li><img width="50" height="50" src="img/user.png">';
          friendData+='<div class="info">';
            friendData+='<div class="user">'+data[1]+'</div>';
            friendData+='<div class="status on"> online</div>';
          friendData+='</div>';
        friendData+='</li>';
          $(".list-friends").append(friendData);
      break;

      case "online_list" :
        friendData='<li><img width="50" height="50" src="img/user.png">';
          friendData+='<div class="info">';
            friendData+='<div class="user">'+data[1]+'</div>';
            friendData+='<div class="status on"> online</div>';
          friendData+='</div>';
        friendData+='</li>';
          $(".list-friends").append(friendData);
      break;

      case "new_message" :
        $(".messages").append("<li class=\"friend-with-a-SVAGina\"><div class=\"head\"><span class=\"time\">" + (new Date().getHours()) + ":" + (new Date().getMinutes()) + " AM, Today</span><span class=\"name\"> " + data[1] + "</span></div><div class=\"message\">" + data[2] + "</div></li>");
      break;
      default:

    }
    console.log(data);
      return true;
  };
  socket.onclose = function(msg) {
    console.log("Bye Bye socket");
    return true;
  };

  function sendmsg(f,t)
  {
    socket.send(f+"**"+t);
  }

(function() {
  var NYLM, claerResizeScroll, conf, getRandomInt, insertI, lol;

  conf = {
    cursorcolor: "#696c75",
    cursorwidth: "4px",
    cursorborder: "none"
  };

  lol = {
    cursorcolor: "#cdd2d6",
    cursorwidth: "4px",
    cursorborder: "none"
  };




  claerResizeScroll = function() {
    $("#texxt").val("");
    $(".messages").getNiceScroll(0).resize();
    return $(".messages").getNiceScroll(0).doScrollTop(999999, 999);
  };

  insertI = function() {
    var innerText;
    innerText = $.trim($("#texxt").val());
    if (innerText !== "") {
      $(".messages").append("<li class=\"i\"><div class=\"head\"><span class=\"time\">" + (new Date().getHours()) + ":" + (new Date().getMinutes()) + " AM, Today</span><span class=\"name\"> "+myname+"</span></div><div class=\"message\">" + innerText + "</div></li>");
      claerResizeScroll();
      sendmsg("new_message",innerText);
    }
  };

  $(document).ready(function() {

    $("#myname").text(myname);
    $(".list-friends").niceScroll(conf);
    $(".messages").niceScroll(lol);
    $("#texxt").keypress(function(e) {
      if (e.keyCode === 13) {
        insertI();
        return false;
      }
    });
    return $(".send").click(function() {
      return insertI();
    });
  });

}).call(this);
//Developed By Farhad Mehryari
