import React from 'react';

export default class Item extends React.Component {
    render() {
        const completeClass = this.props.isComplete ? "completeItem" : null;

        return (
            <li className={"item", completeClass} onClick={() => this.props.functionOnClick()}>
                {this.props.desc}
            </li>
        );
    }
}
