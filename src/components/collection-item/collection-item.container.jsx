import React from 'react';
import {Mutation} from 'react-apollo';
import { gql }from 'apollo-boost';

import CollectionItem from './collection-item.component';

const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item:Item!) {
        AddItemToCart(item:$item)@client
    }
`;

const CollectionItemContainer = (props)=>
{
   // console.log(props);
    return (
        <Mutation mutation={ADD_ITEM_TO_CART}>
        {
            (AddItemToCart)=>{
            
                return (<CollectionItem {...props} addItem= {item => AddItemToCart({ variables:{ item}})}/>)
            }
        }
        </Mutation>
    );
}


export default CollectionItemContainer;



