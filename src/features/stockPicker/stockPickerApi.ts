import { fetcherGet } from "../../utils/fetcher";
import { StockDetails, StockList, StockTimeSeriesIntraDay } from "./types";

//Move API_KEY to backend so we can proxy the API for security purpose
const API_KEY = "demo";
export const fetchStockDetails = async (stockSymbol?: string) => {
  const result = await fetcherGet<StockDetails>(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${API_KEY}`
  );
  return result.data;
};

export const fetchStockList = async (stockSymbol: string) => {
  const result = await fetcherGet<StockList>(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockSymbol}&apikey=${API_KEY}`
  );
  return result.data.bestMatches.map((stock) => ({
    label: stock["1. symbol"],
    value: stock["1. symbol"],
  }));
};

export const fetchStockTimeSeriesIntraDay = async (stockSymbol?: string) => {
  const result = await fetcherGet<StockTimeSeriesIntraDay>(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=${API_KEY}`
  );
  const data = {
    labels: Object.keys(result.data?.["Time Series (5min)"])
      .map((item) => item.substring(0, 16))
      .splice(0, 20),
    dataset: Object.values(result.data?.["Time Series (5min)"])
      .map((item) => parseInt(item["1. open"]))
      .splice(0, 20),
  };
  return data;
};
