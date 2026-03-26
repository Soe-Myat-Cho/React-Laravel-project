import { useState, useEffect } from "react";
const CreateProduct = () => {
    const [formdata, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discount_percentage: "",
        category_id: "",
        // image1: null,
    });

    const [categories, setCategories] = useState([]);

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        console.log(formdata);

        try {
            const res = await fetch("/api/products/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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

    // const handleCreateProduct = async (e) => {
    //     e.preventDefault();

    //     const data = new FormData();
    //     data.append("name", formdata.name);
    //     data.append("description", formdata.description);
    //     data.append("price", formdata.price);
    //     data.append("discount_percentage", formdata.discount_percentage);
    //     data.append("category_id", formdata.category_id);

    //     if (formdata.image1) {
    //         data.append("image1", formdata.image1);
    //     }

    //     try {
    //         const res = await fetch("/api/products/add", {
    //             method: "POST",
    //             headers: {
    //                 // DO NOT add Content-Type here. 
    //                 // The browser needs to generate it with a "boundary" string.
    //                 "Accept": "application/json",
    //             },
    //             body: data, // Send the FormData object directly
    //         });

    //         const result = await res.json();
    //         console.log("Server received:", result);
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };
    const fetchCategories = async () => {
        const res = await fetch("/api/categories", {
            method: "GET",
        });

        const data = await res.json();
        setCategories(data);
        console.log(data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="w-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Create a new Product Paris
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
                                type="number"
                                name="price"
                                id="price"
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
                                    setFormData({ ...formdata, discount_percentage: e.target.value })
                                }
                                type="number"
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
