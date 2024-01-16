import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 6,
    categarory: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    categarory: PropTypes.string,
  };
  constructor() {
    super();
    this.state = { articles: [], loading: true, page: 1,total:0 };
  }
  async componentDidMount() {
    this.props.setProgress(0);
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles: parsedData.articles,
      total: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  // handlenextclick = async () => {
  //   if (
  //     this.state.page + 1 >
  //     Math.ceil(this.state.total / this.props.pagesize)
  //   ) {
  //   } else {
  //     this.setState({ loading: true });
  //     let url = `https://newsapi.org/v2/top-headlines?country=${
  //       this.props.country
  //     }&category=${
  //       this.props.category
  //     }&apiKey=${this.props.apikey}&page=${
  //       this.state.page + 1
  //     }&pageSize=${this.props.pagesize}`;
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     this.setState({
  //       articles: parsedData.articles,
  //       page: this.state.page + 1,
  //       loading: false,
  //     });
  //   }
  // };
 // https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=3904aabb1655491c9ee9784df7ebb110&page=${this.state.page + 1}&pageSize=${this.props.pagesize}
  fetchMoreData = async() => {
    this.setState({ page: this.state.page+1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      total: parsedData.totalResults,
  });
};

  // handlepreviousclick = async () => {
  //   this.setState({ loading: true });
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=${this.props.apikey}&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pagesize}`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     articles: parsedData.articles,
  //     page: this.state.page - 1,
  //     loading: false,
  //   });
  // };
  render() {
    return (
    <>
          <h1 className="d-flex justify-content-center">TOP HEADLINES ARE</h1>
          {/* {this.state.loading && <Spinner/>} */}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.total}
          loader={<Spinner/>}
        >
          <div className="container">  
                  <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    author={element.author}
                    date={element.publishedAt}
                    imageurl={element.urlToImage}
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    newsurl={element.url}
                  />
                </div>
              );
            })}
          </div>
          </div>

          </InfiniteScroll>
         {/* <div className="container d-flex justify-content-between">
           <button type="button"disabled={this.state.page <= 1}className="btn btn-dark mb-3"onClick={this.handlepreviousclick}>
             &larr; Previous
           </button>
           <button type="button" disabled={(this.state.page + 1 )>Math.ceil(this.state.total / this.props.pagesize)}className="btn btn-dark mb-3"onClick={this.handlenextclick}>
             Next &rarr;
           </button>
         </div>  */}
        </>
    );
}
  }
