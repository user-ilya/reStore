import React from 'react';
import { connect } from 'react-redux';
import { deleteToBook, deleteToItem, addToBook } from '../../actions';
import './shoppingCartTable.css';

const ShoppingCartTable = ({items,total, onAddBook, onDeleteItem, onDeleteBook}) => {
    return (
        <div className='shopping-cart-table'>
            <h2>Your Order</h2>
        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Count</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map(({id, title, total, count }, indx) => {
                        return (
                            <tr key={id}>
                                <td>{indx + 1}</td>
                                <td>{title}</td>
                                <td>{count}</td>
                                <td>{total}</td>
                                <td>
                                    <button 
                                        onClick={() => onDeleteItem(id)}
                                        className='btn btn-outline-danger btn-sm'>
                                        <i className='fa fa-trash-o' />
                                    </button>
                                    <button 
                                        onClick={() => onAddBook(id)}
                                        className='btn btn-outline-success btn-sm'>
                                        <i className='fa fa-plus-circle' />
                                    </button>
                                    <button 
                                        onClick={() => onDeleteBook(id)}
                                        className='btn btn-outline-warning btn-sm'>
                                        <i className='fa fa-minus-circle' />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <p className='total'>Total: {total} $ </p>
        </div>
    )
}
const mapStateToProps = ({total, cardItem}) => {
    return {
        total: total,
        items: cardItem
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteItem: (id) => dispatch(deleteToItem(id)),
        onAddBook: (id) => dispatch(addToBook(id)),
        onDeleteBook: (id) => dispatch(deleteToBook(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);