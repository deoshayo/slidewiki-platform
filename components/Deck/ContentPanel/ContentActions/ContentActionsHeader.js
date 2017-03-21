import React from 'react';
import {NavLink, navigateAction} from 'fluxible-router';
import classNames from 'classnames/bind';
import {connectToStores} from 'fluxible-addons-react';
import ContentUtil from '../util/ContentUtil';
import DeckTreeStore from '../../../../stores/DeckTreeStore';
import UserProfileStore from '../../../../stores/UserProfileStore';
import addTreeNodeAndNavigate from '../../../../actions/decktree/addTreeNodeAndNavigate';
import deleteTreeNodeAndNavigate from '../../../../actions/decktree/deleteTreeNodeAndNavigate';
import AttachSubdeck from '../AttachSubdeck/AttachSubdeckModal.js';
import openAttachModal from '../../../../actions/attachSubDeck/openAttachModal';
import closeAttachModal from '../../../../actions/attachSubDeck/closeAttachModal';


class ContentActionsHeader extends React.Component {
    componentDidUpdate(){

    }
    handleAddNode(selector, nodeSpec) {
        //selector: Object {id: "56", stype: "deck", sid: 67, spath: "67:2"}
        //nodeSec: Object {type: "slide", id: 0}
        this.context.executeAction(addTreeNodeAndNavigate, {selector: selector, nodeSpec: nodeSpec});
    }
    handleDeleteNode(selector) {
        this.context.executeAction(deleteTreeNodeAndNavigate, selector);
    }
    handleEditNode(selector) {
        const nodeURL = ContentUtil.makeNodeURL(selector, 'edit');
        //user is not logged in
        if (this.props.UserProfileStore.username === '') {
            $('.ui.login.modal').modal('toggle');
        }else{
            this.context.executeAction(navigateAction, {
                url: nodeURL
            });
        }
    }
    handleOpenModalAttachSubdeck(){
        this.context.executeAction(openAttachModal);
        $('#app').attr('aria-hidden','true');
        $('#attachSubDeckModal').attr('aria-hidden','false');
        $('#attachSubDeckModal').modal({
            onHide: () => {
                $('#app').attr('aria-hidden','false');
                $('#attachSubDeckModal').attr('aria-hidden','true');
                this.context.executeAction(closeAttachModal);
            }}).modal('show');

    }
    render() {
        const contentDetails = this.props.ContentStore;
        //config buttons based on the selected item
        const addSlideClass = classNames({
            'item ui small basic left attached button': true
        });
        const addDeckClass = classNames({
            'item ui small basic left attached button': true
        });
        const duplicateItemClass = classNames({
            'item ui small basic left attached button': true,
            'disabled': contentDetails.selector.id === contentDetails.selector.sid || contentDetails.selector.stype==='deck'
        });
        const dueleteItemClass = classNames({
            'item ui small basic left attached button': true,
            'disabled': contentDetails.selector.id === contentDetails.selector.sid
        });
        let selectorImm = this.props.DeckTreeStore.selector;
        let selector = {id: selectorImm.get('id'), stype: selectorImm.get('stype'), sid: selectorImm.get('sid'), spath: selectorImm.get('spath')};
        let buttonStyle = {
            classNames : 'item ui small basic left attached button',
            iconSize : 'medium icons',
            attached : 'left'
        } ;
        return (
            <div className="ui top attached tabular menu" role="tablist">
                <NavLink className={'item link' + (contentDetails.mode === 'view' ? ' active' : '')} href={ContentUtil.makeNodeURL(selector, 'view')} role={'tab'}>
                    <i></i>View
                </NavLink>
                {this.props.UserProfileStore.username === '' ? '' :
                <NavLink className={'item link' + (contentDetails.mode === 'edit' ? ' active' : '')} href={ContentUtil.makeNodeURL(selector, 'edit')} role={'tab'} tabIndex={'0'}>
                    <i className="ui large blue edit icon "></i> Edit
                </NavLink>
                }
                {this.props.UserProfileStore.username === '' ? '' :
                    <div className="right menu">
                        <button className={addSlideClass} onClick={this.handleAddNode.bind(this, selector, {type: 'slide', id: 0})} type="button" aria-label="Add Slide" data-tooltip="Add Slide">
                            <i className="icons">
                              <i className="grey file large text icon"></i>
                              <i className="inverted corner plus icon"></i>
                            </i>

                        </button>
                        <button className={addDeckClass} onClick={this.handleAddNode.bind(this, selector, {type: 'deck', id: 0})}  type="button" aria-label="Add Deck" data-tooltip="Add Deck">
                            <i className="medium icons">
                              <i className="yellow large folder icon"></i>
                              <i className="inverted corner plus icon"></i>
                            </i>
                        </button>
                        <button className={addDeckClass} onClick={this.handleOpenModalAttachSubdeck.bind(this)}  type="button" aria-label="Attach Slide" data-tooltip="Attach Slide" >
                            <i className="medium icons">
                                <i className="yellow large folder icon"></i>
                                <i className="corner attach icon"></i>
                            </i>
                        </button>
                        <button className={duplicateItemClass} onClick={this.handleAddNode.bind(this, selector, {type: selector.stype, id: selector.sid})}  type="button" aria-label="Duplicate" data-tooltip="Duplicate">
                            <i className="grey large copy icon"></i>

                        </button>
                        <button className={dueleteItemClass} onClick={this.handleDeleteNode.bind(this, selector)} type="button" aria-label="Delete" data-tooltip="Delete">
                            <i className="red large trash icon"></i>
                        </button>
                        {/*
                        <button className="item ui small basic right attached disabled button">
                            <a className="" title="Settings">
                                <i className="black large setting icon"></i>
                            </a>
                        </button>
                        */}
                        <AttachSubdeck />
                    </div>
                }
            </div>
        );
    }
}
ContentActionsHeader.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};
//it should listen to decktree store in order to handle adding slides/decks
ContentActionsHeader = connectToStores(ContentActionsHeader, [DeckTreeStore, UserProfileStore], (context, props) => {
    return {
        DeckTreeStore: context.getStore(DeckTreeStore).getState(),
        UserProfileStore: context.getStore(UserProfileStore).getState()
    };
});
export default ContentActionsHeader;
