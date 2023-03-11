import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [subcategoryId, setSubCategoryId] = useState("");
    const [sizes,setSizes] = useState("");
    const [stock, setStock] = useState("");
    const [brand, setBrand] = useState("");
    const [shipping, setShipping] = useState("");
    const [photos, setPhotos] = useState("");
  
  const [id, setId] = useState("");

  console.log("pp",params)

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );

      console.log("dtat", data)
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPhotos(data.product.photos);
      setStock(data.product.stock);
      setShipping(data.product.shipping);
      setCategoryId(data.product.categoryId);
      setSubCategoryId(data.product.subcategoryId);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getAllCategory");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  const getAllsubCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getAllsubCategory");
      if (data?.success) {
        setSubCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();getAllsubCategory()
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("stock", stock);
      productData.append("photos", photos);
      productData.append("categoryId", categoryId);
      productData.append("subcategoryId", subcategoryId);
      productData.append("sizes", sizes);
      productData.append("brand", brand);

      const editdata = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      console.log("ooooo",editdata.data)
      if (editdata.data.success) {
        toast.success("Product updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(editdata.data.message);
      
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log("zasaz",reader.result)
      setPhotos(reader.result);
    };
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;   
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`   
      );
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/products");  
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Product"}>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Create Product</h1>
          <div className="m-1 w-75">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategoryId(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setSubCategoryId(value);
              }}
            >
              {subCategories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photos ? "product image" : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photos && (
                <div className="text-center">
                  <img
                    src={photos}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="write a name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="write a Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={sizes}
                placeholder="write a sizes"
                className="form-control"
                onChange={(e) => setSizes(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={brand}
                placeholder="brand"
                className="form-control"
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={stock}
                placeholder="write a quantity"
                className="form-control"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default UpdateProduct;