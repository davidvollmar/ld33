/**
 * Created by david on 3-11-2014.
 */

$(document).ready(function(){
    var canvas = $('#canvas')[0];

    var playerX = 10;
    var playerY = 10;
    var speed = 1;

    var maxSpeedForward = 10;
    var maxSpeedBackwards = 5;

    var ctx =  canvas.getContext('2d');

    var keyMap = [];
    paint();

    // todo replace with socket.io
    var ws = new WebSocket("ws://localhost:8080/websocket");

    ws.onerror = function(error){
        reopen();
    };

    ws.onclose = function(event){
        reopen();
    };

    // todo replace with socket.io
    function reopen(){
        ws = new WebSocket("ws://localhost:8080/websocket");
    }

    window.setInterval(tick,20)
    window.addEventListener("keydown",
        function(e){
            keyMap[e.keyCode] = e.keyCode;
        },
        false);

    window.addEventListener('keyup',
        function(e){
            keyMap[e.keyCode] = false;
        },
        false);

    function paint(){
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,800,900);

        var radius = 1 ;
        var rot = 0;

        var point1X = Math.round(radius * Math.cos(rot));
        var point1Y = Math.round(radius * Math.sin(rot));

        var point2X = Math.round(radius * Math.cos(rot + (3/4)*Math.PI));
        var point2Y = Math.round(radius * Math.sin(rot + (3/4)*Math.PI));

        var point3X = Math.round(radius * Math.cos(rot + (5/4)*Math.PI));
        var point3Y = Math.round(radius * Math.sin(rot + (5/4)*Math.PI));

        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.lineTo(point1X + playerX,point1Y + playerY);
        ctx.lineTo(point2X + playerX,point2Y + playerY);
        ctx.lineTo(point3X + playerX,point3Y + playerY);
        ctx.stroke();
        ctx.fill();
    }

    function tick(){
        paint();
        handleKeydown(keyMap);
        network();
    }

    function network(){
        if(ws.readyState === 1){// 1 -> connection is open
            var msg = {
                playerX: playerX,
                playerY: playerY,
            };
            console.log(msg);
            ws.send(JSON.stringify(msg));
        }
    }

    function getXDir(rot){
        return Math.round(speed*Math.cos(rot));
    }

    function getYDir(rot){
        return Math.round(speed*Math.sin(rot));
    }

    function resetGame(){
        playerX = 10;
        playerY = 10;
        speed = 1;
    }

    function handleKeydown(e){
        if (e[49]) { // 1
            console.log(1);
        } else if (e[50]) { // 2
            console.log(2);
        } else if (e[51]) { // 3
            console.log(3);
        } else if (e[52]) { // 4
            console.log(4);
        }



        if( e[87]) { // w
            playerY += 1;
            playerX += 1;
        } else if ( e[83]){ // s
            playerY -= getYDir(1);
            playerX -= getXDir(1);
        }
        if (e[68]) { // d
            // todo handle 'd'
        } else if (e[65]) { // a
            // todo handle 'a'
        }
        if (e[82]){ // r
            resetGame();
        }
    }
});