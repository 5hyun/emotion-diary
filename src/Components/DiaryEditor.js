import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

// isEdit, originData는 Edit.js에서 왔다.
const DiaryEditor = ({ isEdit, originData }) => {
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
  // onCreate, onEdit 가져오기
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  // 작성 완료 기능
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    // 일기 생성 or 일기 수정
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    // 일기 데이터 저장하면 홈으로 돌아간다.
    // 그래서 일기 작성하는 페이지를 뒤로가게해서 못도록하게 한다.
    navigate("/", { replace: true });
  };

  // Edit때 사용
  useEffect(() => {
    if (isEdit) {
      // 변경되는 일기에 맞게 날짜, 감정, 내용을 바꿔준다.
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      {/* 헤더 */}
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
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
