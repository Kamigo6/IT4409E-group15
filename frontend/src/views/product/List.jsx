import React, { lazy, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars, faL } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterStar = lazy(() => import("../../components/filter/Star"));
const FilterClear = lazy(() => import("../../components/filter/Clear"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const CardProductGrid = lazy(() =>
  import("../../components/card/CardProductGrid")
);
const CardProductList = lazy(() =>
  import("../../components/card/CardProductList")
);

class ProductListView extends Component {
  state = {
    currentProducts: [],
    currentPage: null,
    totalPages: null,
    totalItems: 0,
    category: "all",
    price: "all",
    supplier: "all",
    rank: "latest",
    view: "list",
  };


  constructor(props) {
    super(props);
    this.state.category = props.catName;
    console.log(props.catName)
    // console.log(this.state)
  }
  catName = {
    "business-finance": "Business & Finance",
    "fiction": "Fiction",
    "health-fitness": "Health & Fitness",
    "history-archaeology": "History & Archaeology",
    "art-photography": "Art & Photography",
    "romance": "Romace",
    "food-drink": "Food & Drink",
    "all": "All"
  };

  componentDidMount() {
    this.getProducts();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.catName)
    this.setState({ category: nextProps.catName })
    this.getProducts();
  }

  clearFilter = () => {
    this.setState({ price: "all", supplier: "all" });
    // console.log(this.state);
    this.getProducts();
  }

  priceFilter = (data) => {
    // console.log(data);
    this.setState({ price: data });
    this.getProducts();
  }

  sortBy = (event) => {
    console.log(event.target.value);
    this.setState({ rank: event.target.value });
    this.getProducts();
  }

  getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products");
      let originProduct = response.data.filter((product) => {
        let price = product.price;
        // console.log(price > 30, price);
        if (!product.categories.includes(this.state.category) && this.state.category != "all") return false;
        if (this.state.price != "all")
          if (price > 10 && this.state.price == "low") return false;
          else if ((price <= 10 || price > 20) && this.state.price == "low-medium") return false;
          else if ((price <= 20 || price > 30) && this.state.price == "medium") return false;
          else if ((price <= 30) && this.state.price == "high") return false;
        if (product.supplier != this.state.supplier && this.state.supplier != "all") return false;
        return true;
      });
      switch (this.state.rank) {
        case "latest":
          originProduct = originProduct.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
              return -1;
            }
            if (a.createdAt > b.createdAt) {
              return 1;
            }
            return 0;
          });
          break;
        case "price":
          originProduct = originProduct.sort((a, b) => { return a.price - b.price; });
          break;
        case "r_price":
          originProduct = originProduct.sort((a, b) => { return b.price - a.price; });
          break;
        default:
          break;
      };
      const products = originProduct;
      const totalItems = products.length;
      this.setState({ currentProducts: products, totalItems });
      console.log(this.state.currentProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  onPageChanged = (page) => {
    const { currentProducts } = this.state;
    const { currentPage, totalPages, pageLimit } = page;
    const offset = (currentPage - 1) * pageLimit;
    const currentProductsPage = currentProducts.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentProducts: currentProductsPage, totalPages });
  };

  onChangeView = (view) => {
    this.setState({ view });
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="p-5 bg-primary bs-cover"
          style={{
            backgroundImage: "url(https://blog-cdn.reedsy.com/directories/admin/featured_image/579/what-is-literary-fiction-28dfaa.jpg)",
          }}
        >
          <div className="container text-center">
            <span className="display-5 px-3 bg-white rounded shadow">
              {this.catName[this.state.category]}
            </span>
          </div>
        </div>
        <Breadcrumb catName={this.catName[this.state.category]} />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3">
              <FilterCategory />
              <FilterPrice priceFilter={this.priceFilter} />
              <FilterStar />
              <FilterClear clearFilter={this.clearFilter} />
              <CardServices />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-7">
                  <span className="align-middle fw-bold">
                    {this.state.totalItems} results for{" "}
                    <span className="text-warning">{this.catName[this.state.category]}</span>
                  </span>
                </div>
                <div className="col-5 d-flex justify-content-end">
                  <select id="rank" onChange={this.sortBy}
                    className="form-select mw-180 float-start"
                    aria-label="Default select">
                    <option value={"latest"} >Latest items</option>
                    <option value={"price"} >Price low to high</option>
                    <option value={"r_price"} >Price high to low</option>
                  </select>
                  <div className="btn-group ms-3" role="group">
                    <button
                      aria-label="Grid"
                      type="button"
                      onClick={() => this.onChangeView("grid")}
                      className={`btn ${this.state.view === "grid"
                        ? "btn-primary"
                        : "btn-outline-primary"
                        }`}
                    >
                      <FontAwesomeIcon icon={faTh} />
                    </button>
                    <button
                      aria-label="List"
                      type="button"
                      onClick={() => this.onChangeView("list")}
                      className={`btn ${this.state.view === "list"
                        ? "btn-primary"
                        : "btn-outline-primary"
                        }`}
                    >
                      <FontAwesomeIcon icon={faBars} />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row g-3">
                {this.state.view === "grid" &&
                  this.state.currentProducts.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-4">
                        <CardProductGrid data={product} />
                      </div>
                    );
                  })}
                {this.state.view === "list" &&
                  this.state.currentProducts.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-12">
                        <CardProductList data={product} />
                      </div>
                    );
                  })}
              </div>
              <hr />
              <Paging
                totalRecords={this.state.totalItems}
                pageLimit={9}
                pageNeighbours={3}
                onPageChanged={this.onPageChanged}
                sizing=""
                alignment="justify-content-center"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductListView;
