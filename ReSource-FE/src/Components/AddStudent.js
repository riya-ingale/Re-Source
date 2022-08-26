import React from 'react';
import "../Css/add_student.css"

export default function AddStudent() {
  return (
    <>
        <div className='container container-add-student'>
            <h1 classname="heading-addStudent" style={{fontSize: "32px",textAlign: "center",fontWeight: "bold"}}>Add Student</h1>
            <div className='card card-add-student'>
                <div className='row'>
                    <div className='col-md-2'>
                        <h2 className='prod-name'>Product Name</h2>
                    </div>
                    <div className='col-md-3'>
                        <h3 className='product-resource-details'>Date: 27-09-2022</h3>
                        <h3 className='product-resource-details'>Time: 9:00 - 12:00 Hrs</h3>
                        <h3 className='product-resource-details'>Lab: L101</h3>
                    </div>
                    <div className='col-md-7'>
                        <div className='d-flex justify-content-center'>
                            <div classname="row">
                                <div className='col-md-6'>
                                <div class="mb-3">
                                    <label for="formFile" class="form-label"></label>
                                    <input class="form-control" type="file" id="formFile"/>
                                </div>
                                </div>
                                <div className='col-md-6'>
                                    <button className='btn btn-primary'>Add Student</button>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
