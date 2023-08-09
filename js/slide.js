(function($){
    const obj = {    
        init: function(){       
            this.header();
            this.section1();
            this.section2();
            this.section3(); 
        },                      
        header(){},
        section1(){
            let cnt = 0;
            let setId = 0;
            let mouseDown = null;
            let mouseUp = null;
            let dragStart = null;
            let dragEnd = null;
            let mDown = false;
            let winW = $(window).innerWidth();
            let sizeX = winW / 2;            
            

            // const slideContainer = $('#section1 .slide-container');
            const nextBtn = $('#section1 .next-btn');            
            const prevBtn = $('#section1 .prev-btn');
            const slideWrap = $('#section1 .slide-wrap');
            const slideView = $('#section1 .slide-view');
            const slideImg = $('#section1 .slide img');
            const pageBtn = $('#section1 .page-btn');
            const stopBtn = $('#section1 .stop-btn');
            const playBtn = $('#section1 .play-btn');                        
            const n = ($('#section1 .slide').length-2)-1;
            const imgRate = 1.6110761485210825;  /* slideImg.innerWidth() / winW; */  // 창너비(1903)에 대한 이미지(2560) 비율 구하는 법 -> 이때 비율값은 변수가 아닌 상수로 적어야 한다.
            const imgTranRate = 0.1265625;  // 이미지(2560) 크기에 대한 -translateX(-값)의 비율 = transform: translateX(-324px);

            
             
            // console.log('슬라이드 이미지 너비' + slideImg.innerWidth());  2560
            // console.log('슬라이드 이미지 비율' + imgRate);  1.4504249291784703
            // transform: translateX(-324px);

            // 슬라이드 이미지 크기조절 => 창 크기에 반응하는 이미지 크기
            let x = (imgRate * winW) * imgTranRate;
            slideImg.css({width: imgRate * winW, transform: `translateX(${-x}px)` });

            // console.log(imgRate * winW);
            // console.log( winW);
            // console.log( imgRate);

            // 창크기에 자동으로 반응하는 이미지 크기와 translateX
            $(window).resize(function(){
                winW = $(window).innerWidth();
                x = (imgRate * winW) * imgTranRate;
                slideImg.css({width: imgRate * winW, transform: `translateX(${-x}px)` });
            });  // resize = 크기가 1px만 변해도 자동으로 반응하는 키워드



            slideView.on({
                mousedown(e){
                    let winW = $(window).innerWidth();
                    sizeX = winW / 2;  
                    mouseDown = e.clientX;
                    dragStart = e.clientX - (slideWrap.offset().left + winW);
                    mDown = true;
                    slideView.css({cursor: 'grabbing' });
                },
                mouseup(e){ 
                    mouseUp = e.clientX;
                    if(mouseDown-mouseUp > sizeX){  
                        clearInterval(setId);  
                        if(!slideWrap.is(':animated')){  
                            nextCount();
                        }
                    }

                    if(mouseDown-mouseUp < -sizeX){ 
                        clearInterval(setId);   
                        if(!slideWrap.is(':animated')){ 
                            prevCount();
                        }                       
                    }  
                    if ( mouseDown - mouseUp >= -sizeX && mouseDown - mouseUp <= sizeX ) {
                        mainSlide();
                    }          
                    mDown = false;
                    slideView.css({cursor: 'grab' });                    
                },
                
                mousemove(e){
                    dragEnd = e.clientX;
                    if(!mDown) return;
                    slideWrap.css({left: dragEnd - dragStart});
                }
            });

            $(document).on({
                mouseup(e){ 
                    if(!mDown) return;
                    mouseUp = e.clientX;
                    if(mouseDown-mouseUp > sizeX){  
                        clearInterval(setId);  
                        if(!slideWrap.is(':animated')){  
                            nextCount();
                        }
                    }

                    if(mouseDown-mouseUp < -sizeX){ 
                        clearInterval(setId);   
                        if(!slideWrap.is(':animated')){ 
                            prevCount();
                        }                       
                    }  
                              
                    mDown = false;
                    slideView.css({cursor: 'grab' });                    
                }
            });

            nextBtn.on({
                click(){                  
                    if(!slideWrap.is(':animated')){  
                        nextCount();
                    }
                    clearInterval(setId);
                }
            });
            prevBtn.on({
                click(){
                    if(!slideWrap.is(':animated')){ 
                        prevCount();
                    }
                    clearInterval(setId);
                }
            });

            function mainSlide(){
                slideWrap.stop().animate({left: `${-100 * cnt}%`}, 600, 'easeInOutExpo', function(){
                    if(cnt>n){cnt=0}
                    if(cnt<0){cnt=n}
                    slideWrap.stop().animate({left: `${-100 * cnt}%`}, 0);
                });  
                pageEvent();
            }

            function nextCount(){
                cnt++;
                mainSlide();
            }

            function prevCount(){
                cnt--;
                mainSlide();
            }

            function autoTimer(){
                setId = setInterval(nextCount, 7000);
                clearInterval(setId);
            }
            autoTimer();

            function pageEvent(){
                pageBtn.removeClass('on');
                pageBtn.eq(cnt > n ? 0 : cnt).addClass('on');
            }
 
            pageBtn.each(function(idx){
                console.log( idx );
                $(this).on({
                    click(e){
                        e.preventDefault();
                        cnt=idx;
                        mainSlide();
                        clearInterval(setId);
                        
                    }
                });
            });

            stopBtn.on({
                click(e){
                    e.preventDefault();
                    stopBtn.addClass('on');
                    playBtn.addClass('on');
                    clearInterval(setId);
                }
            });
            playBtn.on({
                click(e){
                    e.preventDefault();
                    stopBtn.removeClass('on');
                    playBtn.removeClass('on');
                    autoTimer(); 
                }
            });

        },
        section2(){
            let cnt = 0;
            let touchStart = null;
            let touchEnd = null;
            let dragStart = null;
            let dragEnd = null;
            let mDown = false;
            let sizeX = 300;
            

            const slideContainer = $('#section2 .slide-container'); 
            const section2container = $('#section2 .container');   
            const nextBtn = $('#section2 .next-btn'); 
            const prevBtn = $('#section2 .prev-btn'); 
            const slideWrap = $('#section2 .slide-wrap'); 
            const slideView = $('#section2 .slide-view'); 
            const slide = $('#section2 .slide-view .slide');
            const slideH3 = $('#section2 .slide-view .slide h3'); 
            const slideH4 = $('#section2 .slide-view .slide h4'); 
            const pageBtn = $('#section2 .page-btn');  
            const selectBtn = $('#section2 .select-btn');  
            const subMenu = $('#section2 .sub-menu');  
            const materialIcons = $('#section2 .select-btn .material-icons');  
            const heightRate = 0.884545392;

            let offsetL = slideWrap.offset().left;
            let slideWidth;
            let winW = $(window).innerWidth();
            section2container.innerWidth();  

            resizeFn();  // 로딩 시 한 번 실행, 함수는 명령어의 묶음이다.
            function resizeFn(){
                winW = $(window).innerWidth();                    
                // 창너비(winW)가  // 1642px 이하에서 패딩 좌측값 0으로 설정
                if(winW <= 1642){                          
                    if(winW > 1280){   // 1280px 초과에서는 슬라이드가 3개
                        slideWidth = (section2container.innerWidth()+(20+20))/3;
                    }   
                    else{   // 1280px 이하에서는 슬라이드가 3개에서 1개로 바뀜
                        slideWidth = (section2container.innerWidth()+(20+20))/1;
                    }                               
                }
                else{  // 이하 winW <= 1642
                    slideWidth = (section2container.innerWidth()-198+20+20)/3; 
                }
                
                slideWrap.css({width: slideWidth*10}); 
                slide.css({width: slideWidth, height: slideWidth * heightRate}); 
                slideH3.css({fontSize: slideWidth*0.07}); 
                slideH4.css({fontSize: slideWidth*0.03}); 
                mainSlide();  // 메인슬라이드에 너비 전달하기 위해 가져옴
            }
            
            // 가로 세로 크기가 1px만 변경되도 실행된다.
            // 크기가 변경되지 않으면 실행하지 않는다. 
            $(window).resize(function(){                
                resizeFn();
            });


            slideContainer.on({
                mousedown (e){
                    slideView.css({cursor: 'grabbing' });
                    mDown = true;
                    touchStart = e.clientX;                                   
                    dragStart = e.clientX - (slideWrap.offset().left - offsetL);
                },
                mouseup (e){
                    slideView.css({cursor: 'grab' });                    
                    touchEnd = e.clientX;
                    if(touchStart-touchEnd > sizeX){
                        nextCount();
                    }
                    if(touchStart-touchEnd < -sizeX){
                        prevCount();
                    }
                    if ( touchStart - touchEnd >= -sizeX && touchStart - touchEnd <= sizeX) {
                        mainSlide();
                    }
                    mDown = false;                    
                },
                mousemove(e) {
                    if(!mDown) return;
                    dragEnd = e.clientX;
                    slideWrap.css({left: dragEnd - dragStart});
                }
            });

            $(document).on({
                mouseup (e){
                    if(!mDown) return; 
                    slideView.css({cursor: 'grab' });                    
                    touchEnd = e.clientX;
                    if(touchStart-touchEnd > sizeX){
                        nextCount();
                    }
                    if(touchStart-touchEnd < -sizeX){
                        prevCount();
                    }
                    mDown = false;     
                    if ( touchStart - touchEnd >= sizeX && touchStart - touchEnd <= sizeX) {
                        mainSlide();
                    }
               
                }
            });

            selectBtn.on({
                click(e){
                    subMenu.toggleClass('on');       
                    materialIcons.toggleClass('on'); 
                    e.preventDefault();
                }
            });
            
            mainSlide();
            function mainSlide(){                
                slideWrap.stop().animate({left: -slideWidth * cnt }, 600, 'easeInOutExpo');                
                pageBtnEvent();
            }

            function nextCount(){
                cnt++;
                if(cnt > 7) {cnt=7};
                mainSlide();
            }

            function prevCount(){
                cnt--;
                if(cnt < 0) {cnt=0};
                mainSlide();
            }

            pageBtn.each(function(idx){
                $(this).on({
                    click(e){
                        e.preventDefault();  
                        console.log(idx);
                        cnt=idx;
                        mainSlide();
                    }
                })
            });

            function pageBtnEvent(){   
                pageBtn.removeClass('on');  
                pageBtn.eq(cnt).addClass('on');  
            }
        },
       section3(){}
    } 
    obj.init();
})(jQuery); 
