// HISTORY 페이지 JS - history.js ///

// 1. 페이지번호
var pno_his = 0;

// 2. 전체 페이지 수
const totnum_his = 2;
// const는 변수 var와 달리 변경불가한 상수를 말한다!

// 3. 광스크롤 방지
var psts_his = 0; // (0-허용, 1-불허용)

// 4. 마우스휠 상태값
var mwsts_his = 0; // (0-허용, 1-불허용)

// 5. 화면 높이값
var winH_his = $(window).height();






$(function () { /////// jQB ///////////////////////
    console.log("로딩완료!");
    ///////////// 694px 부터 클래스 바꾸기
    if ($(window).width() < 695) {
        $(".header").addClass("on");
    } else {
        $(".header").removeClass("on");
    }


    // 새로고침시 강제로 맨위로 가기!(브라우져 위치값 캐싱때문~~!)
    $("html,body").delay(500).animate({
        scrollTop: "0px"
    }, 100, "easeInOutQuint");



    $(document).on("mousewheel DOMMouseScroll",
        function (e) {

            console.log("휠허용:" + mwsts_his);

            // 마우스 휠 모바일 막기
            if (mwsts_his) return true;

            ///////광스크롤 막기/////////////////////////
            if (psts_his === 1) return true; //돌아가!
            psts_his = 1; //잠금 (기존 0값을 변경)
            setTimeout(function () {
                psts_his = 0;
            }, 600); //////타임아웃////////
            ///////////////////////////////////////////

            // 1. 이벤트 발생 확인!
            console.log("휠~~~");


            // 2. 마우스휠에서 가장 중요한 개념
            e = window.event || e;

            var delta = e.detail ? e.detail : e.wheelDelta;
            // 변수 = 조건연산자 -> 조건연산자의 결과가 할당됨

            if (/Firefox/i.test(navigator.userAgent)) {
                //console.log("난파폭!");
                delta = -delta;
            } //////////////////////if문//////////////////////////////////

            //console.log("델타값" + delta);


            // 3. 마우스휠 방향에 따라 페이지번호 증감!

            // 음수일 때 아랫방향
            if (delta < 0) {
                pno_his++; //1씩증가

                // 한계페이지번호 마지막 번호에 고정!
                if (pno_his === totnum_his) pno_his = totnum_his - 1;
            } ///////if////////////

            // 양수일 때 윗방향
            else {
                pno_his--; //1씩감소

                // 한계페이지번호 첫번호에 고정!
                if (pno_his === -1) pno_his = 0;
            } /////else////////////////////
            //console.log("페이지번호:" + pno);

            // 4. 해당순번 페이지 높이값 구하기(top값)
            var pgpos = pno_his * winH_his;
            //console.log("이동페이지위치" + pgpos);

            // 5. 페이지 이동 애니메이션
            $("html,body").stop().animate({
                scrollTop: pgpos + "px"
            }, 600, "easeInOutQuint", function () {
                // 이동후 설정!
                // 첫페이지에서는 적용안됨
                if (pno_his !== 0) {

                    mwsts_his = 1; //휠막기
                    $("body").css({
                        overflow: "visible"
                    });
                } ///////// if ///////////
            });
            ///// animate //////////////////

            // 페이지 이동함수 바로 호출
            pageAction();


        }); /////////////mousewheel//////////////////



    // 스크롤시 실행상태값
    var sc_action = [];
    var sc_action2 = [];

    // 스크롤시 위치값
    var sc_pos = [];
    var sc_pos2 = [];

    // 스크롤액션 대상
    var sc_tg = $(".month_list");
    var sc_tgimg = $(".his_img");

    // 위치값 전후 gap
    var gap = 800; // 글자 gap
    var gap2 = 600; // 이미지 gap


    //console.log("글자스대:" + sc_tg.length);
    console.log("이미지스대:" + sc_tgimg.length);

    // 스크롤대상 위치값 셋팅
    for (var i = 0; i < sc_tg.length; i++) {
        // 위치값 셋팅
        sc_pos[i] = sc_tg.eq(i).offset().top;
        // 실행상태값 셋팅(각요소번호와 일치하는 실행상태값)
        // 0-실행전, 1-실행후(막기)
        sc_action[i] = 0;

    } /////////// for ////////////////

    for (var i = 0; i < sc_tgimg.length; i++) {
        // 위치값 셋팅
        sc_pos2[i] = sc_tgimg.eq(i).offset().top;
        // 실행상태값 셋팅(각요소번호와 일치하는 실행상태값)
        // 0-실행전, 1-실행후(막기)
        sc_action2[i] = 0;

    } /////////// for ////////////////

    //console.log("글자스위:" + sc_pos);
    console.log("이미지스위:" + sc_pos2);



    ///// 스크롤대상 초기화!
    // 글자
    sc_tg.find("li").css({
        position: "relative",
        top: "10px",
        left: "10px",
        opacity: 0
    }); /////// css /////////
    
    // 이미지
    sc_tgimg.find("img").css({
        position: "relative",
        top: "10px",
        left: "10px",
        opacity: 0
    }); /////// css /////////




    //// 스크롤 액션 함수 ///////////
    /// 글자 등장하기! ////////////
    /*////////////////////////////////
        함수명: scAction
        기능: 스크롤시 글자등장액션하기
    */ ////////////////////////////////
    var scAction = function (seq) { //seq-순번전달값
        //console.log("함수호출!");

        // 해당순번(seq)의 타겟이 실행됨!
        sc_tg.eq(seq).find("li").each(function (idx, ele) {

            $(ele).delay(100 * idx).animate({
                top: "0px",
                left: "0px",
                opacity: 1
            }, 500, "easeInOutSine"); /////// animate /////////

        }); /////////// each //////////////

    }; /////// scAction 함수 ////////////
    //////////////////////////////////



    //// 스크롤 액션 함수2 ///////////
    /// 이미지 등장하기! ////////////
    /*////////////////////////////////
        함수명: scAction2
        기능: 스크롤시 글자등장액션하기
    */ ////////////////////////////////
    var scAction2 = function (seq2) { //seq-순번전달값
        //console.log("함수호출!");

        // 해당순번(seq)의 타겟이 실행됨!
        sc_tgimg.eq(seq2).find("img").each(function (idx2, ele2) {

            $(ele2).delay(100 * idx2).animate({
                top: "0px",
                left: "0px",
                opacity: 1
            }, 500, "easeInOutSine"); /////// animate /////////
        }); /////////// each //////////////

    }; /////// scAction2 함수 ////////////
    //////////////////////////////////





    //// 스크롤 이벤트 체크하기 /////
    $(window).scroll(function () {

        console.log("스크롤시 휠허용:" + mwsts_his);
        // 마우스 휠 허용일때는 돌아가!
        if (mwsts_his === 0) return true;


        var scTop = $(this).scrollTop();
        console.log(scTop);

        // 스크롤 위치값이 첫번째 페이지 끝선보다 작으면
        // 다시 처음으로 이동함(아직 휠상태는 잠금상태임!)
        // 처음으로 이동후 휠잠금상태를 풀어줌(mwsts_his = 0)
        // 동시에 다시 overflow: "hidden"

        if (scTop < winH_his) {

            mwsts_his = 0; //휠풀기
            $("body").css({
                overflow: "hidden"
            });


            $("html,body").stop().animate({
                scrollTop: "0px"
            }, 600, "easeInOutQuint"); /// animate //////////

        } ///// if ///////////////


        /// 글자 등장액션 //////
        if (scTop > sc_pos[0] - gap &&
            scTop < sc_pos[0] &&
            sc_action[0] === 0) {

            sc_action[0] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(0);

        } ///////// if //////////////////////////
        else if (scTop > sc_pos[1] - gap &&
            scTop < sc_pos[1] &&
            sc_action[1] === 0) {

            sc_action[1] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(1);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[2] - gap &&
            scTop < sc_pos[2] &&
            sc_action[2] === 0) {

            sc_action[2] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(2);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[3] - gap &&
            scTop < sc_pos[3] &&
            sc_action[3] === 0) {

            sc_action[3] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(3);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[4] - gap &&
            scTop < sc_pos[4] &&
            sc_action[4] === 0) {

            sc_action[4] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(4);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[5] - gap &&
            scTop < sc_pos[5] &&
            sc_action[5] === 0) {

            sc_action[5] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(5);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[6] - gap &&
            scTop < sc_pos[6] &&
            sc_action[6] === 0) {

            sc_action[6] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(6);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[7] - gap &&
            scTop < sc_pos[7] &&
            sc_action[7] === 0) {

            sc_action[7] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(7);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[8] - gap &&
            scTop < sc_pos[8] &&
            sc_action[8] === 0) {

            sc_action[8] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(8);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[9] - gap &&
            scTop < sc_pos[9] &&
            sc_action[9] === 0) {

            sc_action[9] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(9);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[10] - gap &&
            scTop < sc_pos[10] &&
            sc_action[10] === 0) {

            sc_action[10] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(10);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[11] - gap &&
            scTop < sc_pos[11] &&
            sc_action[11] === 0) {

            sc_action[11] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(11);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[12] - gap &&
            scTop < sc_pos[12] &&
            sc_action[12] === 0) {

            sc_action[12] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(12);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[13] - gap &&
            scTop < sc_pos[13] &&
            sc_action[13] === 0) {

            sc_action[13] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(13);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[14] - gap &&
            scTop < sc_pos[14] &&
            sc_action[14] === 0) {

            sc_action[14] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(14);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos[15] - gap &&
            scTop < sc_pos[15] &&
            sc_action[15] === 0) {

            sc_action[15] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction(15);

        } ///////// else if //////////////////////////





        /// 이미지 등장액션 //////
        if (scTop > sc_pos2[0] - gap2 &&
            scTop < sc_pos2[0] &&
            sc_action2[0] === 0) {

            sc_action2[0] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(0);

        } ///////// if //////////////////////////
        else if (scTop > sc_pos2[1] - gap2 &&
            scTop < sc_pos2[1] &&
            sc_action2[1] === 0) {

            sc_action2[1] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(1);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[2] - gap2 &&
            scTop < sc_pos2[2] &&
            sc_action2[2] === 0) {

            sc_action2[2] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(2);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[3] - gap2 &&
            scTop < sc_pos2[3] &&
            sc_action2[3] === 0) {

            sc_action2[3] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(3);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[4] - gap2 &&
            scTop < sc_pos2[4] &&
            sc_action2[4] === 0) {

            sc_action2[4] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(4);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[5] - gap2 &&
            scTop < sc_pos2[5] &&
            sc_action2[5] === 0) {

            sc_action2[5] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(5);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[6] - gap2 &&
            scTop < sc_pos2[6] &&
            sc_action2[6] === 0) {

            sc_action2[6] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(6);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[7] - gap2 &&
            scTop < sc_pos2[7] &&
            sc_action2[7] === 0) {

            sc_action2[7] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(7);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[8] - gap2 &&
            scTop < sc_pos2[8] &&
            sc_action2[8] === 0) {

            sc_action2[8] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(8);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[9] - gap2 &&
            scTop < sc_pos2[9] &&
            sc_action2[9] === 0) {

            sc_action2[9] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(9);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[10] - gap2 &&
            scTop < sc_pos2[10] &&
            sc_action2[10] === 0) {

            sc_action2[10] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(10);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[11] - gap2 &&
            scTop < sc_pos2[11] &&
            sc_action2[11] === 0) {

            sc_action2[11] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(11);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[12] - gap2 &&
            scTop < sc_pos2[12] &&
            sc_action2[12] === 0) {

            sc_action2[12] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(12);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[13] - gap2 &&
            scTop < sc_pos2[13] &&
            sc_action2[13] === 0) {

            sc_action2[13] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(13);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[14] - gap2 &&
            scTop < sc_pos2[14] &&
            sc_action2[14] === 0) {

            sc_action2[14] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(14);

        } ///////// else if //////////////////////////
        else if (scTop > sc_pos2[15] - gap2 &&
            scTop < sc_pos2[15] &&
            sc_action2[15] === 0) {

            sc_action2[15] = 1; //한번만 실행!
            // 액션함수 호출!
            scAction2(15);

        } ///////// else if //////////////////////////

    }); ////// scroll //////////////////



}); ////////// jQB ///////////////////////////////
/////////////////////////////////////////////////


/*//////////////////////////////////////////////
    함수명: pageAction
    기능: 페이지 이동 후 액션주기
*/ //////////////////////////////////////////////
function pageAction() {
    // pno가 0(첫페이지)일때 class "on"제거
    if (pno_his === 0) {
        $(".header").removeClass("on");
    } ///  if ////////////////
    else { // 나머지 페이지에서는 class 넣기
        $(".header").addClass("on");
    } ///// else ///////////


} ////// pageAction 함수 //////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
