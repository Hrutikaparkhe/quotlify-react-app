import React, { useEffect, useState } from "react";
import "./header.scss";
import logo from "../../assets/img/logo1.png";
import "rsuite/dist/rsuite.min.css";
import Dropdown from "../Dropdown/Dropdown";
import Filters from "../Filters/Filters";
import shuffle from "../../assets/img/shuffle.png";
import Card from "../Card/Card";
import axios from "axios";
const checkBox = [
  "wisdom",
  "technology",
  "inspirational",
  "famous-quotes",
  "friendship",
];
const Header = () => {
  const [Items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState([]);
  const [text, setText] = useState(0);
  const [values, setValues] = useState("");
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    dropDown: "",
    limit: 0,
    checkBoxes: [],
  });
  const [isFetching, setIsFetching] = useState(false);
  // const [page, setPage] = useState(0);
  //we need to know if there is more data
  const [HasMore, setHasMore] = useState(true);
  console.log("$#$#$#$#$#$#", filters);
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  const fetchQuotes = () => {
    axios
      .get("https://quotable.io/quotes", {
        params: {
          tags: checked.length && checked.join(","),
          limit: text,
        },
      })

      .then((resp) => {
        setData(resp?.data?.results);
        // console.log(resp?.data, "preranaa");
      });
  };

  const fetchByRandomQuotes = () => {
    axios.get("https://api.quotable.io/random").then((resp) => {
      console.log("resp", resp?.data);
      setData({
        data: { results: [resp?.data] },
      });
      // setData(resp?.data)
    
    });
  };

  const fetchByRandomAuthors = () => {
    axios.get("https://quotable.io/quotes?page=2").then((resp) => {
      // setData(resp);
      setData(resp?.data?.results)
     
    });
  };

  console.log("********", data);

  const InfiniteScrolling = async () => {
    const res = await axios.get("https://quotable.io/quotes", {
      params: {
        page: page,
        limit: limit,
      },
    });
    setData(res.data.results);
    console.log("hjasgdjha", res.data.results);
  };

  const handleListner = () => {
    const ht = window.innerHeight + document.documentElement.scrollTop;
    const offht = document.documentElement.offsetHeight;
    console.log("offht", offht);
    console.log("ht", ht);
    if (Math.round(ht) >= offht) {
      setLimit(limit + 10);
      InfiniteScrolling();
      setPage(page + 1);
      InfiniteScrolling();
    }
  };
  const removeEventListener = () => {
    window.removeEventListener("scroll", () => {});
  };
  useEffect(() => {
    return () => {
      removeEventListener();
    };
  }, []);

  useEffect(() => {
    InfiniteScrolling();
    window.addEventListener("scroll", handleListner);
  }, []);
  // const quotes = data?.data?.results;
  const quotes = data;
  console.log("rutika", data);

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} className="logo" />
      </div>

      <div className="header-container">
        <span className="header">Quotlify</span>
      </div>
      <div></div>
      <div className="sub-container">
        <div className="box">
          <div className="filters-heading">Advanced filters</div>
          <div className="dropdown">
            <Dropdown setValues={setValues} values={values} />
            <div className="btn-one">
              {" "}
              <input
                className="limit-style"
                type="text"
                placeholder="limit"
                onChange={(event) => setText(event.target.value)}
              />
            </div>
          </div>

          <div className="submitTexts">
            <div className="filters">
              {checkBox.map((e, i) => {
                return (
                  <div className="checkbox-container">
                    <label className="check_container">
                      {e}
                      <input
                        className="checkbox-text"
                        type="checkbox"
                        value={e}
                        onChange={handleCheck}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="submit-btn-container">
              <button
                className="btn"
                type="submit"
                onClick={() => {
                  fetchQuotes();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="generate_quotes">
          <div className="random_quotes">
            <img
              src={shuffle}
              className="shuffle_icon"
              onClick={() => fetchByRandomQuotes()}
            ></img>
            <label className="text">Generate Random Quote</label>
          </div>
          <div className="author_quotes">
            <img
              src={shuffle}
              className="shuffle_icon"
              onClick={() => fetchByRandomAuthors()}
            ></img>
            <label className="text">Generate Random Authors</label>
          </div>
        </div>
        <div className="main_grid">
          {quotes?.map((ele, i) => {
            return (
              <div className="card-container">
                <Card
                  tag={ele?.tags?.length ? ele?.tags : []}
                  author={ele?.author}
                  content={ele?.content}
                  number={i}
                />
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => {
          InfiniteScrolling();
        }}
      >
        load more
      </button>
    </div>
  );
};

export default Header;
