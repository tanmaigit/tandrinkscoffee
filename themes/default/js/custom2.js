jQuery(document).ready(function($){	  
    $('#theme-switch').change(function(){
      var url = $('option:selected', this).attr('value');
      location.href = url;
    });
	
  if( $.fn.doubleTapToGo ) {
    $( '#site-navigation li:has(ul)' ).doubleTapToGo();
  }

  if( $.fn.flexslider ) {

    $('.testimonials').flexslider({
      animation: 'slide',
      animationLoop: true,
      controlNav: false 
    });

    $('.recent-work').flexslider({
      animation: 'slide',
      animationLoop: true,
      controlNav: false,
      itemWidth: 300,
      itemMargin: 5
    });

    $('.flex-recent-posts').flexslider({
      animation: "slide",
      animationLoop: false,
      controlNav: false,
      itemWidth: 292
      //itemMargin: 30
    });

  }

  var icons = {
    header: "fa fa-plus",
    activeHeader: "fa fa-minus"
  };

    //Accordion
  if( $.fn.accordion ) {
    $(".accordion").accordion({
      heightStyle: "content",
      icons: icons
    });
  }

  $('.alert-close').click(function(){
    $(this).parent().fadeOut('slow', function(){ $(this).remove();});
  });

  $('.toggle-title').click(function() {

    $(this).next().toggle('slow');
    icn = $('.icn i',this).attr('class');
    if( icn == 'fa fa-plus' ) {
      $('.icn i',this).attr('class','fa fa-minus');
    } else {
      $('.icn i',this).attr('class','fa fa-plus');
    }
    //$('.icn',this).html(icn);

  });

 if( $.fn.replaceTagName ) {     
  $('.tabs.center .tabs_container div .fa').replaceTagName('span');
}

  if( $.fn.tabulous ) {
    $('.tabs').tabulous();    
  }
 
  if( $.fn.tabs ) {
    $('#service-tabs').tabs();
  }


  var sideBarPos = $('#primary').next().attr('id');
  if( sideBarPos == 'secondary') {
    $('#secondary').addClass('right');
  } else {
    $('#secondary').addClass('left');
  }

  if( $.fn.eislideshow ) {
    $('.ei-slider').eislideshow({
      easing: 'easeOutExpo',
      titleeasing: 'easeOutExpo',
      titlespeed: 1200
    });
  }

  if( $.fn.prettyPhoto ) {
    $("a[rel^='prettyPhoto']").prettyPhoto();
    $('.gallery a').prettyPhoto();
  }

  if( $.fn.slicknav ) {
    $('#site-navigation ul.menu').slicknav({
      allowParentLinks: true
    }); 
  }
  
var imgSizer = {
  Config : {
    imgCache : []
    ,spacer : "/path/to/your/spacer.gif"
  }

  ,collate : function(aScope) {
    var isOldIE = (document.all && !window.opera && !window.XDomainRequest) ? 1 : 0;
    if (isOldIE && document.getElementsByTagName) {
      var c = imgSizer;
      var imgCache = c.Config.imgCache;

      var images = (aScope && aScope.length) ? aScope : document.getElementsByTagName("img");
      for (var i = 0; i < images.length; i++) {
        images[i].origWidth = images[i].offsetWidth;
        images[i].origHeight = images[i].offsetHeight;

        imgCache.push(images[i]);
        c.ieAlpha(images[i]);
        images[i].style.width = "100%";
      }

      if (imgCache.length) {
        c.resize(function() {
          for (var i = 0; i < imgCache.length; i++) {
            var ratio = (imgCache[i].offsetWidth / imgCache[i].origWidth);
            imgCache[i].style.height = (imgCache[i].origHeight * ratio) + "px";
          }
        });
      }
    }
  }

  ,ieAlpha : function(img) {
    var c = imgSizer;
    if (img.oldSrc) {
      img.src = img.oldSrc;
    }
    var src = img.src;
    img.style.width = img.offsetWidth + "px";
    img.style.height = img.offsetHeight + "px";
    img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')"
    img.oldSrc = src;
    img.src = c.Config.spacer;
  }

  // Ghettomodified version of Simon Willison's addLoadEvent() -- http://simonwillison.net/2004/May/26/addLoadEvent/
  ,resize : function(func) {
    var oldonresize = window.onresize;
    if (typeof window.onresize != 'function') {
      window.onresize = func;
    } else {
      window.onresize = function() {
        if (oldonresize) {
          oldonresize();
        }
        func();
      }
    }
  }
}

addLoadEvent(function() {
  imgSizer.collate();
});

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

/* Isotope Implementation */
  var $container = $('#portfolio');

  if($container.length > 0){
	  $container.imagesLoaded(function() {
		$container.isotope({
		  // options
		  itemSelector : '.item',
		  layoutMode : 'fitRows'
		});
	  });
  }
  
      var $optionSets = $('#filters .filter-options'),
          $optionLinks = $optionSets.find('a');
          console.log($optionSets);
      $optionLinks.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return false;
        }
        var $optionSet = $this.parents('.filter-options');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
  
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
        if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
          // changes in layout modes need extra logic
          changeLayoutMode( $this, options )
        } else {
          // otherwise, apply new options
          $container.isotope( options );
        }
        
        return false;
      });


      $('.portfolio2col').hover(function() {
        $(this).addClass('hover');
        $('.portfolio2col_overlay', this).stop(true, false, true).fadeIn();
        $('.portfolio2col_overlay .overlay_icon', this).stop(true, false, true).animate({ left: '42%' }, 300);
      },function(){
        $(this).removeClass('hover');
        $('.portfolio2col_overlay', this).stop(true, false, true).fadeOut();
        $(this).find('.portfolio2col_overlay .overlay_icon').stop(true, false, true).animate({ left: '142%' }, 100, function() {
        $(this).css('left', '-42%');
        });
      });
      $('.portfolio2col_sidebar').hover(function() {
        $(this).addClass('hover');
        $('.portfolio2col_sidebar_overlay', this).stop(true, false, true).fadeIn();
        $('.portfolio2col_sidebar_overlay .overlay_icon', this).stop(true, false, true).animate({ left: '42%' }, 300);
      },function(){
        $(this).removeClass('hover');
        $('.portfolio2col_sidebar_overlay', this).stop(true, false, true).fadeOut();
        $(this).find('.portfolio2col_sidebar_overlay .overlay_icon').stop(true, false, true).animate({ left: '142%' }, 100, function() {
        $(this).css('left', '-42%');
      });
    });

    $('.portfolio3col').hover(function() {
      $(this).addClass('hover');
      $('.portfolio3col_overlay', this).stop(true, false, true).fadeIn();
      $('.portfolio3col_overlay .overlay_icon', this).stop(true, false, true).animate({ left: '42%' }, 300);
    },function(){
      $(this).removeClass('hover');
      $('.portfolio3col_overlay', this).stop(true, false, true).fadeOut();
      $(this).find('.portfolio3col_overlay .overlay_icon').stop(true, false, true).animate({ left: '142%' }, 100, function() {
      $(this).css('left', '-42%');
    });
  });


    $('.portfolio4col').hover(function() {
      $(this).addClass('hover');
      $('.portfolio4col_overlay', this).stop(true, false, true).fadeIn();
      $('.portfolio4col_overlay .overlay_icon', this).stop(true, false, true).animate({ left: '42%' }, 300);
    },function(){
      $(this).removeClass('hover');
      $('.portfolio4col_overlay', this).stop(true, false, true).fadeOut();
      $(this).find('.portfolio4col_overlay .overlay_icon').stop(true, false, true).animate({ left: '142%' }, 100, function() {
      $(this).css('left', '-42%');
    });
  });

  $('.recent-work .work').hover(function() {
    $(this).addClass('hover');
    $('.recent_work_overlay', this).stop(true, false, true).fadeIn();
    $('.recent_work_overlay .overlay_icon', this).stop(true, false, true).animate({ left: '42%' }, 300);

  },function(){
    $(this).removeClass('hover');
    $('.recent_work_overlay', this).stop(true, false, true).fadeOut();
    $(this).find('.recent_work_overlay .overlay_icon').stop(true, false, true).animate({ left: '142%' }, 100, function() {
            $(this).css('left', '-42%');
        });
  });      

  $('a').each(function() {
     var a = new RegExp('/' + window.location.host + '/');
     if(!a.test(this.href)) {
         $(this).click(function(event) {
             event.preventDefault();
             event.stopPropagation();
             window.open(this.href, '_blank');
         });
     }
  });

}); 

