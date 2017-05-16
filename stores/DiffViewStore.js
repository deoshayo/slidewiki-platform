import {BaseStore} from 'fluxible/addons';

class DiffViewStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.history = [];
        this.selector = {};
    }
    updateDiffview(payload) {
        this.history = payload.history;
        this.selector = payload.selector;
        this.emitChange();
    }
    getState() {
        return {
            history: this.history,
            selector: this.selector,
        };
    }
    dehydrate() {
        return this.getState();
    }
    rehydrate(state) {
        this.history = state.history;
        this.selector = state.selector;
    }
    handleDeckParamErrors(err) {
        this.emitChange();
    }
}

DiffViewStore.storeName = 'DiffViewStore';
DiffViewStore.handlers = {
    'LOAD_CONTENT_DIFFVIEW_SUCCESS': 'updateDiffview'
};

export default DiffViewStore;
