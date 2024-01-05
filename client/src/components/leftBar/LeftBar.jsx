import './leftBar.scss'
import avatar from "../../assets/avatar.jpg"
import Friends from "../../assets/1.png"
import Groups from "../../assets/2.png"
import Watch from "../../assets/4.png"
import Memories from "../../assets/5.png"
import Events from "../../assets/6.png"
import Gaming from "../../assets/7.png"
import Messages from "../../assets/10.png"
import Tutorials from "../../assets/11.png"
import Courses from "../../assets/12.png"
import Fund from "../../assets/13.png"

const LeftBar = () => {
  return (
    <div className='leftBar'>
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={avatar}  
            alt="logo" />
            <span>Durgesh Gupta</span>
          </div>
          <div className="item">
            <img src={Friends} alt="friends-logo" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="groups-logo" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Watch} alt="watch-logo" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="memories-logo" />
            <span>Memories</span>
          </div>
        </div>
        <hr/>
        <div className="menu">
          <span>Your shortcuts</span> 
          <div className="item">
            <img src={Events} alt="events-logo" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Messages} alt="messages-logo" />
            <span>Messages</span>
          </div>
        </div>
        {/* <hr/>
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="fund-logo" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="tutorials-logo" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="courses-logo" />
            <span>Courses</span>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default LeftBar
