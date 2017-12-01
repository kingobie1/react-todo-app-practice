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
                {desc: "todo 2", isComplete: true},
                {desc: "todo 3", isComplete: true},
                {desc: "todo 4", isComplete: true},
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
        // let i = this.state.items.findIndex(itemData);
        let i = this.state.items.indexOf(itemData);
        const items = this.state.items.slice();
        let item = items[i];
        item.isComplete = !item.isComplete;
        this.setState({item: items});
    }

    render() {
        var itemsList = this.generateRenderItemListItem(this.state.items, (item) => this.handleItemClick(item));
        return (
            <div className="list">
                <ul>
                    {itemsList}
                </ul>
            </div>
        );
    }
}

// ========================================
ReactDOM.render(
    <Todo />,
    document.getElementById('root')
);