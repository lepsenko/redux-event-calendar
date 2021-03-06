import React, { Component } from "react";
import Styles from "./styles.scss";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { API_EXPORT_CALENDAR } from "../../constants/api";

// Components
import Event from '../Event/index.jsx';

// Actions
import { setLogout } from "../../actions/users";
import { fetchAllEvents, removeEventItem } from "../../actions/events";

import renderEventsRight from "../../utils/renderEventsRight";



class Table extends Component {
    constructor(props){
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.handleExport = this.handleExport.bind(this);
    }

    componentWillMount(){
        this.props.fetchAllEvents();

    }

    handleLogout(e){
        this.props.setLogout()
    }

    handleExport(e){
        window.open(API_EXPORT_CALENDAR,'_blank');
    }

    render(){

        const { items } = this.props.events;
        const allEventsArr = renderEventsRight(items);

        let eventLeft = [];
        let eventRight = [];

        for(let i = 0; i < allEventsArr.length; i++){
            if( allEventsArr[i].start < 600 ) {
                eventLeft.push( allEventsArr[i] );
            } else {
                eventRight.push( allEventsArr[i] );
            }
        }


        const leftEvents = eventLeft.map( (item, index) => <Event key={ item._id }
                                              removeEventItem = { this.props.removeEventItem }
                                              data={ item } />);

        const rightEvents = eventRight.map( (item, index) => <Event key={ item._id }
                                              removeEventItem = { this.props.removeEventItem }
                                              data={ item } />);


        return(
            <section>

                <div className={ Styles.recEventsTopTitle }>
                    <h1 className = { Styles.recGeneral }>Daily Event Calendar</h1>
                    <span className={ Styles.recLogoutBtn } onClick={ this.handleExport  }>Export JSON</span>
                    <span className={ Styles.recLogoutBtn } onClick={ this.handleLogout  }>Logout</span>
                </div>

                <div className = {Styles.recColumnParent}>

                    {/* LEFT COLUMN */}
                    <div className={Styles.recColumnOne}>

                        <div className={Styles.recRow}>

                            <div className={Styles.recRowItem}>

                                <div className={ Styles.recRowLabels }>

                                    <span>8:00</span>

                                    <span>8:30</span>

                                </div>

                            </div>

                            <div className={Styles.recRowItem}>

                                <div className={ Styles.recRowLabels }>

                                    <span>9:00</span>

                                    <span>9:30</span>

                                </div>

                            </div>


                            <div className={Styles.recRowItem}>

                                <div className={ Styles.recRowLabels }>

                                    <span>10:00</span>

                                    <span>10:30</span>

                                </div>

                            </div>


                            <div className={Styles.recRowItem}>
                                <div className={ Styles.recRowLabels }>

                                    <span>11:00</span>

                                    <span>11:30</span>

                                </div>
                            </div>

                            <div className={Styles.recRowItem}>
                                <div className={Styles.recRowLabels}>

                                    <span>12:00</span>

                                    <span>12:30</span>

                                </div>

                                <span className={Styles.recRowLastLabel}>1:00</span>
                            </div>




                        </div>

                        <div className={Styles.recEventsColumn}>
                            { leftEvents }
                        </div>


                    </div>


                    {/* RIGHT COLUMN */}

                    <div className={Styles.recColumnTwo}>

                        <div className={Styles.recRow}>

                            <div className={Styles.recRowItem}>

                                <div className={Styles.recRowLabels}>

                                    <span>1:00</span>

                                    <span>1:30</span>

                                </div>

                            </div>

                            <div className={Styles.recRowItem}>

                                <div className={Styles.recRowLabels}>

                                    <span>2:00</span>

                                    <span>2:30</span>

                                </div>

                            </div>


                            <div className={Styles.recRowItem}>

                                <div className={Styles.recRowLabels}>

                                    <span>3:00</span>

                                    <span>3:30</span>

                                </div>

                            </div>


                            <div className={Styles.recRowItem}>
                                <div className={Styles.recRowLabels}>

                                    <span>4:00</span>

                                    <span>4:30</span>

                                </div>
                                <span className={Styles.recRowLastLabel}>5:00</span>
                            </div>

                        </div>

                        <div className={Styles.recEventsColumn}>
                            { rightEvents }
                        </div>

                    </div>

                </div> {/* recColumnParent */}

            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events,
        users: state.users
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLogout: bindActionCreators(setLogout, dispatch),
        fetchAllEvents: bindActionCreators(fetchAllEvents, dispatch),
        removeEventItem: bindActionCreators(removeEventItem, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);