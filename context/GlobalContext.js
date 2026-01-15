import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);
    const [favorites, setFavorites] = useState([]);


    useEffect(() => {
        const loadData = async () => {
            try {
                const storedWatchlist = await AsyncStorage.getItem('watchlist');
                const storedFavorites = await AsyncStorage.getItem('favorites');

                if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist));
                if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
            } catch (e) {
                console.error("Failed to load global state", e);
            }
        };
        loadData();
    }, []);


    useEffect(() => {
        AsyncStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    useEffect(() => {
        AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToWatchlist = (item) => {
        setWatchlist((prev) => {
            if (!prev.find(i => i.id === item.id)) {
                return [...prev, item];
            }
            return prev;
        });
    };

    const removeFromWatchlist = (id) => {
        setWatchlist((prev) => prev.filter((item) => item.id !== id));
    };

    const isInWatchlist = (id) => {
        return watchlist.some((item) => item.id === id);
    };

    const toggleWatchlist = (item) => {
        if (isInWatchlist(item.id)) {
            removeFromWatchlist(item.id);
        } else {
            addToWatchlist(item);
        }
    };


    return (
        <GlobalContext.Provider value={{
            watchlist,
            favorites,
            addToWatchlist,
            removeFromWatchlist,
            isInWatchlist,
            toggleWatchlist
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
