import Observable from '../lib/Observable.js';
class Filter extends Observable {
    constructor(filterName) {
        super();

        this.filterName = filterName;
    }

    render() {
        var filterButton = document.createElement('button');
        filterButton.className = "outlined curved";
        filterButton.textContent = this.filterName

        var filterList = document.getElementById("sabit-filtreler");
        filterList.appendChild(filterButton);
    }


    addPostOnList(post) {
        this.subscribe(post);
    }
    updateList(filter) {
        this.observers.forEach(observer => observer.filter(filter));
    }

}

export default Filter;