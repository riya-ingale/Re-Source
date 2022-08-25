import { useStepperContext } from "../StepperContext";

export default function Cost() {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    sessionStorage.setItem(name,value);
  };
  
  return (
    <div className="flex flex-col ">
      {/* <div className="w-full mx-2 flex-1">
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
      </div> */}
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
          Resource Cost
        </div>
        <div className="bg-white my-2 p-1 flex border border-blue-600 rounded">
          <input
            onChange={handleChange}
            value={userData["Cost"] || ""}
            name="Cost"
            placeholder="Resource Cost"
            type="Number"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase"> 
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Resource Quantity
        </div>
        <div className="bg-white my-2 p-1 flex border border-blue-600 rounded">
          <input
            onChange={handleChange}
            value={userData["Quantity"] || ""}
            name="Quantity"
            placeholder="Resource Quantity"
            type="number"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        
        <div className="bg-white my-2 p-1 flex ">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          <span className="px-2 my-2"><input  className="p-1 px-2 py-2 appearance-none outline-none text-gray-800 form-check-input" style={{marginTop:"6px"}} type="radio" name="flexRadioDefault" id="flexRadioDefault1"   onChange={handleChange}></input>
          </span>
          Required Approval
          </div>
          
        </div>
      </div>

    </div>
  );
}
