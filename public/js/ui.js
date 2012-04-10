// All the User Interface functionality used throughout the site.
(function($){
    $(document).ready(function(){
        $(document).delegate('section.flag .word', 'click', makeFlagEditable );
        $('section.flag .ui a').on('click', slideFlag);
    });

    // Replaces the content of the flag with an input box
    function makeFlagEditable()
    {
        var text = $(this).text();
        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'edit');
        input.setAttribute('value', text);
        $(this).replaceWith(input);
        $(input).on('blur', insertWord );
        $(input).focus();
    }
    // Inserts the word from the edit box into the flag.
    function insertWord()
    {
        var word = $(this).val();
        var h2 = document.createElement('h2');
        h2.setAttribute('class', 'word');
        var text = document.createTextNode(word);
        h2.appendChild(text);
        $(this).replaceWith(h2);
    }

    // Slides the flag up or down by toggling the class.
    function slideFlag()
    {
        var flag = $(this).parents('div.flag');
        /*isDown = $(flag).hasClass('bottom'),
        remove_class,
        add_class;

        if( isDown )
        {
            remove_class = "bottom";
            add_class = "top";
        }
        else
        {
            remove_class = "top";
            add_class = "bottom";
        }
        $(flag).removeClass(remove_class).addClass(add_class);
        */
        $(flag).toggleClass('bottom top');
        return false;
    }
})(jQuery);

