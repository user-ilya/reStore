import React, {Component} from 'react';
import BookListItem from '../book-list-item/book-list-item';
import {connect} from 'react-redux';
import withBookstoreService from '../hoc';
import {fetchBooks, addToBook} from '../../actions';
import {compose} from '../../utils';
import Spinner from '../spinner';
import Error from '../error-indicator';

import './book-list.css'


class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks()
    }

    render () { 
        const {books, loading,error, onAddedToCard} = this.props
        if (loading) {
            console.log('Spinner')
            return <Spinner/>
        }
        if(error) {
            return <Error/>
        }
        return <BookList books={books} onAddedToCard={onAddedToCard}/>
    }
}

const mapStateToProps = ({books, loading, error}) => {
    return {books, loading, error}
}
const mapDispatchToProps = (dispatch, {bookstoreService}) => {
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        onAddedToCard: (id) => dispatch(addToBook(id)),
    }
}
export default compose(withBookstoreService(),
connect(mapStateToProps, mapDispatchToProps))
(BookListContainer)


const BookList = ({books, onAddedToCard}) => {
    return (
        <ul className='book-list'>
            {
                books.map((item) => {
                    const {id, ...book} = item
                    return (<li key={id}>
                        <BookListItem book={book} 
                        onAddedToCard = {() => onAddedToCard(id)}/>
                    </li>)
                })
            }
        </ul>
    )
}
export {BookList}
