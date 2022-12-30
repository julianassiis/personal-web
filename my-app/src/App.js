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
      backgroundColor: "#C69FF2",
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
          <div id="intro">
            <p className="info mb-1 mt-2 fw-light main small">JULIANA ASSIS</p>
            <p className="info pt-1 mb-4 fw-bold main">User Interface &<br /> Experience Designer</p>
            <p className="info pt-1 mb-1 fw-light">23-year-old human who mainly does UI/UX and graphic design with a bit of front-end on the side. The motto is always trying to stick to simplicity and not overcomplicating while still working on new and sometimes crazy things. A walking paradox.</p>
            <p className="info pt-1 mb-1 fw-light">You can stalk me on <a href="https://www.linkedin.com/in/julianassiis/" target="_blank">LinkedIn</a>, check some of my work on <a href="https://www.behance.net/julianassiis" target="_blank">Behance</a> and get to know me on <a href="https://www.instagram.com/julianassiis/" target="_blank">Instagram</a>.</p>
            <p className="info pt-1 mb-4 fw-light">You can also have some fun with the background of this website. <span className="fw-bold">Enjoy ಇ( ꈍᴗꈍ)ಇ</span></p>
            <div className="quote">
              <p className="info pt-1 mb-1 fw-lighter fst-italic"><span className="fst-normal">Narrator:</span> There he goes. One of God’s own prototypes. A high-powered mutant of some kind never even considered for mass production. Too weird to live and too rare to die.</p>
              <p className="info text-end fw-lighter">Fear and Loathing in Las Vegas (Final scene), 1998</p>
            </div>
          </div>
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
