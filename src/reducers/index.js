const initialState = {
    books: [],
    loading: true,
    error: null,
    total: 0,
    cardItem: []
}
const updateCartItems = (cardItem, item, indx) => {
    if (indx < 0) {
        return [
            ...cardItem,
            item
        ]
    }
    if (item.count === 0) {
        return deleteToItem(cardItem, indx)
    }
    return [
        ...cardItem.slice(0, indx),
        item,
        ...cardItem.slice(indx + 1)
    ]
}
const updateItem = (book, item = {}, quantity) => {
const {id = book.id, title = book.title, total = 0, count = 0} = item 
    return {
        id,
        title,
        count: count + quantity,
        total: book.price*quantity + total
    }
}
const deleteToItem = (cardItem,indx) => {
    return [
        ...cardItem.slice(0, indx),
        ...cardItem.slice(indx + 1)
    ]
}
const updateOrder = (state, bookId, quantity) => {
    console.log(state.total)
    const {books, cardItem, total} = state
    const book = books.find((item) => item.id ===bookId)
    const indx = cardItem.findIndex(({id}) => id ===bookId )
    const item = cardItem[indx]
    const newItem = updateItem(book, item, quantity)
    if (quantity > 0)
        return {
            ...state, 
            cardItem: updateCartItems(cardItem, newItem, indx),
            total:  total + book.price
        }
        else if (quantity === 0) {
            return {
                ...state, 
                cardItem: deleteToItem(cardItem, indx),
                total:  total - newItem.total
            }
        }
    else {
        return {
            ...state, 
            cardItem: updateCartItems(cardItem, newItem, indx),
            total: total- book.price
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_BOOKS_SUCCESS': 
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null,
            }
        case 'FETCH_BOOKS_FAILURE': 
            return {
                books: [],
                loading: false,
                error: action.payload,
                total: state.total,
                cardItem: []
            }
        case 'ADD_TO_BOOK': 
            return updateOrder(state, action.payload, 1)
        case 'DELETE_TO_BOOK': 
            return updateOrder(state, action.payload, -1)
        case 'DELETE_TO_ITEM': 
            return updateOrder(state, action.payload, 0)
        default: return state
    }
}
export default reducer;