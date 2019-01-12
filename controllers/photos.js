var request = require("request");

var flickr_key = "61f14971a648c69649d81508760ce4fc";
var flickr_secret = "2f682edb0208f2a1";

exports.getPublicPhotos = (done) => {

    //get public photos
    request({
        method : 'GET',
        url    : 'https://api.flickr.com/services/feeds/photos_public.gne?format=json'
    }, function(err,httpResponse,body){

        if (!err &&  httpResponse.statusCode === 200){

            let json;

            try
            {
                json = JSON.parse(body);
            }
            catch(e)
            {
                let startPos = body.indexOf('({');
                let endPos = body.indexOf('})');
                let jsonString = body.substring(startPos+1, endPos+1);
                json = JSON.parse(jsonString);
            }

            if (json.stat && json.stat == 'fail'){
                done(new Error('Flickr API Error: ' + json.message))
            }else{
                done(null, json);
            }

        }else{
            done(new Error('Flickr API Error: ' + err))
        }
    });

}

exports.searchPublicPhotos = (searchString, done) => {

    //get public photos
    request({
        method : 'GET',
        url    : `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickr_key}&text=${searchString}&format=json`
    }, function(err,httpResponse,body){

        if (!err &&  httpResponse.statusCode === 200){

            let json;

            try
            {
                json = JSON.parse(body);
            }
            catch(e)
            {
                let startPos = body.indexOf('({');
                let endPos = body.indexOf('})');
                let jsonString = body.substring(startPos+1, endPos+1);
                json = JSON.parse(jsonString);
            }

            if (json.stat && json.stat == 'fail'){
                done(new Error('Flickr API Error: ' + json.message))
            }else{

                //map image urls
                let items = json.photos.photo.map((photo) => {
                    return {
                        media : {
                            m: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
                        }
                    }
                });

                 //reshape output
                json.items = items;

                done(null, json);
            }
           

        }else{
            done(new Error('Flickr API Error: ' + err))
        }
    });

}