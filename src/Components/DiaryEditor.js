import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

// 감정 리스트
const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];

// 처음부터 오늘의 날짜가 오게 해주기 위한 기능
const getStringDate = (date) => {
  // 0~9까지 잘라준다.
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const [date, setDate] = useState(getStringDate(new Date()));
  // 어떤 감정이 선택되었는지 체크해주는 state
  const [emotion, setEmotion] = useState(3);
  // 오늘의 일기 state
  const [content, setContent] = useState("");
  // 오늘의 일기에서 focus 기능에 사용 할 useRef
  const contentRef = useRef();

  const navigate = useNavigate();

  //감정 클릭시 발생하는 기능
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };
  // onCreate 가져오기
  const { onCreate } = useContext(DiaryDispatchContext);

  // 작성 완료 기능
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    onCreate(date, content, emotion);
    // 일기 데이터 저장하면 홈으로 돌아간다.
    // 그래서 일기 작성하는 페이지를 뒤로가게해서 못도록하게 한다.
    navigate("/", { replace: true });
  };

  return (
    <div className="DiaryEditor">
      {/* 헤더 */}
      <MyHeader
        headText={"새 일기쓰기"}
        leftchild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      {/* 오늘 날짜 */}
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        {/* 오늘의 감정 */}
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                // 자신이 선택된 감정인지 아닌지 알기 위한 prop
                // 선택된 emotion의 값과 같다면 true 전달
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
