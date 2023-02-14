import axios from 'axios'

const getState = ({getStore, getActions, setStore}) => {
  // The initial state of the store
  return {
    store: {
      userLogin: "", // Information about the user's login status
      userTokens: "", // User authentication tokens
      gameData: "", // Information about games loaded from the API
      favoriteGameInfo: [] // Information about the user's favorite games
    },

    actions: {
      // Loads game data from the API
      loadGameData: (game_url_to_fetch = "page=1") => {
        const store = getStore()
        // Clears the existing game data in the store
        setStore({...store,gameData: ""})
        // Fetches game data from the API
        fetch(`https://api.rawg.io/api/games?${game_url_to_fetch}`)
          .then(response => response.json())
          .then(data => {
            // Updates the store with the new game data
            setStore({...store,gameData: data.results})
          })
          .catch((error) => alert('Something went wrong try again later'))
      },

      // Checks if the user's token is still valid and updates the user info
      updateUser: async() => {
        try {
          const store = getStore()
          const actions = getActions()
          const tokens = store.userTokens
          // Sets the authorization header for the API request
          const header = {Authorization: `Bearer ${tokens.token}`}
          // Requests user info from the API
          const requestUserInfo = await axios.get('https://games-api-4geeks.herokuapp.com/user', {headers: header})
          // Updates the store with the new user info
          await setStore({
            ...store,
            userLogin: requestUserInfo,
          })
          // Loads the user's favorite game data
          actions.loadFavoriteGameData()
        } catch (error) {
          alert('Something went wrong please try again later')
        }
      },

      // Authenticates the user and updates the store with user info and tokens
      login: async(loginInformation) => {
        try {
          // Requests user authentication tokens from the API
          const tokenRequest = await axios.post('https://games-api-4geeks.herokuapp.com/login', loginInformation)
          const tokens = tokenRequest.data
          // If authentication fails, display an error message and return early
          if (!tokens.token) {return alert(tokens.message)}
          // Sets the authorization header for the API request
          const header = {Authorization: `Bearer ${tokens.token}`}
          // Requests user info from the API
          const requestUserInfo = await axios.get('https://games-api-4geeks.herokuapp.com/user', {headers: header})
          const store = getStore()
          // Updates the store with user info and tokens
          setStore({
            ...store,
            userLogin: requestUserInfo,
            userTokens: tokens
          })
          // Returns the user's username
          return requestUserInfo.data.username
        } catch (error) {
          alert('Something went wrong please try again later')
        }
      },

      // Logs out the user and clears user info and tokens from the store
      logout: async() => {
        try {
          const store = await getStore()
          // Posts a request to log out the user
          // const header = {Authorization: `Bearer ${store.userTokens.token}`}
          // await axios.post('https://games-api-4geeks.herokuapp.com/logout', {headers: header})
          // Clears user info and tokens from the store
          setStore({
            ...store,
            userLogin: "",
            userTokens: ""
                    })
                } catch (error) {
                    alert('Something went wrong please try again later')
                }
            },

             // Loads the user's favorite game data from the API
            loadFavoriteGameData: async() => {
                try {
                const store = await getStore()
                // Checks if the user is logged in
                if (store.userLogin) {
                    const favoriteGameRequestData = []
                    const arrOfFavoriteGames = store.userLogin.data.favorite_games;
                    // Requests data for each favorite game and adds it to an array
                    for (let game of arrOfFavoriteGames) {
                    const request = await axios.get(`https://api.rawg.io/api/games/${game.game_url_id}`);
                    favoriteGameRequestData.push(request.data)
                    }
                    // Updates the store with the new favorite game data
                    setStore({
                    ...store,
                    favoriteGameInfo: favoriteGameRequestData
                    })
                }
                } catch (error) {
                alert("Something went wrong please try again later");
                }
            }
        }
    }
};

export default getState;
