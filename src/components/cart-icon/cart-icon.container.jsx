import React from 'react';
import { Mutation , Query, graphql } from 'react-apollo';
import { flowRight }from 'lodash';
import {gql} from 'apollo-boost';

import CartIcon from './cart-icon.component';


const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden{
        toggleCartHidden @client
    }
`;


const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`;

const CartIconContainer_1 = ()=>(

    <Query query={GET_ITEM_COUNT}>
    {
        ({loading,data:{itemCount}})=> {
            console.log(loading);
            return (
            <Mutation mutation={TOGGLE_CART_HIDDEN}>
                {
                    toggleCartHidden => <CartIcon itemCount={itemCount}  toggleCartHidden={toggleCartHidden}/>
                }    
            </Mutation>
        )}
    }
    </Query>
);
const CartIconContainer = ({ data:{itemCount}, toggleCartHidden })=>(
    <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount}/>
)

//export default CartIconContainer;

export default flowRight(
    graphql(GET_ITEM_COUNT),
    graphql(TOGGLE_CART_HIDDEN,{name: 'toggleCartHidden'})
)(CartIconContainer);