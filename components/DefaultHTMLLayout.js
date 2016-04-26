import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';

class DefaultHTMLLayout extends React.Component {
    render() {
        return (
            <html>
            <head>
                <meta charSet="utf-8" />
                <title>{this.props.context.getStore(ApplicationStore).getPageTitle()}</title>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <link href="/custom_modules/custom-semantic-ui/dist/semantic.min.css" rel="stylesheet" type="text/css" />
                <link href="/assets/css/custom.css" rel="stylesheet" type="text/css" />
            </head>
            <body>
                <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                <script src="/bower_components/jquery/dist/jquery.min.js"></script>
                <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                <script src="/custom_modules/custom-semantic-ui/dist/components/progress.min.js"></script>
                <script src="/custom_modules/custom-semantic-ui/dist/components/accordion.min.js"></script>
                <script src="/bower_components/semantic/dist/components/transition.min.js"></script>
                <script src="/bower_components/semantic/dist/components/popup.min.js"></script>
                <script src="/bower_components/semantic/dist/components/dropdown.min.js"></script>
                <script src="/bower_components/semantic/dist/components/checkbox.min.js"></script>
                <script src="/bower_components/semantic/dist/components/dimmer.min.js"></script>
                <script src="/bower_components/semantic/dist/components/modal.min.js"></script>
                <script src={'/public/js/' + this.props.clientFile}></script>
            </body>
            </html>
        );
    }
}

export default DefaultHTMLLayout;
