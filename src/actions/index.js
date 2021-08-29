
const booksLoaded = (newBooks) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks,
        loading: false
    }
}
const booksError = (error) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    }
}
const addToBook = (id) => {
    return {
        type: 'ADD_TO_BOOK',
        payload: id,
    }
}
const deleteToBook = (id) => {
    return {
        type: 'DELETE_TO_BOOK',
        payload: id
    }
}
const deleteToItem = (id) => {
    return {
        type: 'DELETE_TO_ITEM',
        payload: id
    }
}
const fetchBooks = (bookstoreService, dispatch) => () => {
        bookstoreService.getBooks()
            .then((data) => dispatch(booksLoaded(data)))
            .catch((err) => dispatch(booksError(err)))
}
export {fetchBooks, addToBook, deleteToBook, deleteToItem}