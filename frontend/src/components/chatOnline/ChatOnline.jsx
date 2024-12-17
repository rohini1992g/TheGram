import "./chatOnline.css";

export default function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImageContainer">
          <img
            src="https://media.istockphoto.com/id/1468267123/photo/adult-woman-chemotherapy-patient-finishing-treatment-with-a-ceremonial-bell-ring.jpg?s=1024x1024&w=is&k=20&c=kp54O_JNa0SBrNIyW6maiOxFukF4PdWKnD0oBOU3UiM="
            alt=""
            className="chatOnlineImage"
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">John Deo</span>
      </div>
    </div>
  );
}
