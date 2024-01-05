import "./rightBar.scss"

import avatar from "../../assets/avatar.jpg"


const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt="avatar-logo"
              />
              <span>Durgesh Gupta</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt="avatar-logo"
              />
              <span>Durgesh Gupta</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <p>
                <span>Durgesh Gupta</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <p>
                <span>Durgesh Gupta</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <p>
                <span>Durgesh Gupta</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <p>
                <span>Durgesh Gupta</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <div className="online" />
              <span>Durgesh Gupta</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <div className="online" />
              <span>Durgesh Gupta</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <div className="online" />
              <span>Durgesh Gupta</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <div className="online" />
              <span>Durgesh Gupta</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <div className="online" />
              <span>Durgesh Gupta</span>
            </div>
          </div>
          {/* <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <div className="online" />
              <span>Durgesh Gupta</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <div className="online" />
              <span>Durgesh Gupta</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <div className="online" />
              <span>Durgesh Gupta</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <div className="online" />
              <span>Durgesh Gupta</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <div className="online" />
              <span>Durgesh Gupta</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src={avatar}
                alt=""
              />
              <div className="online" />
              <span>Durgesh Gupta</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};



export default RightBar;
