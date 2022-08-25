export default function Final() {
  const fetchdata = ()=>
  {
    const name = sessionStorage.getItem("Resource Name");
    const specification = sessionStorage.getItem("Weight");
    // const img = sessionStorage.getItem("Resource Image");
    const img = [];
    for (let i = 0;i<localStorage['quantity'];i++){
      img[i] = localStorage["fileBase64-image-"+i];
    }
    const subject = sessionStorage.getItem("Domain");
    const dimension = sessionStorage.getItem("Dimensions");
    const details = sessionStorage.getItem("Description");
    const quantity = sessionStorage.getItem("Quantity");
    const cost = sessionStorage.getItem("Cost");
    const is_important = sessionStorage.getItem("important");
    const username = sessionStorage.getItem("username")
    const req_approval = 0;
    const role_id = sessionStorage.getItem("role_id")
    const logindata = {name,specification,subject,dimension,details,quantity,cost,req_approval,img,role_id,is_important};
    console.log(logindata);
    const lab_id = sessionStorage.getItem("lab_id")
    const url = 'http://127.0.0.1:8000/resource/add/'+lab_id;
    
    fetch(url, {//role id update require wait for landing page
      method: 'POST',
      headers: { "Content-Type": "application/json",'Authorization':sessionStorage.getItem('token') },
      body: JSON.stringify(logindata)
    })
    .then(async response=>{
      const data = await response.json();
      console.log(data)
      if(data['status'] == 200){
        console.log("Done")
      }
      else{
        console.log(data['message'])
      }
    })
    window.location.href="/wfProfile";
  };
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center ">
        {/* <div className="wrapper">
           <svg
               d="M14.1 27.2l7.1 7.2 16.7-16.8"
             className="checkmark"
            xmlns=""
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="#ffffff"
            />
            <path
              className="checkmark__check"
              fill="#ffffff"
             />
           </svg>
        </div> */}

        <div className="mt-3 text-xl font-semibold uppercase text-blue-500">
          Congratulations!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Your resource has been added.
        </div>
        {/* <a className="mt-10" href="/user/dashboard"> */}
          <button type='submit' onClick={fetchdata} className="h-10 px-5 text-blue-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-blue-500 hover:text-blue-100">
          Submit
          </button>
        {/* </a> */}
      </div>
    </div>
  );
}
