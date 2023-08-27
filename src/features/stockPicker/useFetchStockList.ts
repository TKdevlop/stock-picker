import { useQuery, useQueryClient } from "react-query";

import { fetchStockList } from "./stockPickerApi";
import QueryKeys from "../../constants/queryKeys";

const useFetchStockList = (stockSymbol: string) => {
  //   const queryClient = useQueryClient();
  return useQuery({
    queryKey: [QueryKeys.stockList, stockSymbol],
    queryFn: () => fetchStockList(stockSymbol),
    enabled: stockSymbol.length > 1,
  });
};

export default useFetchStockList;
