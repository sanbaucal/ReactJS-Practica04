const Profile = ({ avatar, username, bio, onLogout }) => {
  return (
    <div>
      <div className="row d-flex justify-content-end mt-2">
        <div className="col-2">
          <button className="btn btn-danger" onClick={() => onLogout()}>
            <i className="bi bi-person-x"></i> Salir
          </button>
        </div>
      </div>
      <div className="container mt-5 p-2">
        <div className="d-flex justify-content-center mb-2">
          <div className="profile text-center">
            <img
              alt="100x100"
              data-holder-rendered="true"
              width="150"
              height="130"
              src={avatar}
              className="border-bottom rounded-circle"
            />
            <div className="card-body">
              <h5 className="card-title">@{username}</h5>
              <p className="card-text">{bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
