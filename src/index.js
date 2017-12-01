import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
        this.state = {
            items: [
                {desc: "todo 1", isComplete: false},
                {desc: "todo 2", isComplete: false},
                {desc: "todo 3", isComplete: false},
                {desc: "todo 4", isComplete: false},
            ],
        };
    }

    generateRenderItemListItem(items, fx) {
        return items.map(function(item){
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
        let item = items[i]; // pass by reference for arrays
        item.isComplete = !item.isComplete;
        this.setState({items: items});
    }

    addItem(itemDescription) {
        // get items
        let items = this.state.items.slice();
        // add items
        const newItem = {desc: itemDescription, isComplete: false};
        items.push(newItem);
        // set state
        this.setState({items: items});
    }

    handleItemSubmittedFromForm(itemDescription) {
        this.addItem(itemDescription);

        // alert('A name was submitted: ' + this.state.value);
    }

    render() {
        var itemsList = this.generateRenderItemListItem(this.state.items, (item) => this.handleItemClick(item));
        return (
            <div className="list">
                <TextForm
                    submitItem={(itemDescription) => this.handleItemSubmittedFromForm(itemDescription)}
                />

                <ul>
                    {itemsList}
                </ul>
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