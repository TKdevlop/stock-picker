import { useQuery } from "react-query";

import QueryKeys from "../../constants/queryKeys";
import { fetchStockTimeSeriesIntraDay } from "./stockPickerApi";

const useFetchStockTimeSeriesIntraDay = (stockSymbol?: string) => {
  return useQuery({
    queryKey: [QueryKeys.stockTimeSeriesIntraDay, stockSymbol],
    queryFn: () => fetchStockTimeSeriesIntraDay(stockSymbol),
    enabled: !!stockSymbol,
  });
};

export default useFetchStockTimeSeriesIntraDay;
