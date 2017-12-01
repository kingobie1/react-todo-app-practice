import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cookies from 'universal-cookie';

/*
    resources:
        REACT tutorial - https://reactjs.org/tutorial/tutorial.html
        REACT input - https://reactjs.org/docs/forms.html
 */

class Item extends React.Component {
    render() {
        const completeClass = this.props.isComplete ? "completeItem" : null;

        return (
            <li className={"item", completeClass} onClick={() => this.props.functionOnClick()}>
                {this.props.desc}
            </li>
        );
    }
}

class Todo extends React.Component {
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

class TextForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.props.submitItem(this.state.value);
        this.clearInput();
        event.preventDefault();
    }

    clearInput() {
        this.setState({value: ''});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// ========================================
ReactDOM.render(
    <Todo />,
    document.getElementById('root')
);