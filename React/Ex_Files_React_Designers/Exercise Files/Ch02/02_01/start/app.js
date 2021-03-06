(function() {
  "use strict";


  // for Size
  function SizeSelector(props) {
    function sizeOptions() {
      return props.sizes.map(function(num) {
        return (
          <option value={num} key={num}>
            {num}
          </option>
        );
      });
    }

    function onSizeChange(evt) {
      console.log("event change fired: ", evt.target.value);
      props.handleSizeChange(evt.target.value);
    }

    return (
      <div className="field-group">
        <label htmlFor="size-options">Size:</label>
        <select defaultValue={props.size} name="sizeOptions" id="size-options" onChange={onSizeChange}>
          {sizeOptions()}
        </select>
      </div>
    );
  }

  // for Color
  function ColorSelector(props) {
    function colorOptions() {
      return props.colors.map(function(name) {
        return (
          <option value={name} key={name}>
            {name}
          </option>
        );
      });
    }
    function onColorChange(evt) {
      console.log("event change fired: ", evt.target.value);
      props.handleColorChange(evt.target.value);
    }    

    return (
      <div className="field-group">
        <label htmlFor="color-options">Color:</label>
        <select defaultValue={props.color} name="colorOptions" id="color-options" onChange={onColorChange}>
          {colorOptions()}
        </select>
      </div>
    );
  }


  // putting in images
  function ProductImage(props) {
    return <img src={`../../../assets/${props.color}.jpg`} alt="Product Image" />;
  }
  
  
  // making a var for creating class
  var ProductCustomizer = createReactClass({
    getInitialState: function() {
      var sizes = window.Inventory.allSizes,
        colors = window.Inventory.allColors;

      return {
        color: "red",
        colors: colors,
        size: 8,
        sizes: sizes
      };
    },

    handleSizeChange: function(selectedSize) {
      console.log('parent handleSizeChange', selectedSize);
      
      var availColors = window.Inventory.bySize[selectedSize];
      this.setState({
        size: selectedSize,
        colors: availColors
      });
      if(availColors.indexOf(this.state.color) === -1){
        this.setState({size:availColors[0]});
      }      
    },
    handleColorChange: function(selectedColor) {
      console.log('parent handleColorChange', selectedColor);
      var availColors = window.Inventory.byColor[selectedColor];
      this.setState({
        sizes: availColors,
        color: selectedColor
      });      
      
      if(availColors.indexOf(this.state.size) === -1){
        this.setState({size:availColors[0]});
      }
    },

    render: function() {
      return (
        <div className="customizer">
          <div className="product-image">
            <ProductImage color={this.state.color} />
          </div>
          <div className="selectors">
            <SizeSelector size={this.state.size} sizes={this.state.sizes} handleSizeChange={this.handleSizeChange}/>
            <ColorSelector color={this.state.color} colors={this.state.colors} handleColorChange={this.handleColorChange}/>
          </div>
        </div>
      );
    }
  });

  ReactDOM.render(<ProductCustomizer />, document.getElementById("react-root"));
})();
