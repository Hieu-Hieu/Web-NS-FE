import React from 'react'

const EditUser = () => {

  return (
    <div>
      <h2 className="page-header">New user</h2>
      <div className="row">
        <div className="col-10">
          <div className="card full-height">
            <form action="" className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Thang Ngo"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Số điện"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Thang Ngo"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Thang Ngo"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Thang Ngo"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Thang Ngo"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={user_image}
                    alt=""
                  />
                  <label htmlFor="file">
                    <i className="bx bx-upload bx-sm userUpdateIcon"></i>
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
