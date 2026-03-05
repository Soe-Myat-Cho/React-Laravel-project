import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Products = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const categoryImages = {

        1: "https://media1.calvinklein.com/images/20260203/Tiles/Tile_NA_Men.webp",

        2: "https://media1.calvinklein.com/images/20250304/Tiles/Tile_Lily_4_2x.webp",

        3: "https://media1.calvinklein.com/images/20250506_misc/PLP/PLP_Header_Kids.webp"

    };
    const productImages = {
        1: "https://calvinklein.scene7.com/is/image/CalvinKlein/40BC238_YAF_main?wid=352&hei=464&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp",
        2: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI211970691001_alternate10?$plpDeskRF$",
        3: "https://calvinklein-eu.scene7.com/is/image/CalvinKleinEU/IG0IG03022_PGB_main?$b2c_uplp_listing_2560$"
    };


    // const fetchProducts = async () => {
    //   const res = await fetch("/api/products", {
    //     method: "GET",
    //   });

    //   const data = await res.json();
    //   setProducts(data);

    //   console.log(data);
    // };

    const fetchProducts = async (categoryId = null) => {
        let url = "/api/products";

        if (categoryId) {
            url += `?category_id=${categoryId}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
    };

    const fetchCategory = async () => {
        const res = await fetch(`/api/categories/${id}`, {
            method: "GET",
        });
        const data = await res.json();
        setCategory(data);
        console.log(data);
    };

    useEffect(() => {
        fetchProducts(id);
    }, [id]);

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-full">

            {/* <h1 className="text-3xl font-bold mb-5">{category.name}</h1> */}

            <div className="flex flex-col md:flex-row mb-5">
                <div className="w-full md:w-1/2">
                    <img
                        src={categoryImages[id]}
                        alt=""
                    />
                </div>
                <div
                    className="bg-gray-100 w-full md:w-1/2 flex justify-center items-center text-center px-5 py-10"
                >
                    <div>
                        <h3 className="text-3xl text-start font-semi-bold">90s Inspired Jeans</h3>
                        <p className="text-md text-start">
                            Find your iconic fit. From straight to slim, 90s and more.
                        </p>
                    </div>
                </div>
            </div>

            <div className="product-container grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-2">
                {products.map((product) => (
                    <div key={product.id} className="py-8">
                        <Link to={`/products/${product.id}`}>
                            <img
                                src={productImages[id]}
                                className="aspect-square w-full h-full object-cover xl:aspect-7/8 transform hover:opacity-90 transition duration-300 ease-in-out"
                            />
                            <div className="items-baseline flex space-x-3">
                                <p className="mt-4 text-lg text-gray-700">{product.name}</p>
                                {product.discount_percentage > 0 && (
                                    <p className="mt-1 text-md text-gray-600">
                                        {product.discount_percentage}% Off
                                    </p>
                                )}
                            </div>
                            <div className="flex space-x-3 items-baseline">
                                {product.discount_percentage > 0 ? (
                                    <p className="mt-1 text-xl text-gray-900">
                                        $
                                        {(
                                            product.price -
                                            product.price * (product.discount_percentage / 100)
                                        ).toFixed(1)}
                                    </p>
                                ) : (
                                    <p className="mt-1 text-xl text-gray-900">${product.price}</p>
                                )}

                                {product.discount_percentage > 0 && (
                                    <p className="mt-1 text-md text-gray-600 line-through">
                                        ${product.price}
                                    </p>
                                )}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
