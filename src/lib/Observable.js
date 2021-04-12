class Observable {
    constructor() {

        this.observers = [];
    }


    isSubscribed(f) {
        return this.observers.filter(subscriber => subscriber === f).length;
    }

    subscribe(f) {

        if (this.isSubscribed(f)) return;
        this.observers.push(f);
    }

    unsubscribe(f) {

        this.observers = this.observers.filter(subscriber => subscriber !== f);
    }

    notify(data) {

        this.observers.forEach(observer => observer.update(data));
    }
}


export default Observable;