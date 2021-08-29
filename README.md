// Redux компоненты 

Для того, чтобы создать Redux приложение нужно определить функцию-reducer.
Функции action-creators не обязательно использовать, но на практике они присутствуют всегда.
Логику создания store удобно вынести в отдельный файл.
=====================================================================
// Чтение данных из Redux store

const Person = ({name}) => {
    return (<p>{name}</p>)
}

const mapStateToProps = (state) => {
    return {
        name: state.firstName
    }
}

export default connect(mapStateToProps)(Person)
=====================================================================
// Отправка действий в Redux Store

const compose = (...func) => (comp) => {
    return func.reduceRight(
        (wrapped, f) => f(wrapped), comp
    )
}
export default compose;

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({booksLoaded}, dispatch)
}
export default compose(withBookstoreService(),
connect(mapStateToProps, mapDispatchToProps))
(BookList)

Чтобы получить данные из сервисаи передать их в Redux Store мы использовали два компонента высшего порядка (HOC)
- Первый HOC - это withBookstoreService, получает сервис из контекста и передает в компонент.
- Второй HOC - connect() оборачивает функцию dispatch из Redux Store.
-mapDispatchToProps может быть функцией или объектом. Если это объект, то он передается в bindActionCreators().
=====================================================================
// Асинхронные данные 
Реализация загрузки данных в Redux можно так-же, как и в обычном React приложении.
- Добавить поле loading в Redux Store;
- Обновлять это поле в reducer, когда данные становятся доступными;
- Передать значение loading в компонент, используя mapStateToProps.

=====================================================================
// Различия между setState и reducer
- В SetState() можно передавать только ту часть state, которую требуется обновить
- Reducer должен вернуть полный объект state
    return {
        ...state,
        updateProps: newValue
    };
=====================================================================
// Обработка ошибок
- Ошибку получения данных, нужно сохранить в store. Затем компонент сможет её отобразить. 
- Чтобы сохранить ошибку, нужно создать действие (Book_Error).
- Саму ошибку можно передать вместе с действием и сохранить в store 
 case 'Book_Error': 
            return {
                value: [],
                loading: false,
                error: action.payload
            }
=====================================================================
Аргумент ownProps 
 - У mapDispatchToProps есть второй аргумент 
 <Person details = 'full' />

 mapDispatchToProps = (dispatch, ownProps) => {
     console.log(ownProps.details) // full
 }
 export default connect(mapDispatchToProps, mapStateToProps)(Persone)

=====================================================================
Правила выбора имен для действий 

[тип запроса]_[объект]_[дейсвие]
FETCH_BOOKS_REQUEST - запрос отправлен
FETCH_BOOKS_SUCCESS - получен результат 
FETCH_BOOKS_FAILURE - произошла ошибка 
=====================================================================
// Компоненты-контейнеры
- Презентационные компоненты - отвечаю только за рендеринг. Они ничего не знают откуда приходят данные.
- Компоненты-контейнеры - работают с Redux, реализуют loading, error, и другую логику.
- Компоненты-контейнеры иногда выносят в отдельные файлы (PersonContainer) или папку (/container).

=====================================================================
// Добавление в массив Redux
В redux приложениях, так же как и в React нельзя модифицировать state
Добавить элемент в массив можно так: 
case 'ADD_TO_ITEM': 
    const item = action.payload
    return {
        items: [...state.items, item]
    }
=====================================================================
// Обновление элементов массива Redux
Обновить элемент можно так: 
case 'UPDATE_IN_ARRAY': 
    const {index, updateItem} = action.payload,
    return {
        items: [
        ...state.items.slice(0, index),
        updateItem,
        ...state.items.slice(index+1)
        ]
    }
=====================================================================
// Удаление элементов из массива Redux
Elfkbnm элемент можно так: 
case 'UPDATE_IN_ARRAY': 
    const {index, updateItem} = action.payload,
    return {
        items: [
        ...state.items.slice(0, index),
        updateItem,
        ...state.items.slice(index+1)
        ]
    }
=====================================================================
// Store Enhancer
Store Enhancer управляет процессом создания store/ Возвращает новую реализацию createStore.
const logAll = (createStore) => (...args) => {
    const store = createStore(...args)
    const {dispatch} = store
    
    store.dispatch = (action) => { // подменяем dispatch
        console.log(action.type)
        dispatch(action) // вызываем оригинальный dispatch
    }
    
    return store
}
const store = createStore(reducer, logAll)
=====================================================================
// Middleware
Middleware Функции, которые последовательно вызываются при обработке действий.
import {applyMiddleware} from 'redux';
const logAll = ({getState, dispatch}) => (dispatch) => (action) => {
    console.log(action.type, getState)
    return dispatch(action)
}
const store = createStore(reducer, applyMiddleware)

Middleware используются намного чаще, чем Store Enhancer.
=====================================================================
Thunk Middleware
Thunk Middleware позволяет передавать в store, как действия.
Такие функции принимают dispatch() и getState()
const getPerson = (id) = (dispatch) => {
    dispatch({type: 'FETCH_PERSON_REQUEST'});
    fetchPerson(id)
        .then((data) => dispatch({type: 'FETCH_PERSON_SUCCESS'}, data))
        .catch(error => dispatch({type: 'FETCH_PERSON_FAILURE'}, error))
}
store.dispatch(getPerson(1))