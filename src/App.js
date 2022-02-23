import React, { useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import Autocomplete from 'react-autocomplete';

import styles from './App.module.css';

function App() {

    const [search, setSearch] = useState("");
    const [option, setOption] = useState([]);
    const [userInfo, setUserInfo] = useState();


    const debouncedRetrieve = useCallback(debounce((val)=> {
        axios.get(`https://api.github.com/search/users?q=${val}`).then((res) => {
            setOption(res.data.items);
        })
    }, 500),[])

    const onChangeHandler = (e) => {
        setSearch(e.target.value);

        if (e.target.value !== "") {
            debouncedRetrieve(e.target.value);
        }
    }

    const onSelectHandler = (val) => {
        setSearch(val);
    }

    const getItemVal = (item) => {
        setUserInfo(item);
        return `${item.login}`
    }

    const renderItem = (item) => {
        return (
            <div className={styles.formMenu} key={item.id}  >
                {item.login}
            </div>
        )
    }

    const customInput = (props) => {
        return (
            <div className={styles.formGroup}>
                <input aria-label="search" placeholder="Search" className={styles.formField} {...props}/>
                <label className={styles.formLabel}>Username</label>
            </div>
        )
    }


  return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
            <h1>Github Search</h1>
            <Autocomplete
              getItemValue={getItemVal}
              items={option}
              renderItem={renderItem}
              value={search}
              onChange={ onChangeHandler}
              onSelect={onSelectHandler}
              renderInput={customInput}
              autoHighlight={false}
          />
        </div>
          {userInfo && (
              <div className={styles.userContainer}>
                  <div className={styles.userAvatar}>
                      <img alt={userInfo.login} src={userInfo.avatar_url} />
                  </div>
                  <div className={styles.userInfo}>
                      <h2>{`Username: ${userInfo.login}`}</h2>
                      <a rel="noreferrer" target="_blank" href={userInfo.html_url}>{userInfo.html_url}</a>
                  </div>
              </div>
          )}
      </div>

  );
}

export default App;
