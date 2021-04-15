import Observable from '../lib/Observable.js';
class Search extends Observable {
    constructor() {
        super();
    }

    get Observers() {
        return this.observers;
    }

    addPostOnList(post) {
        this.subscribe(post);
    }
    updateList(posts) {
        this.notify(posts);
    }

}

export default Search;