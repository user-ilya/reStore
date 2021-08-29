
export default class BookstoreService {
    data = [
        {
            id: 1,
            title: 'HTML & CSS',
            author: 'John Duckett',
            price: 10,
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/31b4K-hFH-L._SX395_BO1,204,203,200_.jpg'
        },
        {
            id: 2,
            title: 'Production-Ready Microservices',
            author: 'Susan J. Fowler',
            price: 25,
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41yJ75gpV-L._SX381_BO1,204,203,200_.jpg'
    
        },
        {
            id: 3,
            title: 'Release It!',
            author: 'Michael T. Nygard',
            price: 12,
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/414CRjLjwgL._SX403_BO1,204,203,200_.jpg'
        }
    ]

    getBooks() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data)
            }, 1800)
        })
    }
}