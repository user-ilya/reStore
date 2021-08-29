import React from 'react';
import './book-list-item.css'

const BookListItem = ({book, onAddedToCard }) => {
    const {title, price, author, imageUrl} = book
    console.log(imageUrl)
    return (
        <div className='book-list-item'>
            <div className='book-cover'>
                <img src={imageUrl} alt='book'/>
            </div>
            <div className='list-details'>
                <span className = 'book-title'>{title}</span>
                <p className='book-author'>{author}</p>
                <p className='book-price'>{price} $</p>
                <button 
                    onClick={onAddedToCard}
                    className='btn btn-info add-ti-cart'>Add to cart</button>
            </div>
        </div>
    )
}

export default BookListItem;