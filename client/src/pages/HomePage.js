import React from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";
import Sliders from './Sliders';
import Deals from './HomeComponent/Deals'
import TrendingCategory from './HomeComponent/TrendingCategory'

const HomePage = () => {

  // const images = [
  //   'https://images.bewakoof.com/uploads/grid/app/WOMENS-DAY-BANNER-01-1678262761.jpg',
  //   'https://images.bewakoof.com/uploads/grid/app/bwkf-bestsellers-1678372760.jpg',
  //   'https://images.bewakoof.com/uploads/grid/app/1x1-oversized-graphic-tes-m-1678460699.jpg',
  //   'https://images.bewakoof.com/uploads/grid/app/1x1-oversized-graphic-tes-common-1678460699.jpg',

  // ]
  const images = [
    {
      "image":'https://images.bewakoof.com/uploads/grid/app/WOMENS-DAY-BANNER-01-1678262761.jpg',
      "categoryid":"64009d84c55f0549f445e45b",
      "subcategoryid":"64009db6c55f0549f445e45e"
    },
    {
      "image":'https://images.bewakoof.com/uploads/grid/app/bwkf-bestsellers-1678372760.jpg',
      "categoryid":"64009d84c55f0549f445e45b",
      "subcategoryid":"64009ff3c55f0549f445e462"
    },
    {
      "image":'https://images.bewakoof.com/uploads/grid/app/1x1-oversized-graphic-tes-m-1678460699.jpg',
      "categoryid":"64009d84c55f0549f445e45b",
      "subcategoryid":"64009db6c55f0549f445e45e"
    },
    {
      "image":'https://images.bewakoof.com/uploads/grid/app/1x1-oversized-graphic-tes-common-1678460699.jpg',
      "categoryid":"64009d84c55f0549f445e45b",
      "subcategoryid":"64009ff3c55f0549f445e462"
    },

  ]
  const [auth, setAuth] = useAuth()
  return (
    <Layout title={"Best offers "}>


      <Sliders images={images}  />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <img src="https://images.bewakoof.com/uploads/grid/app/Desktop-Strip-1-1668681804.gif" alt="banner" className="w-100 desktop" />
            <img src="https://images.bewakoof.com/uploads/grid/app/trust-slide--1677836301.gif" alt="banner" className="w-100 mobile" />
          </div>
        </div>
      </div>
<Deals />
<TrendingCategory />
     
      {/* <h1>HomePage</h1> */}
      <pre>
        {JSON.stringify(auth, null, 4)}
      </pre>
    </Layout>
  );
};

export default HomePage;
