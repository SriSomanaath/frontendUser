import React, { useEffect, useState } from "react";
import axios from "axios";
import { updateMaxTime, updateMinTime } from "./../Services/services";
import { FaSort } from "react-icons/fa6";

const HeroSection = () => {
  const [params, setParams] = useState("");
  const [sortedParams, setSortedParams] = useState(null); // State variable to store sorted data
  const [inputValues, setInputValues] = useState({});
  const [sortState, setSortState] = useState({
    FirstName: null,
    LastName: null
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/api/employees");
        setParams(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchData();
    return () => {};
  }, []);

  const handleInputChange = (email, param, value) => {
    setInputValues({
      ...inputValues,
      [email]: {
        ...inputValues[email],
        [param]: value,
      },
    });
    if (param === "MinTimeInHours") {
      updateMinTime(email, value);
    } else if (param === "MaxTimeInHours") {
      updateMaxTime(email, value);
    }
  };

  const handleSort = (column) => {
    const sortOrder = sortState[column] === "asc" ? "desc" : "asc";
    const sortedData = Object.keys(params).sort((a, b) => {
      const valueA = params[a][column].toUpperCase();
      const valueB = params[b][column].toUpperCase();
      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
    setSortState({ ...sortState, [column]: sortOrder });
    setSortedParams(sortedData);
  };

  return (
    <div>
      <div className="py-2 overflow-x-auto sm:-mx-6 sm:px-6 pr-10 ">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4  tracking-wider rounded-l-md">
                  Email
                </th>
                {Object.keys(params).length > 0 &&
                  Object.keys(params[Object.keys(params)[0]]).map((column) => (
                    <th
                      key={column}
                      className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider"
                    >
                      {column}
                      {column === "FirstName" || column === "LastName" ? (
                        <button onClick={() => handleSort(column)}><FaSort /></button>
                      ) : null}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {(sortedParams || Object.keys(params)).map((email) => (
                <tr key={email} className=" shadow-lg gap-y-2 rounded-md hover:bg-gray-200">
                  <td className="pl-2">{email}</td>
                  {Object.keys(params[email]).map((param) => (
                    <td
                      key={param}
                      className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5"
                    >
                      {(param === "MinTimeInHours" || param === "MaxTimeInHours") ? (
                        <input
                          value={inputValues[email]?.[param] || params[email][param]}
                          onChange={(e) => handleInputChange(email, param, e.target.value)}
                          className="border-blue-900"
                        />
                      ) : (
                        params[email][param]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
