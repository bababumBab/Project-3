import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'

import addButton from '../images/add-icon.png'
import games from '../images/games-icon.png'
import NavBar from '../components/NavBar'
import Nav from '../components/Nav'



class Events extends React.Component {
  constructor() {
    super()
    this.state = {
      games: null,
      leagues: null,
      liveGames: null,
      currentSelection: 'Games'


    }


  }

  fetchAllGames() {
    axios
      .get('https://open.faceit.com/data/v4/games?offset=0&limit=20', {
        headers: {
          Authorization: 'Bearer 9a6523cf-c46d-434c-b623-3daeefa1acdb'
        }
      })
      .then(res => {
        this.setState({ games: res.data.items, currentSelection: 'Games' })
      })
      .catch(error => console.error(error))

  }

  fetchLeagues() {
    console.log('Fetching leagues')
    axios
      .get('https://api.pandascore.co/series?token=1wCqgz0G63stMjHHwN0Bn2itQVq1z2Pc7szHZNR4MHpGWqkDy5o')
      .then(res => {

        this.setState({ leagues: res.data, currentSelection: 'Leagues' })
      })
      .catch(error => console.error(error))
  }

  fetchLiveGames() {

    axios
      .get('https://api.pandascore.co/lives?token=1wCqgz0G63stMjHHwN0Bn2itQVq1z2Pc7szHZNR4MHpGWqkDy5o')
      .then(res => {
        console.log(res.data)
        this.setState({ liveGames: res.data, currentSelection: 'LiveGames' })
      })
      .catch(error => console.error(error))
  }

  componentDidMount() {

    this.fetchAllGames()

  }

  handleGames() {
    this.fetchAllGames()
  }

  handleLeagues() {
    this.fetchLeagues()
  }

  handleLiveGames() {
    this.fetchLiveGames()
  }










  render() {

    let component

    if (this.state.currentSelection === 'Games') {
      component = this.renderGames()
    } else if (this.state.currentSelection === 'Leagues') {
      component = this.renderLeagues()
    } else if (this.state.currentSelection === 'LiveGames') {
      component = this.renderLiveGames()
    }

    console.log(component)

    // const { image } = this.state.games.featured_img_m
    return <div className="event-wrap-m">
      <NavBar />

      <section className="event-section-m">
        <div className="left-wrapper-m">
          <div className="container-top-left">
            <div className="border-navbar-left-m"></div>
            <div className="btn-add-m">
              <div className="add-image-m" style={{ backgroundImage: `url(${addButton})` }}>
              </div>
              <div className="container-links-m">
                <Link className="sub-links-m" to="/create" >Add Event</Link>
                <Link className="sub-links-m" to="/create" >Edit Event</Link>
                <Link className="sub-links-m" to="/create" >Add Game</Link>
                <Link className="sub-links-m" to="/create" >Add Tournament</Link>
              </div>
            </div>
          </div>
          <div className="left-container-m">
            <div className="container-events-m"
              onClick={() => this.handleGames()}>

              <div className="container-event-image-m" style={{ backgroundImage: `url(${games})` }}>
                <div className="events-links-m" >Games</div>
              </div>
            </div>
            <div className="container-events-m">
              {/* // onClick={() => this.handleEvents()}> */}
              <div className="container-event-image-m" style={{ backgroundImage: `url(${games})` }}>
                <div className="events-links-m" >Events</div>
              </div>
            </div>
            <div className="container-events-m"
              onClick={() => this.handleLeagues()}>
              <div className="container-event-image-m" style={{ backgroundImage: `url(${games})` }}>
                <div className="events-links-m" >Leagues</div>
              </div>
            </div>
            <div className="container-events-m"
              onClick={() => this.handleLiveGames()}>
              <div className="container-event-image-m" style={{ backgroundImage: `url(${games})` }}>
                <div className="events-links-m" >Now Live</div>
              </div>
            </div>

          </div>
        </div>


        <div className="right-wrapper-m">
          <div className="container-nav-m">
            <Nav />
          </div>
          <div className="right-container-m">

            {component}

          </div>

        </div>
      </section>

    </div>
  }

  renderGames() {
    if (!this.state.games) {
      // console.log('rendering -> null')
      return null
    }
    return <div className="right-content-m">
      {this.state.games.map(game => {
        if (game.assets.featured_img_m === '') {
          return null
        } else if (game.platforms === []) {
          return null
        }
        return <div
          key={game.game_id}
          className="container-image-m">
          <img src={game.assets.featured_img_m} alt="" />
          <div className="container-platform-m">
            <h3>Platform: {game.platforms}</h3>

            <h5>Region: {game.regions}</h5>

          </div>
        </div>
      })}

    </div>
  }

  renderLiveGames() {
    var moment = require('moment')
    moment('2020-04-09T22:00:00Z').isValid()

    if (!this.state.liveGames) {
      return null
    }

    return <>
      <div className="container-lol-m">
        <div className="container-text-m">
          <p>Check out the best place to watch Esports and earn rewards.</p>
        </div>
        <Link className="lol-link-m"
          to="//watch.lolesports.com/" target="_blank" >
          <p>Check Here</p>

        </Link>
      </div>
      {this.state.liveGames.map((game, i) => {
        return <div key={i} className="main-container-m">

          <div className="container-tt-event-m">
            <div className="container-tt-left-m">

              <div className="content-tt-m">
                <p>Tournament</p>
                <h4>{game.match.tournament.name}</h4>
              </div>

              <div className="content-date-m">

                <h4> Start date: <Moment format="YYYY/MM/DD">
                  {game.match.tournament.begin_at}
                </Moment>
                </h4>
              </div>
            </div>
            <div className="content-event-m">
              <p>Game</p>
              <h4>{game.event.game}</h4>
            </div>
          </div>

          <section className="main-section-m">
            <div className="opponents-section-m">

              <div className="opponent-content-m">
                <div className="opp-name-img-m">
                  <div className="opponent-name-m">{game.match.opponents[0].opponent.name}</div>
                  {/* <div className="opponent-img-m"> */}

                  <img src={game.match.opponents[0].opponent.image_url} alt="Image" />
                  {/* </div> */}
                </div>
                <div className="container-location-score-m">

                  <div className="location-m">
                    Location
                    <h4>{game.match.opponents[0].opponent.location}</h4>
                  </div>
                  <div className="score-m">
                    Score
                    <h4>{game.match.results[0].score}</h4>
                  </div>

                </div>
              </div>


              <div className="versus-m">
                VS
              </div>

              <div className="opponent-content-m">
                <div className="opp-name-img-m" id="right" >
                  <div className="opponent-name-m">{game.match.opponents[1].opponent.name}</div>
                  {/* <div className="opponent-img-m"> */}

                  <img src={game.match.opponents[1].opponent.image_url} alt="Image" />
                  {/* </div> */}
                </div>
                <div className="container-location-score-m" id="two">
                  {/* <div className="container-location-m"> */}
                  <div className="location-m">
                    Location
                    <h4>{game.match.opponents[1].opponent.location}</h4>
                  </div>
                  <div className="score-m">
                    Score
                    <h4>{game.match.results[1].score}</h4>
                  </div>
                  {/* </div> */}
                </div>
              </div>



            </div>
          </section>
          <div className="watch-live-m">
            <a href={game.match.live_url} rel="noopener noreferrer" target="_blank" ><button>Watch Live</button></a>
          </div>


        </div>
      })}

    </>
  }




  renderLeagues() {
    var moment = require('moment')
    moment('2020-04-09T22:00:00Z').isValid()

    if (!this.state.leagues) {
      return null
    }
    return <>
      <div className="leagues-topbar-m">
        <div id="leagues-name-m">
          <h2>Leagues</h2>
        </div>
        <div className="leagues-name-m">
          <h2>Tournaments Name</h2>
        </div>
        <div className="leagues-name-m">
          <h2>Tournaments Date</h2>
        </div>
      </div>
      {this.state.leagues.map(league => {
        if (league.name === '' || league.name === null) {
          return null
        }
        return <div
          key={league._id}
          className="league-container-m">

          <section

            className="leagues-section-m">

            <div className="div-league-m">
              <h3>{league.name}</h3>
            </div>
            <div className="div-tournaments-m">
              {league.tournaments.map(tournament => {

                return <>
                  <div className="div-tts-name-m">
                    <h3 key={tournament._id}>{tournament.name}</h3>

                  </div>

                </>
              })}
            </div>
            <div className="div-tournaments-dates-m">
              {league.tournaments.map(tournament => {

                return <>
                  <div className="div-date-m">
                    <h3>Start: <Moment format="YYYY/MM/DD">
                      {tournament.start_at}

                    </Moment>
                    </h3>
                    <h3>End: <Moment format="YYYY/MM/DD">
                      {tournament.end_at}
                    </Moment>
                    </h3>

                  </div>
                </>
              })}
            </div>

          </section>
        </div>
      })}

    </>
  }

}




export default Events