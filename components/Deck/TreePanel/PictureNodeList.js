import React from 'react';
import {NavLink, navigateAction} from 'fluxible-router';
import {Microservices} from '../../../configs/microservices';

class PictureNodeList extends React.Component {

    render() {
        const affix= '/deck/' + this.props.deckTree.get('id');
        const nodes = this.props.deckTree.get('children').map((node, index) => {
            return <NavLink key={index} href={affix + '/slide/' + node.get('id')}>
            <img src={Microservices.file.uri + '/slideThumbnails/' + node.get('id') + '.jpeg'} width='230px' height='160px' style={{'border': '1px solid black', 'border-radius': '10px'}}/>
              <i>{node.get('title')}</i>
            <div className="ui divider"/>
          </NavLink>;
        });
        return (<div>{nodes}</div>);
    }
}

PictureNodeList.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

export default PictureNodeList;
