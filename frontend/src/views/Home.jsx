import React, { lazy } from "react";
import { data } from "../data";
import { ReactComponent as IconBook } from "bootstrap-icons/icons/book.svg";

const Support = lazy(() => import("../components/Support"));
const Banner = lazy(() => import("../components/carousel/Banner"));
const Carousel = lazy(() => import("../components/carousel/Carousel"));
const CardIcon = lazy(() => import("../components/card/CardIcon"));
const CardLogin = lazy(() => import("../components/card/CardLogin"));
const CardImage = lazy(() => import("../components/card/CardImage"));

const components = {
  IconBook: IconBook,
  IconHeadset: IconBook,
  IconPhone: IconBook,
  IconTv: IconBook,
  IconDisplay: IconBook,
  IconHdd: IconBook,
  IconUpcScan: IconBook,
  IconTools: IconBook,
};

const HomeView = () => {
  const isAuthenticated = localStorage.getItem("token");

  const iconProducts = data.iconProducts;

  const carouselContent = (
    <div className="carousel-item active">
      <div className="row g-3">
        {iconProducts.map((product, idx) => {
          const ProductImage = components[product.img];
          return (
            <div key={idx} className="col-md-3">
              <CardIcon
                title={product.title}
                text={product.text}
                tips={product.tips}
                to={product.to}
              >
                <ProductImage
                  className={product.cssClass}
                  width="80"
                  height="80"
                />
              </CardIcon>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Banner className="mb-3" id="carouselHomeBanner" data={data.banner} />
      <div className="container-fluid bg-light mb-3">
        <div className="row g-3">
          <div className="col-md-9">
            <Carousel id="elect-product-category" className="mb-3">
              {carouselContent}
            </Carousel>
            <Support />
          </div>
          <div className="col-md-3">
            {isAuthenticated ? null : <CardLogin className="mb-3" />}
            <CardImage
              src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEwfHxib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              to="promo"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeView;
