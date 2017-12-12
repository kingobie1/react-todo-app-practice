import React from 'react';
import Cookies from 'universal-cookie';
import TextForm from './TextForm'
import Item from './Item'

export default class Todo extends React.Component {

    /* This is our constructor for Todo component
     *
     * props - as of right now this class is not passed any props, however, we set up our code
     * to allow future propegation of props from the root component.
     *
     * state - state variables are local to this instance/mount of this component. Whenever a state variable
     * is changed, the component will automatically re-render itself to include state variables changes.
     *
     * function binding - technically, none of our functions are referencing the component's state variables,
     * so there is no need to bind the functions. Below is an example of binding a function:
     *
     *          this.generateRenderItemListItem = this.generateRenderItemListItem.bind(this);
     *
     * This allows the function to reference functions and variables that are also bounded to the component.
     *
     */
    constructor(props) {
        super(props);

        const cookies = new Cookies();
        let items = cookies.get('items');
        if (typeof items == 'undefined') {
            items = [];
        }

        this.state = {
            items: items,
        };
    }

    /**
     * generateRenderItemListItem - filter through the items and generate the react components for all in incompleted items
     * @param items - all items from storage
     * @param fx - function relative to this item
     * @returns {Array|Object|*}
     */
    generateRenderItemListItem(items, fx) {
        return items.filter(i => !i.isComplete).map(function(item){
            return  (
                <Item
                    desc={item.desc}
                    isComplete={item.isComplete}
                    functionOnClick={() => fx(item)}
                />
            );
        });
    }

    /**
     * generateRenderDoneItemListItem - filter through the items and generate the react components for all in completed items
     * @param items - all items from storage
     * @param fx - function relative to this item
     * @returns {Array|Object|*}
     */
    generateRenderDoneItemListItem(items, fx) {
        return items.filter(i => i.isComplete).map(function(item){
            return  (
                <Item
                    desc={item.desc}
                    isComplete={item.isComplete}
                    functionOnClick={() => fx(item)}
                />
            );
        });
    }

    /**
     * handleItemClick - toggle the state of the item
     * @param itemData
     */
    handleItemClick(itemData) {
        this.toggleCompleted(itemData);
    }

    /**
     * toggleCompleted - find the index of the item to toggle and then toggle it - since items are not always linked to a
     * specific index in items
     * @param itemToToggle
     */
    toggleCompleted(itemToToggle) {
        let i = this.state.items.indexOf(itemToToggle);
        let items = this.state.items.slice();
        let item = items[i]; // pass by reference for arrays.
        item.isComplete = !item.isComplete;
        this.setState({items: items});
    }

    /**
     * addItem take in an item
     * @param itemDescription description from the input box
     */
    addItem(itemDescription) {
        let items = this.state.items.slice();
        const newItem = {desc: itemDescription, isComplete: false};
        items.push(newItem);
        this.setState({items: items});
    }

    /**
     * clearCompleted - filter through the items and remove all that are not completed yet
     */
    clearCompleted() {
        let items = this.state.items.slice();
        this.setState({items: items.filter(i => !i.isComplete)});
    }


    /**
     * componentDidUpdate is a react built in method that is invoked whenever something on the DOM has changed.
     * It is not called on the initial render
     */
    componentDidUpdate() {
        this.saveCookie();
    }

    /**
     * saveCookie store the current state of the items in our cookie
     */
    saveCookie() {
        const cookies = new Cookies();
        cookies.set('items', this.state.items, { path: '/' });
        console.log(cookies.get('items'));
    }

    /**
     * render is invoked whenever a state variable is updated and allows the page to refresh with any changes.
     * @returns {XML}
     */
    render() {
        var itemsList = this.generateRenderItemListItem(this.state.items, (item) => this.handleItemClick(item));
        var doneItemsList = this.generateRenderDoneItemListItem(this.state.items, (item) => this.handleItemClick(item));

        return (
            <div id="container">
                <h1>To-Do List</h1>
                <TextForm
                    submitItem={(itemDescription) => this.addItem(itemDescription)}
                />

                <ul>
                    {itemsList}
                </ul>

                <h2>Completed</h2>
                <button onClick={() => this.clearCompleted()}>clear</button>
                <u>
                    {doneItemsList}
                </u>
            </div>
        );
    }
}
