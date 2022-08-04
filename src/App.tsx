import React, { Component } from "react"
import { RegistryContext, entries, Entry } from "./hooks/registry"

import "./App.css"

class App extends Component<{}, {entries: Entry[], setEntries: (newEntry: Entry) => void}> {
  setEntries: (newEntry: Entry) => void

  constructor (props) {
    super(props)

    this.setEntries = (newEntry: Entry) => {
      this.setState(state => ({
        entries: [...state.entries, newEntry]
      }))
    }
    
    this.state = {
      entries,
      setEntries: this.setEntries
    }

    console.log(this.state)
  }
  render () {
    return (
      <main>
        <RegistryContext.Provider value={this.state}>
          <Content/>
        </RegistryContext.Provider>
      </main>
    )
  } 
}

const Content = () => {
  return (
    <div className="content-container">
      <section className="activity-container">
        <header className="activity-header">
          <h2 className="activity-header-title"><b>Activity</b></h2>
          <select className="activity-header-selector">
            <option value="all">All Activity</option>
          </select>
        </header>
        <RegistryContext.Consumer>
          {({ entries, setEntries }) => (
            <div>
              {entries.sort((firstEntry, secondEntry) => {
                return secondEntry.createdOn.getTime() - firstEntry.createdOn.getTime()
              }).map((entry) => (
                <div className="entryCard-container">
                  <h2>{entry.id}</h2>
                  <h3>{entry.createdOn.toLocaleDateString()}</h3>
                  <p>{entry.title}</p>
                  <h3>{entry.value}</h3>
                </div>
              ))}
              <button onClick={() => setEntries({
                id: `#${Math.round(Math.random()*10000)}`,
                title: "Test",
                value: Math.round(Math.random()*1000),
                category: "Random",
                createdOn: new Date()
              })}>Add</button>
            </div>
            
          )}
        </RegistryContext.Consumer>
      </section>
    </div>
  )
}

export default App
