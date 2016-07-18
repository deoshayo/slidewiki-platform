import {Microservices} from '../configs/microservices';
import rp from 'request-promise';

export default {
    name: 'presentation',
    // At least one of the CRUD methods is Required
    read: (req, resource, params, config, callback) => {
        let args = params.params? params.params : params;
        //let selector= {'id': args.id, 'spath': args.spath, 'sid': args.sid, 'stype': args.stype, 'mode': args.mode};
        //Load the whole presentation
        let presentation = [];
        if(resource === 'presentation.content'){
            /*********connect to microservices*************/
            let deck = args.deck;

            let returnErr = false;

            if(deck[0] !== undefined){
               //Retrieve the content of each presentation
                for (let i = 0; i < deck.length; i++) {
                    let slide = deck[i];
                    let content;
                    let slideServiceRes;
                    rp.get({uri: Microservices.deck.uri + '/slide/' + slide.id}).then((res) => {
                        slideServiceRes = JSON.parse(res);
                        presentation.push({'id': slide.id, 'content': slideServiceRes.slide.revisions[slideServiceRes.slide.revisions.length-1].content, 'speakerNotes': slideServiceRes.slide.revisions[slideServiceRes.slide.revisions.length-1].speakernotes});


                    }).catch((err) => {                        
                        presentation.push({'id': slide.id, 'content':'', 'speakerNotes': ''});
                        returnErr = true;
                    });

                } //for
            }
        }//If presentation.content
        //TODO: Retrieve theme content from deck

            /*********received data from microservices*************/
        callback(null, {content: presentation, theme: get_sample_theme()});


    }
};



function get_sample_theme(){
    let themes = ['beige', 'black', 'blood', 'league', 'moon', 'night', 'serif', 'simple', 'sky', 'solarized', 'white'];
    let index = Math.floor(Math.random() * (themes.length - 1));
    console.log('theme: ', themes[index]);
    return themes[index];
}

function get_sample_text(id){
    return `
    <h1> Slide #` + id + `</h1>
    <div>
        <p style="font-size: 1.16em;">
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus.
        </p>
        <ul>
            <li>item 1 from slide ` + id + `</li>
            <li>item 2 from slide ` + id + `</li>
            <li>item 3 from slide ` + id + `</li>
        </ul>
        <p style="font-size: 1.2em;">
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
        </p>
        <p style="text-align:center">
            <svg xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
                <text x="20"  y="40"
                      style="font-family: Arial;
                             font-size  : 25;
                             stroke     : #000000;
                             fill       : #` +((1<<24)*Math.random()|0).toString(16) + `;
                            "
                      > SVG Image ` + id + `</text>
            </svg>
        </p>
    </div>
    `;
}

function get_sample_notes(id){
    return 'These are some really important notes for Slide ' + id;
}
