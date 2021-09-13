import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from "mobx-react";

const Home = (props) => {
    console.log(props);
    return (
        <div>
            {`User List ${props.store.users.length}` }
        </div>
    )
}

Home.propTypes = {

}

export default inject('store')(observer(Home));
