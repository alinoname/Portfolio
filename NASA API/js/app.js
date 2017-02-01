$(function() {

    const Previous = $('.Previous');
    const Next = $('.Next');
    let linkNext = "";
    let linkPrev = "";
    const apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2016-07-25&end_date=2016-08-01&api_key=bMO0pnn19EcVBUvqz3yWXppsist6t0RmifDPiP3j';

    const nasaDataBase = function(URL) {

        function insertContent() {
            const list = $('.container');
            const li = $('<li class="rodzic"></li>')
                // const ul = $('<ul class="ulka"></ul>')
            list.append(li);
            // li.append(ul);
            return li;
        };

        function loadOrbs() {
            $.ajax({
                url: URL,
                dataType: 'json',
                type: "GET"
            }).done(function(response) {
                linkNext = response.links.next;
                linkPrev = response.links.prev;
                for (let date in response.near_earth_objects) {
                    const oneData = response.near_earth_objects[date];
                    const dataList = $((insertContent()).text(date).append($('<ul class="ulka"></ul>')));
                    linkNext = response.links.next;
                    linkPrev = response.links.prev;
                    for (let i = 0; i < oneData.length; i++) {
                        const name = oneData[i].name;
                        const link = oneData[i].nasa_jpl_url;
                        dataList.find("ul").append($("<li class='dziecko'></li>").append($('<a>').text(name).attr('href', link).attr('target', "_blank")));

                    }

                }

                $('.rodzic').on('click', function() {
                      $(this).find('.ulka').toggle(1000);
                      console.log("git");
                });


            }).fail(function(error) {
                console.log(error)
            })
        };

        loadOrbs();

    };

    nasaDataBase(apiUrl);

    Previous.on('click', function() {
        $('.container').empty();
        nasaDataBase(linkPrev);
    });
    Next.on('click', function() {
        $('.container').empty();
        nasaDataBase(linkNext);
    });

});
