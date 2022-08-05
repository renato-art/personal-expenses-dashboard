import React, { Component, FormEvent } from "react"
import { RegistryContext, entries, Entry } from "./hooks/registry"
import { Activity } from "./components/dashboard-components/activity"
import { NewEntryForm } from "./components/utils/newEntry"

import "./App.css"
import openInNew from "./assets/icons/open_in_new.svg"
import moreH from "./assets/icons/more_h.svg"

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
      <div className="first-level-container">
        <section className="total-registries-histogram-container">
          <header className="activity-header">
            <div className="total-registries-histogram-header-title-and-open-view">
              <h2 className="activity-header-title"><b>Entries</b></h2>
              <img className="total-registries-histogram-header-open-view" src={openInNew} />
            </div>
            <img className="total-registries-histogram-header-more-view" src={moreH} />
          </header>
          <RegistryContext.Consumer>
            {({ entries }) => (
              <div className="total-registries-histogram-body">
                <div className="total-registries-histogram-bar">
                  <div className="total-registries-histogram-bar-first" />
                </div>
                <div className="total-registries-histogram-bar">
                  <div className="total-registries-histogram-bar-second" />
                </div>
                <div className="total-registries-histogram-bar">
                  <div className="total-registries-histogram-bar-third" />
                </div>
                <div className="total-registries-histogram-bar">
                  <div className="total-registries-histogram-bar-fourth" />
                </div>
                <div className="total-registries-histogram-bar">
                  <div className="total-registries-histogram-bar-fifth" />
                </div>
                <div className="total-registries-histogram-bar">
                  <div className="total-registries-histogram-bar-sixth" />
                </div>
                <div className="total-registries-histogram-bar">
                  <div className="total-registries-histogram-bar-seventh" />
                </div>
                <div className="total-registries-histogram-bar">
                  <div className="total-registries-histogram-bar-eigth" />
                </div>
                <div className="total-registries-histogram-bar">
                  <div className="total-registries-histogram-bar-ninth" />
                </div>
                <div className="total-registries-histogram-bar">
                  <div className="total-registries-histogram-bar-tenth" />
                </div>
              </div>
            )}
          </RegistryContext.Consumer>
        </section>
        <NewEntryForm />
      </div>
      <Activity />
    </div>
  )
}

export default App
