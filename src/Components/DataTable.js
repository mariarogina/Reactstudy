import React from "react";
import { countriesList } from "../countriesList";

function createData(name, capital, language, currency) {
  return { name, capital, language, currency };
}

const rows = countriesList.map((item) =>
  createData(item.name, item.capital, item.language, item.currency)
);

export default function DataTable() {
  return (
    <div>
      <h1 style={{ color: "white" }}>The table of Three Countries</h1>
      <table className="table" style={{ color: "inherit" }}>
        <thead>
          <tr>
            <th scope="col" align="center">
              No.
            </th>
            <th scope="col" align="center">
              Name
            </th>
            <th scope="col" align="center">
              Capital
            </th>
            <th scope="col" align="center">
              Language
            </th>
            <th scope="col" align="center">
              Currency
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={row.name}>
              <th scope="row">{index}</th>

              <td align="center">{row.name}</td>
              <td align="center">{row.capital}</td>
              <td align="center">{row.language}</td>
              <td align="center">{row.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
