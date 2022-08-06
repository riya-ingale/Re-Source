import { useStepperContext } from "../StepperContext";

export default function Cost() {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  
  return (
    <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-8 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Resource Cost
        </div>
        <div className="bg-white my-3 p-1 flex border border-blue-600 rounded ">
          <input
            onChange={handleChange}
            value={userData["Resource cost"] || ""}
            name="Resource Cost"
            placeholder="Resource Cost in ₹"
            type = "number"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          
        </div>
        <div className="bg-white ">
          {/* <input
            onChange={handleChange}
            value={userData["Quantitiy"] || ""}
            name="Quantity"
            placeholder="Resource Quantity"
            type="number"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          /> */}
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          
        </div>
        <div className="bg-white ">
          {/* <input
            onChange={handleChange}
            value={userData["Quantitiy"] || ""}
            name="Quantity"
            placeholder="Resource Quantity"
            type="number"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          /> */}
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Quantity
        </div>
        <div className="bg-white my-3 p-1 flex border border-blue-600 rounded">
          <input
            onChange={handleChange}
            value={userData["Quantitiy"] || ""}
            name="Quantity"
            placeholder="Resource Quantity"
            type="number"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
