import React, { useEffect, useState } from "react";
import axios from "axios";
import { updateMaxTime, updateMinTime } from "./../Services/services";

const HeroSection = () => {
  const [params, setParams] = useState("");
  const [inputValues, setInputValues] = useState({});

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

  return (
    <div>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  FirstName
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  LastName
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  MinTimeInHours
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  MaxTimeInHours
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  SlackEmail
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {Object.keys(params).map((email) => (
                <tr key={email}>
                  <td>{email}</td>
                  {Object.keys(params[email]).map((param) => (
                    <React.Fragment key={param}>
                      {param === "MinTimeInHours" ||
                      param === "MaxTimeInHours" ? (
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5">
                          {param === "MinTimeInHours" ||
                          param === "MaxTimeInHours" ? (
                            <input
                              value={
                                inputValues[email]?.[param] ||
                                params[email][param]
                              } 
                              onChange={(e) =>
                                handleInputChange(email, param, e.target.value)
                              }
                              className="border-blue-900"
                            />
                          ) : (
                            params[email][param]
                          )}
                        </td>
                      ) : (
                        <td
                          key={param}
                          className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
                        >
                          {params[email][param]}
                        </td>
                      )}
                    </React.Fragment>
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
