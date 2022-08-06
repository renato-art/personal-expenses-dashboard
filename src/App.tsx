import React, { Component, FormEvent, ReactNode } from "react"
import { RegistryContext, entries, Entry } from "./hooks/registry"
import { Activity } from "./components/dashboard-components/activity"
import { NewEntryForm } from "./components/utils/newEntry"
import { Histogram } from "./components/dashboard-components/histogram"

import "./App.css"
import openInNew from "./assets/icons/open_in_new.svg"
import moreH from "./assets/icons/more_h.svg"
import { Chart, ChartItem, registerables } from "chart.js"

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

const labels = [1, 2, 3, 4, 5, 6, 7]
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
}

class Demo extends Component {
  graph
  componentDidMount() {
    this.renderGraph()
  }
  componentDidUpdate() {
    this.renderGraph()
  }
  buildGraph() {
    const stackedLine = new Chart('graph-anchor', {
      type: 'line',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            }
          },
          y: {
            suggestedMin: 40,
            suggestedMax: 90,
            ticks: {
              stepSize: 20
            },
            grid: {
              drawBorder: false
            }
          }
        }
      }
    })
    return stackedLine
  }
  renderGraph() {
    if (!this.graph) {
      this.graph = this.buildGraph()
    } else {
      this.graph.destroy()
      this.graph = this.buildGraph()
    }
  }
  render(): ReactNode {
    return (
      <canvas id="graph-anchor">
      </canvas>
    )
  }
}

const Content = ({ entries }) => {
  return (
    <div className="content-container">
      <div className="first-level-container">
        <Histogram />
        <section className="registry-history-line-graph-container">
          <header className="activity-header">
            <div className="total-registries-histogram-header-title-and-open-view">
              <h2 className="activity-header-title"><b>History</b></h2>
              <img className="total-registries-histogram-header-open-view" src={openInNew} />
            </div>
            <img className="total-registries-histogram-header-more-view" src={moreH} />
          </header>
          <div className="canvas-wrapper">
            <Demo />
          </div>
        </section>
        <NewEntryForm />
      </div>
      <Activity />
    </div>
  )
}

export default App
