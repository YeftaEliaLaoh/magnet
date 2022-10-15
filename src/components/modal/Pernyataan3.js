import React, { Fragment } from "react";

export const Pernyataan3 = ({
  children,
  namaBank,
  atasNama,
  cabang,
  noRek,
  noRekUSD,
  ...otherProps
}) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <Fragment>
      <tr>
        <td>
          <p>Bank</p>
        </td>
        <td>
          <p>: </p>
        </td>
        <td>
          <p>
            <strong>
			{namaBank} CAB. {cabang}, A/N. {atasNama}
            </strong>
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <p>No.Rekening Terpisah</p>
        </td>
        <td>
          <p>: </p>
        </td>
        <td>
          <p>
            <strong>{noRek} (IDR)</strong>
          </p>
        </td>
      </tr>
	  {noRekUSD && (
      <tr>
        <td>
          <p>No.Rekening Terpisah</p>
        </td>
        <td>
          <p>: </p>
        </td>
        <td>
          <p>
            <strong>{noRekUSD} (USD)</strong>
          </p>
        </td>
      </tr>)}
    </Fragment>
  );
};

export default Pernyataan3;
