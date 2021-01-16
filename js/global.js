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

///////////////////////////////////////////////////////////////



$(function () { ////////////jQb////////////////////////////////////
    console.log("로딩완료");
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

    // 반응형 usemap 설정
    $('img[usemap]').rwdImageMaps();
    
    
    
    /// 지도의 area클릭시 아래로 이동 및 매칭화면 보이기
    $(".global_2 area").click(function(e){
        
        e.preventDefault();
        
        var idx = $(this).index();
        console.log(idx);
        
        // 하단 상세 갤러리 생성하기
        $(".gbox").css({height: $(window).height()+"px"});
        
        // 스크롤 위치이동
        $("html,body").animate({
            scrollTop : $(window).height()*2+"px"
        },1000,"easeOutQuint");
        
        // 페이지 번호 업데이트!
        pno = 2;
        
        // 해당 순번 .gbox li보이기
        $(".gbox li").eq(idx).show()
        .siblings().hide();
        
        
        
        
    }); //////// click //////////////////
    
    ////// 미국 //////////////////////////////////////
     var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs
      }
    });
    
    
    ////// 중국 //////////////////////////////////////
     var galleryThumbs2 = new Swiper('.gallery-thumbs2', {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop2 = new Swiper('.gallery-top2', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs2
      }
    });
    
    ////// 일본 //////////////////////////////////////
     var galleryThumbs3 = new Swiper('.gallery-thumbs3', {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop3 = new Swiper('.gallery-top3', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs3
      }
    });
    


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