var JAPI = { data: {} };
(function($){
    $(document).ready(function(){ 
        $('li a.save').on('click', saveSet);
        $('li a.sets').on('click', showWordSets);
        $(document).delegate('#wordsets li a', 'click', loadWordSet);
    });

    function saveSet() {
        var words = [];
        $('.word').each(function(){ 
           words.push($(this).text());
        });
        $.post( $(this).attr('href'), { 'words': words }, function(data, textStatus, jqxhr){
            if( data.status == "error")
            {
                alert( data.msg );
            }
            else
            {
                addSet(data.data);
            }
        });
        return false;
    }

    function addSet(set)
    {
        html = '<li><a href="#' + set._id + '">' + set.words.join(', ') + '</a></li>';
        $('#wordsets ul').append(html);
    }

    function getWordSets()
    {
        $.getJSON( '/wordset', function(data, textStatus, jqxhr){

            if( data.status == "error" )
            {
                alert( data.msg );
                return;
            }
            var html;
            $('#wordsets ul li').remove();
            JAPI.data = {};
            for(var i = 0; i < data.data.length; i++)
            {
                JAPI.data[ data.data[i]._id ] = data.data[i];
                addSet( data.data[i] );
            }

        });
    }
    function getWordSet(id)
    {
        var words = JAPI.data[id].words;

        var i = 0;
        $('.word').each(function(){
            $(this).text(words[i]);
            i++;
        });
    }
    function loadWordSet()
    {
        var id = $(this).attr('href').replace('#', '');
        getWordSet(id);
        return false;
    }
    function showWordSets()
    {
        getWordSets();
        $('#wordsets').toggleClass('visible hidden');
        return false;
    }
})(jQuery);
