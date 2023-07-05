import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubCategoryId] = useState("");
  // const [images, setImages] = useState("");
  const [sizes, setSizes] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [shipping, setShipping] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getAllCategory");
      console.log("data", data)
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  const getAllSubCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getAllsubCategory");
      console.log("data", data)
      if (data?.success) {
        setSubCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllSubCategory(); getAllCategory()
  }, []);

  function handleImageChange(event) {
    const files = event.target.files;
   
    var filesArray = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
  
      const reader = new FileReader();

      if (file instanceof Blob) {
        reader.readAsDataURL(file);
      }
  
      reader.onload = function (event) {
        console.log(event.target.result)   
        const dataURL = event.target.result;
        console.log(dataURL)
  
        filesArray.push(dataURL);
      };
      
      reader.readAsDataURL(file);
    console.log("filearray",filesArray)

    }
    console.log("filearray",filesArray)
    // use filesArray as needed
    setPhotos(filesArray)
    
  }   
  
 



  // const handleImageChange = (e) => {
  //   const files = e.target.files;
  //   const filesArray = [];
  //   console.log("file", files)
  //   for (let i = 0; i < files.length; i++) {

  //     const file = files[i];
  //     console.log("first",file)

  //     var reader = new FileReader();

  //     reader.onload = function (event) {
  //       const blob = new Blob([event.target.result], { type: file.type });

  //       filesArray.push(blob);
  //     };    
  //     reader.readAsArrayBuffer(file);
      

  //   }

    

  //   reader.onload = () => {
  //     console.log("zasaz", filesArray)
  //     setPhotos(filesArray);
  //   };
    

  //   // reader.readAsDataURL(imgArray);

  //   // reader.onload = () => {
  //   //   console.log("zasaz", reader.result)
  //   //   setPhotos(reader.result);   
  //   // };

  //   // const file = e.target.files[0];
  //   // const reader = new FileReader();

  //   // reader.readAsDataURL(file);

  //   // reader.onload = () => {
  //   //   console.log("zasaz",reader.result)
  //   //   setPhotos(reader.result);
  //   // };

  // };


  //create product function
  const handleCreate = async (e) => {
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
      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);

      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
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
                  console.log(value)
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
                {photos ? "Upload Photo" : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                    multiple
                  />
                </label>
              </div>
              <div className="mb-3">
              <div class="d-flex">
                {photos?.map((c,index) => (
                 
                    <img key={index} src={c}  alt="product_photo"
                    height={"200px"}
                    className="img img-responsive" />
                 
                ))}
                 </div>
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
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;