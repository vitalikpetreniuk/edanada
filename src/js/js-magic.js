if (window.innerWidth > 992) {

    require(['ScrollMagic'], function (ScrollMagic) {
        console.log('scrollmagic');
        function pathPrepare($el) {
            var lineLength = $el[0].getTotalLength();
            $el.css("stroke-dasharray", lineLength);
            $el.css("stroke-dashoffset", lineLength);
        }

        var controller = new ScrollMagic.Controller();

        var $lines =
            $(".line-1")
                .add($('.line-2'))
                .add($('.line-3'))
                .add($('.line-4'));

        $.each($lines, function () {
            var th = $(this);
            var path = $(th.attr('data-children'));
            pathPrepare(path);
            
            var tween = new TimelineMax()
                .add(TweenMax.to(path, 1, {
                    strokeDashoffset: 0,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    ease: Linear.easeNone
                }));

            var scene = new ScrollMagic.Scene(
                {
                    tweenChanges: true,
                    duration: chaneDuration(th),
                    triggerElement: changeTrigger(th)[0]
                }
            )
                .setTween(tween)
                .triggerHook(0.7)
                .addTo(controller);
        });

        var $img = $('.bran-title, .oil-title, .crackers-title');

        $img.css({
            'opacity': 0,
            'transform': 'translateY(5%) scale(0.9)'
        });
        function chaneDuration(th) {
            // var h = th.outerHeight();
            var h = th.data('height');
            if (th[0].hasAttribute('data-duration')) {
                var val = +th.attr('data-duration');
                return h - (h / 100 * val);
            } else {
                return h;
            }
        }
        function changeTrigger(th) {
            if (!!th.data('triggerelement')) {
                var triggerIndocator = $(document.createElement('div'));
                triggerIndocator.attr('class', th.attr('class'));
                triggerIndocator.css({
                    'position': 'absolute',
                    'left': 0,
                    'width': "100%",
                    'transform': 'none',
                    'height': "100%",
                    'top': th.data('triggerelement')
                });
                th.prepend(triggerIndocator);
                console.log('triggerIndocator');
                return triggerIndocator;
            } else {
                return th;
            }
        }

        $.each($img, function () {
            var th = $(this);
            var tween = new TimelineMax()
                .add(
                TweenMax.to(
                    th,
                    .4,
                    {
                        css: {
                            opacity: 1,
                            'transform': 'none'
                        },
                        ease: Linear.easeNone
                    }
                )
                );
            // build scene
            var scene = new ScrollMagic.Scene(
                {
                    triggerElement: changeTrigger(th)[0]
                })
                .setTween(tween)
                .triggerHook(0.7)
                .addTo(controller);
        });
    });
};