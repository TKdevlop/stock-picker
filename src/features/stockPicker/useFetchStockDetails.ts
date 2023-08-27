import { useQuery } from "react-query";

import { fetchStockDetails } from "./stockPickerApi";
import QueryKeys from "../../constants/queryKeys";

const useFetchStockDetails = (stockSymbol?: string) => {
  return useQuery({
    queryKey: [QueryKeys.stockDetails, stockSymbol],
    queryFn: () => fetchStockDetails(stockSymbol),
    enabled: !!stockSymbol,
  });
};

export default useFetchStockDetails;
