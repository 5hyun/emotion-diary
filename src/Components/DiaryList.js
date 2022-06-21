import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

// 정렬 필터
// value는 select가 어떤걸 선택하고 있는지
// onChange는 select가 변화했을 때, 바꿀 기능을 하는 함수
// optionList는 select 안에 들어갈 옵션이다.
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  // 정렬 기준을 정할 state이고 초기값은 최신으로 할거라서 lastest
  const [sortType, setSortType] = useState("lastest");
  // 감정 숫자 기준으로 출력
  const [filter, setFilter] = useState("all");

  // 최신순, 오래된 순으로 정렬하는 기능
  const getProcesseDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    // stringify(diaryList)를 하면 diaryList가 배열에서 문자열로 바뀐다.
    // 그리고 parse를 하면 다시 배열로 바꿔준다.
    // diaryList를 안건드리고 copyList에 깊은 복사를 하기 위해서 이렇게 한다.
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcesseDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

// 데이터가 정상적으로 전달되지 않으면 빈배열 전달
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
