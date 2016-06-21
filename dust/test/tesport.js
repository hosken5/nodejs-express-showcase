var portscanner = require('portscanner');
var times = 0 ;
//
// var loop =  setInterval(function(){
//     portscanner.checkPortStatus(3000, '127.0.0.1', function(error, status) {
//         if(status=='open'){
//             console.log('open');
//         }else{
//             console.log('closed');
//         }
//         // Status is 'open' if currently in use or 'closed' if available
//         times++ ;
//     })
// },10) ;

(function sleep(sleepTime) {
    for(var start = +new Date; +new Date - start <= sleepTime; ) { }
})(5000)

// sleep(10000);