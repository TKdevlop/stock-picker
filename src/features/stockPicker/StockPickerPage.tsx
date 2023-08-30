import { AutoComplete, Col, Input, Row, Spin, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import useFetchStockList from "./useFetchStockList";
import useFetchStockDetails from "./useFetchStockDetails";
import StockDetails from "./StockDetails";
import useFetchStockTimeSeriesIntraDay from "./useFetchStockTimeSeriesIntraDay";
import { StockChart } from "./StockChart";
import { useNavigate, useParams } from "react-router-dom";

export default function StockPickerPage() {
  const navigate = useNavigate();
  const { symbol } = useParams();
  const [value, setValue] = useState<string>(symbol || "");

  const debouncedSearch = useDebounce(value, 500);
  const { isFetching: isFetchingStockList, data: stockList } =
    useFetchStockList(debouncedSearch);
  const {
    data: stockDetails,
    isLoading: isLoadingStockDetails,
    refetch: reFetchStockDetails,
  } = useFetchStockDetails(symbol);
  const {
    data: stockTimeSeriesData,
    isLoading: isLoadingTimeSeriesData,
    refetch: reFetchTimeSeriesData,
  } = useFetchStockTimeSeriesIntraDay(symbol);

  const onSelect = (selectedValue: string) => {
    navigate(
      `/stock-picker/${encodeURIComponent(selectedValue.replace(/\./g, "%2E"))}`
    );
  };

  //effect to refetch stock data in background at a set interval
  useEffect(() => {
    if (symbol) {
      setValue(symbol);
      const interval = setInterval(() => {
        reFetchStockDetails();
        reFetchTimeSeriesData();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [symbol]);

  const stockDataLoading = isLoadingStockDetails || isLoadingTimeSeriesData;
  return (
    <>
      <Row justify="center">
        <Col md={12} xs={24}>
          <AutoComplete
            value={value}
            options={stockList || []}
            style={{ width: "100%", marginTop: 30 }}
            onSelect={onSelect}
            notFoundContent={
              isFetchingStockList ? (
                <div style={{ textAlign: "center" }}>
                  <Spin />
                </div>
              ) : (
                "No matches"
              )
            }
            onChange={(text) => setValue(text)}
          >
            <Input.Search
              size="large"
              enterButton
              loading={stockDataLoading}
              onSearch={(e) => onSelect(e)}
              placeholder={"Search Stock Symbol..."}
            />
          </AutoComplete>
        </Col>
      </Row>
      {useMemo(
        () =>
          stockDetails &&
          Object.keys(stockDetails).length > 0 &&
          stockTimeSeriesData ? (
            <Row gutter={10} style={{ marginTop: 30 }}>
              <Col md={12} xs={24}>
                <StockDetails
                  stockDetails={stockDetails}
                  price={stockTimeSeriesData.dataset[0]}
                />
              </Col>
              <Col md={12} xs={24}>
                <StockChart
                  labels={stockTimeSeriesData.labels}
                  dataset={stockTimeSeriesData.dataset}
                />
              </Col>
            </Row>
          ) : (
            !stockDataLoading &&
            symbol && (
              <Typography.Title
                level={2}
                style={{ marginTop: 50, textAlign: "center" }}
              >
                Something went wrong or stock Not found
              </Typography.Title>
            )
          ),
        [
          stockDetails,
          stockTimeSeriesData,
          isLoadingStockDetails,
          isLoadingTimeSeriesData,
        ]
      )}
    </>
  );
}
