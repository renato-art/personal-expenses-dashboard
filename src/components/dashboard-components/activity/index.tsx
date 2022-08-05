import React from "react"
import { Component } from "react"
import { RegistryContext } from "../../../hooks/registry"

export class Activity extends Component {
  render() {
    return (
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
              })
              .slice(0, 10)
              .map((entry) => (
                <div className="entryCard-container">
                  <h2 className="entryCard-id">{entry.id}</h2>
                  <h3 className="entryCard-date">{entry.createdOn.toLocaleTimeString()}</h3>
                  <p className="entryCard-title">{entry.title}</p>
                  <div className="entryCard-category">
                    <h3 className="entryCard-category-text">{entry.category}</h3>
                  </div>
                  <h3 className="entryCard-value">{entry.value}</h3>
                </div>
              ))}
            </div>
          )}
        </RegistryContext.Consumer>
      </section>
    )
  }
}


