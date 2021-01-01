import React, { useEffect, useState } from "react";
import { usePalette } from "react-palette";
import { fetchData } from "../../api";
import Color, { Palette } from "color-thief-react";

export const Flag = () => {
  const [data, setData] = useState([]);
  const Loading = () => <div>Loading...</div>;

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData());
    };
    fetchAPI();
  }, []);

  const colorDB = data.map((flag) => (

    <Palette
      src={flag.flag}
      crossOrigin="anonymous"
      format="hex"
      colorCount={4}
    >
      {({ data, loading }) => {
        if (loading) return <Loading />;
        return console.log(data)

        //   return (
        //     <div>
        //       Palette:
        //       <ul>
        //         {data.map((color, index) => (
        //           <li key={index} style={{ color: color }}>
        //             <strong>{color}</strong>
        //           </li>
        //         ))}
        //       </ul>
        //     </div>
        //   );
      }}
    </Palette>
  ));
  return (
    <div>
        {colorDB}
    </div>
  );
};

export default Flag;
