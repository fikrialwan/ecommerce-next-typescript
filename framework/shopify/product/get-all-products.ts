import { type } from "os";
import getAllProductsQuery from "../utils/queries/get-all-products";

type FetchParams = {
    query: string
}

const fetchAPI = async ({ query }: FetchParams) => {
    const url = "http://localhost:4000/graphql";

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query
        })
    });

    const data = await res.json();
    return { data };
}

const getAllProducts = async (): Promise<any[]> => {
    const products = await fetchAPI({ query: getAllProductsQuery });
    return products.data;
}

export default getAllProducts;