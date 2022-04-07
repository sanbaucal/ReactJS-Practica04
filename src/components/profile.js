function Profile({ view_active, avatar, username, bio }) {
  return (
    !view_active && (
      <div className="d-flex justify-content-center mt-4 mb-2">
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
    )
  );
}

export default Profile;
