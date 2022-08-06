import React, { Component, FormEvent } from "react"
import { RegistryContext, entries, Entry } from "./hooks/registry"
import { Activity } from "./components/dashboard-components/activity"
import { NewEntryForm } from "./components/utils/newEntry"
import { Histogram } from "./components/dashboard-components/histogram"

import "./App.css"
import { Chart, registerables } from "chart.js"
import { SeriesGraph } from "./components/dashboard-components/series-graph"

Chart.register(...registerables)

class App extends Component<{}, { entries: Entry[], setEntries: () => void, setNewEntry: (event: FormEvent<HTMLInputElement>) => void, entry: any }> {
  setEntries: () => void
  setNewEntry: (event: FormEvent<HTMLInputElement>) => void
  root = document.documentElement

  constructor(props) {
    super(props)

    this.setEntries = () => {
      const newEntry: Entry = {
        ...this.state.entry,
        id: `#${Math.round(Math.random() * 10000)}`,
        createdOn: new Date()
      }
      this.setState(state => ({
        entries: [...state.entries, newEntry]
      }))
      this.buildHistogram()
    }

    this.setNewEntry = (event: FormEvent<HTMLInputElement>): void => {
      this.handleChange(event)
    }

    this.state = {
      entries,
      setEntries: this.setEntries,
      setNewEntry: this.setNewEntry,
      entry: {
        title: "Test",
        value: Math.round(Math.random() * 1000),
        category: "Random"
      }
    }
    this.buildHistogram()
  }

  buildHistogram() {
    const periodsList = this.state.entries.map((entry) => {
      return new Date(entry.createdOn).getMonth()
    })
    const uniquePeriodsList = [...new Set(periodsList)]
      .sort((firstEntry, secondEntry) => {
        return firstEntry - secondEntry
      })
    const positionList = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth']
    for (let i = 0; i < uniquePeriodsList.length; i++) {
      const monthIndex = i
      const entriesList = this.state.entries.filter((entry) => {
        console.log(new Date(entry.createdOn).getMonth(), uniquePeriodsList)
        if (new Date(entry.createdOn).getMonth() === uniquePeriodsList[monthIndex]) {
          return entry
        }
      })
      const percent = (entriesList.length / 7) * 100
      this.root.style.setProperty(`--${positionList[i]}-fill`, `${percent}%`)
    }
  }

  handleChange(event: FormEvent<HTMLInputElement>) {
    const target = event.currentTarget
    const value = target.value
    const name = target.name

    this.setState({
      entry: {
        ...this.state.entry, ...{
          [name]: value
        }
      }
    })
  }

  render() {
    return (
      <main>
        <RegistryContext.Provider value={this.state}>
          <Content entries={this.state.entries} />
        </RegistryContext.Provider>
      </main>
    )
  }
}

const Content = ({ entries }) => {
  return (
    <div className="content-container">
      <header className="content-header-container">
        <div className="content-header-info-container">
          <div className="content-header-info-title-and-date">
            <h1 className="content-header-info-title">Dashboard</h1>
            <p className="content-header-info-date">{new Date().toDateString()}</p>
          </div>
          <select className="activity-header-selector">
            <option value="all">Today</option>
          </select>
        </div>
      </header>
      <div className="first-level-container">
        <div className="second-level-container">
          <section className="general-view-container">
          </section>
          <div className="third-level-container">
            <Histogram />
            <SeriesGraph />
          </div>
        </div>
        <NewEntryForm />
      </div>
      <Activity />
    </div >
  )
}

export default App
