import React from 'react';
import Cookies from 'universal-cookie';
import TextForm from './TextForm'
import Item from './Item'

export default class Todo extends React.Component {
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

    handleItemClick(itemData) {
        this.toggleCompleted(itemData);
    }

    toggleCompleted(itemToToggle) {
        let i = this.state.items.indexOf(itemToToggle);
        let items = this.state.items.slice();
        let item = items[i]; // pass by reference for arrays.
        item.isComplete = !item.isComplete;
        this.setState({items: items});
    }

    addItem(itemDescription) {
        let items = this.state.items.slice();
        const newItem = {desc: itemDescription, isComplete: false};
        items.push(newItem);
        this.setState({items: items});
    }

    clearCompleted() {
        let items = this.state.items.slice();
        this.setState({items: items.filter(i => !i.isComplete)});
    }

    handleItemSubmittedFromForm(itemDescription) {
        this.addItem(itemDescription);
    }

    componentDidUpdate() {
        this.saveCookie();
    }

    saveCookie() {
        const cookies = new Cookies();
        cookies.set('items', this.state.items, { path: '/' });
        console.log(cookies.get('items'));
    }

    render() {
        var itemsList = this.generateRenderItemListItem(this.state.items, (item) => this.handleItemClick(item));
        var doneItemsList = this.generateRenderDoneItemListItem(this.state.items, (item) => this.handleItemClick(item));

        return (
            <div id="container">
                <h1>To-Do List</h1>
                <TextForm
                    submitItem={(itemDescription) => this.handleItemSubmittedFromForm(itemDescription)}
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
