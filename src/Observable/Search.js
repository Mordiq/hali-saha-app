import Observable from '../lib/Observable.js';
class Search extends Observable {
    constructor() {
        super();
    }
    addPostInList(post) {
        this.subscribe(post);
    }
    updateList(posts) {
        this.notify(posts);
    }

}

export default Search;