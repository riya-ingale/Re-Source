import React from 'react';
// import PG from "./PG";
// import UGCstaffadd from "./components/UGCstaffadd";s
import UGCstaffadd from '../Components/UGCPasswordComponents/UGCstaffadd';

export default function UGCStaffform() {
  return (
    <div className="container" style={{ marginTop: 100 , marginBottom: 100}}>
      <div className="row">
        <div className="col-md-12">
          <UGCstaffadd />
        </div>
        {/* <div className="col-md-6">
          <PG />
        </div> */}
      </div>
    </div>
  )
}
