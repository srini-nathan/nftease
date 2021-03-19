import React, { Component } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/paper-kit.css";
import Background from "../../assets/img/path1.png";
import BlurredContent from "../../assets/img/blurred-image-1.jpg";
import Cookies from "js-cookie";
import MarketPlacePagination from "./MarketPlacePagination";
import TestProduct from "./TestProduct";
import MarketPagination from "./PaginationTest";

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  CardSubtitle,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

export default class Marketplace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      product: {},
      isAuthenticated: null,
      allProducts: [],
      currentProducts: [],
      currentPage: null,
      totalPages: null,
      selected: 0,
    };
  }

  // axios
  //   .get(`/api/countries?page=${currentPage}&limit=${pageLimit}`)
  //   .then((response) => {
  //     const currentCountries = response.data.countries;
  //     this.setState({ currentPage, currentCountries, totalPages });
  //   });

  onPageChanged = ({ selected: selectedPage }) => {
    var selected = selectedPage;
    this.setState({ selected: selected });
  };

  async componentWillMount() {
    if (Cookies.get("token")) {
      this.setState({ isAuthenticated: true });
    } else {
      this.setState({ isAuthenticated: false });
    }
    await this.setupTestProduct();
    await this.testProduct();
    // TODO : Check login
  }

  async setupTestProduct() {
    let allProducts = [];
    let product = this.state.product;
    for (let i = 0; i < 1012; i++) {
      product = {
        id: i,
        title: "Testing Product",
        date: "MAR-11-2020",
        description: "Testing a very ebic description",
        image:
          "https://i.pinimg.com/originals/f3/bd/84/f3bd8497e15399201b634714ec5ed390.jpg",
        owner: "me",
        price: "$22",
      };
      allProducts.push(product);
    }
    this.setState({ allProducts });
  }

  redirect = () => {
    History.push("/login");
  };
  async testProduct() {
    let productsHtml = [];
    if (this.state.products.length == 0) {
      console.log("THE TOTAL LENGTH IS 0");
    } else {
      await this.state.products.reduce(async (promise, product) => {
        await promise;
        productsHtml.push(
          <Card key={product.id} className="feature-card">
            <>
              <CardImg top src={product.image} />
              <CardBody>
                <CardTitle>{product.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted">
                  Card subtitle
                </CardSubtitle>
                <CardText>{product.description}</CardText>
                <Button>{product.price}</Button>
                <CardText>
                  <small className="text-muted">On market for 3 mins</small>
                  <br></br>
                  <small className="text-muted">
                    <strong>1/1</strong> Available
                  </small>
                </CardText>
              </CardBody>
            </>
          </Card>
        );
      });
    }
    this.setState({ productsHtml });
    return true;
  }

  render() {
    const { allProducts, currentProducts, selected } = this.state;
    const totalProducts = allProducts.length;
    if (totalProducts === 0) return null;

    const productsPerPage = 16;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const offset = selected * productsPerPage;
    const currentPageData = allProducts.slice(offset, offset + productsPerPage);
    console.log(currentPageData);
    // this.setState({ currentPageData: currentPageData });
    // used to initialize

    return (
      <>
        <Container>
          <h2>
            <strong className="text-secondary">{totalProducts}</strong> Items
            for sale
          </h2>
          {selected && (
            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
              Page <span className="font-weight-bold">{selected + 1}</span> /{" "}
              <span className="font-weight-bold">{totalPages}</span>
            </span>
          )}
          <MarketPagination
            totalPosts={totalProducts}
            totalPages={totalPages}
            onPageChanged={this.onPageChanged}
          />
          {/* <MarketPlacePagination
            totalRecords={this.state.productsHtml}
            pageLimit={18}
            pageNeighbours={1}
            onPageChanged={this.onPageChanged}
          /> */}
          <h1> 🔥 What's hot</h1>
          <TestProduct products={currentPageData} />;
          {/* <Row>{this.state.productsHtml}</Row> */}
        </Container>
      </>
    );
  }
}
