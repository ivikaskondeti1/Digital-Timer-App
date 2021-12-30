import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    minutesTime: 25,
    secondsTime: 0,
    playStatus: false,
    startTimerButton: true,
    count: 1,
    statusBackward: false,
    setTimerValue: 25,
  }

  addTimeValue = () => {
    const {minutesTime, secondsTime} = this.state
    let minutesValue = '0'
    let secondsValue = '0'
    if (minutesTime.toString().length === 1) {
      console.log('string')
      minutesValue = minutesValue.concat(`${minutesTime}`)
    } else {
      console.log('not string sec')
      minutesValue = minutesValue.concat(`${minutesTime}`)
      minutesValue = minutesValue.substring(1)
    }
    if (secondsTime.toString().length === 1) {
      console.log('seconds string')
      secondsValue = secondsValue.concat(`${secondsTime}`)
    } else {
      console.log('not string sec')
      secondsValue = secondsValue.concat(`${secondsTime}`)
      secondsValue = secondsValue.substring(1)
    }
    const resultTimeText = minutesValue.concat(':', secondsValue)
    return resultTimeText
  }

  increaseMinuteTime = () => {
    this.setState(prevState => ({
      minutesTime: prevState.setTimerValue + 1,
      setTimerValue: prevState.setTimerValue + 1,
    }))
  }

  decreaseMinuteTime = () => {
    this.setState(prevState => ({
      minutesTime: prevState.setTimerValue - 1,
      setTimerValue: prevState.setTimerValue - 1,
    }))
  }

  startOrStopTimmer = () => {
    const {playStatus} = this.state
    if (!playStatus) {
      this.setState(prevState => ({
        playStatus: !prevState.playStatus,
        startTimerButton: !prevState.startTimerButton,
      }))
      this.TimmerStart = setInterval(this.decreaseTime, 1000)
      console.log('timmer Started')
    } else {
      this.setState(prevState => ({
        playStatus: !prevState.playStatus,
        startTimerButton: !prevState.startTimerButton,
      }))
      clearInterval(this.TimmerStart)
      console.log('timmer Ended')
    }
  }

  updateTimerValues = secondsTime => {
    if (secondsTime === 0) {
      this.setState(prevState => ({
        count: prevState.count + 1,
        minutesTime: prevState.minutesTime - 1,
        secondsTime: 59,
      }))
    } else {
      this.setState(prevState => ({
        count: prevState.count + 1,
        secondsTime: prevState.secondsTime - 1,
      }))
    }
  }

  updateBackwordTimerValues = secondsTime => {
    if (secondsTime === 59) {
      this.setState(prevState => ({
        count: prevState.count + 1,
        minutesTime: prevState.minutesTime - 1,
        secondsTime: 0,
      }))
    } else {
      this.setState(prevState => ({
        count: prevState.count + 1,
        secondsTime: prevState.secondsTime + 1,
      }))
    }
  }

  decreaseTime = () => {
    const {
      count,
      minutesTime,
      secondsTime,
      playStatus,
      statusBackward,
    } = this.state
    if (!statusBackward) {
      if (minutesTime === 0 && secondsTime === 0 && playStatus === true) {
        this.setState(prevState => ({
          playStatus: !prevState.playStatus,
          statusBackward: !prevState.statusBackward,
          startTimerButton: !prevState.startTimerButton,
        }))
        clearInterval(this.TimmerStart)
        console.log('timmer Ended')
      } else {
        this.updateTimerValues(secondsTime)
      }
    } else {
      console.log('backword timmer enabled')
      this.updateBackwordTimerValues(secondsTime)
    }

    // this.setState(prevState => ({count: prevState.count + 1}))
  }

  resetTimmer = () => {
    clearInterval(this.TimmerStart)
    this.setState({
      minutesTime: 25,
      secondsTime: 0,
      playStatus: false,
      startTimerButton: true,
      count: 1,
      statusBackward: false,
      setTimerValue: 25,
    })
  }

  render() {
    const {
      minutesTime,
      playStatus,
      startTimerButton,
      setTimerValue,
    } = this.state
    return (
      <div className="MainPage">
        <h1 className="TimerHeading">Digital Timer</h1>
        <div className="Mobilecontainer">
          <div className="TimerBackground">
            <div className="TimerDetails">
              <h1 className="TimeHeading">{this.addTimeValue()}</h1>
              {playStatus ? (
                <p className="timerStatus">Running</p>
              ) : (
                <p className="timerStatus">Paused</p>
              )}
            </div>
          </div>
          <div className="mobileContainer2">
            <div className="TimerPlayPauseContainer">
              <button
                type="submit"
                className="ButtonItems"
                onClick={this.startOrStopTimmer}
              >
                {playStatus ? (
                  <>
                    <img
                      className="PlayPauseImg"
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                    />
                    <p className="timerStatus">pause</p>
                  </>
                ) : (
                  <>
                    <img
                      className="PlayPauseImg"
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                    />
                    <p className="timerStatus">Start</p>
                  </>
                )}
              </button>
              <button
                type="submit"
                className="ButtonItems"
                onClick={this.resetTimmer}
              >
                <img
                  className="PlayPauseImg"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p className="timerStatus">Reset</p>
              </button>
            </div>
            <p className="setTimerText">Set Timer limit</p>
            <div className="updateTime">
              {startTimerButton ? (
                <>
                  <button
                    className="UpdateTimeButton"
                    type="submit"
                    onClick={this.increaseMinuteTime}
                  >
                    +
                  </button>
                  <p className="UpdateTimeText">{setTimerValue}</p>
                  <button
                    className="UpdateTimeButton"
                    type="submit"
                    onClick={this.decreaseMinuteTime}
                  >
                    -
                  </button>
                </>
              ) : (
                <>
                  <button className="UpdateTimeButton" type="submit">
                    +
                  </button>
                  <p className="UpdateTimeText">{setTimerValue}</p>
                  <button className="UpdateTimeButton" type="submit">
                    -
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
