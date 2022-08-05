import React from "react";
import { Component } from "react";
import { RegistryContext } from "../../../hooks/registry";

export class NewEntryForm extends Component {
  render() {
    return (
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
    )
  }
}