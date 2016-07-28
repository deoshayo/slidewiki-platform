import React from 'react';
import ReactDom from 'react-dom';
import { Microservices } from '../../../configs/microservices';
import ActivityFeedPanel from '../../Deck/ActivityFeedPanel/ActivityFeedPanel';
import DeckListItem from './DeckListItem';

class UserDecks extends React.Component {
    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        return (
          <div className="ui stackable horitontally divided two column grid">
            <div className="column">
              <div className="ui segments">
                <div className="ui secondary segment">
                  <strong>My Decks</strong>
                </div>
                <div className="ui segment">
                  <div className="ui relaxed divided list">
                      <DeckListItem title='Semantic-Org/Semantic-UI' picture='http://semantic-ui.com/images/wireframe/image.png' updated='10'/>
                      <DeckListItem title='Semantic-Org/Semantic-UI-Docs' picture='http://semantic-ui.com/images/wireframe/image.png' updated='22'/>
                      <DeckListItem title='Semantic-Org/Semantic-UI-Meteor' picture='http://semantic-ui.com/images/wireframe/image.png' updated='34'/>
                  </div>
                </div>
              </div>
              <div className="ui hidden divider" />
              <div className="ui segments">
                <div className="ui secondary segment">
                  <strong>Recently edited slides</strong>
                </div>
                <div className="ui segment">
                  <div className="ui relaxed divided list">
                      <DeckListItem title='Semantic-Org/Semantic-UI/Slide 4' picture='http://semantic-ui.com/images/wireframe/image.png' updated='10'/>
                      <DeckListItem title='Semantic-Org/Semantic-UI-Docs/Slide 20' picture='http://semantic-ui.com/images/wireframe/image.png' updated='22'/>
                      <DeckListItem title='Semantic-Org/Semantic-UI-Meteor/Slide 1' picture='http://semantic-ui.com/images/wireframe/image.png' updated='34'/>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui raised segment">

              </div>
              <div className="ui hidden divider" />
              <ActivityFeedPanel mode="user"/>
            </div>
          </div>
        );
    }
}

UserDecks.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

export default UserDecks;
