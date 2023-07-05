import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./../components/Layout/Layout";



function ProdutPage() {
    const navigate = useNavigate();
    const params = useParams();
    // const query = useQuery()

    console.log("pp",params)

    const getProducts = async () => {
        try {
          const { data } = await axios.get(
            `/api/v1/product/get-product/${params.categoryid}/${params.subcategoryid}`
          );
    
          console.log("dtat", data)
         
        } catch (error) {
          console.log("eroor in product page",error);
        }
      };

      useEffect(() => {
        getProducts();
        //eslint-disable-next-line
      }, []);
     
  return (
    <>
 <Layout title={"Product page "}>
    <div>
        Product page
    </div>
     
 </Layout>
    </>
  )
}

export default ProdutPage