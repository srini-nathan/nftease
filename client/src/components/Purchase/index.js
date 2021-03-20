import React, { Component } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/paper-kit.css";
import Background from "../../assets/img/path1.png";
import BlurredContent from "../../assets/img/blurred-image-1.jpg";
import Cookies from "js-cookie";

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

export default class Purchase extends Component {
  constructor(props) {
    super(props);

    // Pass "product" as props OR fetch product from API.
    // -- passed if clicked on from marketplace
    // -- fetched if enter product URL.
    
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



  async componentWillMount() {
    if (Cookies.get("token")) {
      this.setState({ isAuthenticated: true });
    } else {
      this.setState({ isAuthenticated: false });
    }
    // TODO : Check login
  }

  redirect = () => {
    History.push("/login");
  };

  render() {
    return (
      <>
        <Container>
          <h2>
                Hi
          </h2>
        </Container>
      </>
    );
  }
}
