import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';
import ga from '../plugins/googleAnalytics/ga';
import { Microservices } from '../configs/microservices';

let hook = require('css-modules-require-hook');

hook({
    generateScopedName: '[hash:base64:5]',
});

class PresentationRoomsHTMLLayout extends React.Component {
    render() {
        let user = this.props.context.getUser();
        return (
            <html lang={ this.props.lang }>
            <head>
                <meta charSet="utf-8" />
                <title>{this.props.context.getStore(ApplicationStore).getPageTitle()}</title>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <link href="/custom_modules/custom-semantic-ui/dist/semantic.min.css" rel="stylesheet" type="text/css" />
                <link href="/assets/css/custom.css" rel="stylesheet" type="text/css" />
                <link href="/sweetalert2/dist/sweetalert2.min.css" rel="stylesheet" type="text/css" />
                {/* Vendors css bundle */
                    this.props.addAssets ? <link href="/public/css/vendor.bundle.css" rel="stylesheet" type="text/css" />: <style></style>
                }
            </head>
            <body>
                <div id="app" aria-hidden="false" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                {/* Following are added only to support IE browser */}
                <script src="/es5-shim/es5-shim.min.js"></script>
                <script src="/es5-shim/es5-sham.min.js"></script>
                <script src="/json3/lib/json3.min.js"></script>
                <script src="/es6-shim/es6-shim.min.js"></script>
                <script src="/es6-shim/es6-sham.min.js"></script>
                {/* Above are added only to support IE browser */}
                {/*TODO Following custom libs have been included due to the header bar (that is included but will be removed internally) --> Don't load the headerbar at all and remove the following two libs*/}
                <script src="/custom_modules/custom-semantic-ui/dist/components/search.min.js" defer></script>
                <script src="/custom_modules/custom-semantic-ui/dist/components/sidebar.min.js" defer></script>
                <script src="/custom_modules/custom-semantic-ui/dist/components/dropdown.min.js" defer></script>
                <script src="/custom_modules/custom-semantic-ui/dist/components/accordion.min.js" defer></script>
                <script src="/custom_modules/custom-semantic-ui/dist/components/transition.min.js" defer></script>
                <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                <script src="/jquery/dist/jquery.min.js"></script>
                {/* All external vendors bundle*/
                    this.props.addAssets ? <script src={'/public/js/vendor.bundle.js'} defer></script> : ''
                }
                <script src={ Microservices.webrtc.uri + '/socket.io/socket.io.js' }></script>
                <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
                {/* Main app bundle */}
                <script src={'/public/js/' + this.props.clientFile} defer></script>
                <script src="/sweetalert2/dist/sweetalert2.min.js" defer></script>
                <script dangerouslySetInnerHTML={ {__html: ga} } />
            </body>
            </html>
        );
    }
}

export default PresentationRoomsHTMLLayout;