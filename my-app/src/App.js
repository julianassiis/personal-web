import './App.css';
import anime from 'animejs/lib/anime.es.js';
import React from "react";
import randomColor from 'randomcolor/randomColor';

//Note to professor: I chose to do all the main in App.js because I didn't think it was useful to create an individual component due to the simplicity of the website and it was easier for me since I don't have a lot of experience with class components and due to the help I found online

class App extends React.Component {
  state = {
    columns: 0,
    rows: 0,
    total: 1
  };

  //
  colorWave = (i) => {
    const {columns, rows} = this.state;
    const element = i.target.id;

    anime({
      targets: ".grid-element",
      backgroundColor: randomColor(),
      delay: anime.stagger(50, {grid: [columns, rows], from: element})
    });

  };

  getSize = () => {
    const columns = Math.floor(document.body.clientWidth/50);
    const rows = Math.floor(document.body.clientHeight/50);

    this.setState({columns, rows, total: rows*columns});

    anime({
      targets: ".grid-element",
      backgroundColor: "#fff",
      duration: 0,
      easing: "linear"
    });

  };

  componentDidMount() {
    this.getSize();
    window.addEventListener("resize", this.getSize);
  }

  render() {
    const { total, columns, rows } = this.state;
    //console.log([columns, rows], total);

    return (
        <div id="root">
          <div id="grid">
            {[...Array(total)].map((x, i) => (
                <div className="grid-element" id={`${i}`} onClick={(i) => this.colorWave(i)}/>
            ))}
          </div>
        </div>
    );
  }
}
export default App;
