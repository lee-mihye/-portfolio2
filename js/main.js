////////////////////////// 전역변수 ////////////////////////////

// 1. 페이지번호
var pno = 0;

// 2. 전체 페이지 수
const totnum = 4;
// const는 변수 var와 달리 변경불가한 상수를 말한다!

// 3. 광스크롤 방지
var psts = 0; // (0-허용, 1-불허용)

// 4. 마우스휠 상태값
var mwsts = 0; // (0-허용, 1-불허용)





/// 스와이퍼 미디어쿼리 ///
var mob = 0;
if ($(window).width() < 1025) mob = 1;
if ($(window).width() < 1000) mob = 2;
if ($(window).width() < 695) mob = 3;
console.log("모바일:" + mob);

/// 모바일상태(mob===2)일때 마우스휠 불허용상태 변경
if (mob === 3) mwsts = 1;
if (mob === 2) mwsts = 1;

console.log("마우스휠허용상태:" + mwsts);

var perN = 4;
if (mob === 1) perN = 3;
if (mob === 2) perN = 2;
if (mob === 3) perN = 1;
console.log("개수:" + perN);

$(window).resize(function () {
    mob = 0;
    if ($(window).width() < 1025) mob = 1;
    if ($(window).width() < 800) mob = 2;
    if ($(window).width() < 695) mob = 3;
    console.log("모바일:" + mob);

    perN = 4;
    if (mob === 1) perN = 3;
    if (mob === 2) perN = 2;
    if (mob === 3) perN = 1;
    console.log("개수:" + perN);

    swiper = new Swiper('.swiper-container', {
        slidesPerView: perN,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

});

///////////////////////////////////////////////////////////////



$(function () { ////////////jQb////////////////////////////////////
    console.log("로딩완료");

    // 새로고침시 강제로 맨위로 가기!(브라우져 위치값 캐싱때문~~!)
    $("html,body").delay(500).animate({
        scrollTop: "0px"
    }, 100, "easeInOutQuint");


    // 배너 슬라이드 넘기기
    var slide = $(".ban_list");
    setInterval(function () {

        slide.animate({
            left: "-100%"
        }, 400, function () {
            slide.append(slide.find("div").first())
                .css({
                    left: "0"
                });
        }); /////animate/////
    }, 3000);


    $(document).on("mousewheel DOMMouseScroll",
        function (e) {

            // 마우스 휠 모바일 막기
            if (mwsts) return true;

            ///////광스크롤 막기/////////////////////////
            if (psts === 1) return true; //돌아가!
            psts = 1; //잠금 (기존 0값을 변경)
            setTimeout(function () {
                psts = 0;
            }, 600); //////타임아웃////////
            ///////////////////////////////////////////

            // 1. 이벤트 발생 확인!
            //console.log("휠~~~");


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
                pno++; //1씩증가

                // 한계페이지번호 마지막 번호에 고정!
                if (pno === totnum) pno = totnum - 1;
            } ///////if////////////

            // 양수일 때 윗방향
            else {
                pno--; //1씩감소

                // 한계페이지번호 첫번호에 고정!
                if (pno === -1) pno = 0;
            } /////else////////////////////
            //console.log("페이지번호:" + pno);

            // 4. 해당순번 페이지 높이값 구하기(top값)
            var pgpos = $(".page").eq(pno).offset().top;
            //console.log("이동페이지위치" + pgpos);

            // 5. 페이지 이동 애니메이션
            $("html,body").stop().animate({
                scrollTop: pgpos + "px"
            }, 600, "easeInOutQuint");
            ///// animate //////////////////

            // 페이지 이동함수 바로 호출
            pageAction();
        }); /////////////mousewheel//////////////////

    
    ///////////// 694px 부터 클래스 바꾸기
    if ($(window).width() < 695) {
        $(".header").addClass("on");
    } else {
        $(".header").removeClass("on");
    }

    //////////// 스와이퍼 플러그인/////////////
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: perN,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // 오른쪽 이동버튼 클릭시
    $(".rb").click(function () {
        swiper.slideNext();
    }); ///////// click ////////////

    // 왼쪽 이동버튼 클릭시
    $(".lb").click(function () {
        swiper.slidePrev();
    }); ///////// click ////////////


    ////// 설명박스 폭 변경하기 /////////////

    // 변경대상: .cont_txt
    var ctxt = $(".cont_txt");

    // 스와이퍼 ul 높이값 : H
    var H = $(".swiper-wrapper").height();
    // 스와이퍼 li 가로값 : W
    var W = $(".swiper-slide").eq(0).width();
    console.log("높이:" + H);
    console.log("폭:" + W);

    // 변경폭 : x
    var x = 370 * H / 670
    console.log("적용여부:" + (W > 370));

    // 이미지 폭보다 클때만 적용!
    if (W > 370) {

        console.log("변경폭:" + x);
        // 변경적용
        ctxt.css({
            width: x + "px"
        }); ///// css /////////////////////////

    }

    // 스와이퍼 설명 박스 동적 가로 폭 구하기
    // 이미지비율 = 가로 : 세로 = 370 : 670
    // li박스비율 = 가로 : 세로 = x : H
    // 비례식 x = 370*H/670

    // 브라우저 크기 변경시에도 적용함!
    $(window).resize(function () {
        ////// 설명박스 폭 변경하기 /////////////

        // 스와이퍼 li 높이값
        H = $(".swiper-wrapper").height();
        W = $(".swiper-slide").eq(0).width();
        console.log("높이:" + H);
        console.log("폭:" + W);


        // 목표는 이미지 비례식에 맞게 설명박스의 가로 폭을 변경한다.
        // x = 370*H/670
        x = 370 * H / 670
        console.log("변경폭:" + x);

        console.log("적용여부:" + (W > 370));
        // 이미지 폭보다 클때만 적용!
        if (W > 370) {

            console.log("변경폭:" + x);
            // 변경적용
            ctxt.css({
                width: x + "px"
            }); ///// css /////////////////////////
        }

        var sungmin = $(window).width();
        console.log(sungmin + "나오냐오");


        if ($(window).width() < 695) {
            $(".header").addClass("on");
        }






    }); ///////// resize ///////////




}); ////////////jQb//////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*//////////////////////////////////////////////
    함수명: pageAction
    기능: 페이지 이동 후 액션주기
*/ //////////////////////////////////////////////
function pageAction() {
    // pno가 0(첫페이지)일때 class "on"제거
    if (pno === 0) {
        $(".header").removeClass("on");
    } ///  if ////////////////
    else { // 나머지 페이지에서는 class 넣기
        $(".header").addClass("on");
    } ///// else ///////////


} ////// pageAction 함수 //////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
