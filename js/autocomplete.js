(function($){
    $.fn.autoComplete = function( options ){
        var settings = $.extend({items: []}, options );
        return this.each(function() {
            var $this = $(this);
            var $input = $this.find(".autocomplete");
            var $span = $this.find("span");
            var emptyInputSpanVal = $span.text();

            $input.on("focus", function(){
                $span.html("");
            });
            $input.on("blur", function(){
                if($input.val().length == 0){
                    $span.html(emptyInputSpanVal);
                }else{
                    $span.html("");
                }
            });

            $span.click(function(){
                $input.focus();
                return false;
            });

            $input.keyup(function(I){
                switch(I.keyCode) {
                    case 13:  // enter
                    case 27:  // escape
                    case 38:  // стрелка вверх
                    case 40:  // стрелка вниз
                        break;
                    case 8:  // backspace
                        $span.html("");
                        break;
                    case 39:  // стрелка вправо
                        var t = $span.text();
                        if(t.length > 0){
                            $input.val(t);
                            $span.html("");
                        }
                        break;
                    default:
                        // производим поиск только при вводе более 2х символов
                        var val = $input.val();
                        if(val.length > 1){
                            $span.html("");
                            var lc = val.toLowerCase();
                            var i = settings.items.length;
                            while(i--){
                                var e = settings.items[i];
                                if(e.substr(0, lc.length) == lc){
                                    var h = "<span class='hidden'>" + val.substr(0, lc.length) + "</span>";
                                    h += e.substr(lc.length);
                                    $span.html(h);
                                    break;
                                }
                            }
                        }
                        break;
                }
            });
        });
    };
}(jQuery));