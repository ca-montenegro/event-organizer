import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Nav from "./Nav";
import {Events} from "../api/events";
import Foot from "./Foot.jsx";
import {userEventsList} from "../api/userEventsList";
import {Meteor} from "meteor/meteor";
// App component - represents the whole app

const NUM_RECORDS = 12;
const startAt = new Date();
const pageNumber = new ReactiveVar(1);

class App extends Component {
    constructor(props) {
        super(props);
    }

    loadMore () {
        pageNumber.set(pageNumber.get() + 1);
    }

    render() {
        return (
            <div>
                <Nav currentUser = {this.props.currentUser} eventsList ={this.props.eventsList} loadMore={this.loadMore} userEvents={this.props.userEvents}/>
                <Foot/>
            </div>

        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("Events", NUM_RECORDS * pageNumber.get(), startAt);
    Meteor.subscribe("ListEvents", Meteor.userId());
    return {
        eventsList: Events.find({}).fetch(),
        currentUser: Meteor.user(),
        userEvents: userEventsList.find({}).fetch(),
    };
})(App);