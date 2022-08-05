import React, { Component, FormEvent } from "react"
import { RegistryContext, entries, Entry } from "./hooks/registry"
import { Activity } from "./components/dashboard-components/activity"

import "./App.css"

class App extends Component<{}, { entries: Entry[], setEntries: () => void, setNewEntry: (event: FormEvent<HTMLInputElement>) => void, entry: any }> {
  setEntries: () => void
  setNewEntry: (event: FormEvent<HTMLInputElement>) => void

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
  }

  handleChange(event: FormEvent<HTMLInputElement>) {
    const target = event.currentTarget
    const value = target.value
    const name = target.name

    this.setState({
      entry: { ...this.state.entry, ...{ 
        [name]: value
      }}
    })
  }

  render() {
    return (
      <main>
        <RegistryContext.Provider value={this.state}>
          <Content />
        </RegistryContext.Provider>
      </main>
    )
  }
}

const Content = () => {
  return (
    <div className="content-container">
      <Activity />
      <div className="newEntry-form-container">
        <RegistryContext.Consumer>
          {({ entry, setNewEntry, setEntries }) => (
            <div className="newEntry-form-content">
              <label>Title</label>
              <input type="text" value={entry.title} name="title" onChange={setNewEntry} />
              <label>Category</label>
              <input type="text" value={entry.category} name="category" onChange={setNewEntry} />
              <label>Value</label>
              <input type="number" value={entry.value} name="value" onChange={setNewEntry} />
              <button onClick={setEntries}>ADD</button>
            </div>
          )}
        </RegistryContext.Consumer>
      </div>
    </div>
  )
}

export default App
