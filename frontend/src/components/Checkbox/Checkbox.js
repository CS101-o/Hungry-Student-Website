import React from 'react';
import './Checkbox.css';

class Checkbox extends React.Component {
    render() {
        return (
            <div className="checkbox-wrapper">
                <label>
                    <input
                        type={this.props.type ? this.props.type : "checkbox"}
                        checked={this.props.checked}
                        value={this.props.value}
                        name={this.props.name}
                        onChange={
                            this.props.onChange
                        } />
                    <span><div className='category'>{this.props.label}</div></span>
                </label>
            </div>
        );
    };
}
export default Checkbox;
