import { useEffect, useState } from "react";
const CreateProduct = () => {
  const [formdata, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    discount_percentage: "",
    image1: "",
    image2: "",
    image3: "",
    category_id: "",
  });

  const [img, setImg] = useState({
    image1: "",
    image2: "",
    image3: "",
  });

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories", {
      method: "GET",
    });

    const data = await res.json();
    setCategories(data);
    console.log(data);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    // console.log(img.image1.name, img.image2.name, img.image3.name);

    // try {
    //   const img = await fetch("/api/products/upload", {
    //     method: "POST",
    //     body: JSON.stringify(img),
    //   });
    //   const data = await img.json();
    //   console.log(data);

    //   setFormData({
    //     ...formdata,
    //     image1: data.image1,
    //     image2: data.image2,
    //     image3: data.image3,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const imgUpload = new FormData();
      imgUpload.append("image1", formdata.image1);
      imgUpload.append("image2", formdata.image2);
      imgUpload.append("image3", formdata.image3);

      const img = await fetch("/api/products/upload", {
        method: "POST",
        body: imgUpload,
      });
      const data = await img.text();
      console.log(data);

      setFormData({
        ...formdata,
        image1: data.image1,
        image2: data.image2,
        image3: data.image3,
      });
    } catch (error) {
      console.log(error);
    }

    //
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create a new product
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-10">
        <form
          onSubmit={(e) => handleCreateProduct(e)}
          className="space-y-6"
          action=""
          method="POST"
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                value={formdata.name}
                onChange={(e) =>
                  setFormData({ ...formdata, name: e.target.value })
                }
                type="text"
                name="name"
                id="name"
                required
                className="border block w-full  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <input
                value={formdata.description}
                onChange={(e) =>
                  setFormData({ ...formdata, description: e.target.value })
                }
                type="text"
                name="description"
                id="description"
                required
                className="border block w-full  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Price
            </label>
            <div className="mt-2">
              <input
                value={formdata.price}
                onChange={(e) =>
                  setFormData({ ...formdata, price: e.target.value })
                }
                type="text"
                name="price"
                id="price"
                required
                className="border block w-full  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Quantity
            </label>
            <div className="mt-2">
              <input
                value={formdata.quantity}
                onChange={(e) =>
                  setFormData({ ...formdata, quantity: e.target.value })
                }
                type="text"
                name="quantity"
                id="quantity"
                required
                className="border block w-full  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Product Image 1
            </label>
            <div className="mt-2">
              <input
                onChange={(e) =>
                  setFormData({ ...formdata, image1: e.target.files[0] })
                }
                type="file"
                name="image"
                id="image"
                required
                className="border block w-full  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Product Image 2
            </label>
            <div className="mt-2">
              <input
                onChange={(e) =>
                  setFormData({ ...formdata, image2: e.target.files[0] })
                }
                type="file"
                name="image"
                id="image"
                required
                className="border block w-full  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Product Image 3
            </label>
            <div className="mt-2">
              <input
                onChange={(e) =>
                  setFormData({ ...formdata, image3: e.target.files[0] })
                }
                type="file"
                name="image"
                id="image"
                required
                className="border block w-full  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Discount Percentage
            </label>
            <div className="mt-2">
              <input
                value={formdata.discount_percentage}
                onChange={(e) =>
                  setFormData({
                    ...formdata,
                    discount_percentage: e.target.value,
                  })
                }
                type="text"
                name="discount_percentage"
                id="discount_percentage"
                required
                className="border block w-full  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Category
            </label>
            <div className="mt-2">
              <select
                value={formdata.category_id}
                onChange={(e) =>
                  setFormData({ ...formdata, category_id: e.target.value })
                }
                name="category"
                id="category"
                className="border block w-full  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center  bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

// try {
//   const imgUpload = new FormData();
//   imgUpload.append("image1", formdata.image1);
//   imgUpload.append("image2", formdata.image2);
//   imgUpload.append("image3", formdata.image3);

//   const img = await fetch("/api/products/upload", {
//     method: "POST",
//     body: imgUpload,
//   });
//   const data = await img.json();
//   console.log(data);

//   setFormData({
//     ...formdata,
//     image1: data.image1,
//     image2: data.image2,
//     image3: data.image3,
//   });
// } catch (error) {
//   console.log(error);
// }
