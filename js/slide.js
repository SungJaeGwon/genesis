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
            

            const nextBtn = $('#section1 .next-btn');            
            const prevBtn = $('#section1 .prev-btn');
            const slideContainer = $('#section1 .slide-container');
            const slideWrap = $('#section1 .slide-wrap');
            const slideView = $('#section1 .slide-view');
            const slideImg = $('#section1 .slide img');
            const pageBtn = $('#section1 .page-btn');
            const stopBtn = $('#section1 .stop-btn');
            const playBtn = $('#section1 .play-btn');                        
            const n = ($('#section1 .slide').length-2)-1;
            const imgRate = 1.6110761485210825;  
            const imgTranRate = 0.1265625; 
            let x = (imgRate * winW) * imgTranRate;

            slideImg.css({width: imgRate * winW, transform: `translateX(${-x}px)` });

            $(window).resize(function(){
                winW = $(window).innerWidth();
                x = (imgRate * winW) * imgTranRate;
                slideImg.css({width: imgRate * winW, transform: `translateX(${-x}px)` });
            }); 


            // 터치스와이프
            // 마우스 터치 스와이프(데스크탑)
            // 드래그 앤 드롭까지 추가
            slideContainer.on({
                touchstart(e){    /* 마우스에서 터치로 바꾸기 */
                    let winW = $(window).innerWidth();
                    sizeX = winW / 3;  
                    mouseDown = e.originalEvent.changedTouches[0].clientX;    /* 기존 e.clientX를 e.originalEvent.changedTouches[0].clientX;로 변경  */
                    dragStart = e.originalEvent.changedTouches[0].clientX - (slideWrap.offset().left + winW);
                    mDown = true;
                    slideView.css({cursor: 'grabbing' });
                },
                touchend(e){    /* 마우스에서 터치로 바꾸기 */
                    mouseUp = e.originalEvent.changedTouches[0].clientX;
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
                
                touchmove(e){   /* 마우스에서 터치로 바꾸기 */
                    dragEnd = e.originalEvent.changedTouches[0].clientX;
                    if(!mDown) return;
                    slideWrap.css({left: dragEnd - dragStart});
                }
            });

            // 데스크톱 도큐먼트 예외처리
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

            // ★손가락 터치 이벤트 확인하기 => 태블릿과 모바일에서만 이벤트가 실행된다. (테스트하기)
            // slideContainer.on({
            //     touchstart(e){          /* 이벤트는 카멜케이스 불가 무조건 소문자 */
            //         console.log(e.originalEvent.changedTouches[0].clientX);  // ★모바일에서 clientX의 좌표 가져오는 방법 -> 데스트톱은 (e.clientX)
            //     },     
            //     touchend(e){
            //         console.log(e.originalEvent.changedTouches[0].clientX);  // ★모바일에서 clientX의 좌표 가져오는 방법 -> 데스트톱은 (e.clientX)
            //     },
            //     touchmove(e){
            //         console.log(e.originalEvent.changedTouches[0].clientX);
            //     }
            // });
            // 확인하는 순서 : 라이브 서버로 열기 -> F12 반응형으로 켜기 -> 먼저 console.log(e);로 이벤트 발생시키기 -> 콘솔 아래 뜨는거 체크 -> originalEvent와 changedTouches를 가져오고 [0]은 배열, -> console.log(e.originalEvent.changedTouches[0].clientX); 이렇게 콘솔로 좌표값 뜨는지 확인 -> mouseup, end, move를 touchstart, end, move로 바꾸기


           // 테블릿 & 모바일 : 손가락(핑거링) 드래그앤드롭
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
            let sizeX = 100;
            

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
            
            let n = slide.length-2;  // 슬라이드 전체 개수는 8개가 된다.
            let offsetL = slideWrap.offset().left;
            let slideWidth;
            
            let winW = $(window).innerWidth();
            section2container.innerWidth();  

            resizeFn();  
            function resizeFn(){
                winW = $(window).innerWidth();                    
                if(winW <= 1642){                          
                    if(winW > 1280){   // 화면에 보이는 슬라이드 개수는 3개 
                        slideWidth = (section2container.innerWidth()+(20+20))/3;
                        n = slide.length-2;  /* 변수를 등록 */  //10/1-2 = 8
                        //페이지버튼 제어(개수) 8개인 경우 / 10개인 경우
                        pageBtn.css({ display: 'none' });  // 10개 모두 숨김
                        for(let i=0; i<n; i++){
                            pageBtn.eq(i).css({ display: 'block' });   /* 페이지 버튼 9번째 10째가 안보임 즉, 8개만 보임*/
                        }   
                        // cnt = 0;  
                        if(cnt>=n-1) {  // 7
                            cnt = n-1;
                        }
                    }   
                    else{   
                        slideWidth = (section2container.innerWidth()+(20+20))/1;
                        n = slide.length;   /* 변수를 등록 */  //10/1
                        pageBtn.css({ display: 'block' }); /* 페이지 버튼이 모두 보여라 */
                        // for(let i=0; i<n; i++){
                        //     pageBtn.eq(i).css({ display: 'block' });   /* 페이지 버튼 9번째 10째가 보임 즉, 10개가 모두 보임*/
                        // }
                    }                               
                }
                else{ // 1642보다 큰 경우 8개만 보여라
                    slideWidth = (section2container.innerWidth()-198+20+20)/3; 
                    pageBtn.css({ display: 'none' });  // 10개 모두 숨김
                        for(let i=0; i<n; i++){
                            pageBtn.eq(i).css({ display: 'block' });   /* 페이지 버튼 9번째 10째가 안보임 즉, 8개만 보임*/
                        }
                }
                
                slideWrap.css({width: slideWidth*10}); 
                slide.css({width: slideWidth, height: slideWidth * heightRate}); 
                slideH3.css({fontSize: slideWidth*0.07}); 
                slideH4.css({fontSize: slideWidth*0.03});
                
                
                mainSlide();  
            }

            $(window).resize(function(){                
                resizeFn();
            });

            // 데스크탑 터치 스와이프 & 드래그앤 드롭
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

            // 태블릿, 모바일 터치 스와이프 & 드래그앤 드롭
            slideContainer.on({     /* slideContainer 복사해오기 */
                touchstart (e){     /* mouse를 터치로 바꾸기 */
                    slideView.css({cursor: 'grabbing' });
                    mDown = true;
                    touchStart = e.originalEvent.changedTouches[0].clientX;          /* originalEvent.changedTouches[0].를 clientX 앞에 붙여넣기  */                         
                    dragStart = e.originalEvent.changedTouches[0].clientX - (slideWrap.offset().left - offsetL);
                },
                touchend (e){
                    slideView.css({cursor: 'grab' });                    
                    touchEnd = e.originalEvent.changedTouches[0].clientX;
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
                touchmove(e) {
                    if(!mDown) return;
                    dragEnd = e.originalEvent.changedTouches[0].clientX;
                    slideWrap.css({left: dragEnd - dragStart});
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
                if(cnt > n-1) {cnt=n-1};  /* if(cnt > 7) {cnt=7}; 를 변수로 변경해야함 */
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
