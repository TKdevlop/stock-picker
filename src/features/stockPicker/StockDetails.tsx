import { StockDetails } from "./types";

interface Props {
  stockDetails: StockDetails;
  price: number;
}

export default function StockDetails({ stockDetails, price }: Props) {
  return (
    <div className="stock-table">
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{stockDetails.Name}</td>
          </tr>
          <tr>
            <td>Symbol</td>
            <td>{stockDetails.Symbol}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{stockDetails.Description}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                currency: "USD",
                style: "currency",
              }).format(price)}
            </td>
          </tr>
          <tr>
            <td>Exchange</td>
            <td>{stockDetails.Exchange}</td>
          </tr>
          <tr>
            <td>Industry</td>
            <td>{stockDetails.Industry}</td>
          </tr>
          <tr>
            <td>PE Ratio</td>
            <td>{stockDetails.PERatio}</td>
          </tr>
          <tr>
            <td>Market CAP</td>
            <td>
              {new Intl.NumberFormat("en-US", {
                currency: "USD",
                style: "currency",
              }).format(parseInt(stockDetails.MarketCapitalization))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
