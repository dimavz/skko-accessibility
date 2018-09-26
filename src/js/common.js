$(document).ready(function () {

     //Каруселька
    //Документация: https://owlcarousel2.github.io/OwlCarousel2/
    var owl = $('.owl-carousel').owlCarousel({
        loop: true,
        // dots:true,
        margin: 30,
        autoplay: true,
        autoplayTimeout: 2000,
        // nav:true,
        autoplayHoverPause: true,
        // navText:['<span>Предыдущий</span>','<span>Следующий</span>'],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });

    $('.play').on('click', function () {
        owl.trigger('play.owl.autoplay', [1000])
    })
    $('.stop').on('click', function () {
        owl.trigger('stop.owl.autoplay')
    });

    owl.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY > 0) {
            owl.trigger('next.owl');
        } else {
            owl.trigger('prev.owl');
        }
        e.preventDefault();
    });

    // Переход с следующему элементу слайдера
    $('.owl-next').click(function () {
        owl.trigger('next.owl.carousel');
    });
    // Переход к предыдущему элементу слайдера
    $('.owl-prev').click(function () {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl.trigger('prev.owl.carousel', [300]);
    });

    //При убирании мыши со слайдера запуск воспроизведения слайдов
    owl.mouseout(function() {
        owl.trigger('play.owl.autoplay');
    });
    //При наведении мыши на слайдер приостановка воспроизведения слайдов
    owl.mouseover(function() {
        owl.trigger('stop.owl.autoplay');
    });

    //Кнопка "Наверх"
    //Документация:
    //http://api.jquery.com/scrolltop/
    //http://api.jquery.com/animate/
    $("#top").click(function () {
        $("body, html").animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // *** Панель для слабовидящих ***//

    //Открытие/Закрытие настроек панели
    $('.a-settings, .closepopped').click(function () {
        $('.popped').slideToggle('slow');
        return false;
    });

    $('.default').click(function () {
        $('body').removeClass().addClass('fontsize-normal color1 imageson spacing-small roboto');
        $.cookie('blind-font-size', 'fontsize-normal', {path: '/'});
        $.cookie('blind-colors', 'color1', {path: '/'});
        $.cookie('blind-font', 'roboto', {path: '/'});
        $.cookie('blind-spacing', 'spacing-small', {path: '/'});

        set_font_size();
        set_colors();
        set_font_family();
        set_letter_spacing();
        return false;
    });

    function set_font_size() {
        $('body').removeClass('fontsize-small fontsize-normal fontsize-big')
            .addClass($.cookie('blind-font-size'));
    }

    $('.a-fontsize a').click(function () {
        fontsize = $(this).attr('rel');
        $.cookie('blind-font-size', fontsize, {path: '/'});
        set_font_size();
        return false;
    });

    function set_colors() {
        $('body').removeClass('color1 color2 color3 color4 color5').addClass($.cookie('blind-colors'));
    }

    $('.a-colors a, .a-collor a, .choose-colors a').click(function () {
        colors = $(this).attr('rel');
        $.cookie('blind-colors', colors, {path: '/'});
        set_colors();
        return false;
    });


    function set_font_family() {
        $('body').removeClass('serif sans-serif roboto').addClass($.cookie('blind-font'));
    }

    $('.font-family').click(function () {
        font = $(this).attr('rel');
        $.cookie('blind-font', font, {path: '/'});
        set_font_family();
        return false;
    });

    function set_letter_spacing() {
        $('body').removeClass('spacing-normal spacing-big spacing-small').addClass($.cookie('blind-spacing'));
    }

    $('.letter-spacing').click(function () {
        spacing = $(this).attr('rel');
        $.cookie('blind-spacing', spacing, {path: '/'});
        set_letter_spacing();
        return false;
    });

    //Перелючатель изображений
    $('.a-images a').click(function () {
        images = $(this).attr('rel');
        $('body').toggleClass('imageson').toggleClass('imagesoff');
        return false;
    });

    $('input[title!=""],textarea[title!=""]').hint();

    if (! $.cookie('blind-font-size')) {
        $.cookie('blind-font-size', 'fontsize-normal', {path: '/'});
    }

    if (! $.cookie('blind-colors')) {
        $.cookie('blind-colors', 'color1', {path: '/'});
    }

    if (! $.cookie('blind-font')) {
        $.cookie('blind-font', 'roboto', {path: '/'});
    }

    if (! $.cookie('blind-spacing')) {
        $.cookie('blind-spacing', 'spacing-small', {path: '/'});
    }

    set_font_size();
    set_colors();
    set_font_family();
    set_letter_spacing();

});

jQuery.fn.hint = function() {
    return this.each(function() {
        var t = jQuery(this);
        var title = t.attr('title');
        if (title) {
            t.blur(function() {
                if (t.val() == '') {
                    t.val(title);
                    t.addClass('blur');
                }
            });
            t.focus(function() {
                if (t.val() == title) {
                    t.val('');
                    t.removeClass('blur');
                }
            });
            t.blur();
        }
    });
};
