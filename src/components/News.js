import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  constructor() {
    super();
    this.state = {
      article: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async fetchNews() {
    const { page } = this.state;
    this.props.setProgress(10);

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=94f509cc3c2d402fba4ef6d362f78448&page=${page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true }); // Show loading if needed
    let data = await fetch(url);
    this.props.setProgress(70);
    let parseData = await data.json();

    this.setState({
      article: parseData.articles || [],
      totalResults: parseData.totalResults || 0,
      loading: false,
    });
     this.props.setProgress(100);
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchMoreData = async () => {
    const { page, article } = this.state;
    const nextPage = page + 1;

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=94f509cc3c2d402fba4ef6d362f78448&page=${nextPage}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({
      article: [...article, ...parseData.articles],
      totalResults: parseData.totalResults || 0,
      page: nextPage,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsRabbit - Top Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {this.state.article.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={
                      element.description ? element.description : " "
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://www.eatingwell.com/thmb/Uuy6HKh-H23SoULAzS6OcTw079E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Nationwide-Recall-nov-2024-09a5ba8d54084403b672c4af1d94d6b0.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author ? element.author : ""}
                    source={
                      element.source.name ? element.source.name : "Unknown"
                    }
                    date={element.publishedAt ? element.publishedAt : "Unknown"}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
