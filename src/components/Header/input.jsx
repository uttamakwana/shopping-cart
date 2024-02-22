// icons
import { useEffect, useRef, useState } from "react";
import { SearchIcon, DownIcon, UpIcon } from "../../constants/icons";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, addProducts } from "../../store/slices/product";
import { Loader } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";

const Input = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const { categories } = useSelector((state) => state.productReducer);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const showSearchBar = location.pathname === "/";
  const inputRef = useRef(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState({
    index: -1,
    value: null,
  });
  const suggestionItemRef = useRef(null);
  const suggestionsRef = useRef(null);
  console.log(selectedSuggestion);
  console.log(suggestions);

  const fetchCategoryProducts = async (category) => {
    setLoading(true);
    console.log(loading);
    setCategory(category);
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const { products } = await response.json();
    dispatch(addProducts(products));
    dispatch(addCategory(category));
    setLoading(false);
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    setCategory("All");
    const response = await fetch(`https://dummyjson.com/products`);
    const { products } = await response.json();
    dispatch(addProducts(products));
    dispatch(addCategory("All"));
    setLoading(false);
  };

  const fetchSuggestions = async (e) => {
    if (e.target.value && category !== "All") {
      console.log("with category");
      setIsDropdown(false);
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await response.json();
      console.log(data);
      setSuggestions(data.products);
    }
    if (e.target.value && category === "All") {
      console.log("without category");
      setIsDropdown(false);
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${e.target.value}`
      );
      const data = await response.json();
      setSuggestions(data.products);
    }
    if (!e.target.value) {
      let response;
      if (category === "All") {
        response = await fetch(`https://dummyjson.com/products`);
      } else {
        response = await fetch(
          `https://dummyjson.com/products/category/${category}`
        );
      }
      const data = await response.json();
      dispatch(addProducts(data.products));
      console.log("removing suggestions");
      setSuggestions([]);
      setSelectedSuggestion({ index: -1, value: null });
    }
  };

  async function handleSubmit(e) {
    if (e.target[0].value) {
      e.preventDefault();
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${selectedSuggestion.value}`
      );
      const data = await response.json();
      dispatch(addProducts(data.products));
      console.log(data);
      setSuggestions([]);
      setSelectedSuggestion({ index: -1, value: null });
      inputRef.current.value = "";
    } else {
      alert("Please enter something!");
    }
  }

  async function handleClickOnSuggestionItem(itemValue) {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${itemValue}`
    );
    const data = await response.json();
    dispatch(addProducts(data.products));
    console.log(data);
    setSuggestions([]);
    setSelectedSuggestion({ index: -1, value: null });
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 40 && suggestions && suggestions.length > 0) {
        setSelectedSuggestion((prev) => {
          if (prev.index !== suggestions.length - 1) {
            return {
              index: prev.index + 1,
              value: suggestions[prev.index + 1].title,
            };
          } else {
            return {
              index: 0,
              value: suggestions[0].title,
            };
          }
        });
      }
      if (e.keyCode === 38 && suggestions && suggestions.length > 0) {
        setSelectedSuggestion((prev) => {
          if (prev.index !== 0) {
            return {
              index: prev.index - 1,
              value: suggestions[prev.index - 1].title,
            };
          } else {
            return {
              index: suggestions.length - 1,
              value: suggestions[suggestions.length - 1].title,
            };
          }
        });
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    if (suggestionItemRef.current) {
      const suggestionItemRect =
        suggestionItemRef.current.getBoundingClientRect();
      const suggestionsRect = suggestionsRef.current.getBoundingClientRect();

      if (suggestionItemRect.bottom > suggestionsRect.bottom) {
        suggestionsRef.current.scrollTop +=
          suggestionItemRect.bottom - suggestionsRect.bottom;
      } else if (suggestionItemRect.top < suggestionsRect.top) {
        suggestionsRef.current.scrollTop -=
          suggestionsRect.top - suggestionItemRect.top;
      }
    }
  }, [selectedSuggestion]);

  if (loading) return <Loader />;
  return (
    showSearchBar && (
      <form
        className="header-search-container flex relative"
        onSubmit={handleSubmit}
      >
        <div
          className="p-1 border-none outline-none pointer relative"
          id="select"
          onClick={() => {
            setIsDropdown(!isDropdown);
            setSuggestions([]);
          }}
          onMouseLeave={() => setIsDropdown(false)}
        >
          <span
            className="flex ai-center gap-4 fs-small"
            style={{ textTransform: "capitalize" }}
          >
            {category}
            {!isDropdown ? <DownIcon /> : <UpIcon />}
          </span>
          {isDropdown && (
            <ul
              className="dropdown absolute"
              onMouseLeave={() => setIsDropdown(false)}
            >
              <li onClick={fetchAllProducts} className="fs-small">
                All
              </li>
              {categories && categories.length > 0
                ? categories.map((category, index) => (
                    <li
                      key={index}
                      onClick={() => fetchCategoryProducts(category)}
                      className="fs-small"
                    >
                      {category}
                    </li>
                  ))
                : null}
            </ul>
          )}
        </div>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search products"
          className="p-1 border-none outline-none"
          onChange={(e) => fetchSuggestions(e)}
          ref={inputRef}
          autoComplete="off"
          aria-autocomplete="off"
        />
        <button className="p-1 border-none outline-none search-btn flex-center">
          <SearchIcon />
        </button>
        {suggestions && suggestions.length > 0 && (
          <ul className="header-search-suggestions" ref={suggestionsRef}>
            {suggestions &&
              suggestions.length > 0 &&
              suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  className={`suggestion-item fs-small fw-500 p-8 pointer ${
                    index === selectedSuggestion.index ? "active" : ""
                  } `}
                  ref={
                    suggestion.title === selectedSuggestion.value
                      ? suggestionItemRef
                      : null
                  }
                  onClick={() => handleClickOnSuggestionItem(suggestion.title)}
                >
                  {suggestion.title} - {index}
                </li>
              ))}
          </ul>
        )}
      </form>
    )
  );
};

export default Input;
