import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { AddProductToWishListProps } from "./AddProductToWishList";
import lodash from "lodash";
// import { AddProductToWishList } from "./AddProductToWishList";


const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import("./AddProductToWishList").then(
    (mod) => mod.AddProductToWishList
  );
}, {
  loading: () => <span>Loading...</span>,
});

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    formattedPrice: string;
    title: string;
  };
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} <strong>{product.formattedPrice}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishList
          onAddToWishList={() => {
            onAddToWishList(product.id), setIsAddingToWishlist(false);
          }}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);
