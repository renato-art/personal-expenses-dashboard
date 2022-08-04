import React, { Component } from "react"
import { RegistryContext, entries, Entry } from "./hooks/registry"

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
      <h1>
        Hello world! I am using React
        <RegistryContext.Provider value={this.state}>
          <Content/>
        </RegistryContext.Provider>
      </h1>
    )
  } 
}

const Content = () => {
  return (
    <div>
      <RegistryContext.Consumer>
        {({ entries, setEntries }) => (
          <div>
            {entries.map((entry) => (
              <div className="entryCard-container">
                <h2>{entry.title}</h2>
                <p>{entry.value}</p>
              </div>
            ))}
            <button onClick={() => setEntries({
              title: "Test",
              value: Math.random()*1000,
              category: "Random",
              createdOn: new Date()
            })}>Add</button>
          </div>
          
        )}
      </RegistryContext.Consumer>
    </div>
  )
}

export default App
