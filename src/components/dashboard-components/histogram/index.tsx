import React, { Component } from "react"
import { RegistryContext } from "../../../hooks/registry"

import openInNew from "../../../assets/icons/open_in_new.svg"
import moreH from "../../../assets/icons/more_h.svg"

export class Histogram extends Component {
  render() {
    return (
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
    )
  }
}