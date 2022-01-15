import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import SelectedItem from "./SelectedItem/SelectedItem";

const AutocompleteWrapper = styled.div`
  input {
    padding: 1rem;
    background-color: #595959;
    border-radius: 15px;
    color: white;

    transition-duration: 400ms;
    width: 30%;
    margin-bottom: 2rem;
  }

  input:focus {
    background-color: lightgray;
    color: black;
    font-size: 15px;
  }
  .users {
    background-color: #a68072;
    font-size: 20px;
    cursor: pointer;
    padding: 1rem;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 0.5rem;
    border-radius: 15px;

    transition-duration: 300ms;
    &.active {
      background-color: #bfa095;
      transform: scale(1.02);
      box-shadow: inset 0px 0px 3px 3px black;
    }
  }
  .users:hover {
    background-color: #bfa095;
    transform: scale(1.02);
    box-shadow: inset 0px 0px 3px 3px black;
  }
  ul {
    background-color: #262626;
    border-radius: 15px;
    transition-duration: 300ms;
    margin: 3rem 5rem;
    box-shadow: inset 0px 0px 3px 3px #a68072;
  }
  li {
    display: inline-block;
    padding: 8px;
    list-style-type: none;
    background-color: #d99771;
    margin: 1rem 0.3rem;
    border: 2px solid black;
    border-radius: 15px;
    box-shadow: inset 0px 0px 2px 2px #262626;

    button {
      margin-left: 0.5rem;
      padding-top: 5px;
      padding-left: 5px;
      padding-right: 5px;
      padding-bottom: 2px;
      border: none;
      border-radius: 50%;
      box-shadow: 2px 2px 5px black;
      float: right;
      transition-duration: 300ms;
      font-size: 10px;
      text-align: center;
    }
    button:hover {
      transform: scale(1.1);
      transition-duration: 300ms;
      cursor: pointer;
    }
  }
`;

export default function Search() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [highlitedSuggestion, setHighlitedSuggestion] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/resources/technologies.json")
      .then((response) => {
        setUsers(response.data.technologies);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${text}`, "gi");
        return user.name.match(regex);
      });
    }

    setSuggestions(matches);

    setText(text);

    if (suggestions.length === 0) {
      setHighlitedSuggestion(0);
    }
  };

  const addNewUser = (textToAdd) => {
    const contentToAdd = textToAdd ? textToAdd : text;

    if (
      contentToAdd !== "" &&
      !selected.includes(contentToAdd) &&
      highlitedSuggestion === 0
    ) {
      const newSelected = [...selected, contentToAdd];

      setSelected(newSelected);
      setText("");
    } else {
      setText("");
      alert("Element already existing");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && highlitedSuggestion <= 0) {
      event.preventDefault();
      setTimeout(() => {
        addNewUser();
        setSuggestions([]);
      }, 100);
    }

    if (suggestions) {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        const toHighlight =
          highlitedSuggestion > 0 ? highlitedSuggestion - 1 : 0;
        setHighlitedSuggestion(toHighlight);
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();

        const toHighlight =
          highlitedSuggestion < suggestions.length - 1
            ? highlitedSuggestion + 1
            : suggestions.length;
        setHighlitedSuggestion(toHighlight);
      }
      if (event.key === "Enter" && highlitedSuggestion > 0) {
        event.preventDefault();
        const addFromSuggestions = [
          ...selected,
          suggestions[highlitedSuggestion - 1].name,
        ];

        if (
          highlitedSuggestion > 0 &&
          !selected.includes(suggestions[highlitedSuggestion - 1].name)
        ) {
          setSelected(addFromSuggestions);
          setSuggestions([]);
          setText("");
        } else {
          setText("");
          alert("Element already existing");
        }
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setSuggestions([]);
        setText("");
      }
    } else {
      setHighlitedSuggestion(0);
    }
  };

  const removeSelected = (idx) => {
    const updateSelected = selected.filter((item, i) => i !== idx);
    setSelected(updateSelected);
  };

  return (
    <AutocompleteWrapper>
      {selected && (
        <ul id="list" data-testid="listOfSelectedTech">
          {selected.map((item, i) => (
            <SelectedItem
              key={i}
              itemId={i}
              text={item}
              removeItem={removeSelected}
            />
          ))}
        </ul>
      )}
      <input
        data-testid="searchbar"
        type="text"
        className="autocomplete"
        placeholder="Type to search"
        onChange={(e) => onChangeHandler(e.target.value)}
        value={text}
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([]);
          }, 100);
        }}
        onKeyDown={handleKeyDown}
      />
      {suggestions &&
        suggestions.map((suggestion, i) => (
          <div
            key={i}
            className={`users ${i === highlitedSuggestion - 1 ? "active" : ""}`}
            onClick={() => addNewUser(suggestion.name)}
          >
            {suggestion.name}
          </div>
        ))}
    </AutocompleteWrapper>
  );
}
