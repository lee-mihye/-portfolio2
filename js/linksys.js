/// GNB메뉴 링크 연결 JS - linksys.js ///

$(function(){ /////// jQB ///////////////////////
    console.log("로딩완료!");
    
    $(".gnb a, .ham_popup a").click(function(e){
        e.preventDefault();
        
        // a태그의 텍스트 읽어오기
        var txt = $(this).text();
        
        console.log("메뉴:"+txt);
        
        var pg;
        
        switch(txt){
            case "HISTORY": pg = "history.html"; break;
            case "CEO": pg = "ceo.html"; break;
            case "GLOBAL": pg = "global.html"; break;
        }////// switch case ////////
        
        // 페이지이동
        location.href = pg;
        
    });//////// click //////////////
    
    $(".logo a").click(function(e){
        e.preventDefault();
        location.href = "index.html";
    });////////// click //////////////
    
    
    
    
});////////// jQB ///////////////////////////////
/////////////////////////////////////////////////