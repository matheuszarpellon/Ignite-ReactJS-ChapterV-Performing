import { useMemo } from "react";
import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from "react-virtualized";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    formattedPrice: string;
    title: string;
  }>;
  onAddToWishList: (id: number) => void;
}

export function SearchResults({
  results,
  onAddToWishList,
  totalPrice,
}: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={500}
        width={900}
        rowHeight={25}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results.map((product) => {
        return (
          
        );
      })} */}
    </div>
  );
}
