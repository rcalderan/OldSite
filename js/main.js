
;(function () {
    if ($(window).width() < 992){
        $('nav').hide();
    }
    /*top click*/
    var goToTop = function() {
        
        $('#nm-top').on('click', function(event){
            
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $('html').offset().top
            }, 500);
            
            return false;
        });    
    };
    
    var clickMenu = function() {
        
        $('#navbar a:not([class="external"])').click(function(event){
            var section = $(this).data('nav-section'),
            navbar = $('#navbar');
            if ( $('[data-section="' + section + '"]').length ) {
                $('html, body').animate({
                    scrollTop: $('[data-section="' + section + '"]').offset().top
                }, 500);
            }            
            if ( navbar.is(':visible')) {
                navbar.removeClass('in');
                navbar.attr('aria-expanded', 'false');
                $('.js-fh5co-nav-toggle').removeClass('active');
            } 
            event.preventDefault();
            return false;
        });    
    };
    
    /*Galeria*/
    $('#gale-avan').click(function(){
            alert('Avanca');
        });
    $('#gale-volt').click(function(){
            $.ajax({
            type: "GET" ,
            url: "nm.xml" ,
            dataType: "xml" ,
            success: function(xml) {
            //var xmlDoc = $.parseXML( xml );   <------------------this line
            //if single item
                //var foto = $(xml).find('foto').text();  

            //but if it's multible items then loop
                $(xml).find('foto').each(function(){
                    var id = $(this).find('id').text();
                    
                    alert(id);  
                }); 
            }       
        });
    });
        
    /*ajax populate*/
    $.ajax({
        type: "GET" ,
        url: "nm.xml" ,
        dataType: "xml" ,
        success: function(xml) {
            var n = 3;
            var x= 0;
            /*Noiva-fotos*/
            $next=$('.noiva-img:first');
            $(xml).find('foto').each(function(){
                x++;
                if (x<=n){
                    $next.attr({  
                        src: $(this).find('src').text(),
                        title: $(this).find('title').text(),
                        alt: $(this).find('alt').text()
                    });
                    $next.removeClass('noiva-img');
                    $next=$('.noiva-img:first');
                } 
            });
            /*tendencias*/
            x=0;
            $title = $('.tend-tit-mark:first');
            $src=$('.tend-img-mark:first');
            $intro=$('.tend-intro-mark:first');
            $href=$('.tend-href-mark:first');
            $(xml).find('materia').each(function(){
                x++;
                if (x<=n){
                    $src.attr({  
                        src: $(this).find('src').text(),
                        title: $(this).find('img-title').text(),
                        alt: $(this).find('alt').text()
                    });
                    $src.removeClass('tend-img-mark');
                    $src=$('.tend-img-mark:first');
                    
                    $title.text($(this).find('title').text());
                    $title.removeClass('tend-tit-mark');
                    $title=$('.tend-tit-mark:first');
                    
                    $intro.text($(this).find('descricao').text());
                    $intro.removeClass('tend-intro-mark');
                    $intro=$('.tend-intro-mark:first');
                    
                    $href.attr({  
                        href: $(this).find('href').text()
                    });
                    if ($(this).find('type').text() === 'externo')
                        $href.attr('target','_blank');
                    $href.removeClass('tend-href-mark');
                    $href=$('.tend-href-mark:first');
                } 
            }); 
        }       
    });
    
    
    $( window ).resize(function() {
        normalizaEnfeites();
        //var windowHeight = $(this).height();
        var windowWidth = $(this).width();
        if (windowWidth < 992){
            $('nav').hide();
            
        }
        else
        {
            $('nav').show();
        }
        if (windowWidth <= 1220){
            $marginLeft=$('#home-img-principal').css('margin-left');
            $('#home-img-principal').css({
                'margin-left': (1190 - windowWidth)+"px"
            });
        }
        
        jQuery.each($('.borda'),function(){ 
            if (windowWidth >= 992){
                $(this).removeClass('col-md-2');
                $(this).addClass('col-md-1');
            }else
            if (windowWidth < 992){
                $(this).removeClass('col-md-1');
            }
            
        });
        jQuery.each($('.principal'),function(){ 
            if (windowWidth >= 992){
                $(this).removeClass('col-md-8');
                $(this).addClass('col-md-10');
            }else
            if (windowWidth < 992){
                $(this).removeClass('col-md-10');
                $(this).addClass('col-md-12');
            }
        });
    });
    function normalizaEnfeites(){
        //top button
        var top = $('#nm-top');
        top.css({
            'margin-left':$(window).width()/2-top.width()/2+'px',
            'margin-top' :$(window).height()-top.height()-(top.height()*.3)+'px'
        });
        //atelie
        
        //centraliza os enfeites
        jQuery.each($('.enf-centro'),function(){        
            $(this).css('margin-left',(($(this).parent().width()/2)-($(this).width())/2)+'px');
            $(this).css('margin-top',-$(this).height()/2+'px'); 
        });
        
        jQuery.each($('.nm-subFundo'),function(){ 
            var porcent = .95;
            $(this).css('width',($(this).parent().width()*porcent)+'px');
            $(this).css('height',($(this).parent().height()*porcent)+'px'); 
            $(this).css('margin-left',($(this).width()*((1-porcent)/2)+20)+'px');
            $(this).css('margin-top',($(this).height()*((1-porcent)/2)+20)+'px');
        });
        
        //noivo
        /*
        $noivoffset= $('#noivo-img').offset();
        if($(window).width()<992){
            $('#noivo-enf').css({
                'margin-left': $noivoffset.left -40
            });
        }else{
            $('#noivo-enf').css({
                'margin-left': 0
            });
        }*/
        
        var contEnf=$('.cont-enf');
        contEnf.css('margin-left',((contEnf.parent().width()/2)-(contEnf.width())/2)+'px');
        
        var mapEnf=$('.map-enf');
        mapEnf.css({
            'margin-left': ((mapEnf.parent().width()/2)-(mapEnf.width())/2)+'px',
            'margin-top':(mapEnf.parent().height()-(mapEnf.height())/2)+'px'
        });
        //infantil
        $cont = $('#inf-cont');
        $('#inf-enf-cont1').css({
            'width': $cont.width()*1.1,
            'height': $cont.height()*1.1,
            'margin-top': -$cont.height()*.05,
            'margin-left': -$cont.width()*.05
        });
        $('#inf-enf-cont2').css({
            'width': $cont.width()*1.1,
            'height': $cont.height()*1.1,
            'margin-top': $cont.height()*.05,
            'margin-left': $cont.width()*.05
        });
        $map=$('iframe');
        $map.attr('width',$map.parent().width());
    }
    
    var homeAnimate = function() {
        if ( $('#nm-home').length > 0 ) {	
            
            $('#nm-home').waypoint( function( direction ) {
                
                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                  
                    setTimeout(function() {
                        $('#nm-home .to-animate').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInDown animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    setTimeout(function() {
                        $('#nm-home .to-animate-2').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInUp animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    
                    setTimeout(function() {
                        $('#nm-home .to-animate-3').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInRight animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 500);
                    setTimeout(function() {
                        $('#nm-home .to-animate-4').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInLeft animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 400);
                    
                    $(this.element).addClass('animated');
                    
                }
            } , { offset: '80%' } );
        }
    };    
    
    var anmAnimate = function() {
        if ( $('#nm-anm').length > 0 ) {	
            
            $('#nm-anm').waypoint( function( direction ) {
                
                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                    
                    setTimeout(function() {
                        $('#nm-anm .single-animate').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeIn animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    setTimeout(function() {
                        $('#nm-anm .to-animate').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInDown animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    setTimeout(function() {
                        $('#nm-anm .to-animate-2').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInUp animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    setTimeout(function() {
                        $('#nm-anm .to-animate-3').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInRight animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    setTimeout(function() {
                        $('#nm-anm .to-animate-4').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInLeft animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    $(this.element).addClass('animated');
                    
                }
            } , { offset: '80%' } );
            
        }
    };
    
    var noivaAnimate = function() {
        if ( $('#nm-noiva').length > 0 ) {	
            
            $('#nm-noiva').waypoint( function( direction ) {
                
                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                  
                    setTimeout(function() {
                        $('#nm-noiva .to-animate').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInUp animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    setTimeout(function() {
                        $('#nm-noiva .to-animate-2').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInDown animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    $(this.element).addClass('animated');
                    
                }
            } , { offset: '80%' } );
        }
    };
    var atelieAnimate = function() {
        if ( $('#nm-atelie').length > 0 ) {	
            
            $('#nm-atelie').waypoint( function( direction ) {
                
                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                  
                    setTimeout(function() {
                        $('#nm-atelie .to-animate').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInLeft animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    setTimeout(function() {
                        $('#nm-atelie .to-animate-2').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInRight animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    $(this.element).addClass('animated');
                    
                }
            } , { offset: '80%' } );
        }
    };
    var noivosAnimate = function() {
        if ( $('#nm-noivos').length > 0 ) {	
            
            $('#nm-noivos').waypoint( function( direction ) {
                
                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                  
                    setTimeout(function() {
                        $('#nm-noivos .to-animate').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInLeft animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    setTimeout(function() {
                        $('#nm-noivos .to-animate-2').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInRight animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    $(this.element).addClass('animated');
                    
                }
            } , { offset: '80%' } );
        }
    };
    
    var madrinhasAnimate = function() {
        if ( $('#nm-madrinhas').length > 0 ) {	
            
            $('#nm-madrinhas').waypoint( function( direction ) {
                
                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                  
                    setTimeout(function() {
                        $('#nm-madrinhas .to-animate').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInUp animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    setTimeout(function() {
                        $('#nm-madrinhas .to-animate-2').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInDown animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    $(this.element).addClass('animated');
                    
                }
            } , { offset: '80%' } );
        }
    };
    
    var debutantesAnimate = function() {
        if ( $('#nm-debutantes').length > 0 ) {	
            
            $('#nm-debutantes').waypoint( function( direction ) {
                
                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                  
                    setTimeout(function() {
                        $('#nm-debutantes .to-animate').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInLeft animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    setTimeout(function() {
                        $('#nm-debutantes .to-animate-2').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInRight animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    $(this.element).addClass('animated');
                    
                }
            } , { offset: '80%' } );
        }
    };
    
    
    var infantilAnimate = function() {
        if ( $('#nm-infantil').length > 0 ) {	
            
            $('#nm-infantil').waypoint( function( direction ) {
                
                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                  
                    setTimeout(function() {
                        $('#nm-infantil .to-animate').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInLeft animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    setTimeout(function() {
                        $('#nm-infantil .to-animate-2').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInRight animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    $(this.element).addClass('animated');
                    
                }
            } , { offset: '80%' } );
        }
    };
    
    var tendenciasAnimate = function() {
        if ( $('#nm-tendencias').length > 0 ) {	
            
            $('#nm-tendencias').waypoint( function( direction ) {
                
                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                  
                    setTimeout(function() {
                        $('#nm-tendencias .to-animate').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInLeft animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    setTimeout(function() {
                        $('#nm-tendencias .to-animate-2').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInRight animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    setTimeout(function() {
                        $('#nm-tendencias .to-animate-3').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInUp animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    $(this.element).addClass('animated');
                    
                }
            } , { offset: '80%' } );
        }
    };
    
    var contatoAnimate = function() {
        if ( $('#nm-contato').length > 0 ) {	
            
            $('#nm-contato').waypoint( function( direction ) {
                
                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                  
                    setTimeout(function() {
                        $('#nm-contato .to-animate').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInUp animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    $(this.element).addClass('animated');
                    
                }
            } , { offset: '80%' } );
        }
    };
    
    var mapAnimate = function() {
        if ( $('#nm-map').length > 0 ) {	
            
            $('#nm-map').waypoint( function( direction ) {
                
                if( direction === 'down' && !$(this.element).hasClass('animated') ) {
                  
                    setTimeout(function() {
                        $('#nm-map .to-animate').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInLeft animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    setTimeout(function() {
                        $('#nm-map .to-animate-2').each(function( k ) {
                            var el = $(this);
                            
                            setTimeout ( function () {
                                el.addClass('fadeInUp animated');
                            },  k * 200, 'easeInOutExpo' );
                            
                        });
                    }, 200);
                    
                    $(this.element).addClass('animated');
                    
                }
            } , { offset: '80%' } );
        }
    };
    
    // Document on load.
    $(function(){
        /*
        parallax();
        
        burgerMenu();
        
        clickMenu();
        
        windowScroll();
        
        navigationSection();
        
        goToTop();*/
        
        
        // Animations
        // 
        normalizaEnfeites();
        homeAnimate();
        anmAnimate();
        noivaAnimate();        
        atelieAnimate();
        noivosAnimate();
        madrinhasAnimate();
        debutantesAnimate();
        infantilAnimate();
        tendenciasAnimate();
        contatoAnimate();
        mapAnimate();
        
        clickMenu();
        goToTop();
    });
}());