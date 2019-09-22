import React from 'react';
import UserItem from './UserItem';
import Spinner from '../layouts/Spinner';
import PropType from 'prop-types';

const Users = (props) => {
        if(props.loading){
            return <Spinner />

        }else{
            return(
                <div style={userStyle}>
                    {props.users.map(user => (
                        <UserItem key={user.id} user={user} />  //props
                    ))}
                </div>
                
            );
        }        
    }
Users.propTypes = {
    users : PropType.array.isRequired,
    loading : PropType.bool.isRequired
}    

const userStyle = {
    display : 'grid',
    gridTemplateColumns : 'repeat(3, ifr)',
    gridGap : '1rem'
};

export default Users;