import { useStepperContext } from "../StepperContext";

export default function Details() {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    sessionStorage.setItem(name,value);
  };
  return (
    <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Description
        </div>
        <div className="bg-white my-2 p-1 flex border border-blue-600 rounded">
          <input
            onChange={handleChange}
            value={userData["Description"] || ""}
            name="Description"
            placeholder="Description"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      {/* <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Resource specification
        </div>
        <div className="my-2 flex rounded border border-blue-600 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["Specification"] || ""}
            name="Specification"
            placeholder="Specification"
            type="Text"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div> */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Dimensions
        </div>
        <div className="bg-white my-2 p-1 flex border border-blue-600 rounded">
          <input
            onChange={handleChange}
            value={userData["Dimensions"] || ""}
            name="Dimensions"
            placeholder="Length x Breadth x Height"
            type="Text"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Weight
        </div>
        <div className="bg-white my-2 p-1 flex border border-blue-600 rounded">
          <input
            onChange={handleChange}
            value={userData["Weight"] || ""}
            name="Weight"
            placeholder="Weight in Kg"
            type="number"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
