import React, { Component } from "react";
import Newsitems from "./Newsitems";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

export default class News extends Component {
  // articles = [
  //   {
  //     source: { id: "techcrunch", name: "TechCrunch" },
  //     author: "Lauren Forristal",
  //     title: "Bye-bye bots: Altera's game-playing AI agents get backing from Eric Schmidt",
  //     description:
  //       "Autonomous, AI-based players are coming to gaming, and a new startup, Altera, has raised $9M to build them.",
  //     url: "https://techcrunch.com/2024/05/08/bye-bye-bots-alteras-game-playing-ai-agents-get-backing-from-eric-schmidt/",
  //     urlToImage: "https://techcrunch.com/wp-content/uploads/2024/05/Minecraft-keyart.jpg?resize=1200,720",
  //     publishedAt: "2024-05-08T15:14:57Z",
  //     content: "Autonomous, AI-based players are coming to gaming, and a new startup, Altera, is building them.",
  //   },
  //   {
  //     source: { id: "techcrunch", name: "TechCrunch" },
  //     author: "Alex Wilhelm",
  //     title: "iPads are now as expensive as MacBooks?",
  //     description:
  //       "Would you switch your MacBook for a $1500 iPad? Apple thinks so.",
  //     url: "https://techcrunch.com/2024/05/08/techcrunch-minute-when-did-ipads-get-as-expensive-as-macbooks/",
  //     urlToImage: "https://techcrunch.com/wp-content/uploads/2024/05/ipad-noplay.png?resize=1200,675",
  //     publishedAt: "2024-05-08T14:52:26Z",
  //     content: "Apple’s latest iPads are powerful — and expensive.",
  //   },
  //   {
  //     source: { id: "techcrunch", name: "TechCrunch" },
  //     author: "Paul Sawers",
  //     title: "UK challenger bank Monzo raises $190M for US expansion",
  //     description:
  //       "Monzo has raised another $190 million as it looks to expand into the U.S.",
  //     url: "https://techcrunch.com/2024/05/08/uk-challenger-bank-monzo-nabs-another-190m-at-5-2b-valuation/",
  //     urlToImage: "https://techcrunch.com/wp-content/uploads/2024/05/GettyImages-1259121938-e1715164252704.jpg?resize=1200,676",
  //     publishedAt: "2024-05-08T12:34:05Z",
  //     content: "Monzo continues raising money to grow its global presence.",
  //   },
  // ];

  articles = [];

  // defaultProps
  // sefaultProps is a way to specify default values for props. If a prop is not provided by the parent component, the default value will be ued. This is particularly useful for ensuring that a component has all necessary props it needs to function properly, even if some are not explicitly  provided.

  static defaultProps = {
    country: "us",
    pageSize: 12,
    category: "general",
  };

  // PropTypes
  // propTypes is used for type-checking props to ensure that the correct types of props is passed to the component. This helps in  catching bugs and providing a clear contract for the component's expected properties. propTypes is often used during development for validation purposes.

  static propTypess = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 0,
      totalResults: 0,
      loading: false,
    };
  }

  // In React, componentDidMount is a lifecycle method that is called after a component has been rendered to the DOM. This method is part of the class component lifecycle in React and is typically used for tasks that require the component to be fully loaded before executing, such as:

  // Fetching Data: Making API calls to fetch data that the component needs to display.
  //Subscription: Setting up subscriptions or event listeners.
  // DOM Manipulations: Directly interacting with the DOM, like integrating with third-party libraries that manipulate the DOM.

  async componentDidMount() {
    {
      this.setState({
        loading: true,
      });
    }
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=9179b78a0e8c4f488ddd034ec28fa14e&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handleNext = async () => {
    {
      this.setState({
        loading: true,
      });
    }
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=9179b78a0e8c4f488ddd034ec28fa14e&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  handlePrev = async () => {
    {
      this.setState({
        loading: true,
      });
    }
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=9179b78a0e8c4f488ddd034ec28fa14e&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center text-danger my-4">Live News</h1>

        {this.state.loading && <Spinner />}

        <div className="container">
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <Newsitems
                  title={element.title}
                  description={element.description}
                  url={element.urlToImage}
                  linkUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-danger me-md-2"
              type="button"
              onClick={this.handlePrev}
            >
              &laquo;Prev
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.handleNext}
            >
              next &raquo;
            </button>
          </div>

          <br />
        </div>
      </>
    );
  }
}
