
import React from 'react';
import './App.css';
import Background from './assests/images/bg1.jpg';
import axios from 'axios'

var sectionStyle = {
  width: "100%",
  height: "800px",
  backgroundImage: `url(${Background})`,
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: ''
    }
  }
  componentDidMount() {
    this.getQuote()
  }
  getQuote() {
    let url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

    axios.get(url)
      .then(res => {
        let data = res.data.quotes
        let quoteNum = Math.floor(Math.random() * data.length)
        let randomQuote = data[quoteNum]

        this.setState({
          quote: randomQuote['quote'],
          author: randomQuote['author']
        })
      })
  }
  getNewQuote = () => {
    this.getQuote()
  }

  render() {
    const { quote, author } = this.state
    return (
      <section style={sectionStyle}>
        <div className="intercom-reaction-picker" dir="ltr">
          <div className="intercom-reaction-prompt img-hover-zoom img-hover-zoom--xyz">What's your vibe today ?</div>
          <div>
            <div id="zoom" onClick={this.getNewQuote}>
              <span data-emoji="smiley" title="Happy"> <img src={require("./assests/images/smiley.png")} alt="smiley" /></span>
            </div>
            <div id="zoom" onClick={this.getNewQuote}>
              <span data-emoji="neutral_face" title="I'm Okay"><img src={require("./assests/images/neutral.png")} alt="okay" /></span>
            </div>
            <div id="zoom" onClick={this.getNewQuote}>
              <span data-emoji="disappointed" title="Disappointed"><img src={require("./assests/images/disappointed.png")} alt="Disappointed" /></span>
            </div>
            <div id="zoom" onClick={this.getNewQuote}>
              <span title="Angry"><img src={require("./assests/images/angry.png")} alt="angry" /></span>
            </div>
            <div id='quote-box'>
              <QuoteBox quote={quote} author={author} />
            </div>
          </div>
        </div>
      </section>)
  }
}
// Quote Box component
const QuoteBox = ({ quote, author }) => { //destructuring
  return (
    <React.Fragment>
      <div id='text'><p>{quote}</p></div>
      <div id='author'><h5>{author}</h5></div>
    </React.Fragment>
  )
}
export default App;
