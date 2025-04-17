import { useState } from "react";
const CreateProduct = () => {
  const [formdata, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    console.log(formdata);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        alert("Product created successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create product");
    }
  };

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
