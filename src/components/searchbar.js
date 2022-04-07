import React from 'react';
class Searchbar extends React.Component {
  onChange = (event) => {
    this.props.onSearch(event.target.value);
  };

  render() {
    return (
      this.props.view_active && (
        <div className="mb-2 mt-2">
          <input
            className="form-control"
            type="input"
            placeholder="Buscar"
            aria-label="Busca"
            onChange={this.onChange.bind(this)}
          />
        </div>
      )
    );
  }
}
export default Searchbar;
