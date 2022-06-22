import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  // 달에 따라 보여주는 리스트를 다르게 하기 위한 state
  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  // month는 1월이 0월로 표시되기 때뮨에 +1 해줘야 한다.
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  // useEffect로 curDate가 변화하는 순간 그 달의 데이터를 뽑아와야 한다.
  useEffect(() => {
    // diary가 비어있으면 밑에 코드 수행할 이유가 없다.
    if (diaryList.length >= 1) {
      // 그 달의 1일 시간 구하기
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      // 그 달의 마지막 날 시간 구하기
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();

      // firstDay보다는 커야하고 lastDay보다는 작아야 그 달 안에 있다.
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
    // diaryList가 바꼈다는 것은 일기가 추가, 수정, 삭제된 것을 의미한다.
    // 따라서 diaryList도 넣어줘야 한다.
  }, [diaryList, curDate]);

  // 제대로 바뀌는지 확인 출력
  useEffect(() => {
    console.log(data);
  }, [data]);

  // 오른쪽 버튼 누르면 1달씩 증가
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  // 왼쪽 버튼 누르면 1달씩 감소
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftchild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightchild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
