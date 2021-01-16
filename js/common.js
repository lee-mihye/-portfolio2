$(function () { ////////////jQb////////////////////////////////////
    console.log("로딩완료");

    //////////// 팝업 띄우기 //////////////
    $(".ham").click(function () {
        $(".popup").css({
            display: "flex"
        });
    }); /////click/////

    /////////// 팝업 내리기 ///////////////
    $(".closebtn").click(function () {
        $(".popup").hide();
    }); /////click/////


    ///////////// HISTORY hover시 ////////////////
    $(".pop_history a").hover(
        function () { // over
            $(".ham_img1").css({
                opacity: 0
            });
            $(".ham_img2").css({
                opacity: 1
            });
        },
        function () { // out
            $(".ham_img1").css({
                opacity: 1
            });
            $(".ham_img2").css({
                opacity: 0
            });
        }); ////////hover////////////////


    ///////////// pop_ceo hover시 /////////////
    $(".pop_ceo a").hover(
        function () { // over
            $(".ham_img1").css({
                opacity: 0
            });
            $(".ham_img3").css({
                opacity: 1
            });
        },
        function () { // out
            $(".ham_img1").css({
                opacity: 1
            });
            $(".ham_img3").css({
                opacity: 0
            });
        }); ////////hover////////////////

    ///////////// pop_ceo hover시 /////////////
    $(".pop_global a").hover(
        function () { // over
            $(".ham_img1").css({
                opacity: 0
            });
            $(".ham_img4").css({
                opacity: 1
            });
        },
        function () { // out
            $(".ham_img1").css({
                opacity: 1
            });
            $(".ham_img4").css({
                opacity: 0
            });
        }); ////////hover////////////////

}); ////////////jQb//////////////////////////////////////////////
////////////////////////////////////////////////////////////////
